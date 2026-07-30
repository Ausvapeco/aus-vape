import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { SmartImage } from "./SmartImage";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const onSale = product.salePrice != null;
  return (
    <div className="group relative bg-[#18181B] border border-[#A9791F]/10 rounded-lg overflow-hidden transition-all hover:border-[#A9791F]/50 hover:shadow-[0_0_30px_rgba(240,205,110,0.12)]">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block aspect-square overflow-hidden bg-[#0A0A0C] relative"
      >
        <SmartImage
          src={product.image}
          alt={product.name}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {onSale && (
          <div className="absolute top-3 left-3 text-[10px] tracking-[0.3em] uppercase text-gold border border-[#A9791F]/40 px-2 py-1 bg-[#0A0A0C]/70 backdrop-blur">
            Sale
          </div>
        )}
        <button
          aria-label={`Add ${product.name} to cart`}
          onClick={(e) => { e.preventDefault(); add(product, 1); }}
          className="absolute bottom-3 right-3 h-10 w-10 grid place-items-center bg-gold text-[#0A0A0C] rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-[0_0_20px_rgba(240,205,110,0.4)]"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </Link>
      <div className="p-5">
        <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-smoke)]">{product.categoryLabel}</div>
        <Link
          to="/product/$slug"
          params={{ slug: product.slug }}
          className="mt-1 block font-display font-bold text-lg hover:text-gold transition-colors"
        >
          {product.name}
        </Link>
        {product.flavour && (
          <div className="font-spec text-xs text-[color:var(--color-smoke)] mt-1">{product.flavour}</div>
        )}
        <div className="mt-3 flex items-center gap-2">
          {onSale ? (
            <>
              <span className="font-spec text-lg text-gold">${product.salePrice!.toFixed(2)}</span>
              <span className="font-spec text-xs text-[color:var(--color-smoke)] line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-spec text-lg text-gold">${product.price.toFixed(2)}</span>
          )}
        </div>
        {product.colors && (
          <div className="mt-3 flex gap-1.5">
            {product.colors.map(c => (
              <span key={c.name} title={c.name} className="w-3.5 h-3.5 rounded-full border border-[#A9791F]/30" style={{ background: c.hex }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}