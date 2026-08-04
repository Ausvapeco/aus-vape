import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";
import { SmartImage } from "@/components/ausvape/SmartImage";
import { byBrand, brandSlug, products } from "@/lib/products";

const URL = "https://aus-vape.lovable.app/blog/iget-authenticity-guide";
const TITLE = "IGET Vape Authenticity Guide: Spotting Fakes | AUSVAPE CO";
const DESC =
  "How to check an IGET vape is authentic: batch code and scratch-panel verification, packaging tells, hardware checks and what to do if yours fails the test.";
const HERO = "/products-opt/iget-bar-pro-blueberry-ice-10000-puffs.webp";

export const Route = createFileRoute("/blog/iget-authenticity-guide")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: "IGET Vape Authenticity & Verification Guide" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: "IGET Vape Authenticity & Verification Guide",
              description: DESC,
              datePublished: "2026-08-04",
              dateModified: "2026-08-04",
              mainEntityOfPage: URL,
              author: { "@type": "Organization", name: "AUSVAPE CO" },
              publisher: { "@type": "Organization", name: "AUSVAPE CO" },
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "How do I check if an IGET vape is authentic?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Scratch the security panel on the box to reveal the verification code, enter it on IGET's official verification page, and confirm it returns a first-time-checked result. Then match the batch code printed on the box against the one on the device itself.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What happens if the IGET code has already been checked?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A code that reports as already verified usually means the code was copied onto counterfeit packaging. Stop using the device and contact your retailer for a replacement or refund.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are cheap IGET vapes always fake?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Not always, but pricing far below the market rate is the single most common signal of counterfeit or grey-market stock. Buy from retailers who state where their stock comes from.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: Guide,
});

const tells = [
  {
    h: "1. The scratch panel and verification code",
    p: "Genuine IGET retail boxes carry a silver security panel. Scratch it, enter the code on IGET's official verification page, and you should get a confirmation that this is the first time the code has been checked. Fakes reuse codes harvested from real boxes, so a 'previously verified' result is the clearest red flag there is.",
  },
  {
    h: "2. Batch code matching",
    p: "The batch/production code printed on the outer box should match the code printed or laser-etched on the device body. Counterfeit runs print packaging and hardware separately, so mismatched, smudged or missing batch codes are common.",
  },
  {
    h: "3. Print quality and colour",
    p: "Authentic packaging uses sharp, dense printing with consistent brand colour. Fakes drift: slightly-off shades, fuzzy small text, pixelated logos, misaligned nutrition-style warning panels and inconsistent font weights across the same box.",
  },
  {
    h: "4. Australian warning labelling",
    p: "Stock intended for the Australian market carries correctly worded, correctly sized health warnings. Missing warnings, warnings in the wrong language, or a sticker slapped over the original panel all point to grey-market or counterfeit product.",
  },
  {
    h: "5. Hardware fit and finish",
    p: "Pick the device up. A genuine unit has an even seam line, a firm mouthpiece with no wobble, a clean airflow inlet and a weight that feels consistent with others of the same model. Rattles, sharp seams, loose mouthpieces and light-feeling shells are counterfeit tells.",
  },
  {
    h: "6. Performance and flavour drift",
    p: "Counterfeits typically under-deliver: weak draw, burnt or chemical notes within the first few hundred puffs, puff counts nowhere near the rating, or an indicator light that behaves differently from the model's documented pattern.",
  },
];

function Guide() {
  const igetProducts = products.filter((p) => p.name.toLowerCase().startsWith("iget")).slice(0, 4);
  const firstBrandSlug = igetProducts[0] ? brandSlug(igetProducts[0]) : "iget-bar-pro";
  const brandCount = byBrand(firstBrandSlug).length;

  return (
    <SiteLayout>
      <article>
        <section className="px-4 md:px-8 pt-20 pb-10 border-b border-[#A9791F]/15">
          <div className="max-w-3xl mx-auto text-center">
            <Eyebrow>Guides</Eyebrow>
            <h1 className="mt-6 font-display font-black text-4xl md:text-5xl leading-tight">
              IGET vape authenticity &amp; <span className="text-gold">verification guide</span>
            </h1>
            <p className="mt-5 text-[color:var(--color-smoke)]">
              Counterfeit IGET devices are the most common complaint we hear from Australian vapers. Here is exactly how we verify
              every IGET unit before it enters our range — and how you can run the same checks in under two minutes.
            </p>
            <p className="mt-4 text-[11px] tracking-[0.3em] uppercase text-gold">4 August 2026 · 6 min read</p>
          </div>
        </section>

        <section className="px-4 md:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-lg overflow-hidden border border-[#A9791F]/15">
              <SmartImage
                src={HERO}
                alt="Genuine IGET Bar Pro disposable vape in retail packaging, used to demonstrate authenticity checks"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-12 space-y-10">
              <div>
                <h2 className="font-display font-bold text-2xl">Verify first, vape second</h2>
                <p className="mt-3 text-[color:var(--color-smoke)] leading-relaxed">
                  Every IGET retail box ships with a one-time verification code hidden under a scratch panel. That code is the single
                  most reliable authenticity signal — everything else in this guide is a supporting check. Run the code check before
                  you use the device, because a used device is much harder to return.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl">Six tells we check on every unit</h2>
                <div className="mt-6 space-y-6">
                  {tells.map((t) => (
                    <div key={t.h} className="border-l-2 border-[#A9791F]/40 pl-5">
                      <h3 className="font-display font-bold text-lg text-gold">{t.h}</h3>
                      <p className="mt-2 text-sm text-[color:var(--color-smoke)] leading-relaxed">{t.p}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl">If your device fails a check</h2>
                <p className="mt-3 text-[color:var(--color-smoke)] leading-relaxed">
                  Stop using it. Counterfeit hardware has no verified battery protection and no verified e-liquid formulation, which
                  is the real risk — not the wasted money. Keep the box, photograph the batch code and the verification result, and
                  contact the retailer you bought from. A legitimate seller will replace or refund it without argument.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl">Why AUSVAPE stock passes</h2>
                <p className="mt-3 text-[color:var(--color-smoke)] leading-relaxed">
                  Our authentic-stock promise is a process, not a slogan. We buy through authorised supply only, we spot-check
                  verification codes on every inbound batch, and we reject any carton with mismatched batch codes or altered warning
                  panels. That is why our IGET range carries the pricing it does — genuine stock has a floor price, and anything far
                  below it should make you suspicious.
                </p>
                <p className="mt-3 text-[color:var(--color-smoke)] leading-relaxed">
                  You can browse our verified{" "}
                  <Link to="/category/$slug" params={{ slug: firstBrandSlug }} className="text-gold underline underline-offset-4">
                    IGET range ({brandCount} flavours in this line)
                  </Link>
                  , read more in the{" "}
                  <Link to="/blog" className="text-gold underline underline-offset-4">
                    AUSVAPE journal
                  </Link>
                  , or{" "}
                  <Link to="/contact" className="text-gold underline underline-offset-4">
                    contact us
                  </Link>{" "}
                  if you want a batch code checked before you order.
                </p>
              </div>
            </div>

            {igetProducts.length > 0 && (
              <div className="mt-16 pt-10 border-t border-[#A9791F]/15">
                <h2 className="font-display font-bold text-2xl">Verified IGET devices in stock</h2>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {igetProducts.map((p) => (
                    <Link
                      key={p.slug}
                      to="/product/$slug"
                      params={{ slug: p.slug }}
                      className="group bg-[#18181B] border border-[#A9791F]/15 rounded-lg overflow-hidden hover:border-[#A9791F]/50 transition-colors"
                    >
                      <div className="aspect-square overflow-hidden">
                        <SmartImage src={p.image} alt={`${p.name} authentic IGET disposable vape`} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium group-hover:text-gold transition-colors">{p.name}</p>
                        <p className="mt-1 text-xs text-gold">${(p.salePrice ?? p.price).toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </article>
    </SiteLayout>
  );
}