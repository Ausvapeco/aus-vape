import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/ausvape/SiteLayout";
import { Eyebrow } from "@/components/ausvape/Eyebrow";
import { ProductCard } from "@/components/ausvape/ProductCard";
import { byCategory, categories } from "@/lib/products";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = categories.find(c => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ params, loaderData }) => {
    const label = loaderData?.cat.label ?? "Category";
    const title = `${label} — Shop the Range | AUSVAPE CO`;
    const description = `${loaderData?.cat.blurb ?? ""} Shop authentic ${label} at AUSVAPE CO with same-day dispatch from Melbourne and free express shipping over $80.`.trim().slice(0, 158);
    const url = `https://aus-vape.lovable.app/category/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="py-32 text-center">
        <h1 className="font-display text-4xl">Category not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-gold">Back to shop →</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ reset }) => (
    <SiteLayout>
      <div className="py-32 text-center">
        <h1 className="font-display text-3xl">Something went wrong</h1>
        <button onClick={reset} className="mt-6 text-gold">Retry</button>
      </div>
    </SiteLayout>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const list = byCategory(cat.slug);
  return (
    <SiteLayout>
      <section className="pt-20 pb-10 px-4 md:px-8 border-b border-[#A9791F]/15">
        <div className="max-w-7xl mx-auto text-center">
          <Eyebrow>{cat.blurb}</Eyebrow>
          <h1 className="mt-6 font-display font-black text-5xl md:text-6xl">
            <span className="text-gold">{cat.label}</span>
          </h1>
        </div>
      </section>
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map(p => <ProductCard key={p.slug} product={p} />)}
          {list.length === 0 && <p className="text-[color:var(--color-smoke)]">No products yet in this category.</p>}
        </div>
      </section>
    </SiteLayout>
  );
}