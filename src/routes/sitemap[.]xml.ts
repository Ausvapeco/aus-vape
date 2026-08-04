import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { products, categories } from "@/lib/products";

const BASE_URL = "https://aus-vape.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/shop", changefreq: "daily", priority: "0.9" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
          { path: "/blog", changefreq: "weekly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          ...categories.map((c) => ({ path: `/category/${c.slug}`, changefreq: "weekly" as const, priority: "0.8" })),
          ...products.map((p) => ({ path: `/product/${p.slug}`, changefreq: "weekly" as const, priority: "0.7" })),
          ...["age-policy", "privacy", "shipping", "terms"].map((s) => ({
            path: `/legal/${s}`,
            changefreq: "yearly" as const,
            priority: "0.3",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
