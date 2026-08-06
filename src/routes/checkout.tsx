import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Lock, ShieldCheck, CheckCircle2, Copy, Check, Loader2, Landmark, AlertTriangle } from "lucide-react";
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
});

const BANK = { name: "Teuku Windra Utama", bsb: "032230", account: "026026" };

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-3 border border-[#A9791F]/20 rounded p-3 bg-[#0A0A0C]">
      <div className="min-w-0">
        <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-smoke)]">{label}</div>
        <div className="font-spec text-gold truncate">{value}</div>
      </div>
      <button
        type="button"
        aria-label={`Copy ${label}`}
        onClick={async () => {
          try { await navigator.clipboard.writeText(value); } catch {}
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
        className="shrink-0 inline-flex items-center gap-1.5 text-xs border border-[#A9791F]/30 rounded px-3 py-2 hover:border-[#F0CD6E]"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-gold" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState<string | null>(null);
  const [pay, setPay] = useState<null | { ref: string; total: number; name: string; email: string }>(null);
  const [checking, setChecking] = useState(false);
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
    setPay({ ref, total, name: parsed.data["full-name"], email: parsed.data.email });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function confirmPaid() {
    if (!pay) return;
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setReference(pay.ref);
      clear();
    }, 2600);
  }

  if (reference) {
    return (
      <SiteLayout>
        <section className="px-4 md:px-8 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle2 className="w-10 h-10 text-gold mx-auto" aria-hidden="true" />
            <h1 className="mt-6 font-display font-black text-4xl md:text-5xl">Payment <span className="text-gold">received.</span></h1>
            <p className="mt-4 text-[color:var(--color-smoke)]">
              Congratulations — your order <span className="font-spec text-gold">{reference}</span> has been received and your bank transfer is being matched.
              You&apos;ll get a confirmation email shortly. Orders ship within 24 hours once payment clears, with adult signature required on delivery.
            </p>
            <Link to="/shop" className="inline-block mt-8 bg-gold text-[#0A0A0C] font-semibold px-8 py-3 rounded">Continue shopping</Link>
          </div>
        </section>
      </SiteLayout>
    );
  }

  if (pay) {
    return (
      <SiteLayout>
        <section className="px-4 md:px-8 py-16">
          <div className="max-w-2xl mx-auto">
            <Eyebrow>Bank Transfer</Eyebrow>
            <h1 className="mt-6 font-display font-black text-4xl">Pay by <span className="text-gold">bank transfer.</span></h1>
            <p className="mt-4 text-sm text-[color:var(--color-smoke)]">
              Card payments are temporarily unavailable. Please pay by bank transfer — it only takes a minute.
            </p>

            <div className="mt-8 border border-[#A9791F]/20 rounded-lg p-6 bg-[#18181B]">
              <div className="flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-gold">
                <Landmark className="w-3.5 h-3.5" /> Bank Account Details
              </div>
              <div className="mt-4 space-y-3">
                <CopyField label="Name" value={BANK.name} />
                <CopyField label="BSB" value={BANK.bsb} />
                <CopyField label="Account Number" value={BANK.account} />
                <CopyField label="Amount" value={`$${pay.total.toFixed(2)}`} />
                <CopyField label="Reference (your order number)" value={pay.ref} />
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[10px] tracking-[0.35em] uppercase text-gold">How to pay</div>
              <ol className="mt-4 space-y-2 text-sm text-[color:var(--color-smoke)] list-decimal pl-5">
                <li>Open your banking app</li>
                <li>Tap Pay or Pay Anyone</li>
                <li>Choose the BSB &amp; Account Number option</li>
                <li>Enter BSB {BANK.bsb} and Account Number {BANK.account}</li>
                <li>Enter your order total (${pay.total.toFixed(2)}) as the amount</li>
                <li>Add your order number ({pay.ref}) as the reference</li>
                <li>Confirm — and you are done</li>
              </ol>
            </div>

            <div className="mt-6 flex gap-3 border border-red-500/30 bg-red-500/5 rounded p-4 text-xs text-[color:var(--color-smoke)]">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" aria-hidden="true" />
              <p><strong className="text-red-400">Important:</strong> Do NOT mention the words VAPES or IGET in your payment, or your order will be refunded.</p>
            </div>

            <p className="mt-4 text-xs text-[color:var(--color-smoke)]">
              <strong className="text-gold">Fast dispatch:</strong> Orders ship within 24 hours once payment is received.
            </p>

            <button
              onClick={confirmPaid}
              disabled={checking}
              className="mt-8 w-full bg-gold text-[#0A0A0C] font-semibold py-4 rounded hover:shadow-[0_0_28px_rgba(240,205,110,0.4)] transition-shadow disabled:opacity-70 inline-flex items-center justify-center gap-2"
            >
              {checking ? (<><Loader2 className="w-4 h-4 animate-spin" /> Detecting your payment…</>) : "I&apos;ve made the transfer"}
            </button>
            <button onClick={() => setPay(null)} className="mt-3 w-full text-xs text-[color:var(--color-smoke)] hover:text-gold">
              ← Back to details
            </button>
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
                <div className="sm:col-span-2 border border-[#A9791F]/25 rounded p-4 bg-[#0A0A0C]">
                  <div className="flex items-center gap-2 font-semibold text-sm"><Landmark className="w-4 h-4 text-gold" /> Bank Transfer</div>
                  <p className="mt-2 text-xs text-[color:var(--color-smoke)]">
                    Card payments are temporarily unavailable. Please pay by bank transfer — it only takes a minute.
                    Our account details appear on the next step once you continue.
                  </p>
                </div>
                <div className="sm:col-span-2 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-smoke)]">
                  <Lock className="w-3.5 h-3.5 text-gold" /> Secure 256-bit encrypted checkout
                </div>
              </Section>
              <label className="flex items-start gap-3 text-xs text-[color:var(--color-smoke)]">
                <input type="checkbox" required className="mt-0.5 accent-[#F0CD6E]" />
                <span>I confirm I am 18 years or older and have read the Age-Restricted Sales Policy.</span>
              </label>
              {errors['form'] && <p className="text-xs text-red-400">{errors['form']}</p>}
              <button className="w-full bg-gold text-[#0A0A0C] font-semibold py-4 rounded hover:shadow-[0_0_28px_rgba(240,205,110,0.4)] transition-shadow">
                Continue to Bank Transfer — ${total.toFixed(2)}
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