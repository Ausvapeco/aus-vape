import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";
import { useCart } from "@/lib/cart";
import { SmartImage } from "@/components/ausvape/SmartImage";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Bag — AUSVAPE CO" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  return (
    <SiteLayout>
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <Eyebrow>Your Bag</Eyebrow>
          <h1 className="mt-6 font-display font-black text-5xl">Review your <span className="text-gold">order.</span></h1>
          {items.length === 0 ? (
            <div className="mt-16 text-center text-[color:var(--color-smoke)]">
              Your bag is empty. <Link to="/shop" className="text-gold ml-2">Browse the collection →</Link>
            </div>
          ) : (
            <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-10">
              <ul className="divide-y divide-[#A9791F]/15 border-y border-[#A9791F]/15">
                {items.map(i => (
                  <li key={i.product.slug} className="py-6 flex gap-5">
                    <div className="w-24 h-24 bg-[#18181B] rounded overflow-hidden shrink-0">
                      <SmartImage src={i.product.image} alt="" sizes="96px" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div>
                          <div className="font-display font-bold">{i.product.name}</div>
                          {i.variant && <div className="text-xs text-[color:var(--color-smoke)] mt-1">Finish: {i.variant}</div>}
                        </div>
                        <button onClick={() => remove(i.product.slug)} aria-label="Remove" className="text-[color:var(--color-smoke)] hover:text-gold"><X className="w-4 h-4" /></button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center border border-[#A9791F]/25 rounded">
                          <button className="px-2 py-1" onClick={() => setQty(i.product.slug, i.qty - 1)}><Minus className="w-3 h-3" /></button>
                          <span className="font-spec text-sm w-8 text-center">{i.qty}</span>
                          <button className="px-2 py-1" onClick={() => setQty(i.product.slug, i.qty + 1)}><Plus className="w-3 h-3" /></button>
                        </div>
                        <div className="font-spec text-gold">${((i.product.salePrice ?? i.product.price) * i.qty).toFixed(2)}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <aside className="border border-[#A9791F]/20 rounded-lg p-6 bg-[#18181B] h-fit sticky top-24">
                <div className="text-[10px] tracking-[0.35em] uppercase text-gold">Summary</div>
                <div className="mt-4 space-y-2 text-sm">
                  <Row k="Subtotal" v={`$${subtotal.toFixed(2)}`} />
                  <Row k="Shipping" v="Calculated at checkout" />
                </div>
                <div className="mt-4 pt-4 border-t border-[#A9791F]/20 flex justify-between">
                  <span>Total</span>
                  <span className="font-spec text-gold">${subtotal.toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="mt-6 block text-center bg-gold text-[#0A0A0C] font-semibold py-3 rounded">Proceed to Checkout</Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between"><span className="text-[color:var(--color-smoke)]">{k}</span><span>{v}</span></div>;
}