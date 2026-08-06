import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Circle, Loader2, Truck, PackageCheck, Landmark, XCircle } from "lucide-react";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";
import { getOrderByReference, STATUS_STEPS, type OrderStatus } from "@/lib/orders.functions";

export const Route = createFileRoute("/order/$reference")({
  head: () => ({
    meta: [
      { title: "Track your order — AUSVAPE CO" },
      { name: "description", content: "Follow your AUSVAPE CO order in real time: bank transfer received, packing, dispatch and delivery updates." },
      { property: "og:title", content: "Track your order — AUSVAPE CO" },
      { property: "og:description", content: "Live order status for your AUSVAPE CO bank transfer order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderTracking,
  errorComponent: ({ error }) => (
    <SiteLayout><div className="px-4 py-24 text-center" role="alert">{error.message}</div></SiteLayout>
  ),
  notFoundComponent: () => (
    <SiteLayout><div className="px-4 py-24 text-center">Order not found.</div></SiteLayout>
  ),
});

const STEP_LABEL: Record<string, string> = {
  awaiting_payment: "Awaiting bank transfer",
  payment_received: "Bank transfer received",
  processing: "Packing your order",
  shipped: "Shipped",
  delivered: "Delivered",
};
const STEP_COPY: Record<string, string> = {
  awaiting_payment: "We're watching for a transfer matching your order reference.",
  payment_received: "Your payment was matched to this order reference.",
  processing: "Your parcel is being packed in our Australian warehouse.",
  shipped: "On its way — adult signature required on delivery.",
  delivered: "Delivered. Enjoy.",
};
const STEP_ICON = [Landmark, CheckCircle2, PackageCheck, Truck, CheckCircle2];

function OrderTracking() {
  const { reference } = Route.useParams();
  const fetchOrder = useServerFn(getOrderByReference);
  const { data, isPending, isError } = useQuery({
    queryKey: ["order", reference],
    queryFn: () => fetchOrder({ data: { reference } }),
    refetchInterval: 20_000,
    refetchOnWindowFocus: true,
  });

  return (
    <SiteLayout>
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <Eyebrow>Order status</Eyebrow>
          <h1 className="mt-6 font-display font-black text-4xl">Order <span className="text-gold">{reference}</span></h1>

          {isPending && (
            <p className="mt-8 inline-flex items-center gap-2 text-sm text-[color:var(--color-smoke)]">
              <Loader2 className="w-4 h-4 animate-spin" /> Checking your order…
            </p>
          )}

          {(isError || (!isPending && !data)) && (
            <p className="mt-8 text-sm text-[color:var(--color-smoke)]">
              We couldn&apos;t find that order reference. Check the reference from your confirmation screen or{" "}
              <Link to="/contact" className="text-gold">contact support</Link>.
            </p>
          )}

          {data && (
            <>
              <p className="mt-4 text-sm text-[color:var(--color-smoke)]">
                {data.status === "cancelled"
                  ? "This order was cancelled."
                  : data.status === "awaiting_payment"
                    ? "This page updates automatically the moment your bank transfer is matched to this reference."
                    : "Thanks — your payment was matched. This page updates as your order progresses."}
              </p>

              <div className="mt-8 border border-[#A9791F]/20 rounded-lg bg-[#18181B] p-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[color:var(--color-smoke)]">Total</span>
                  <span className="font-spec text-gold">${data.total.toFixed(2)}</span>
                </div>
                {data.tracking_number && (
                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-[color:var(--color-smoke)]">{data.carrier ?? "Tracking"}</span>
                    <span className="font-spec text-gold">{data.tracking_number}</span>
                  </div>
                )}
              </div>

              {data.status === "cancelled" ? (
                <div className="mt-8 flex items-start gap-3 border border-red-500/30 bg-red-500/5 rounded p-4 text-sm">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5" aria-hidden="true" />
                  <p className="text-[color:var(--color-smoke)]">This order was cancelled. If that&apos;s unexpected, contact support with your reference.</p>
                </div>
              ) : (
                <ol className="mt-10 relative">
                  {STATUS_STEPS.map((step, i) => {
                    const currentIndex = STATUS_STEPS.indexOf(data.status as (typeof STATUS_STEPS)[number]);
                    const done = currentIndex >= i;
                    const active = currentIndex === i;
                    const Icon = done ? (STEP_ICON[i] ?? CheckCircle2) : Circle;
                    const event = [...data.events].reverse().find((e) => e.status === step);
                    return (
                      <li key={step} className="relative pl-12 pb-8 last:pb-0">
                        {i < STATUS_STEPS.length - 1 && (
                          <span className={`absolute left-[15px] top-8 bottom-0 w-px ${done ? "bg-[#A9791F]" : "bg-[#A9791F]/20"}`} aria-hidden="true" />
                        )}
                        <span className={`absolute left-0 top-0 w-8 h-8 rounded-full border flex items-center justify-center ${done ? "border-[#F0CD6E] bg-[#F0CD6E]/10" : "border-[#A9791F]/25"}`}>
                          <Icon className={`w-4 h-4 ${done ? "text-gold" : "text-[color:var(--color-smoke)]"}`} aria-hidden="true" />
                        </span>
                        <div className={done ? "" : "opacity-55"}>
                          <div className="font-semibold flex items-center gap-2">
                            {STEP_LABEL[step]}
                            {active && data.status === "awaiting_payment" && (
                              <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.25em] uppercase text-gold">
                                <Loader2 className="w-3 h-3 animate-spin" /> Checking
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-xs text-[color:var(--color-smoke)]">{STEP_COPY[step]}</p>
                          {event && (
                            <p className="mt-1 text-[11px] text-[color:var(--color-smoke)]">
                              {new Date(event.created_at).toLocaleString("en-AU")}{event.note ? ` — ${event.note}` : ""}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}

              <p className="mt-6 text-xs text-[color:var(--color-smoke)]">
                Payment not showing yet? Bank transfers can take a few minutes to a few hours to arrive. We match them to your reference {reference}.
              </p>
            </>
          )}

          <Link to="/shop" className="inline-block mt-10 border border-[#A9791F]/30 px-6 py-3 rounded text-sm hover:border-[#F0CD6E]">Continue shopping</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
export type { OrderStatus };
