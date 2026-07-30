import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { SmartImage } from "@/components/ausvape/SmartImage";

export function CartDrawer() {
  const { items, drawerOpen, setDrawerOpen, setQty, remove, subtotal } = useCart();
  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent side="right" className="bg-[#0A0A0C] border-l border-[#A9791F]/25 text-[color:var(--color-platinum)] w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-[#A9791F]/15">
          <SheetTitle className="font-display text-xl tracking-tight">Your Bag</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="p-10 text-center text-sm text-[color:var(--color-smoke)]">
              Your bag is empty.
            </div>
          ) : (
            <ul className="divide-y divide-[#A9791F]/10">
              {items.map(i => (
                <li key={i.product.slug + (i.variant ?? "")} className="p-5 flex gap-4">
                  <div className="w-20 h-20 bg-[#18181B] rounded overflow-hidden shrink-0">
                    <SmartImage src={i.product.image} alt="" sizes="80px" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className="font-medium truncate">{i.product.name}</div>
                      <button aria-label="Remove" onClick={() => remove(i.product.slug)} className="text-[color:var(--color-smoke)] hover:text-gold">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="font-spec text-sm text-gold mt-1">
                      ${((i.product.salePrice ?? i.product.price) * i.qty).toFixed(2)}
                    </div>
                    <div className="mt-3 inline-flex items-center border border-[#A9791F]/25 rounded">
                      <button className="px-2 py-1" onClick={() => setQty(i.product.slug, i.qty - 1)} aria-label="Decrease"><Minus className="w-3 h-3" /></button>
                      <span className="font-spec text-sm w-8 text-center">{i.qty}</span>
                      <button className="px-2 py-1" onClick={() => setQty(i.product.slug, i.qty + 1)} aria-label="Increase"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="p-6 border-t border-[#A9791F]/20 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-[color:var(--color-smoke)]">Subtotal</span>
              <span className="font-spec text-gold">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-[color:var(--color-smoke)]">Shipping and taxes calculated at checkout.</p>
            <Link
              to="/checkout"
              onClick={() => setDrawerOpen(false)}
              className="block text-center bg-gold text-[#0A0A0C] font-semibold py-3 rounded hover:shadow-[0_0_24px_rgba(240,205,110,0.4)] transition-shadow"
            >
              Checkout
            </Link>
            <Link
              to="/cart"
              onClick={() => setDrawerOpen(false)}
              className="block text-center border border-[#A9791F]/30 py-3 rounded text-sm hover:border-[#A9791F]/70"
            >
              View bag
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}