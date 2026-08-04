import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
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

const orderSchema = z.object({
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().min(6, "Enter a contact number").max(30),
  "full-name": z.string().trim().min(2, "Enter your full name").max(100),
  address: z.string().trim().min(4, "Enter your street address").max(200),
  suburb: z.string().trim().min(2, "Enter your suburb").max(100),
  postcode: z.string().trim().regex(/^\d{4}$/, "Enter a 4-digit postcode"),
  state: z.string().trim().min(2, "Enter your state").max(50),
  country: z.string().trim().min(2, "Enter your country").max(60),
  "card-number": z.string().trim().regex(/^[\d ]{13,23}$/, "Enter a valid card number"),
  expiry: z.string().trim().regex(/^\d{2}\s?\/\s?\d{2,4}$/, "Use MM/YY"),
  cvc: z.string().trim().regex(/^\d{3,4}$/, "Enter the 3–4 digit CVC"),
});

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState<string | null>(null);
  const shipping = subtotal > 80 ? 0 : 9.95;
  const total = subtotal + shipping;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw: Record<string, string> = {};
    for (const k of Object.keys(orderSchema.shape)) raw[k] = String(fd.get(`checkout-${k}`) ?? "");
    const parsed = orderSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    if (items.length === 0) {
      setErrors({ form: "Your bag is empty — add a product before checking out." });
      return;
    }
    setErrors({});
    const ref = `AV-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const lines = items.map(i => `${i.qty} x ${i.product.name} — $${((i.product.salePrice ?? i.product.price) * i.qty).toFixed(2)}`).join("\n");
    const body = `Order reference: ${ref}\n\n${lines}\n\nSubtotal: $${subtotal.toFixed(2)}\nShipping: ${shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}\nTotal: $${total.toFixed(2)}\n\nName: ${parsed.data["full-name"]}\nEmail: ${parsed.data.email}\nPhone: ${parsed.data.phone}\nAddress: ${parsed.data.address}, ${parsed.data.suburb} ${parsed.data.state} ${parsed.data.postcode}, ${parsed.data.country}\n\n(Do not include card details in this email — our team will confirm secure payment.)`;
    window.location.href = `mailto:support@ausvape.co?subject=${encodeURIComponent(`Order ${ref}`)}&body=${encodeURIComponent(body)}`;
    setReference(ref);
    clear();
    form.reset();
  }

  if (reference) {
    return (
      <SiteLayout>
        <section className="px-4 md:px-8 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle2 className="w-10 h-10 text-gold mx-auto" aria-hidden="true" />
            <h1 className="mt-6 font-display font-black text-4xl md:text-5xl">Order <span className="text-gold">received.</span></h1>
            <p className="mt-4 text-[color:var(--color-smoke)]">
              Your reference is <span className="font-spec text-gold">{reference}</span>. Your order summary has been prepared in your email app addressed to{" "}
              <a href="mailto:support@ausvape.co" className="text-gold">support@ausvape.co</a> — send it and our team will confirm secure payment and dispatch. Adult signature required on delivery.
            </p>
            <Link to="/shop" className="inline-block mt-8 bg-gold text-[#0A0A0C] font-semibold px-8 py-3 rounded">Continue shopping</Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <Eyebrow>Checkout</Eyebrow>
          <h1 className="mt-6 font-display font-black text-4xl md:text-5xl">Almost <span className="text-gold">yours.</span></h1>
          <div className="mt-10 grid lg:grid-cols-[1fr_420px] gap-10">
            <form className="space-y-8" onSubmit={handleSubmit} noValidate>
              <Section title="Contact">
                <Field label="Email" type="email" error={errors['email']} />
                <Field label="Phone" error={errors['phone']} />
              </Section>
              <Section title="Shipping Address">
                <Field label="Full name" className="sm:col-span-2" error={errors['full-name']} />
                <Field label="Address" className="sm:col-span-2" error={errors['address']} />
                <Field label="Suburb" error={errors['suburb']} />
                <Field label="Postcode" error={errors['postcode']} />
                <Field label="State" error={errors['state']} />
                <Field label="Country" error={errors['country']} />
              </Section>
              <Section title="Payment">
                <Field label="Card number" className="sm:col-span-2" error={errors['card-number']} />
                <Field label="Expiry" error={errors['expiry']} />
                <Field label="CVC" error={errors['cvc']} />
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
              {errors['form'] && <p className="text-xs text-red-400">{errors['form']}</p>}
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
                      <SmartImage src={i.product.image} alt={i.product.name} sizes="80px" className="w-full h-full object-cover" />
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
function Field({ label, type = "text", className = "", error }: { label: string; type?: string; className?: string; error?: string }) {
  const id = `checkout-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs text-[color:var(--color-smoke)]">{label}</label>
      <input id={id} name={id} type={type} aria-invalid={!!error} className="mt-1.5 w-full bg-[#0A0A0C] border border-[#A9791F]/25 rounded p-3 focus:border-[#F0CD6E] outline-none" />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><span className="text-[color:var(--color-smoke)]">{k}</span><span>{v}</span></div>;
}