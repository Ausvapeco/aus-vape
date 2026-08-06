import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, ShieldCheck, RefreshCw, Download } from "lucide-react";
import { toCsv, downloadCsv, stamp } from "@/lib/csv";
import { supabase } from "@/integrations/supabase/client";
import {
  listOrders, updateOrderStatus, claimAdmin, listAuditLog,
  getMyAccess, listStaff, grantStaff, revokeStaff,
} from "@/lib/orders.functions";
import { listAbandonedCarts } from "@/lib/carts.functions";

function Console({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#F5F5F4]">
      <header className="border-b border-[#A9791F]/20 bg-[#101012]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-gold" aria-hidden="true" />
          <span className="font-display font-black tracking-wide">AUSVAPE <span className="text-gold">CONSOLE</span></span>
          <span className="ml-auto text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-smoke)]">Internal</span>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Order admin — AUSVAPE CO" },
      { name: "description", content: "Staff area for confirming bank transfers and updating AUSVAPE CO order status." },
      { property: "og:title", content: "Order admin — AUSVAPE CO" },
      { property: "og:description", content: "Staff order management." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

const STATUSES = ["awaiting_payment", "payment_received", "processing", "shipped", "delivered", "cancelled"] as const;
const LABEL: Record<string, string> = {
  awaiting_payment: "Awaiting transfer",
  payment_received: "Payment received",
  processing: "Packing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function Admin() {
  const [session, setSession] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(!!s));
    supabase.auth.getSession().then(({ data }) => setSession(!!data.session));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === null) {
    return <Console><div className="px-4 py-24 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-gold" /></div></Console>;
  }
  return session ? <Dashboard /> : <SignIn />;
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg("");
    const fn = mode === "in"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
    const { data, error } = await fn;
    setBusy(false);
    if (error) { setMsg(error.message); return; }
    if (mode === "up" && !data.session) setMsg("Check your email to confirm the account, then sign in.");
  }

  return (
    <Console>
      <section className="px-4 py-20">
        <div className="max-w-sm mx-auto">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[color:var(--color-smoke)]">Staff access</p>
          <h1 className="mt-4 font-display font-black text-3xl">Sign in to the <span className="text-gold">console.</span></h1>
          <p className="mt-3 text-xs text-[color:var(--color-smoke)]">Staff accounts need to be approved by the owner before the order queue appears.</p>
          <form className="mt-8 space-y-4" onSubmit={submit}>
            <div>
              <label htmlFor="admin-email" className="text-xs text-[color:var(--color-smoke)]">Email</label>
              <input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full bg-[#0A0A0C] border border-[#A9791F]/25 rounded p-3 outline-none focus:border-[#F0CD6E]" />
            </div>
            <div>
              <label htmlFor="admin-password" className="text-xs text-[color:var(--color-smoke)]">Password</label>
              <input id="admin-password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 w-full bg-[#0A0A0C] border border-[#A9791F]/25 rounded p-3 outline-none focus:border-[#F0CD6E]" />
            </div>
            {msg && <p className="text-xs text-red-400">{msg}</p>}
            <button disabled={busy} className="w-full bg-gold text-[#0A0A0C] font-semibold py-3.5 rounded disabled:opacity-60">
              {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create staff account"}
            </button>
          </form>
          <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="mt-4 text-xs text-[color:var(--color-smoke)] hover:text-gold">
            {mode === "in" ? "New staff member? Create an account →" : "← Back to sign in"}
          </button>
        </div>
      </section>
    </Console>
  );
}

function Dashboard() {
  const qc = useQueryClient();
  const check = useServerFn(getMyAccess);
  const claim = useServerFn(claimAdmin);
  const fetchOrders = useServerFn(listOrders);
  const update = useServerFn(updateOrderStatus);
  const fetchAudit = useServerFn(listAuditLog);
  const fetchCarts = useServerFn(listAbandonedCarts);
  const [claiming, setClaiming] = useState(false);

  const admin = useQuery({ queryKey: ["is-admin"], queryFn: () => check({ data: undefined as never }) });
  const isOwner = admin.data?.admin === true;
  const orders = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => fetchOrders({ data: undefined as never }),
    enabled: admin.data?.staff === true,
    refetchInterval: 30_000,
  });
  const audit = useQuery({
    queryKey: ["admin-audit"],
    queryFn: () => fetchAudit({ data: {} }),
    enabled: isOwner,
    refetchInterval: 60_000,
  });
  const carts = useQuery({
    queryKey: ["admin-carts"],
    queryFn: () => fetchCarts({ data: {} }),
    enabled: admin.data?.staff === true,
    refetchInterval: 60_000,
  });

  if (admin.isPending) {
    return <Console><div className="px-4 py-24 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-gold" /></div></Console>;
  }

  if (!admin.data?.staff) {
    return (
      <Console>
        <section className="px-4 py-20 max-w-md mx-auto text-center">
          <ShieldCheck className="w-8 h-8 text-gold mx-auto" aria-hidden="true" />
          <h1 className="mt-6 font-display font-black text-3xl">Awaiting <span className="text-gold">approval.</span></h1>
          <p className="mt-4 text-sm text-[color:var(--color-smoke)]">Your account isn&apos;t authorised yet. Ask the owner to add {admin.data?.email ?? "your email"} as staff in the console. If you&apos;re the store owner setting this up for the first time, claim owner access below — it only works while no owner exists.</p>
          <button
            disabled={claiming}
            onClick={async () => {
              setClaiming(true);
              const r = await claim({ data: undefined as never });
              setClaiming(false);
              if (r.granted) qc.invalidateQueries({ queryKey: ["is-admin"] });
              else alert("An admin already exists. Ask them to grant you access.");
            }}
            className="mt-6 bg-gold text-[#0A0A0C] font-semibold px-6 py-3 rounded disabled:opacity-60"
          >
            {claiming ? "Claiming…" : "Claim owner access"}
          </button>
          <button onClick={() => supabase.auth.signOut()} className="block mx-auto mt-4 text-xs text-[color:var(--color-smoke)] hover:text-gold">Sign out</button>
        </section>
      </Console>
    );
  }

  return (
    <Console>
      <section className="px-4 md:px-8 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-[color:var(--color-smoke)]">{isOwner ? "Owner" : "Staff"} · {admin.data?.email}</p>
              <h1 className="mt-4 font-display font-black text-3xl md:text-4xl">Orders &amp; <span className="text-gold">payments.</span></h1>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => orders.refetch()} aria-label="Refresh orders" className="inline-flex items-center gap-2 text-xs border border-[#A9791F]/30 rounded px-3 py-2 hover:border-[#F0CD6E]">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
              <button onClick={() => supabase.auth.signOut()} className="text-xs text-[color:var(--color-smoke)] hover:text-gold">Sign out</button>
            </div>
          </div>

          <p className="mt-4 text-xs text-[color:var(--color-smoke)]">
            Match a transfer in your banking app to the order reference, then mark it received — the customer&apos;s tracking page updates instantly.
          </p>

          <div className="mt-8 space-y-4">
            {orders.isPending && <p className="text-sm text-[color:var(--color-smoke)]">Loading orders…</p>}
            {orders.data?.length === 0 && <p className="text-sm text-[color:var(--color-smoke)]">No orders yet.</p>}
            {orders.data?.map((o: any) => (
              <OrderRow
                key={o.id}
                order={o}
                onUpdate={async (payload) => {
                  await update({ data: { reference: o.reference, ...payload } });
                  qc.invalidateQueries({ queryKey: ["admin-orders"] });
                  qc.invalidateQueries({ queryKey: ["admin-audit"] });
                }}
              />
            ))}
          </div>

          {isOwner && <StaffManager />}

          <div className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-[color:var(--color-smoke)]">Abandoned carts</p>
                <h2 className="mt-3 font-display font-black text-2xl">Left in the <span className="text-gold">cart.</span></h2>
              </div>
              <ExportButton
                label="Export carts CSV"
                disabled={!carts.data?.length}
                onExport={() =>
                  downloadCsv(
                    `ausvape-abandoned-carts-${stamp()}.csv`,
                    toCsv(
                      ["Session ID", "Items", "Item count", "Cart total (AUD)", "Customer name", "Email", "Products", "Created at", "Last active"],
                      (carts.data ?? []).map((c: any) => [
                        c.session_id,
                        (c.items as any[]).length,
                        c.item_count,
                        Number(c.cart_total).toFixed(2),
                        c.customer_name ?? "",
                        c.email ?? "",
                        (c.items as any[]).map((i) => `${i.qty}x ${i.name}`).join("; "),
                        new Date(c.created_at).toLocaleString("en-AU"),
                        new Date(c.updated_at).toLocaleString("en-AU"),
                      ]),
                    ),
                  )
                }
              />
            </div>
            <p className="mt-2 text-xs text-[color:var(--color-smoke)]">
              Live carts that never reached checkout. They disappear automatically once the shopper empties the cart or places an order.
            </p>
            <div className="mt-5 border border-[#A9791F]/20 rounded-lg bg-[#18181B] divide-y divide-[#A9791F]/10">
              {carts.isPending && <p className="p-4 text-sm text-[color:var(--color-smoke)]">Loading carts…</p>}
              {carts.data?.length === 0 && <p className="p-4 text-sm text-[color:var(--color-smoke)]">No carts left behind right now.</p>}
              {carts.data?.map((c: any) => (
                <div key={c.id} className="p-4 text-xs">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-gold font-spec">
                      {c.item_count} item{c.item_count === 1 ? "" : "s"} · ${Number(c.cart_total).toFixed(2)}
                    </span>
                    <span className="text-[color:var(--color-smoke)]">
                      {c.email ?? "guest"} · last active {new Date(c.updated_at).toLocaleString("en-AU")}
                    </span>
                  </div>
                  <p className="mt-2 text-[color:var(--color-smoke)]">
                    {(c.items as any[]).map((i) => `${i.qty}× ${i.name}`).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] tracking-[0.35em] uppercase text-[color:var(--color-smoke)]">Audit trail</p>
                <h2 className="mt-3 font-display font-black text-2xl">Admin <span className="text-gold">activity log.</span></h2>
              </div>
              <ExportButton
                label="Export activity CSV"
                disabled={!audit.data?.length}
                onExport={() =>
                  downloadCsv(
                    `ausvape-activity-log-${stamp()}.csv`,
                    toCsv(
                      ["Timestamp", "Order reference", "Action", "Previous status", "New status", "Carrier", "Tracking number", "Note", "Actor email", "Actor user ID"],
                      (audit.data ?? []).map((a: any) => [
                        new Date(a.created_at).toLocaleString("en-AU"),
                        a.order_reference,
                        a.action,
                        a.previous_status ? (LABEL[a.previous_status] ?? a.previous_status) : "",
                        LABEL[a.new_status] ?? a.new_status,
                        a.carrier ?? "",
                        a.tracking_number ?? "",
                        a.note ?? "",
                        a.actor_email ?? "",
                        a.actor_user_id ?? "",
                      ]),
                    ),
                  )
                }
              />
            </div>
            <p className="mt-2 text-xs text-[color:var(--color-smoke)]">
              Every payment and shipping status change, with the exact time and the staff account that made it.
            </p>
            <div className="mt-5 border border-[#A9791F]/20 rounded-lg bg-[#18181B] divide-y divide-[#A9791F]/10">
              {audit.isPending && <p className="p-4 text-sm text-[color:var(--color-smoke)]">Loading activity…</p>}
              {audit.data?.length === 0 && <p className="p-4 text-sm text-[color:var(--color-smoke)]">No admin changes recorded yet.</p>}
              {audit.data?.map((a: any) => (
                <div key={a.id} className="p-4 flex flex-wrap items-baseline justify-between gap-2 text-xs">
                  <div>
                    <span className="font-spec text-gold">{a.order_reference}</span>
                    <span className="text-[color:var(--color-smoke)]">
                      {" "}— {a.previous_status ? `${LABEL[a.previous_status] ?? a.previous_status} → ` : ""}
                      {LABEL[a.new_status] ?? a.new_status}
                      {a.carrier || a.tracking_number ? ` · ${[a.carrier, a.tracking_number].filter(Boolean).join(" ")}` : ""}
                      {a.note ? ` · ${a.note}` : ""}
                    </span>
                  </div>
                  <div className="text-[color:var(--color-smoke)]">
                    {a.actor_email ?? a.actor_user_id ?? "unknown"} · {new Date(a.created_at).toLocaleString("en-AU")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Console>
  );
}

function OrderRow({ order, onUpdate }: { order: any; onUpdate: (p: any) => Promise<void> }) {
  const [tracking, setTracking] = useState(order.tracking_number ?? "");
  const [carrier, setCarrier] = useState(order.carrier ?? "");
  const [busy, setBusy] = useState<string | null>(null);

  async function run(status: string) {
    setBusy(status);
    try {
      await onUpdate({ status, ...(tracking ? { tracking_number: tracking } : {}), ...(carrier ? { carrier } : {}) });
    } finally { setBusy(null); }
  }

  return (
    <div className="border border-[#A9791F]/20 rounded-lg bg-[#18181B] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="font-spec text-gold">{order.reference}</div>
          <div className="text-xs text-[color:var(--color-smoke)]">
            {order.customer_name} · {order.email} · {new Date(order.created_at).toLocaleString("en-AU")}
          </div>
        </div>
        <div className="text-right">
          <div className="font-spec text-gold">${Number(order.total).toFixed(2)}</div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-smoke)]">{LABEL[order.status]}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <button
            key={s}
            disabled={busy !== null || order.status === s}
            onClick={() => run(s)}
            className={`text-xs px-3 py-2 rounded border transition-colors disabled:opacity-45 ${
              order.status === s ? "border-[#F0CD6E] text-gold" : "border-[#A9791F]/25 hover:border-[#F0CD6E]"
            }`}
          >
            {busy === s ? "…" : LABEL[s]}
          </button>
        ))}
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor={`carrier-${order.id}`} className="text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-smoke)]">Carrier</label>
          <input id={`carrier-${order.id}`} value={carrier} onChange={(e) => setCarrier(e.target.value)} placeholder="Australia Post" className="mt-1 w-full bg-[#0A0A0C] border border-[#A9791F]/25 rounded p-2.5 text-sm outline-none focus:border-[#F0CD6E]" />
        </div>
        <div>
          <label htmlFor={`tracking-${order.id}`} className="text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-smoke)]">Tracking number</label>
          <input id={`tracking-${order.id}`} value={tracking} onChange={(e) => setTracking(e.target.value)} className="mt-1 w-full bg-[#0A0A0C] border border-[#A9791F]/25 rounded p-2.5 text-sm outline-none focus:border-[#F0CD6E]" />
        </div>
      </div>

      <ul className="mt-4 text-xs text-[color:var(--color-smoke)] space-y-1">
        {(order.items ?? []).map((i: any, idx: number) => (
          <li key={idx}>{i.qty}× {i.name}</li>
        ))}
      </ul>
    </div>
  );
}

function StaffManager() {
  const qc = useQueryClient();
  const fetchStaff = useServerFn(listStaff);
  const grant = useServerFn(grantStaff);
  const revoke = useServerFn(revokeStaff);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const staff = useQuery({ queryKey: ["staff-list"], queryFn: () => fetchStaff({ data: undefined as never }) });

  return (
    <div className="mt-14">
      <p className="text-[10px] tracking-[0.35em] uppercase text-[color:var(--color-smoke)]">Team</p>
      <h2 className="mt-3 font-display font-black text-2xl">Staff <span className="text-gold">access.</span></h2>
      <p className="mt-2 text-xs text-[color:var(--color-smoke)]">
        Staff sign in at the same address and can update order status. Only you hold owner access — staff cannot manage the team or see this log.
      </p>

      <form
        className="mt-5 flex flex-wrap gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true); setMsg("");
          try {
            const r = await grant({ data: { email } });
            setMsg(r.message);
            if (r.ok) { setEmail(""); qc.invalidateQueries({ queryKey: ["staff-list"] }); }
          } catch { setMsg("Could not add that staff member."); }
          setBusy(false);
        }}
      >
        <label htmlFor="staff-email" className="sr-only">Staff email</label>
        <input
          id="staff-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="staff@email.com"
          className="flex-1 min-w-[220px] bg-[#0A0A0C] border border-[#A9791F]/25 rounded p-2.5 text-sm outline-none focus:border-[#F0CD6E]"
        />
        <button disabled={busy} className="bg-gold text-[#0A0A0C] font-semibold px-5 rounded text-sm disabled:opacity-60">
          {busy ? "Adding…" : "Add staff"}
        </button>
      </form>
      {msg && <p className="mt-2 text-xs text-[color:var(--color-smoke)]">{msg}</p>}

      <div className="mt-5 border border-[#A9791F]/20 rounded-lg bg-[#18181B] divide-y divide-[#A9791F]/10">
        {staff.isPending && <p className="p-4 text-sm text-[color:var(--color-smoke)]">Loading team…</p>}
        {staff.data?.map((m: any) => (
          <div key={m.id} className="p-4 flex items-center justify-between gap-3 text-xs">
            <span>
              {m.email}{" "}
              <span className="text-gold uppercase tracking-[0.2em] text-[10px]">{m.role === "admin" ? "Owner" : "Staff"}</span>
            </span>
            {m.role === "staff" && (
              <button
                onClick={async () => {
                  await revoke({ data: { user_id: m.user_id } });
                  qc.invalidateQueries({ queryKey: ["staff-list"] });
                }}
                className="border border-[#A9791F]/25 rounded px-3 py-1.5 hover:border-[#F0CD6E]"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
