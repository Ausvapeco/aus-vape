import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, ShieldCheck, RefreshCw } from "lucide-react";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";
import { supabase } from "@/integrations/supabase/client";
import { listOrders, updateOrderStatus, isAdmin, claimAdmin, listAuditLog } from "@/lib/orders.functions";

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
    return <SiteLayout><div className="px-4 py-24 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-gold" /></div></SiteLayout>;
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
    <SiteLayout>
      <section className="px-4 py-20">
        <div className="max-w-sm mx-auto">
          <Eyebrow>Staff</Eyebrow>
          <h1 className="mt-6 font-display font-black text-3xl">Order <span className="text-gold">admin.</span></h1>
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
            {mode === "in" ? "First time? Create the owner account →" : "← Back to sign in"}
          </button>
        </div>
      </section>
    </SiteLayout>
  );
}

function Dashboard() {
  const qc = useQueryClient();
  const check = useServerFn(isAdmin);
  const claim = useServerFn(claimAdmin);
  const fetchOrders = useServerFn(listOrders);
  const update = useServerFn(updateOrderStatus);
  const fetchAudit = useServerFn(listAuditLog);
  const [claiming, setClaiming] = useState(false);

  const admin = useQuery({ queryKey: ["is-admin"], queryFn: () => check({ data: undefined as never }) });
  const orders = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => fetchOrders({ data: undefined as never }),
    enabled: admin.data?.admin === true,
    refetchInterval: 30_000,
  });
  const audit = useQuery({
    queryKey: ["admin-audit"],
    queryFn: () => fetchAudit({ data: {} }),
    enabled: admin.data?.admin === true,
    refetchInterval: 60_000,
  });

  if (admin.isPending) {
    return <SiteLayout><div className="px-4 py-24 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-gold" /></div></SiteLayout>;
  }

  if (!admin.data?.admin) {
    return (
      <SiteLayout>
        <section className="px-4 py-20 max-w-md mx-auto text-center">
          <ShieldCheck className="w-8 h-8 text-gold mx-auto" aria-hidden="true" />
          <h1 className="mt-6 font-display font-black text-3xl">Not an <span className="text-gold">admin.</span></h1>
          <p className="mt-4 text-sm text-[color:var(--color-smoke)]">If you&apos;re the store owner setting this up for the first time, claim admin access below. This only works while no admin exists.</p>
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
            {claiming ? "Claiming…" : "Claim admin access"}
          </button>
          <button onClick={() => supabase.auth.signOut()} className="block mx-auto mt-4 text-xs text-[color:var(--color-smoke)] hover:text-gold">Sign out</button>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="px-4 md:px-8 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Eyebrow>Staff</Eyebrow>
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

          <div className="mt-14">
            <Eyebrow>Audit trail</Eyebrow>
            <h2 className="mt-3 font-display font-black text-2xl">Admin <span className="text-gold">activity log.</span></h2>
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
    </SiteLayout>
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
