import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Truck, Lock, Minus, Plus } from "lucide-react";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/ausvape/ProductCard";
import { Eyebrow } from "@/components/ausvape/Eyebrow";
import { SmartImage } from "@/components/ausvape/SmartImage";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.product.name} — AUSVAPE CO` : "Product — AUSVAPE CO" },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="py-32 text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-gold">Back to shop →</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ reset }) => (
    <SiteLayout>
      <div className="py-32 text-center"><h1 className="font-display text-3xl">Something went wrong</h1><button onClick={reset} className="mt-6 text-gold">Retry</button></div>
    </SiteLayout>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product.colors?.[0]?.name);
  const price = product.salePrice ?? product.price;
  const related = products.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <SiteLayout>
      <section className="px-4 md:px-8 pt-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs tracking-[0.25em] uppercase text-[color:var(--color-smoke)] mb-8">
            <Link to="/shop" className="hover:text-gold">Shop</Link> <span className="mx-2">/</span>
            <span className="text-[color:var(--color-platinum)]">{product.name}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-3">
              <div className="aspect-square bg-[#18181B] rounded-lg overflow-hidden">
                <SmartImage src={product.image} alt={product.name} priority sizes="(max-width: 1024px) 100vw, 600px" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[product.image, product.image, product.image, product.image].map((src, i) => (
                  <div key={i} className="aspect-square bg-[#18181B] rounded overflow-hidden border border-[#A9791F]/10">
                    <SmartImage src={src} alt="" sizes="120px" className="w-full h-full object-cover opacity-80" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="text-[10px] tracking-[0.35em] uppercase text-gold">{product.categoryLabel}</div>
              <h1 className="mt-3 font-display font-black text-4xl md:text-5xl leading-tight">{product.name}</h1>
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-spec text-3xl text-gold">${price.toFixed(2)}</span>
                {product.salePrice && <span className="font-spec text-sm text-[color:var(--color-smoke)] line-through">${product.price.toFixed(2)}</span>}
              </div>
              <p className="mt-5 text-[color:var(--color-smoke)] leading-relaxed">{product.description}</p>

              {(product.puffs || product.battery || product.capacity || product.nicotine) && (
                <div className="mt-6 grid grid-cols-2 gap-3 border border-[#A9791F]/20 rounded-lg p-4 bg-[#18181B]">
                  {product.puffs && <Spec label="Puffs" value={product.puffs} />}
                  {product.battery && <Spec label="Battery" value={product.battery} />}
                  {product.capacity && <Spec label="Capacity" value={product.capacity} />}
                  {product.nicotine && <Spec label="Nicotine" value={product.nicotine} />}
                </div>
              )}

              {product.colors && (
                <div className="mt-6">
                  <div className="text-[10px] tracking-[0.35em] uppercase text-gold mb-2">Finish</div>
                  <div className="flex gap-2">
                    {product.colors.map((c: { name: string; hex: string }) => (
                      <button
                        key={c.name}
                        onClick={() => setVariant(c.name)}
                        className={`h-9 px-3 rounded-full text-xs border flex items-center gap-2 ${variant === c.name ? "border-[#F0CD6E]" : "border-[#A9791F]/25"}`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full" style={{ background: c.hex }} />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-3">
                <div className="inline-flex items-center border border-[#A9791F]/30 rounded">
                  <button className="px-3 py-3" onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease"><Minus className="w-4 h-4" /></button>
                  <span className="font-spec w-10 text-center">{qty}</span>
                  <button className="px-3 py-3" onClick={() => setQty(q => q + 1)} aria-label="Increase"><Plus className="w-4 h-4" /></button>
                </div>
                <button
                  onClick={() => add(product, qty, variant)}
                  className="flex-1 bg-gold text-[#0A0A0C] font-semibold py-3 rounded hover:shadow-[0_0_28px_rgba(240,205,110,0.4)] transition-shadow"
                >
                  Add to Bag — ${(price * qty).toFixed(2)}
                </button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                <TrustIcon icon={<Truck className="w-4 h-4" />} label="AU Express" />
                <TrustIcon icon={<Lock className="w-4 h-4" />} label="Secure" />
                <TrustIcon icon={<ShieldCheck className="w-4 h-4" />} label="Authentic" />
              </div>

              <Tabs defaultValue="desc" className="mt-10">
                <TabsList className="bg-transparent border-b border-[#A9791F]/20 rounded-none w-full justify-start gap-6 h-auto p-0">
                  <TabsTrigger value="desc" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#F0CD6E] data-[state=active]:text-gold data-[state=active]:bg-transparent px-0 py-3">Description</TabsTrigger>
                  <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#F0CD6E] data-[state=active]:text-gold data-[state=active]:bg-transparent px-0 py-3">Specifications</TabsTrigger>
                  <TabsTrigger value="ship" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#F0CD6E] data-[state=active]:text-gold data-[state=active]:bg-transparent px-0 py-3">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="desc" className="text-[color:var(--color-smoke)] leading-relaxed pt-5">
                  {product.description}
                </TabsContent>
                <TabsContent value="specs" className="pt-5">
                  <dl className="grid grid-cols-2 gap-3 font-spec text-sm">
                    {product.puffs && <><dt className="text-[color:var(--color-smoke)]">Puffs</dt><dd>{product.puffs}</dd></>}
                    {product.battery && <><dt className="text-[color:var(--color-smoke)]">Battery</dt><dd>{product.battery}</dd></>}
                    {product.capacity && <><dt className="text-[color:var(--color-smoke)]">Capacity</dt><dd>{product.capacity}</dd></>}
                    {product.nicotine && <><dt className="text-[color:var(--color-smoke)]">Nicotine</dt><dd>{product.nicotine}</dd></>}
                  </dl>
                </TabsContent>
                <TabsContent value="ship" className="text-[color:var(--color-smoke)] leading-relaxed pt-5">
                  Dispatched same business day for orders placed before 3pm AEST. Express AU delivery via Australia Post; adult signature required at delivery.
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-24">
              <Eyebrow>You may also like</Eyebrow>
              <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map(p => <ProductCard key={p.slug} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>
      <MobileStickyBar productPrice={price} onAdd={() => add(product, qty, variant)} />
    </SiteLayout>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-smoke)]">{label}</div>
      <div className="font-spec text-[color:var(--color-platinum)] mt-1">{value}</div>
    </div>
  );
}

function TrustIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[color:var(--color-smoke)]">
      <span className="text-gold">{icon}</span>
      <span className="tracking-[0.2em] uppercase text-[10px]">{label}</span>
    </div>
  );
}

function MobileStickyBar({ productPrice, onAdd }: { productPrice: number; onAdd: () => void }) {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0A0C]/95 backdrop-blur border-t border-[#A9791F]/25 p-3 flex gap-2">
      <button onClick={onAdd} className="flex-1 bg-gold text-[#0A0A0C] font-semibold py-3 rounded">
        Add to Bag · ${productPrice.toFixed(2)}
      </button>
      <a href="#" aria-label="Chat" className="w-12 grid place-items-center border border-[#A9791F]/30 rounded text-gold">💬</a>
    </div>
  );
}