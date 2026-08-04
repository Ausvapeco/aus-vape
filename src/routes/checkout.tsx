import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";
import { useCart } from "@/lib/cart";
import { SmartImage } from "@/components/ausvape/SmartImage";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — AUSVAPE CO" },
      { name: "description", content: "Complete your AUSVAPE CO order with encrypted checkout, Australia-wide express delivery and adult signature on arrival. Strictly 18+." },
      { property: "og:title", content: "Secure Checkout — AUSVAPE CO" },
      { property: "og:description", content: "Encrypted checkout with Australia-wide express delivery and adult signature on arrival." },
      { property: "og:url", content: "https://aus-vape.lovable.app/checkout" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://aus-vape.lovable.app/checkout" }],
  }),
  component: Checkout,
});

function Checkout() {
  const { items, subtotal } = useCart();
  const shipping = subtotal > 80 ? 0 : 9.95;
  const total = subtotal + shipping;
  return (
    <SiteLayout>
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>Checkout</Eyebrow>
          <h1 className="mt-6 font-display font-black text-4xl md:text-5xl">Almost <span className="text-gold">yours.</span></h1>
          <div className="mt-10 grid lg:grid-cols-[1fr_420px] gap-10">
            <form className="space-y-8" onSubmit={e => e.preventDefault()}>
              <Section title="Contact">
                <Field label="Email" type="email" />
                <Field label="Phone" />
              </Section>
              <Section title="Shipping Address">
                <Field label="Full name" className="sm:col-span-2" />
                <Field label="Address" className="sm:col-span-2" />
                <Field label="Suburb" />
                <Field label="Postcode" />
                <Field label="State" />
                <Field label="Country" />
              </Section>
              <Section title="Payment">
                <Field label="Card number" className="sm:col-span-2" />
                <Field label="Expiry" />
                <Field label="CVC" />
                <div className="sm:col-span-2 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-smoke)]">
                  <Lock className="w-3.5 h-3.5 text-gold" /> Secure 256-bit encrypted checkout
                  <span className="ml-auto flex gap-1.5">
                    {["VISA", "MC", "AMEX", "APAY"].map(x => (
                      <span key={x} className="border border-[#A9791F]/30 px-2 py-1 text-[9px] tracking-widest rounded">{x}</span>
                    ))}
                  </span>
                </div>
              </Section>
              <label className="flex items-start gap-3 text-xs text-[color:var(--color-smoke)]">
                <input type="checkbox" required className="mt-0.5 accent-[#F0CD6E]" />
                <span>I confirm I am 18 years or older and have read the Age-Restricted Sales Policy.</span>
              </label>
              <button className="w-full bg-gold text-[#0A0A0C] font-semibold py-4 rounded hover:shadow-[0_0_28px_rgba(240,205,110,0.4)] transition-shadow">
                Place Order — ${total.toFixed(2)}
              </button>
            </form>
            <aside className="border border-[#A9791F]/20 rounded-lg p-6 bg-[#18181B] h-fit sticky top-24">
              <div className="text-[10px] tracking-[0.35em] uppercase text-gold">Order</div>
              <ul className="mt-4 space-y-3 max-h-72 overflow-auto pr-1">
                {items.map(i => (
                  <li key={i.product.slug} className="flex gap-3 text-sm">
                    <div className="w-12 h-12 bg-[#0A0A0C] rounded overflow-hidden shrink-0">
                      <SmartImage src={i.product.image} alt="" sizes="80px" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{i.product.name}</div>
                      <div className="text-xs text-[color:var(--color-smoke)]">Qty {i.qty}</div>
                    </div>
                    <div className="font-spec text-gold text-sm">${((i.product.salePrice ?? i.product.price) * i.qty).toFixed(2)}</div>
                  </li>
                ))}
                {items.length === 0 && <li className="text-sm text-[color:var(--color-smoke)]">Your bag is empty. <Link to="/shop" className="text-gold">Browse →</Link></li>}
              </ul>
              <div className="mt-6 pt-4 border-t border-[#A9791F]/20 space-y-2 text-sm">
                <Row k="Subtotal" v={`$${subtotal.toFixed(2)}`} />
                <Row k="Shipping" v={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
                <div className="pt-2 border-t border-[#A9791F]/15 flex justify-between">
                  <span>Total</span>
                  <span className="font-spec text-gold">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-[color:var(--color-smoke)]">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" /> 18+ Verified · Signature on delivery
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.35em] uppercase text-gold mb-4">{title}</div>
      <div className="grid sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
function Field({ label, type = "text", className = "" }: { label: string; type?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs text-[color:var(--color-smoke)]">{label}</label>
      <input type={type} className="mt-1.5 w-full bg-[#0A0A0C] border border-[#A9791F]/25 rounded p-3 focus:border-[#F0CD6E] outline-none" />
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><span className="text-[color:var(--color-smoke)]">{k}</span><span>{v}</span></div>;
}