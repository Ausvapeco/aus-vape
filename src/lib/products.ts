import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

export type Product = {
  slug: string;
  name: string;
  category: "disposables" | "devices" | "accessories";
  categoryLabel: string;
  price: number;
  salePrice?: number;
  image: string;
  images?: string[];
  flavour?: string;
  puffs?: string;
  battery?: string;
  capacity?: string;
  nicotine?: string;
  colors?: { name: string; hex: string }[];
  description: string;
  bestseller?: boolean;
};

export const products: Product[] = [
  {
    slug: "obsidian-pod-x1",
    name: "Obsidian Pod X1",
    category: "disposables",
    categoryLabel: "Disposable",
    price: 34.95,
    salePrice: 29.95,
    image: product1,
    flavour: "Iced Mango",
    puffs: "6000",
    battery: "650 mAh",
    capacity: "12 mL",
    nicotine: "20 mg/mL",
    colors: [
      { name: "Void", hex: "#0A0A0C" },
      { name: "Bronze", hex: "#A9791F" },
    ],
    description: "A refined pocket device with mesh coil delivery and a stabilised airflow chamber. Designed for a clean, consistent draw.",
    bestseller: true,
  },
  {
    slug: "monolith-mod-450",
    name: "Monolith Mod 450",
    category: "devices",
    categoryLabel: "Device",
    price: 129.0,
    image: product2,
    battery: "3000 mAh",
    capacity: "5 mL",
    colors: [
      { name: "Platinum", hex: "#96969B" },
      { name: "Void", hex: "#0A0A0C" },
    ],
    description: "Machined aluminium chassis with adjustable wattage and a dual-coil deck. Built for enthusiasts who value control.",
    bestseller: true,
  },
  {
    slug: "ember-slim-500",
    name: "Ember Slim 500",
    category: "disposables",
    categoryLabel: "Disposable",
    price: 24.95,
    image: product3,
    flavour: "Tobacco Reserve",
    puffs: "3500",
    battery: "500 mAh",
    capacity: "8 mL",
    nicotine: "18 mg/mL",
    colors: [{ name: "Ember", hex: "#A9791F" }, { name: "Void", hex: "#0A0A0C" }],
    description: "Ultra-slim profile finished with an ember-gold detail line. A quiet, tailored experience.",
    bestseller: true,
  },
  {
    slug: "aureus-pen-24",
    name: "Aureus Pen 24",
    category: "devices",
    categoryLabel: "Device",
    price: 89.0,
    salePrice: 74.0,
    image: product4,
    battery: "1500 mAh",
    capacity: "3 mL",
    colors: [{ name: "Gold", hex: "#F0CD6E" }, { name: "Void", hex: "#0A0A0C" }],
    description: "A slim vertical form factor with gold-anodised endcaps. Refillable pod with adjustable airflow.",
    bestseller: true,
  },
  {
    slug: "obsidian-pod-x2",
    name: "Obsidian Pod X2",
    category: "disposables",
    categoryLabel: "Disposable",
    price: 36.95,
    image: product1,
    flavour: "Winter Mint",
    puffs: "6000",
    battery: "650 mAh",
    capacity: "12 mL",
    nicotine: "20 mg/mL",
    description: "Second generation of the X series with a refined mouthpiece and improved coil life.",
  },
  {
    slug: "monolith-coil-pack",
    name: "Monolith Replacement Coils",
    category: "accessories",
    categoryLabel: "Accessory",
    price: 19.95,
    image: product2,
    description: "Five-pack of 0.4Ω mesh coils calibrated for the Monolith Mod 450.",
  },
  {
    slug: "ember-charger",
    name: "Ember Fast Charger",
    category: "accessories",
    categoryLabel: "Accessory",
    price: 24.95,
    image: product3,
    description: "USB-C fast charger with pass-through protection.",
  },
  {
    slug: "aureus-carry-case",
    name: "Aureus Carry Case",
    category: "accessories",
    categoryLabel: "Accessory",
    price: 39.0,
    image: product4,
    description: "Structured leather-effect case with a gold-stitched interior lining.",
  },
];

export const getProduct = (slug: string) => products.find(p => p.slug === slug);
export const bestsellers = () => products.filter(p => p.bestseller);
export const byCategory = (c: string) => products.filter(p => p.category === c);

export const categories = [
  { slug: "disposables", label: "Disposables", blurb: "Pocket-ready pods, no refills." },
  { slug: "devices", label: "Devices", blurb: "Refillable mods and pens." },
  { slug: "accessories", label: "Accessories", blurb: "Coils, chargers, cases." },
  { slug: "best-sellers", label: "Best Sellers", blurb: "This month's top rated." },
];