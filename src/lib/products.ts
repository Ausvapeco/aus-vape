import rivalLime from "@/assets/gen/rival-lime.jpg.asset.json";
import rivalCola from "@/assets/gen/rival-cola.jpg.asset.json";
import rivalLongJin from "@/assets/gen/rival-longjin.jpg.asset.json";
import rivalGrape from "@/assets/gen/rival-grape.jpg.asset.json";
import alibarbarSCW from "@/assets/gen/alibarbar-scw.jpg.asset.json";
import vapehubTobacco from "@/assets/gen/vapehub-tobacco.jpg.asset.json";
import fiscoXpro from "@/assets/gen/fisco-xpro.jpg.asset.json";
import fiscoApple from "@/assets/gen/fisco-apple.jpg.asset.json";
import igetStrawberryWatermelonIce from "@/assets/gen/iget-bar-pro-strawberry-watermelon-ice.webp.asset.json";
import igetBlueberryIce from "@/assets/gen/iget-bar-pro-blueberry-ice.webp.asset.json";
import jnrFrozenApple from "@/assets/gen/jnr-frozen-apple.webp.asset.json";
import pandaPeachLemonade from "@/assets/gen/panda-peach-lemonade.webp.asset.json";
import pandaLemonCola from "@/assets/gen/panda-lemon-cola.webp.asset.json";
import hqdMangoHoneydew from "@/assets/gen/hqd-slick-mango-honeydew.webp.asset.json";
import hqdRaspberryGrape from "@/assets/gen/hqd-slick-raspberry-grape.webp.asset.json";
import igetLycheeIce from "@/assets/gen/iget-lychee-ice.webp.asset.json";
import calibarnLemon from "@/assets/gen/calibarn-lemon.webp.asset.json";
import calibarnPeachWatermelonPhoto from "@/assets/gen/calibarn-peach-watermelon-photo.webp.asset.json";
import pandaWatermelonIce from "@/assets/gen/panda-watermelon-ice.webp.asset.json";
import pandaStrawberryCake from "@/assets/gen/panda-strawberry-cake.webp.asset.json";
import dhStrawberryLollipop from "@/assets/gen/dh-hype-strawberry-lollipop.jpg.asset.json";
import dhStrawberryRaspberry from "@/assets/gen/dh-hype-strawberry-raspberry.jpg.asset.json";
import dhStrawberryWatermelon from "@/assets/gen/dh-hype-strawberry-watermelon.jpg.asset.json";
import dhLove66 from "@/assets/gen/dh-hype-love-66.jpg.asset.json";
import dhGreekYogurt from "@/assets/gen/dh-hype-greek-yogurt.jpg.asset.json";
import dhBlueberryRaspberry from "@/assets/gen/dh-hype-blueberry-raspberry.jpg.asset.json";
import dhDoubleHappiness from "@/assets/gen/dh-hype-double-happiness.png.asset.json";
import dhFlatWhite from "@/assets/gen/dh-hype-flat-white.png.asset.json";
import jnrCruiserPFML from "@/assets/gen/jnr-cruiser-pfml.jpg.asset.json";
import alibarbarKiwiPineapple from "@/assets/gen/alibarbar-kiwi-pineapple.jpg.asset.json";

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
    slug: "rival-bar-grape-8000",
    name: "Rival Bar Grape",
    category: "disposables",
    categoryLabel: "Rival Bar 8000",
    price: 32.95,
    image: rivalGrape.url,
    flavour: "Grape",
    puffs: "8000",
    nicotine: "20 mg/mL",
    description: "Deep, juicy grape with an icy finish.",
    bestseller: true,
  },
  {
    slug: "rival-bar-cola-8000",
    name: "Rival Bar Cola",
    category: "disposables",
    categoryLabel: "Rival Bar 8000",
    price: 32.95,
    image: rivalCola.url,
    flavour: "Cola",
    puffs: "8000",
    nicotine: "20 mg/mL",
    description: "Fizzy cola classic.",
    bestseller: true,
  },
  {
    slug: "alibarbar-ingot-strawberry-coconut-watermelon-9000",
    name: "Alibarbar Ingot Strawberry Coconut Watermelon",
    category: "disposables",
    categoryLabel: "Alibarbar 9000",
    price: 34.95,
    image: alibarbarSCW.url,
    flavour: "Strawberry · Coconut · Watermelon",
    puffs: "9000",
    nicotine: "20 mg/mL",
    description: "Ripe strawberry, creamy coconut and crisp watermelon in the gold Alibarbar Ingot chassis.",
    bestseller: true,
  },
  {
    slug: "vapehub-classic-tobacco-20000",
    name: "Vapehub Classic Tobacco",
    category: "disposables",
    categoryLabel: "Vapehub 20000",
    price: 44.95,
    image: vapehubTobacco.url,
    flavour: "Classic Tobacco",
    puffs: "20000",
    nicotine: "20 mg/mL",
    description: "Rich, cured tobacco profile in a 20,000-puff Vapehub disposable.",
    bestseller: true,
  },
  {
    slug: "fisco-x-pro-device-8000",
    name: "Fisco X-Pro Device",
    category: "devices",
    categoryLabel: "Fisco Device",
    price: 49.95,
    image: fiscoXpro.url,
    description: "Rechargeable Fisco X-Pro pod device — 8000 puff capacity with LED coil window. Pairs with Fisco Xpod refills.",
    bestseller: true,
  },
  {
    slug: "fisco-xpod-double-apple-8000",
    name: "Fisco Xpod Double Apple",
    category: "disposables",
    categoryLabel: "Fisco Xpod",
    price: 32.95,
    image: fiscoApple.url,
    flavour: "Double Apple",
    puffs: "8000",
    nicotine: "20 mg/mL",
    description: "Classic shisha-style double apple in the Fisco Xpod.",
  },
  {
    slug: "rival-bar-lime-8000",
    name: "Rival Bar Lime",
    category: "disposables",
    categoryLabel: "Rival Bar 8000",
    price: 32.95,
    image: rivalLime.url,
    flavour: "Lime",
    puffs: "8000",
    nicotine: "20 mg/mL",
    description: "Sharp, juicy lime.",
  },
  {
    slug: "rival-bar-long-jin-tea-8000",
    name: "Rival Bar Long Jin Tea",
    category: "disposables",
    categoryLabel: "Rival Bar 8000",
    price: 32.95,
    image: rivalLongJin.url,
    flavour: "Long Jin Green Tea",
    puffs: "8000",
    nicotine: "20 mg/mL",
    description: "Toasted green tea with a smooth, earthy finish.",
  },
  {
    slug: "panda-watermelon-ice-2500",
    name: "Panda Puffs Watermelon Ice",
    category: "disposables",
    categoryLabel: "Panda 2500",
    price: 19.95,
    image: pandaWatermelonIce.url,
    flavour: "Watermelon Ice",
    puffs: "2500",
    nicotine: "20 mg/mL",
    description: "Chilled watermelon — 7ml, mesh coil, 850mAh.",
  },
  {
    slug: "panda-strawberry-cake-2500",
    name: "Panda Puffs Strawberry Cake",
    category: "disposables",
    categoryLabel: "Panda 2500",
    price: 19.95,
    image: pandaStrawberryCake.url,
    flavour: "Strawberry Cake",
    puffs: "2500",
    nicotine: "20 mg/mL",
    description: "Sweet strawberry cake — 7ml, mesh coil, 850mAh.",
  },
  {
    slug: "calibarn-peach-watermelon-6000",
    name: "Calibarn Peach Watermelon",
    category: "disposables",
    categoryLabel: "Calibarn 6000",
    price: 27.95,
    image: calibarnPeachWatermelonPhoto.url,
    flavour: "Peach · Watermelon",
    puffs: "6000",
    nicotine: "20 mg/mL",
    description: "Ripe peach and crisp watermelon.",
  },
  {
    slug: "calibarn-lemon-6000",
    name: "Calibarn Lemon",
    category: "disposables",
    categoryLabel: "Calibarn 6000",
    price: 27.95,
    image: calibarnLemon.url,
    flavour: "Lemon",
    puffs: "6000",
    nicotine: "20 mg/mL",
    description: "Bright, orchard-fresh lemon.",
  },
  {
    slug: "jnr-shisha-hookah-frozen-apple-12000",
    name: "JNR Shisha Hookah Frozen Apple",
    category: "disposables",
    categoryLabel: "JNR Shisha 12000",
    price: 42.95,
    image: jnrFrozenApple.url,
    flavour: "Frozen Apple",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Crisp green apple with an icy shisha-style pull.",
  },
  {
    slug: "panda-peach-lemonade-2500",
    name: "Panda Puffs Peach Lemonade",
    category: "disposables",
    categoryLabel: "Panda 2500",
    price: 19.95,
    image: pandaPeachLemonade.url,
    flavour: "Peach Lemonade",
    puffs: "2500",
    nicotine: "20 mg/mL",
    description: "Ripe peach and zesty lemonade — 7ml, mesh coil, 850mAh.",
  },
  {
    slug: "panda-lemon-cola-2500",
    name: "Panda Puffs Lemon Cola",
    category: "disposables",
    categoryLabel: "Panda 2500",
    price: 19.95,
    image: pandaLemonCola.url,
    flavour: "Lemon Cola",
    puffs: "2500",
    nicotine: "20 mg/mL",
    description: "Fizzy cola with a bright lemon twist — 7ml, mesh coil, 850mAh.",
  },
  {
    slug: "hqd-slick-mango-honeydew-ice-6000",
    name: "HQD Slick Mango Honeydew Ice",
    category: "disposables",
    categoryLabel: "HQD Slick 6000",
    price: 29.95,
    image: hqdMangoHoneydew.url,
    flavour: "Mango · Honeydew · Ice",
    puffs: "6000",
    nicotine: "20 mg/mL",
    description: "Juicy mango and honeydew melon with an icy finish.",
  },
  {
    slug: "hqd-slick-raspberry-grape-6000",
    name: "HQD Slick Raspberry Grape",
    category: "disposables",
    categoryLabel: "HQD Slick 6000",
    price: 29.95,
    image: hqdRaspberryGrape.url,
    flavour: "Raspberry · Grape",
    puffs: "6000",
    nicotine: "20 mg/mL",
    description: "Ripe raspberry and deep grape in a matte black chassis.",
  },
  {
    slug: "iget-lychee-ice",
    name: "IGET Lychee Ice",
    category: "disposables",
    categoryLabel: "IGET",
    price: 24.95,
    image: igetLycheeIce.url,
    flavour: "Lychee Ice",
    nicotine: "20 mg/mL",
    description: "Floral lychee with a clean menthol finish.",
  },
  {
    slug: "iget-bar-pro-strawberry-watermelon-ice-10000",
    name: "IGET Bar Pro 10000",
    category: "disposables",
    categoryLabel: "IGET Bar Pro",
    price: 39.95,
    image: igetStrawberryWatermelonIce.url,
    flavour: "Strawberry Watermelon Ice",
    puffs: "10000",
    description: "IGET Bar Pro delivers up to 10,000 puffs of chilled strawberry watermelon with a mesh coil and rechargeable battery.",
  },
  {
    slug: "iget-bar-pro-blueberry-ice-10000",
    name: "IGET Bar Pro 10000",
    category: "disposables",
    categoryLabel: "IGET Bar Pro",
    price: 39.95,
    image: igetBlueberryIce.url,
    flavour: "Blueberry Ice",
    puffs: "10000",
    description: "IGET Bar Pro delivers up to 10,000 puffs of iced blueberry with a mesh coil and rechargeable battery.",
  },
  {
    slug: "dh-hype-strawberry-lollipop-12000",
    name: "Double Happiness Hype Strawberry Lollipop",
    category: "disposables",
    categoryLabel: "Double Happiness Hype 12000",
    price: 42.95,
    image: dhStrawberryLollipop.url,
    flavour: "Strawberry Lollipop",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Sweet strawberry lollipop — 18ml, mesh coil, 650mAh, USB-C.",
    bestseller: true,
  },
  {
    slug: "dh-hype-strawberry-raspberry-12000",
    name: "Double Happiness Hype Strawberry Raspberry",
    category: "disposables",
    categoryLabel: "Double Happiness Hype 12000",
    price: 42.95,
    image: dhStrawberryRaspberry.url,
    flavour: "Strawberry · Raspberry",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Sweet, juicy, perfectly balanced — 18ml, mesh coil, 650mAh.",
  },
  {
    slug: "dh-hype-strawberry-watermelon-12000",
    name: "Double Happiness Hype Strawberry Watermelon",
    category: "disposables",
    categoryLabel: "Double Happiness Hype 12000",
    price: 42.95,
    image: dhStrawberryWatermelon.url,
    flavour: "Strawberry · Watermelon",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Crisp watermelon meets ripe strawberry — 18ml, mesh coil.",
  },
  {
    slug: "dh-hype-love-66-12000",
    name: "Double Happiness Hype Love 66",
    category: "disposables",
    categoryLabel: "Double Happiness Hype 12000",
    price: 42.95,
    image: dhLove66.url,
    flavour: "Love 66",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "The signature Love 66 blend — sweet, smooth, pure love.",
    bestseller: true,
  },
  {
    slug: "dh-hype-double-happiness-12000",
    name: "Double Happiness Hype Signature",
    category: "disposables",
    categoryLabel: "Double Happiness Hype 12000",
    price: 42.95,
    image: dhDoubleHappiness.url,
    flavour: "Double Happiness",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "The house blend — smooth, sweet, pure happiness.",
  },
  {
    slug: "dh-hype-greek-yogurt-12000",
    name: "Double Happiness Hype Greek Yogurt",
    category: "disposables",
    categoryLabel: "Double Happiness Hype 12000",
    price: 42.95,
    image: dhGreekYogurt.url,
    flavour: "Greek Yogurt",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Smooth, creamy, naturally delicious — a Mediterranean-inspired blend.",
  },
  {
    slug: "dh-hype-blueberry-raspberry-12000",
    name: "Double Happiness Hype Blueberry Raspberry",
    category: "disposables",
    categoryLabel: "Double Happiness Hype 12000",
    price: 42.95,
    image: dhBlueberryRaspberry.url,
    flavour: "Blueberry · Raspberry",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Sweet, tangy, refreshing berry duo — 18ml, mesh coil.",
  },
  {
    slug: "dh-hype-flat-white-12000",
    name: "Double Happiness Hype Flat White",
    category: "disposables",
    categoryLabel: "Double Happiness Hype 12000",
    price: 42.95,
    image: dhFlatWhite.url,
    flavour: "Flat White",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Smooth, creamy espresso and steamed milk — perfectly balanced.",
  },
  {
    slug: "jnr-cruiser-passion-fruit-mango-lime-12000",
    name: "JNR Cruiser Passion Fruit Mango Lime",
    category: "disposables",
    categoryLabel: "JNR Cruiser 12000",
    price: 44.95,
    image: jnrCruiserPFML.url,
    flavour: "Passion Fruit · Mango · Lime",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Tropical passion fruit, ripe mango, and zesty lime in the JNR Cruiser chassis.",
    bestseller: true,
  },
  {
    slug: "alibarbar-ingot-kiwi-pineapple-9000",
    name: "Alibarbar Ingot Kiwi Pineapple",
    category: "disposables",
    categoryLabel: "Alibarbar 9000",
    price: 34.95,
    image: alibarbarKiwiPineapple.url,
    flavour: "Kiwi · Pineapple",
    puffs: "9000",
    nicotine: "20 mg/mL",
    description: "Tart kiwi and sun-ripened pineapple in the gold Alibarbar Ingot chassis.",
  },
];

export const getProduct = (slug: string) => products.find(p => p.slug === slug);
export const bestsellers = () => products.filter(p => p.bestseller);
export const byCategory = (c: string) => products.filter(p => p.category === c);

export const categories = [
  { slug: "disposables", label: "Disposables", blurb: "Pocket-ready pods, no refills." },
  { slug: "devices", label: "Devices", blurb: "Refillable mods and pens." },
  { slug: "best-sellers", label: "Best Sellers", blurb: "This month's top rated." },
];