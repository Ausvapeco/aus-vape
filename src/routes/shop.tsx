import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";
import { ProductCard } from "@/components/ausvape/ProductCard";
import { products } from "@/lib/products";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Vapes — Disposables, Devices & Pods | AUSVAPE CO" },
      { name: "description", content: "Browse the full AUSVAPE CO range of authentic disposables, refillable devices and replacement pods. Filter by category and price, shipped from Melbourne." },
      { property: "og:title", content: "Shop All Vapes — Disposables, Devices & Pods | AUSVAPE CO" },
      { property: "og:description", content: "The complete AUSVAPE CO catalogue: disposables, devices and pods, dispatched same day from Melbourne." },
      { property: "og:url", content: "https://aus-vape.lovable.app/shop" },
    ],
    links: [{ rel: "canonical", href: "https://aus-vape.lovable.app/shop" }],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  const filtered = useMemo(() => {
    let list = products.filter(p => (cat === "all" || p.category === cat) && (p.salePrice ?? p.price) <= maxPrice);
    if (sort === "price-asc") list = [...list].sort((a,b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    if (sort === "price-desc") list = [...list].sort((a,b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    return list;
  }, [cat, sort, maxPrice]);

  return (
    <SiteLayout>
      <section className="pt-16 pb-8 px-4 md:px-8 border-b border-[#A9791F]/15">
        <div className="max-w-7xl mx-auto text-center">
          <Eyebrow>The Collection</Eyebrow>
          <h1 className="mt-6 font-display font-black text-5xl md:text-6xl">Shop <span className="text-gold">everything.</span></h1>
        </div>
      </section>
      <section className="px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto flex gap-10">
          <aside className="hidden lg:block w-60 shrink-0 sticky top-24 self-start">
            <Filters cat={cat} setCat={setCat} maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
          </aside>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-3">
              <div className="text-sm text-[color:var(--color-smoke)]">{filtered.length} products</div>
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger aria-label="Open product filters" className="lg:hidden inline-flex items-center gap-2 border border-[#A9791F]/25 px-3 py-2 rounded text-sm">
                    <SlidersHorizontal className="w-4 h-4" /> Filter
                  </SheetTrigger>
                  <SheetContent side="left" className="bg-[#0A0A0C] text-[color:var(--color-platinum)] border-[#A9791F]/25">
                    <SheetHeader><SheetTitle className="font-display">Filters</SheetTitle></SheetHeader>
                    <div className="mt-6"><Filters cat={cat} setCat={setCat} maxPrice={maxPrice} setMaxPrice={setMaxPrice} /></div>
                  </SheetContent>
                </Sheet>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="bg-[#18181B] border border-[#A9791F]/25 rounded px-3 py-2 text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(p => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Filters({ cat, setCat, maxPrice, setMaxPrice }: { cat: string; setCat: (v: string) => void; maxPrice: number; setMaxPrice: (v: number) => void }) {
  const cats = [
    { v: "all", l: "All" },
    { v: "disposables", l: "Disposables" },
    { v: "accessories", l: "Accessories" },
  ];
  return (
    <div className="space-y-8">
      <div>
        <div className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3">Category</div>
        <ul className="space-y-2">
          {cats.map(c => (
            <li key={c.v}>
              <button
                onClick={() => setCat(c.v)}
                className={`text-left w-full py-1 text-sm transition-colors ${cat === c.v ? "text-gold" : "text-[color:var(--color-platinum)]/75 hover:text-[color:var(--color-platinum)]"}`}
              >
                {c.l}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3">Max Price</div>
        <input type="range" min={20} max={2000} step={10} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-[#F0CD6E]" />
        <div className="font-spec text-sm text-[color:var(--color-smoke)] mt-2">Up to ${maxPrice}</div>
      </div>
      <div>
        <div className="text-[10px] tracking-[0.35em] uppercase text-gold mb-3">Flavour</div>
        <ul className="space-y-2 text-sm text-[color:var(--color-platinum)]/75">
          <li>Passion Fruit Mango Lime</li>
          <li>Flat White</li>
          <li>Strawberry Watermelon</li>
        </ul>
      </div>
    </div>
  );
}

// suppress unused
void Link;