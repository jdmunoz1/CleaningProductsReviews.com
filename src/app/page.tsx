import Image from "next/image";
import Link from "next/link";
import { categories } from "@/content/categories";
import { products } from "@/content/products";
import { bestLists } from "@/content/best";
import { guides } from "@/content/guides";
import { site } from "@/content/site";
import { urlFor, productName } from "@/lib/catalog";
import { JsonLd } from "@/components/JsonLd";
import { BlockRenderer } from "@/components/BlockRenderer";
import { ORGANIZATION, ORGANIZATION_REF } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Independent, research-based reviews, comparisons and buying guides for vacuums, carpet cleaners, mops, sprays, laundry and pet cleaning products.",
  alternates: { canonical: "/" },
};

/** Top-level hubs only (no `children` of any parent). */
const hubs = Object.values(categories).filter((c) => !Object.values(categories).some((p) => p.children.includes(c.slug)));

export default function HomePage() {
  const featured = products.slice(0, 12);
  const list = bestLists.slice(0, 6);

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.domain}/#website`,
        name: site.name,
        description: site.description,
        url: site.domain,
        publisher: ORGANIZATION_REF,
      },
      ORGANIZATION,
    ],
  };

  return (
    <>
      <JsonLd data={homeSchema} />
      <section className="bg-gradient-to-b from-paper-soft to-paper">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent-ink">Independent reviews · Since {site.founded}</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">{site.heroTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/reviews" className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-ink">
              Browse all reviews
            </Link>
            <Link href="/product-finder" className="rounded-lg border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink hover:border-accent hover:text-accent-ink">
              Use the product finder
            </Link>
          </div>
          <p className="mt-6 text-sm italic text-muted">
            Research-based recommendations from product documentation, specifications and owner feedback — never a lab we don't have.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight">Start by cleaning area</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hubs.map((c) => (
            <Link key={c.slug} href={urlFor("category", c.slug)} className="group rounded-xl border border-line bg-paper-soft p-5 transition hover:border-accent">
              <h3 className="font-semibold text-ink group-hover:text-accent-ink">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.short}</p>
              <p className="mt-4 text-sm font-semibold text-accent-ink">Explore the cluster →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Latest reviews</h2>
          <Link href="/reviews" className="text-sm font-semibold text-accent-ink hover:underline">See all</Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link key={p.slug} href={urlFor("review", p.slug)} className="group rounded-xl border border-line p-4 transition hover:border-accent">
              <Image src={p.image} alt={`Illustration of the ${p.name}`} width={1440} height={1080} className="aspect-[4/3] rounded-lg object-cover" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">{p.brand}</p>
              <h3 className="mt-1 font-semibold text-ink group-hover:text-accent-ink">{p.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Best-of lists</h2>
          <Link href="/compare" className="text-sm font-semibold text-accent-ink hover:underline">Comparisons</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => (
            <Link key={b.slug} href={urlFor("best", b.slug)} className="group rounded-xl border border-line p-5 transition hover:border-accent">
              <h3 className="font-semibold text-ink group-hover:text-accent-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.metaDescription}</p>
              <p className="mt-4 text-sm font-semibold text-accent-ink">{b.picks.length} picks →</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper-soft">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Buying guides</h2>
            <Link href="/guides" className="text-sm font-semibold text-accent-ink hover:underline">All guides</Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <Link key={g.slug} href={urlFor("guide", g.slug)} className="group rounded-xl border border-line bg-paper p-5 transition hover:border-accent">
                <h3 className="font-semibold text-ink group-hover:text-accent-ink">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
