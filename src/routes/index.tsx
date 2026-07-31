import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Truck, Lock, BadgeCheck, Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";
import { SmokeWisp, WispDivider } from "@/components/ausvape/SmokeWisp";
import { ProductCard } from "@/components/ausvape/ProductCard";
import { SmartImage } from "@/components/ausvape/SmartImage";
import { bestsellers, products } from "@/lib/products";
import { getProduct } from "@/lib/products";
const heroPhoto = { url: "/products-opt/double-happiness-hype-flat-white-12000-puffs.webp" };
const storyPhoto = { url: "/products-opt/hqd-slick-mango-honeydew-ice-6000-puffs.webp" };
const signatureBanner = {
  url: "/banners/alibarbar-signature-banner.webp",
  small: "/banners/alibarbar-signature-banner@1000.webp",
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    links: [
      { rel: "preload", as: "image", href: heroPhoto.url, fetchpriority: "high" },
    ],
  }),
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <FeaturedBanner />
      <PremiumBanner />
      <TrustStrip />
      <CategoryGrid />
      <Bestsellers />
      <BrandCollections />
      <BrandStory />
      <Testimonials />
      <Newsletter />
      <FAQ />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0C]">
      <div className="pointer-events-none absolute inset-0">
        <SmokeWisp className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[1200px] h-[700px] opacity-80" />
      </div>
      <div
        className="absolute inset-0 opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: `url(${heroPhoto.url})`, backgroundSize: "cover", backgroundPosition: "center right" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/70 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-36 min-h-[80vh] flex flex-col justify-center">
        <div className="max-w-3xl animate-fade-up">
          <Eyebrow>Australia · Premium Vapour</Eyebrow>
          <h1 className="mt-8 font-display font-black text-5xl sm:text-6xl md:text-8xl leading-[0.9] tracking-tight">
            The art of the <span className="text-gold">exhale.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-[color:var(--color-smoke)] leading-relaxed">
            Authentic devices, quiet craftsmanship, and a curated flavour library — shipped fast from Australia to your door.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="bg-gold text-[#0A0A0C] font-semibold px-8 py-4 rounded-md hover:shadow-[0_0_28px_rgba(240,205,110,0.45)] transition-shadow"
            >
              Shop the Collection
            </Link>
            <Link
              to="/about"
              className="border border-[#F0CD6E]/40 text-[color:var(--color-platinum)] px-8 py-4 rounded-md hover:border-[#F0CD6E] hover:text-gold transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedBanner() {
  const slugs = [
    "alibarbar-ingot-strawberry-coconut-watermelon-9000",
    "rival-bar-cola-8000",
    "vapehub-classic-tobacco-20000",
  ];
  const items = slugs.map(s => getProduct(s)).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];
  return (
    <section className="relative py-24 px-4 md:px-8 bg-[#0A0A0C] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <SmokeWisp className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1400px] h-[600px]" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <Eyebrow>Featured Trio</Eyebrow>
          <h2 className="mt-6 font-display font-bold text-4xl md:text-5xl">
            This week's <span className="text-gold">signature picks.</span>
          </h2>
          <p className="mt-4 text-[color:var(--color-smoke)] max-w-xl mx-auto">
            Three devices, hand-selected from our floor. Limited quantities, dispatched same day.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((p, i) => {
            const onSale = p.salePrice != null;
            return (
              <Link
                key={p.slug}
                to="/product/$slug"
                params={{ slug: p.slug }}
                className="group relative bg-gradient-to-b from-[#18181B] to-[#0A0A0C] border border-[#A9791F]/25 rounded-xl overflow-hidden hover:border-[#F0CD6E]/70 hover:shadow-[0_0_50px_rgba(240,205,110,0.15)] transition-all duration-500"
              >
                <div className="absolute top-5 left-5 z-10 text-[10px] tracking-[0.35em] uppercase text-gold border border-[#A9791F]/50 px-3 py-1 bg-[#0A0A0C]/70 backdrop-blur">
                  N° 0{i + 1}
                </div>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-radial from-[#A9791F]/20 via-transparent to-transparent" />
                  <SmartImage
                    src={p.image}
                    alt={p.name}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0A0A0C] to-transparent" />
                </div>
                <div className="relative p-7 border-t border-[#A9791F]/20">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--color-smoke)]">
                    {p.categoryLabel}
                  </div>
                  <h3 className="mt-2 font-display font-bold text-2xl group-hover:text-gold transition-colors">
                    {p.name}
                  </h3>
                  {p.flavour && (
                    <div className="font-spec text-xs text-[color:var(--color-smoke)] mt-1">{p.flavour}</div>
                  )}
                  <div className="mt-6 flex items-end justify-between">
                    <div className="flex items-baseline gap-2">
                      {onSale ? (
                        <>
                          <span className="font-spec text-2xl text-gold">${p.salePrice!.toFixed(2)}</span>
                          <span className="font-spec text-xs text-[color:var(--color-smoke)] line-through">${p.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="font-spec text-2xl text-gold">${p.price.toFixed(2)}</span>
                      )}
                    </div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-gold group-hover:tracking-[0.4em] transition-all">
                      Shop →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PremiumBanner() {
  return (
    <section className="px-4 md:px-8 py-20 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto relative rounded-2xl overflow-hidden border border-[#A9791F]/40 shadow-[0_0_60px_rgba(240,205,110,0.08)]">
        <div className="h-[380px] md:h-[520px] bg-[#0A0A0C]">
          <img
            src={signatureBanner.url}
            srcSet={`${signatureBanner.small} 1000w, ${signatureBanner.url} 1920w`}
            sizes="100vw"
            alt="Alibarbar Ingot 9000 disposable vapes in gold studio lighting"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0C] via-[#0A0A0C]/75 to-[#0A0A0C]/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="p-8 md:p-16 max-w-xl">
            <Eyebrow>The Signature Range</Eyebrow>
            <h2 className="mt-5 font-display font-black text-4xl md:text-6xl leading-[1.05]">
              Poured in <span className="text-gold">gold.</span><br />Finished in silence.
            </h2>
            <p className="mt-5 text-[color:var(--color-smoke)] leading-relaxed">
              Every device on our floor is hand-verified, batch-checked, and dispatched from Melbourne within hours. This is vapour, considered.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="bg-gold text-[#0A0A0C] font-semibold px-8 py-4 rounded-md hover:shadow-[0_0_28px_rgba(240,205,110,0.45)] transition-shadow"
              >
                Shop the Range
              </Link>
              <Link
                to="/about"
                className="border border-[#F0CD6E]/40 text-[color:var(--color-platinum)] px-8 py-4 rounded-md hover:border-[#F0CD6E] hover:text-gold transition-colors"
              >
                Our Standard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HOME_BRANDS = ["alibarbar-9000", "iget-one-12000-puffs", "iget-bar-pro", "vapehub"];

function BrandCollections() {
  // Group all products by their brand (categoryLabel), preserving order of first appearance.
  const groups = new Map<string, typeof products>();
  for (const p of products.filter(x => HOME_BRANDS.includes(brandSlug(x)))) {
    const list = groups.get(p.categoryLabel) ?? [];
    list.push(p);
    groups.set(p.categoryLabel, list);
  }
  const entries = Array.from(groups.entries());
  return (
    <section className="py-24 px-4 md:px-8 bg-[#0A0A0C] relative">
      <div className="max-w-7xl mx-auto">
        <Eyebrow>The Full Collection</Eyebrow>
        <h2 className="mt-6 text-center font-display font-bold text-4xl md:text-5xl">
          Every brand, <span className="text-gold">every flavour.</span>
        </h2>
        <p className="mt-4 text-center text-[color:var(--color-smoke)] max-w-2xl mx-auto">
          Our complete floor — organised by house. Tap any device for specs, batch code, and same-day dispatch.
        </p>
        <div className="mt-16 space-y-20">
          {entries.map(([brand, list]) => (
            <div key={brand}>
              <div className="flex items-end justify-between mb-8 border-b border-[#A9791F]/20 pb-4">
                <div>
                  <div className="text-[10px] tracking-[0.35em] uppercase text-gold">House</div>
                  <h3 className="mt-2 font-display font-bold text-2xl md:text-3xl">{brand}</h3>
                </div>
                <div className="text-xs tracking-[0.25em] uppercase text-[color:var(--color-smoke)]">
                  {list.length} {list.length === 1 ? "device" : "devices"}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {list.map(p => <ProductCard key={p.slug} product={p} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: BadgeCheck, label: "Authentic Stock" },
    { icon: Truck, label: "Fast AU Dispatch" },
    { icon: Lock, label: "Secure Checkout" },
    { icon: ShieldCheck, label: "18+ Verified" },
  ];
  return (
    <section className="border-y border-[#A9791F]/15 bg-[#18181B]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4">
        {items.map(({ icon: Icon, label }, i) => (
          <div key={label} className={`flex items-center justify-center gap-3 py-6 ${i > 0 ? "md:border-l md:border-[#A9791F]/15" : ""} ${i === 1 ? "border-l border-[#A9791F]/15" : ""} ${i === 2 ? "border-t md:border-t-0 border-[#A9791F]/15" : ""} ${i === 3 ? "border-t md:border-t-0 border-l border-[#A9791F]/15" : ""}`}>
            <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
            <span className="text-xs tracking-[0.25em] uppercase text-[color:var(--color-platinum)]/85">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoryGrid() {
  const blurbs: Record<string, string> = {
    "alibarbar-9000": "Pocket-ready, refined.",
    "iget-one-12000-puffs": "12,000 puff flagship.",
    "iget-bar-pro": "10,000 puff icon.",
    "vapehub": "Long-haul, classic profiles.",
  };
  const tiles = HOME_BRANDS.map(slug => {
    const list = byBrand(slug);
    return { slug, label: `Shop ${list[0]?.categoryLabel ?? slug}`, blurb: blurbs[slug] ?? "", image: list[0]?.image ?? "" };
  }).filter(t => t.image);
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <Eyebrow>Shop by Category</Eyebrow>
        <h2 className="mt-6 text-center font-display font-bold text-4xl md:text-5xl">
          Curated <span className="text-gold">collections.</span>
        </h2>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiles.map(t => (
            <Link
              key={t.slug}
              to="/category/$slug"
              params={{ slug: t.slug }}
              className="group relative aspect-[4/5] bg-[#18181B] border border-[#A9791F]/15 rounded-lg overflow-hidden hover:border-[#F0CD6E]/60 transition-all"
            >
              <SmartImage
                src={t.image}
                alt={t.label}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/70 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="text-[10px] tracking-[0.35em] uppercase text-gold">{t.blurb}</div>
                <div className="mt-2 font-display font-bold text-2xl group-hover:text-gold transition-colors">{t.label}</div>
                <div className="mt-3 text-xs tracking-[0.3em] uppercase text-[color:var(--color-smoke)] group-hover:text-[color:var(--color-platinum)] transition-colors">
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Bestsellers() {
  const list = bestsellers();
  return (
    <section className="py-24 px-4 md:px-8 bg-[#18181B] relative">
      <WispDivider className="absolute top-0 left-0" />
      <div className="max-w-7xl mx-auto">
        <Eyebrow>Best Sellers</Eyebrow>
        <h2 className="mt-6 text-center font-display font-bold text-4xl md:text-5xl">
          The most <span className="text-gold">requested.</span>
        </h2>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map(p => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
          <img src={storyPhoto.url} alt="Craftsmanship" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/60 to-transparent" />
        </div>
        <div>
          <Eyebrow>Our Story</Eyebrow>
          <h2 className="mt-6 font-display font-bold text-4xl md:text-5xl leading-tight">
            Built for the <span className="text-gold">considered</span> consumer.
          </h2>
          <p className="mt-6 text-[color:var(--color-smoke)] leading-relaxed">
            AUSVAPE CO was founded on a simple idea: adults deserve a vapour experience that respects them. We stock only verified-authentic devices, we test every flavour before it enters our range, and we ship from our Melbourne warehouse — never from an offshore drop-shipper.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 text-sm tracking-[0.25em] uppercase text-gold hover:gap-3 transition-all"
          >
            Read the story →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { quote: "The Monolith arrived overnight in Melbourne. Presentation felt like unboxing a fragrance, not a vape.", name: "James R.", city: "Melbourne, VIC" },
    { quote: "Finally an Australian retailer that isn't a chaotic mess. Clean site, real stock, real answers to my emails.", name: "Priya S.", city: "Sydney, NSW" },
    { quote: "Ordered a replacement coil at 4pm, tracking by 5pm, at my door the next morning. Won me over.", name: "Ollie M.", city: "Brisbane, QLD" },
  ];
  return (
    <section className="py-24 px-4 md:px-8 bg-[#18181B]">
      <div className="max-w-7xl mx-auto">
        <Eyebrow>Reviews</Eyebrow>
        <h2 className="mt-6 text-center font-display font-bold text-4xl md:text-5xl">
          Words from our <span className="text-gold">customers.</span>
        </h2>
        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {t.map(x => (
            <figure key={x.name} className="bg-[#0A0A0C] border border-[#A9791F]/15 rounded-lg p-8 hover:border-[#A9791F]/40 transition-colors">
              <div className="flex gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <blockquote className="mt-6 text-[color:var(--color-platinum)]/90 leading-relaxed">
                "{x.quote}"
              </blockquote>
              <figcaption className="mt-6 text-xs tracking-[0.25em] uppercase text-[color:var(--color-smoke)]">
                {x.name} · {x.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto bg-[#18181B] border border-[#A9791F]/40 rounded-xl p-8 md:p-14 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 opacity-40">
          <SmokeWisp className="w-full h-full" />
        </div>
        <div className="relative grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Eyebrow>Members</Eyebrow>
            <h3 className="mt-4 font-display font-bold text-3xl md:text-4xl">
              Early access to <span className="text-gold">new drops.</span>
            </h3>
            <p className="mt-3 text-sm text-[color:var(--color-smoke)]">One email a fortnight. New arrivals, restocks, and a 10% welcome credit.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 bg-[#0A0A0C] border border-[#A9791F]/25 rounded-md px-4 py-3 text-[color:var(--color-platinum)] focus:border-[#F0CD6E] outline-none placeholder:text-[color:var(--color-smoke)]/60"
            />
            <button className="bg-gold text-[#0A0A0C] font-semibold px-6 py-3 rounded-md hover:shadow-[0_0_24px_rgba(240,205,110,0.4)] transition-shadow">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Do you ship anywhere in Australia?", a: "Yes. We ship Australia-wide from our Melbourne warehouse via Australia Post Express. Metro orders typically arrive next business day; regional 2–4 business days." },
  { q: "How do you verify products are authentic?", a: "We purchase directly from manufacturer-authorised distributors and check batch codes on receipt. Every device includes its authenticity sticker with a scannable code." },
  { q: "What is your return policy?", a: "Unopened, sealed products can be returned within 14 days of delivery. For hygiene reasons, opened pods and disposables cannot be returned unless the item is defective — in which case we replace it free of charge." },
  { q: "Do I need to prove my age?", a: "Yes. AUSVAPE CO sells only to adults 18 or older. We may request ID verification at checkout, and our courier requires a signature from someone of legal age on delivery." },
  { q: "Are the products TGA-compliant?", a: "Our range is curated to align with current Australian regulations for adult vapour products. If a product's regulatory status changes, we remove it from sale." },
  { q: "What if my order arrives damaged?", a: "Contact us within 48 hours of delivery with photos and your order number. We'll dispatch a replacement or issue a full refund the same business day." },
  { q: "Do you offer discreet packaging?", a: "Every order ships in a plain, unbranded satchel with no visible product references on the exterior." },
  { q: "Can I collect an order in person?", a: "Click-and-collect is available at our Melbourne CBD counter Mon–Fri 10am–5pm. Select 'Pickup' at checkout." },
];

function FAQ() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Eyebrow>Frequently Asked</Eyebrow>
        <h2 className="mt-6 text-center font-display font-bold text-4xl md:text-5xl">
          Questions, <span className="text-gold">answered.</span>
        </h2>
        <div className="mt-14 divide-y divide-[#A9791F]/15 border-y border-[#A9791F]/15">
          {faqs.map((f, i) => <FAQItem key={i} {...f} />)}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between text-left py-5 gap-4 group"
      >
        <span className="font-display font-medium text-lg group-hover:text-gold transition-colors">{q}</span>
        <ChevronDown className={`w-5 h-5 text-gold shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <p className="text-[color:var(--color-smoke)] leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}
