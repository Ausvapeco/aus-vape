import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const itemSchema = z.object({
  slug: z.string().max(120),
  name: z.string().max(200),
  qty: z.number().int().min(1).max(99),
  price: z.number().min(0).max(100000),
});

const createSchema = z.object({
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(6).max(30),
  customer_name: z.string().trim().min(2).max(100),
  address: z.string().trim().min(4).max(200),
  suburb: z.string().trim().min(2).max(100),
  postcode: z.string().trim().regex(/^\d{4}$/),
  state: z.string().trim().min(2).max(50),
  country: z.string().trim().min(2).max(60),
  items: z.array(itemSchema).min(1).max(60),
});

const refSchema = z.string().trim().toUpperCase().regex(/^AV-[A-Z0-9]{8}$/);

export const STATUS_STEPS = [
  "awaiting_payment",
  "payment_received",
  "processing",
  "shipped",
  "delivered",
] as const;

export type OrderStatus = (typeof STATUS_STEPS)[number] | "cancelled";

export type PublicOrder = {
  reference: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping: number;
  customer_name: string;
  created_at: string;
  paid_at: string | null;
  shipped_at: string | null;
  tracking_number: string | null;
  carrier: string | null;
  items: { slug: string; name: string; qty: number; price: number }[];
  events: { status: OrderStatus; label: string; note: string | null; created_at: string }[];
};

function makeReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return `AV-${out}`;
}

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => createSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const subtotal = Number(
      data.items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2),
    );
    const shipping = subtotal > 80 ? 0 : 9.95;
    const total = Number((subtotal + shipping).toFixed(2));
    const reference = makeReference();

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        reference,
        customer_name: data.customer_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        suburb: data.suburb,
        postcode: data.postcode,
        state: data.state,
        country: data.country,
        items: data.items,
        subtotal,
        shipping,
        total,
      })
      .select("id, reference, total")
      .single();
    if (error || !order) throw new Error("Could not create your order. Please try again.");

    await supabaseAdmin.from("order_events").insert({
      order_id: order.id,
      status: "awaiting_payment",
      label: "Order placed",
      note: "Waiting for your bank transfer to arrive.",
    });

    return { reference: order.reference, total: Number(order.total) };
  });

export const getOrderByReference = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ reference: refSchema }).parse(data))
  .handler(async ({ data }): Promise<PublicOrder | null> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order } = await supabaseAdmin
      .from("orders")
      .select(
        "id, reference, status, total, subtotal, shipping, customer_name, created_at, paid_at, shipped_at, tracking_number, carrier, items",
      )
      .eq("reference", data.reference)
      .maybeSingle();
    if (!order) return null;

    const { data: events } = await supabaseAdmin
      .from("order_events")
      .select("status, label, note, created_at")
      .eq("order_id", order.id)
      .order("created_at", { ascending: true });

    return {
      reference: order.reference,
      status: order.status as OrderStatus,
      total: Number(order.total),
      subtotal: Number(order.subtotal),
      shipping: Number(order.shipping),
      customer_name: order.customer_name,
      created_at: order.created_at,
      paid_at: order.paid_at,
      shipped_at: order.shipped_at,
      tracking_number: order.tracking_number,
      carrier: order.carrier,
      items: (order.items as PublicOrder["items"]) ?? [],
      events: (events ?? []).map((e) => ({
        status: e.status as OrderStatus,
        label: e.label,
        note: e.note,
        created_at: e.created_at,
      })),
    };
  });

async function checkAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase
    .from("user_roles")
    .select("id")
    .eq("user_id", context.userId)
    .eq("role", "admin")
    .maybeSingle();
  return !error && Boolean(data);
}

async function currentRole(context: { supabase: any; userId: string }) {
  const { data } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId);
  const roles = (data ?? []).map((r: any) => r.role as string);
  if (roles.includes("admin")) return "admin" as const;
  if (roles.includes("staff")) return "staff" as const;
  return "none" as const;
}

async function assertStaff(context: { supabase: any; userId: string }) {
  const role = await currentRole(context);
  if (role === "none") throw new Error("Forbidden");
  return role;
}

async function assertAdmin(context: { supabase: any; userId: string }) {
  if (!(await checkAdmin(context))) throw new Error("Forbidden");
}

export const getMyAccess = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const role = await currentRole(context);
    return {
      role,
      admin: role === "admin",
      staff: role !== "none",
      email: (context.claims as { email?: string } | null)?.email ?? null,
    };
  });

export const listStaff = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: roles } = await supabaseAdmin
      .from("user_roles")
      .select("id, user_id, role, created_at")
      .order("created_at", { ascending: true });
    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const emails = new Map((users?.users ?? []).map((u) => [u.id, u.email ?? ""]));
    return (roles ?? []).map((r) => ({
      id: r.id,
      user_id: r.user_id,
      role: r.role as "admin" | "staff",
      created_at: r.created_at,
      email: emails.get(r.user_id) ?? "unknown",
    }));
  });

export const grantStaff = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ email: z.string().trim().toLowerCase().email().max(255) }).parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: users } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    const match = (users?.users ?? []).find((u) => (u.email ?? "").toLowerCase() === data.email);
    if (!match) {
      return { ok: false as const, message: "No account with that email. Ask them to create an account at /admin first." };
    }
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: match.id, role: "staff" });
    if (error && !error.message.includes("duplicate")) throw new Error(error.message);
    return { ok: true as const, message: `${data.email} can now access the dashboard as staff.` };
  });

export const revokeStaff = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ user_id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .delete()
      .eq("user_id", data.user_id)
      .eq("role", "staff");
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) return { granted: false as const };
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error("Could not grant admin access.");
    return { granted: true as const };
  });

export const isAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    return { admin: await checkAdmin(context) };
  });

export const listOrders = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("orders")
      .select(
        "id, reference, customer_name, email, phone, status, total, created_at, paid_at, shipped_at, tracking_number, carrier, admin_note, items",
      )
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);
    return (data ?? []).map((o: any) => ({ ...o, total: Number(o.total) }));
  });

const updateSchema = z.object({
  reference: refSchema,
  status: z.enum([
    "awaiting_payment",
    "payment_received",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]),
  note: z.string().trim().max(300).optional(),
  tracking_number: z.string().trim().max(80).optional(),
  carrier: z.string().trim().max(80).optional(),
});

const LABELS: Record<string, string> = {
  awaiting_payment: "Awaiting bank transfer",
  payment_received: "Bank transfer received",
  processing: "Packing your order",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Order cancelled",
};

export const updateOrderStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => updateSchema.parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const patch: {
      status: typeof data.status;
      paid_at?: string;
      shipped_at?: string;
      tracking_number?: string;
      carrier?: string;
      admin_note?: string;
    } = { status: data.status };
    if (data.status === "payment_received") patch['paid_at'] = new Date().toISOString();
    if (data.status === "shipped") patch['shipped_at'] = new Date().toISOString();
    if (data.tracking_number) patch['tracking_number'] = data.tracking_number;
    if (data.carrier) patch['carrier'] = data.carrier;
    if (data.note) patch['admin_note'] = data.note;

    const { data: prior } = await context.supabase
      .from("orders")
      .select("status")
      .eq("reference", data.reference)
      .maybeSingle();
    const previousStatus = (prior?.status ?? null) as OrderStatus | null;

    const { data: order, error } = await context.supabase
      .from("orders")
      .update(patch)
      .eq("reference", data.reference)
      .select("id, status")
      .single();
    if (error || !order) throw new Error(error?.message ?? "Order not found");

    await context.supabase.from("order_events").insert({
      order_id: order.id,
      status: data.status,
      label: LABELS[data.status] ?? data.status,
      note: data.note ?? null,
    });

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("admin_audit_log").insert({
      order_id: order.id,
      order_reference: data.reference,
      action: `status:${data.status}`,
      previous_status: previousStatus,
      new_status: data.status,
      tracking_number: data.tracking_number ?? null,
      carrier: data.carrier ?? null,
      note: data.note ?? null,
      actor_user_id: context.userId,
      actor_email: (context.claims as { email?: string } | null)?.email ?? null,
    });
    return { ok: true as const };
  });

export const listAuditLog = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({ reference: refSchema.optional() }).parse(data ?? {}),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    let q = context.supabase
      .from("admin_audit_log")
      .select(
        "id, order_reference, action, previous_status, new_status, tracking_number, carrier, note, actor_email, actor_user_id, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(200);
    if (data.reference) q = q.eq("order_reference", data.reference);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });
