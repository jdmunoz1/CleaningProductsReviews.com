import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/content/categories";
import { getCategory, getProduct, urlFor, getBest, getGuide, getComparison, fullUrl } from "@/lib/catalog";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.metaDescription,
    alternates: { canonical: fullUrl("category", slug) },
    openGraph: {
      title: cat.name,
      description: cat.metaDescription,
      url: fullUrl("category", slug),
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const children = (cat.children ?? []).map((s) => getCategory(s)).filter((x): x is NonNullable<typeof x> => x !== undefined);
  const bests = (cat.best ?? []).map((s) => getBest(s)).filter((x): x is NonNullable<typeof x> => x !== undefined);
  const guides = (cat.guides ?? []).map((s) => getGuide(s)).filter((x): x is NonNullable<typeof x> => x !== undefined);
  const comparisons = (cat.comparisons ?? []).map((s) => getComparison(s)).filter((x): x is NonNullable<typeof x> => x !== undefined);
  const featured = (cat.featuredProducts ?? []).slice(0, 6);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.name,
    description: cat.description,
    url: fullUrl("category", slug),
    isPartOf: { "@type": "WebSite", name: "CleaningProductsReviews.com", url: "https://www.cleaningproductsreviews.com" },
  };

  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={schema} />
      <nav className="mb-5 text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-accent-ink">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{cat.name}</span>
      </nav>

      <header className="max-w-3xl">
        <h1 className="prose-h">{cat.name}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted">{cat.description}</p>
      </header>

      {children.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold">In this section</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {children.map((c) => (
              <Link key={c.slug} href={urlFor("category", c.slug)} className="rounded-xl border border-line bg-paper-soft p-5 transition hover:border-accent">
                <h3 className="font-semibold text-ink hover:text-accent-ink">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.short}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {bests.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">Best of the category</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bests.map((b) => (
              <Link key={b.slug} href={urlFor("best", b.slug)} className="rounded-xl border border-line p-5 transition hover:border-accent">
                <h3 className="font-semibold text-ink hover:text-accent-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">Featured reviews</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => {
              const p = getProduct(s);
              if (!p) return null;
              return (
                <Link key={s} href={urlFor("review", s)} className="group rounded-xl border border-line p-4 transition hover:border-accent">
                  <Image src={p.image} alt={`Illustration of the ${p.name}`} width={400} height={300} className="aspect-[4/3] rounded-lg object-cover" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">{p.brand}</p>
                  <h3 className="mt-1 font-semibold text-ink group-hover:text-accent-ink">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{p.tagline}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {comparisons.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">Head-to-head comparisons</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {comparisons.map((c) => (
              <Link key={c.slug} href={urlFor("compare", c.slug)} className="rounded-xl border border-line p-5 transition hover:border-accent">
                <h3 className="font-semibold text-ink hover:text-accent-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {guides.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold">Buying guides</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <Link key={g.slug} href={urlFor("guide", g.slug)} className="rounded-xl border border-line p-5 transition hover:border-accent">
                <h3 className="font-semibold text-ink hover:text-accent-ink">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {cat.hubIntro.length > 0 && (
        <section className="mt-12 rounded-xl border border-line bg-paper-soft p-6">
          <h2 className="text-xl font-bold">Why this cluster exists</h2>
          <ul className="mt-4 space-y-2">
            {cat.hubIntro.map((line, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                {line}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
