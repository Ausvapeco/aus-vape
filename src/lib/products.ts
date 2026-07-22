import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import rivalLime from "@/assets/gen/rival-lime.jpg.asset.json";
import rivalCola from "@/assets/gen/rival-cola.jpg.asset.json";
import rivalLongJin from "@/assets/gen/rival-longjin.jpg.asset.json";
import rivalGrape from "@/assets/gen/rival-grape.jpg.asset.json";
import alibarbarSCW from "@/assets/gen/alibarbar-scw.jpg.asset.json";
import vapehubTobacco from "@/assets/gen/vapehub-tobacco.jpg.asset.json";
import fiscoXpro from "@/assets/gen/fisco-xpro.jpg.asset.json";
import fiscoApple from "@/assets/gen/fisco-apple.jpg.asset.json";
import gen_alibarbar_grapefruit_guava_lemon from "@/assets/gen/alibarbar-grapefruit-guava-lemon.jpg.asset.json";
import gen_alibarbar_miami_mint from "@/assets/gen/alibarbar-miami-mint.jpg.asset.json";
import gen_alibarbar_ribena from "@/assets/gen/alibarbar-ribena.jpg.asset.json";
import gen_alibarbar_strawberry_lollipop from "@/assets/gen/alibarbar-strawberry-lollipop.jpg.asset.json";
import gen_aureus_carry_case from "@/assets/gen/aureus-carry-case.jpg.asset.json";
import gen_aureus_pen_24 from "@/assets/gen/aureus-pen-24.jpg.asset.json";
import gen_calibarn_lemon_mint from "@/assets/gen/calibarn-lemon-mint.jpg.asset.json";
import gen_calibarn_peach_watermelon from "@/assets/gen/calibarn-peach-watermelon.jpg.asset.json";
import gen_dh_hype_3pack from "@/assets/gen/dh-hype-3pack.jpg.asset.json";
import gen_dh_hype_blackberry from "@/assets/gen/dh-hype-blackberry.jpg.asset.json";
import gen_dh_hype_blueberry_raspberry from "@/assets/gen/dh-hype-blueberry-raspberry.jpg.asset.json";
import gen_dh_hype_cherry_pomegranate from "@/assets/gen/dh-hype-cherry-pomegranate.jpg.asset.json";
import gen_dh_hype_cool_mint from "@/assets/gen/dh-hype-cool-mint.jpg.asset.json";
import gen_dh_hype_double_happiness from "@/assets/gen/dh-hype-double-happiness.jpg.asset.json";
import gen_dh_hype_flat_white from "@/assets/gen/dh-hype-flat-white.jpg.asset.json";
import gen_dh_hype_greek_yogurt from "@/assets/gen/dh-hype-greek-yogurt.jpg.asset.json";
import gen_dh_hype_love_66 from "@/assets/gen/dh-hype-love-66.jpg.asset.json";
import gen_dh_hype_strawberry_lollipop from "@/assets/gen/dh-hype-strawberry-lollipop.jpg.asset.json";
import gen_dh_hype_strawberry_raspberry from "@/assets/gen/dh-hype-strawberry-raspberry.jpg.asset.json";
import gen_dh_hype_strawberry_watermelon from "@/assets/gen/dh-hype-strawberry-watermelon.jpg.asset.json";
import gen_ember_charger from "@/assets/gen/ember-charger.jpg.asset.json";
import gen_ember_slim_500 from "@/assets/gen/ember-slim-500.jpg.asset.json";
import gen_fisco_xpod_spearmint from "@/assets/gen/fisco-xpod-spearmint.jpg.asset.json";
import gen_jnr_cruiser_pfml from "@/assets/gen/jnr-cruiser-pfml.jpg.asset.json";
import gen_monolith_coil_pack from "@/assets/gen/monolith-coil-pack.jpg.asset.json";
import gen_monolith_mod_450 from "@/assets/gen/monolith-mod-450.jpg.asset.json";
import gen_obsidian_pod_x1 from "@/assets/gen/obsidian-pod-x1.jpg.asset.json";
import gen_obsidian_pod_x2 from "@/assets/gen/obsidian-pod-x2.jpg.asset.json";
import gen_rival_bar_lychee from "@/assets/gen/rival-bar-lychee.jpg.asset.json";
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

const IMG = {
  rivalLime: rivalLime.url,
  rivalCola: rivalCola.url,
  rivalLongJin: rivalLongJin.url,
  rivalGrape: rivalGrape.url,
  alibarbarSCW: alibarbarSCW.url,
  vapehubTobacco: vapehubTobacco.url,
  fiscoXpro: fiscoXpro.url,
  fiscoApple: fiscoApple.url,
};

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
    image: gen_obsidian_pod_x1.url,
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
    image: gen_monolith_mod_450.url,
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
    image: gen_ember_slim_500.url,
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
    image: gen_aureus_pen_24.url,
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
    image: gen_obsidian_pod_x2.url,
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
    image: gen_monolith_coil_pack.url,
    description: "Five-pack of 0.4Ω mesh coils calibrated for the Monolith Mod 450.",
  },
  {
    slug: "ember-charger",
    name: "Ember Fast Charger",
    category: "accessories",
    categoryLabel: "Accessory",
    price: 24.95,
    image: gen_ember_charger.url,
    description: "USB-C fast charger with pass-through protection.",
  },
  {
    slug: "aureus-carry-case",
    name: "Aureus Carry Case",
    category: "accessories",
    categoryLabel: "Accessory",
    price: 39.0,
    image: gen_aureus_carry_case.url,
    description: "Structured leather-effect case with a gold-stitched interior lining.",
  },
  // ——— Extended catalogue ———
  {
    slug: "jnr-cruiser-passion-fruit-mango-lime-12000",
    name: "JNR Cruiser Passion Fruit Mango Lime",
    category: "disposables",
    categoryLabel: "JNR Cruiser 12000",
    price: 39.95,
    image: gen_jnr_cruiser_pfml.url,
    flavour: "Passion Fruit · Mango · Lime",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Long-life JNR Cruiser disposable with a tropical passion fruit, mango and lime blend.",
  },
  {
    slug: "dh-hype-flat-white-12000",
    name: "Double Happiness Hype Flat White",
    category: "disposables",
    categoryLabel: "DH Hype 12000",
    price: 39.95,
    image: gen_dh_hype_flat_white.url,
    flavour: "Flat White",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Smooth espresso and steamed milk profile in the DH Hype 12000 series.",
  },
  {
    slug: "dh-hype-greek-yogurt-12000",
    name: "Double Happiness Hype Greek Yogurt",
    category: "disposables",
    categoryLabel: "DH Hype 12000",
    price: 39.95,
    image: gen_dh_hype_greek_yogurt.url,
    flavour: "Greek Yogurt",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Creamy tangy Greek yogurt flavour, DH Hype 12000 series.",
  },
  {
    slug: "dh-hype-strawberry-raspberry-12000",
    name: "Double Happiness Hype Strawberry Raspberry",
    category: "disposables",
    categoryLabel: "DH Hype 12000",
    price: 39.95,
    image: gen_dh_hype_strawberry_raspberry.url,
    flavour: "Strawberry · Raspberry",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Ripe strawberry layered with tart raspberry.",
  },
  {
    slug: "dh-hype-strawberry-watermelon-12000",
    name: "Double Happiness Hype Strawberry Watermelon",
    category: "disposables",
    categoryLabel: "DH Hype 12000",
    price: 39.95,
    image: gen_dh_hype_strawberry_watermelon.url,
    flavour: "Strawberry · Watermelon",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Juicy strawberry meets crisp watermelon.",
  },
  {
    slug: "dh-hype-love-66-12000",
    name: "Double Happiness Hype Love 66",
    category: "disposables",
    categoryLabel: "DH Hype 12000",
    price: 39.95,
    image: gen_dh_hype_love_66.url,
    flavour: "Love 66",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Signature mixed-berry blend from the DH Hype line.",
  },
  {
    slug: "dh-hype-cool-mint-12000",
    name: "Double Happiness Hype Cool Mint",
    category: "disposables",
    categoryLabel: "DH Hype 12000",
    price: 39.95,
    image: gen_dh_hype_cool_mint.url,
    flavour: "Cool Mint",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Clean, icy mint draw.",
  },
  {
    slug: "dh-hype-double-happiness-12000",
    name: "Double Happiness Hype Double Happiness",
    category: "disposables",
    categoryLabel: "DH Hype 12000",
    price: 39.95,
    image: gen_dh_hype_double_happiness.url,
    flavour: "Double Happiness",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "The house signature — sweet fruit medley with a cool finish.",
  },
  {
    slug: "dh-hype-blueberry-raspberry-12000",
    name: "Double Happiness Hype Blueberry Raspberry",
    category: "disposables",
    categoryLabel: "DH Hype 12000",
    price: 39.95,
    image: gen_dh_hype_blueberry_raspberry.url,
    flavour: "Blueberry · Raspberry",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Deep blueberry with a tart raspberry lift.",
  },
  {
    slug: "dh-hype-12000-3-pack",
    name: "Double Happiness Hype 12000 — 3 Pack",
    category: "disposables",
    categoryLabel: "DH Hype 12000",
    price: 109.95,
    salePrice: 99.95,
    image: gen_dh_hype_3pack.url,
    puffs: "12000 x 3",
    nicotine: "20 mg/mL",
    description: "Three-pack bundle of DH Hype 12000 disposables. Mix flavours at checkout.",
  },
  {
    slug: "dh-hype-strawberry-lollipop-12000",
    name: "Double Happiness Hype Strawberry Lollipop",
    category: "disposables",
    categoryLabel: "DH Hype 12000",
    price: 39.95,
    image: gen_dh_hype_strawberry_lollipop.url,
    flavour: "Strawberry Lollipop",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Sweet candied strawberry, lollipop-style.",
  },
  {
    slug: "dh-hype-cherry-pomegranate-12000",
    name: "Double Happiness Hype Cherry Pomegranate",
    category: "disposables",
    categoryLabel: "DH Hype 12000",
    price: 39.95,
    image: gen_dh_hype_cherry_pomegranate.url,
    flavour: "Cherry · Pomegranate",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Dark cherry with pomegranate tang.",
  },
  {
    slug: "dh-hype-blackberry-12000",
    name: "Double Happiness Hype Blackberry",
    category: "disposables",
    categoryLabel: "DH Hype 12000",
    price: 39.95,
    image: gen_dh_hype_blackberry.url,
    flavour: "Blackberry",
    puffs: "12000",
    nicotine: "20 mg/mL",
    description: "Bold, jammy blackberry.",
  },
  {
    slug: "alibarbar-ingot-strawberry-lollipop-9000",
    name: "Alibarbar Ingot Strawberry Lollipop",
    category: "disposables",
    categoryLabel: "Alibarbar 9000",
    price: 34.95,
    image: gen_alibarbar_strawberry_lollipop.url,
    flavour: "Strawberry Lollipop",
    puffs: "9000",
    nicotine: "20 mg/mL",
    description: "Candied strawberry in the Alibarbar Ingot 9000 chassis.",
  },
  {
    slug: "alibarbar-ingot-grapefruit-guava-lemon-ice-9000",
    name: "Alibarbar Ingot Grapefruit Guava Lemon Ice",
    category: "disposables",
    categoryLabel: "Alibarbar 9000",
    price: 34.95,
    image: gen_alibarbar_grapefruit_guava_lemon.url,
    flavour: "Grapefruit · Guava · Lemon Ice",
    puffs: "9000",
    nicotine: "20 mg/mL",
    description: "Sharp citrus and guava with a chilled finish.",
  },
  {
    slug: "alibarbar-ingot-ribena-9000",
    name: "Alibarbar Ingot Ribena",
    category: "disposables",
    categoryLabel: "Alibarbar 9000",
    price: 34.95,
    image: gen_alibarbar_ribena.url,
    flavour: "Ribena Blackcurrant",
    puffs: "9000",
    nicotine: "20 mg/mL",
    description: "Nostalgic blackcurrant cordial profile.",
  },
  {
    slug: "alibarbar-ingot-miami-mint-9000",
    name: "Alibarbar Ingot Miami Mint",
    category: "disposables",
    categoryLabel: "Alibarbar 9000",
    price: 34.95,
    image: gen_alibarbar_miami_mint.url,
    flavour: "Miami Mint",
    puffs: "9000",
    nicotine: "20 mg/mL",
    description: "Bright spearmint with a cooling exhale.",
  },
  {
    slug: "fisco-xpod-double-apple-8000",
    name: "Fisco Xpod Double Apple",
    category: "disposables",
    categoryLabel: "Fisco Xpod",
    price: 32.95,
    image: IMG.fiscoApple,
    flavour: "Double Apple",
    puffs: "8000",
    nicotine: "20 mg/mL",
    description: "Classic shisha-style double apple in the Fisco Xpod.",
  },
  {
    slug: "fisco-xpod-spearmint-8000-pod-only",
    name: "Fisco Xpod Spearmint (Pod Only)",
    category: "disposables",
    categoryLabel: "Fisco Xpod",
    price: 24.95,
    image: gen_fisco_xpod_spearmint.url,
    flavour: "Spearmint",
    puffs: "8000",
    nicotine: "20 mg/mL",
    description: "Replacement pod only — spearmint flavour, fits the Fisco Xpod device.",
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
    slug: "calibarn-lemon-mint-6000",
    name: "Calibarn Lemon Mint",
    category: "disposables",
    categoryLabel: "Calibarn 6000",
    price: 27.95,
    image: gen_calibarn_lemon_mint.url,
    flavour: "Lemon · Mint",
    puffs: "6000",
    nicotine: "20 mg/mL",
    description: "Zesty lemon with a cooling mint finish.",
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
    slug: "rival-bar-lychee-8000",
    name: "Rival Bar Lychee",
    category: "disposables",
    categoryLabel: "Rival Bar 8000",
    price: 32.95,
    image: gen_rival_bar_lychee.url,
    flavour: "Lychee",
    puffs: "8000",
    nicotine: "20 mg/mL",
    description: "Delicate floral lychee.",
  },
  {
    slug: "rival-bar-long-jin-tea-8000",
    name: "Rival Bar Long Jin Tea",
    category: "disposables",
    categoryLabel: "Rival Bar 8000",
    price: 32.95,
    image: IMG.rivalLongJin,
    flavour: "Long Jin Green Tea",
    puffs: "8000",
    nicotine: "20 mg/mL",
    description: "Toasted green tea with a smooth, earthy finish.",
  },
  {
    slug: "rival-bar-lime-8000",
    name: "Rival Bar Lime",
    category: "disposables",
    categoryLabel: "Rival Bar 8000",
    price: 32.95,
    image: IMG.rivalLime,
    flavour: "Lime",
    puffs: "8000",
    nicotine: "20 mg/mL",
    description: "Sharp, juicy lime.",
  },
  {
    slug: "rival-bar-cola-8000",
    name: "Rival Bar Cola",
    category: "disposables",
    categoryLabel: "Rival Bar 8000",
    price: 32.95,
    image: IMG.rivalCola,
    flavour: "Cola",
    puffs: "8000",
    nicotine: "20 mg/mL",
    description: "Fizzy cola classic.",
  },
  {
    slug: "rival-bar-grape-8000",
    name: "Rival Bar Grape",
    category: "disposables",
    categoryLabel: "Rival Bar 8000",
    price: 32.95,
    image: IMG.rivalGrape,
    flavour: "Grape",
    puffs: "8000",
    nicotine: "20 mg/mL",
    description: "Deep, juicy grape with an icy finish.",
  },
  {
    slug: "alibarbar-ingot-strawberry-coconut-watermelon-9000",
    name: "Alibarbar Ingot Strawberry Coconut Watermelon",
    category: "disposables",
    categoryLabel: "Alibarbar 9000",
    price: 34.95,
    image: IMG.alibarbarSCW,
    flavour: "Strawberry · Coconut · Watermelon",
    puffs: "9000",
    nicotine: "20 mg/mL",
    description: "Ripe strawberry, creamy coconut and crisp watermelon in the gold Alibarbar Ingot chassis.",
  },
  {
    slug: "vapehub-classic-tobacco-20000",
    name: "Vapehub Classic Tobacco",
    category: "disposables",
    categoryLabel: "Vapehub 20000",
    price: 44.95,
    image: IMG.vapehubTobacco,
    flavour: "Classic Tobacco",
    puffs: "20000",
    nicotine: "20 mg/mL",
    description: "Rich, cured tobacco profile in a 20,000-puff Vapehub disposable.",
  },
  {
    slug: "fisco-x-pro-device-8000",
    name: "Fisco X-Pro Device",
    category: "devices",
    categoryLabel: "Fisco Device",
    price: 49.95,
    image: IMG.fiscoXpro,
    description: "Rechargeable Fisco X-Pro pod device — 8000 puff capacity with LED coil window. Pairs with Fisco Xpod refills.",
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