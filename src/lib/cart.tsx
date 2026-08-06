import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";
import { syncCart } from "./carts.functions";

export type CartItem = { product: Product; qty: number; variant?: string };

type CartContextValue = {
  items: CartItem[];
  add: (product: Product, qty?: number, variant?: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ausvape-cart-v1";
const SESSION_KEY = "ausvape-sid-v1";

export function getCartSessionId() {
  if (typeof window === "undefined") return null;
  try {
    let id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  // Snapshot the cart server-side (debounced) so staff can see carts left behind.
  useEffect(() => {
    if (!hydrated) return;
    const session_id = getCartSessionId();
    if (!session_id) return;
    const t = setTimeout(() => {
      void syncCart({
        data: {
          session_id,
          items: items.map(i => ({
            slug: i.product.slug,
            name: i.product.name,
            qty: i.qty,
            price: i.product.salePrice ?? i.product.price,
          })),
        },
      }).catch(() => {});
    }, 2500);
    return () => clearTimeout(t);
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    add: (product, qty = 1, variant) => {
      setItems(prev => {
        const idx = prev.findIndex(i => i.product.slug === product.slug && i.variant === variant);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
        return [...prev, { product, qty, variant }];
      });
      setDrawerOpen(true);
    },
    remove: (slug) => setItems(prev => prev.filter(i => i.product.slug !== slug)),
    setQty: (slug, qty) => setItems(prev => prev.map(i => i.product.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)),
    clear: () => setItems([]),
    count: items.reduce((a, i) => a + i.qty, 0),
    subtotal: items.reduce((a, i) => a + (i.product.salePrice ?? i.product.price) * i.qty, 0),
    drawerOpen,
    setDrawerOpen,
  }), [items, drawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}