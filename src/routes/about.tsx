import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AUSVAPE CO — Authentic Vapour, Curated in Melbourne" },
      { name: "description", content: "How AUSVAPE CO began: a Melbourne team sourcing only manufacturer-verified vapour products, shipped discreetly and answered by real people." },
      { property: "og:title", content: "About AUSVAPE CO — Authentic Vapour, Curated in Melbourne" },
      { property: "og:description", content: "Our sourcing standards, our Melbourne warehouse, and why we keep the range deliberately small." },
      { property: "og:url", content: "https://aus-vape.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://aus-vape.lovable.app/about" }],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="px-4 md:px-8 pt-28 pb-6">
        <div className="max-w-3xl mx-auto text-center">
          <Eyebrow>Our Story</Eyebrow>
          <h1 className="mt-6 font-display font-black text-5xl md:text-7xl">
            A quieter kind of <span className="text-gold">vapour.</span>
          </h1>
        </div>
      </section>
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-3xl mx-auto space-y-8 text-lg text-[color:var(--color-platinum)]/85 leading-relaxed">
          <p>AUSVAPE CO started in a small Melbourne office in 2022. We were adult consumers ourselves, tired of buying vapour products from anonymous overseas sellers and never quite trusting what showed up.</p>
          <p className="text-[color:var(--color-smoke)]">So we built the store we wanted to shop from: authentic devices only, a warehouse we actually run, a curated flavour library, and packaging that doesn't announce itself on your doorstep.</p>
          <p>Every product on this site is sourced from a manufacturer-authorised distributor. Every order ships from our Melbourne warehouse. Every question is answered by a person, not a bot.</p>
        </div>
        <div className="max-w-5xl mx-auto mt-20 grid md:grid-cols-3 gap-6">
          {[
            { k: "Authenticity", v: "We only stock manufacturer-verified devices. If we can't verify it, we don't sell it." },
            { k: "Restraint", v: "A tight, curated range. Fewer choices, better choices." },
            { k: "Service", v: "Human replies, same-day dispatch, and a real returns process." },
          ].map(x => (
            <div key={x.k} className="border border-[#A9791F]/20 rounded-lg p-8 bg-[#18181B]">
              <div className="text-[10px] tracking-[0.35em] uppercase text-gold">{x.k}</div>
              <p className="mt-4 text-[color:var(--color-platinum)]/80">{x.v}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}