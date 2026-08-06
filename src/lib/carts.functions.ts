import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const itemSchema = z.object({
  slug: z.string().max(120),
  name: z.string().max(200),
  qty: z.number().int().min(1).max(99),
  price: z.number().min(0).max(100000),
});

const syncSchema = z.object({
  session_id: z.string().trim().min(8).max(64),
  items: z.array(itemSchema).max(60),
  customer_name: z.string().trim().max(100).optional(),
  email: z.string().trim().email().max(255).optional(),
});

/** Public: called from the storefront when a cart changes. Stores a snapshot so staff can see carts left behind. */
export const syncCart = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => syncSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const itemCount = data.items.reduce((s, i) => s + i.qty, 0);
    const cartTotal = Number(data.items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2));

    if (itemCount === 0) {
      await supabaseAdmin
        .from("abandoned_carts")
        .delete()
        .eq("session_id", data.session_id)
        .eq("converted", false);
      return { ok: true as const };
    }

    const { error } = await supabaseAdmin.from("abandoned_carts").upsert(
      {
        session_id: data.session_id,
        items: data.items,
        item_count: itemCount,
        cart_total: cartTotal,
        customer_name: data.customer_name ?? null,
        email: data.email ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "session_id" },
    );
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const listAbandonedCarts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(() => ({}))
  .handler(async ({ context }) => {
    const { data: roles } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    const isStaff = (roles ?? []).some((r) => r.role === "admin" || r.role === "staff");
    if (!isStaff) throw new Error("Forbidden");

    const { data, error } = await context.supabase
      .from("abandoned_carts")
      .select("id, session_id, items, item_count, cart_total, customer_name, email, converted, order_reference, created_at, updated_at")
      .eq("converted", false)
      .order("updated_at", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return data ?? [];
  });
