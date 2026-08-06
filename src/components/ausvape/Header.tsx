import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Logo } from "./Logo";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/category/$slug", params: { slug: "disposables" }, label: "Disposables" },
  { to: "/category/$slug", params: { slug: "accessories" }, label: "Accessories" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function AnnouncementBar() {
  return (
    <div className="bg-[#0A0A0C] border-b border-[#A9791F]/25 text-center py-2 text-[11px] tracking-[0.25em] uppercase">
      <span className="text-gold">Free express AU shipping over $80 · Authentic stock, always</span>
    </div>
  );
}

export function Header() {
  const { count, setDrawerOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? "bg-[#0A0A0C] border-b border-[#A9791F]/30" : "bg-[#0A0A0C]/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-6">
        <Link to="/" className="shrink-0">
          <Logo className="text-xl md:text-2xl" />
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {nav.map(n => (
            <Link
              key={n.label}
              to={n.to}
              params={"params" in n ? (n.params as never) : undefined}
              className="text-[color:var(--color-platinum)]/80 hover:text-[color:var(--color-platinum)] transition-colors tracking-wide"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Search products" className="p-2 text-[color:var(--color-platinum)]/70 hover:text-gold transition-colors">
            <Search className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            onClick={() => setDrawerOpen(true)}
            className="relative p-2 text-[color:var(--color-platinum)]/80 hover:text-gold transition-colors"
          >
            <ShoppingBag className="w-5 h-5" aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-gold rounded-full text-[10px] font-bold text-[#0A0A0C] grid place-items-center">
                {count}
              </span>
            )}
          </button>
          <button
            className="lg:hidden p-2 text-[color:var(--color-platinum)]"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#A9791F]/20 bg-[#0A0A0C]">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {nav.map(n => (
              <Link
                key={n.label}
                to={n.to}
                params={"params" in n ? (n.params as never) : undefined}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-2 border-b border-[#A9791F]/10 text-[color:var(--color-platinum)]/90 hover:text-gold"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}