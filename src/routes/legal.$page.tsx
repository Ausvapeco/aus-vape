import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";

const pages: Record<string, { title: string; eyebrow: string; body: { h?: string; p: string }[] }> = {
  "age-policy": {
    title: "Age-Restricted Sales Policy",
    eyebrow: "Legal",
    body: [
      { p: "AUSVAPE CO sells vapour and nicotine-containing products intended strictly for adults aged 18 years or older. It is unlawful in Australia to sell these products to anyone under 18." },
      { h: "Verification", p: "We operate a mandatory age gate on every visit to this site and may request government-issued photo ID at checkout or on delivery. Our couriers are instructed to obtain a signature from a person of legal age at the delivery address." },
      { h: "Refusal of sale", p: "We reserve the right to refuse or cancel any order where we cannot verify the customer's age or where there is reasonable suspicion the product is intended for a minor." },
      { h: "Reporting", p: "If you believe an order has been placed on behalf of a minor, contact support@ausvape.co immediately. All reports are treated confidentially." },
    ],
  },
  "privacy": {
    title: "Privacy Policy",
    eyebrow: "Legal",
    body: [
      { p: "This policy describes how AUSVAPE CO collects, uses, and safeguards your personal information when you use ausvape.co." },
      { h: "Information we collect", p: "Contact and shipping details you provide at checkout; order history; and technical data such as IP address and browser type collected via cookies for site performance and fraud prevention." },
      { h: "How we use it", p: "To process and ship orders, verify age, communicate about your order, prevent fraud, and — with your consent — send marketing emails you can unsubscribe from at any time." },
      { h: "Sharing", p: "We share data only with the service providers required to fulfil your order (payment processor, shipping carrier). We do not sell your data." },
      { h: "Your rights", p: "You may request access, correction, or deletion of your personal data by emailing privacy@ausvape.co." },
    ],
  },
  "shipping": {
    title: "Shipping & Returns",
    eyebrow: "Legal",
    body: [
      { h: "Dispatch", p: "Orders placed before 3pm AEST on business days are dispatched the same day from our Melbourne warehouse." },
      { h: "Delivery times", p: "Metro Australia typically arrives next business day via Australia Post Express. Regional delivery is 2–4 business days. Free express shipping on orders over $80." },
      { h: "Signature", p: "All orders require a signature on delivery from a person aged 18 or older." },
      { h: "Returns", p: "Sealed, unopened items may be returned within 14 days of delivery for a full refund of the item price. For hygiene reasons, opened disposables and pods cannot be returned unless the product is faulty." },
      { h: "Faulty items", p: "Contact us within 48 hours of delivery with your order number and photos; we'll dispatch a replacement or issue a refund the same business day." },
    ],
  },
  "terms": {
    title: "Terms of Service",
    eyebrow: "Legal",
    body: [
      { p: "By using ausvape.co you agree to these terms. If you do not agree, please do not use this site." },
      { h: "Eligibility", p: "You must be 18 years or older and legally permitted to purchase vapour and nicotine products in your jurisdiction." },
      { h: "Pricing & availability", p: "All prices are in Australian dollars and may change without notice. Stock levels are indicative; we will notify you if a product is unavailable after order." },
      { h: "Liability", p: "AUSVAPE CO's liability is limited to the value of the order. We are not liable for indirect or consequential loss to the extent permitted by law." },
      { h: "Governing law", p: "These terms are governed by the laws of Victoria, Australia." },
    ],
  },
};

export const Route = createFileRoute("/legal/$page")({
  loader: ({ params }) => {
    const page = pages[params.page];
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.page.title ?? "Legal"} — AUSVAPE CO` }],
  }),
  component: LegalPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="py-32 text-center">
        <h1 className="font-display text-4xl">Page not found</h1>
        <Link to="/" className="mt-6 inline-block text-gold">Go home →</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ reset }) => (
    <SiteLayout>
      <div className="py-32 text-center"><h1 className="font-display text-3xl">Something went wrong</h1><button onClick={reset} className="mt-6 text-gold">Retry</button></div>
    </SiteLayout>
  ),
});

function LegalPage() {
  const { page } = Route.useLoaderData();
  return (
    <SiteLayout>
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display font-black text-4xl md:text-5xl">{page.title}</h1>
          <div className="mt-12 space-y-8">
            {page.body.map((b, i) => (
              <div key={i}>
                {b.h && <h2 className="font-display font-bold text-xl text-gold mb-3">{b.h}</h2>}
                <p className="text-[color:var(--color-smoke)] leading-relaxed">{b.p}</p>
              </div>
            ))}
          </div>
          <p className="mt-16 text-xs text-[color:var(--color-smoke)]/70">Last updated: 1 July 2026</p>
        </div>
      </section>
    </SiteLayout>
  );
}