import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";
const brandStory = { url: "/products-opt/calibarn-lemon-mint-6000-puffs.webp" };
const hero = { url: "/products-opt/panda-watermelon-ice-2500-puffs.webp" };
const p2 = { url: "/products-opt/iget-bar-pro-blueberry-ice-10000-puffs.webp" };

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Journal — AUSVAPE CO" }, { name: "description", content: "Notes on craft, care, and considered vapour from AUSVAPE CO." }] }),
  component: Blog,
});

const posts = [
  { title: "The case for the refillable device", excerpt: "Why we quietly prefer a good mod over a fifth disposable this month.", img: brandStory.url, date: "12 July 2026", tag: "Craft" },
  { title: "How to spot a counterfeit pod", excerpt: "Six tells we look for before a product enters our range.", img: p2.url, date: "28 June 2026", tag: "Guides" },
  { title: "A quieter Melbourne warehouse tour", excerpt: "Inside the small operation behind every AUSVAPE order.", img: hero.url, date: "14 June 2026", tag: "Studio" },
];

function Blog() {
  return (
    <SiteLayout>
      <section className="px-4 md:px-8 pt-20 pb-8 border-b border-[#A9791F]/15">
        <div className="max-w-6xl mx-auto text-center">
          <Eyebrow>Journal</Eyebrow>
          <h1 className="mt-6 font-display font-black text-5xl md:text-6xl">Notes on the <span className="text-gold">craft.</span></h1>
        </div>
      </section>
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {posts.map(p => (
            <article key={p.title} className="group bg-[#18181B] border border-[#A9791F]/15 rounded-lg overflow-hidden hover:border-[#A9791F]/50 transition-colors">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-gold">
                  <span>{p.tag}</span><span className="text-[color:var(--color-smoke)]">·</span><span className="text-[color:var(--color-smoke)]">{p.date}</span>
                </div>
                <h2 className="mt-3 font-display font-bold text-xl group-hover:text-gold transition-colors">{p.title}</h2>
                <p className="mt-2 text-sm text-[color:var(--color-smoke)]">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}