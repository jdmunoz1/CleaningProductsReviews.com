import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/content/brands";
import { bestLists } from "@/content/best";
import { comparisons } from "@/content/comparisons";
import { getBrand, getProduct, getReview, urlFor, fullUrl, categoryName, brandIsIndexable } from "@/lib/catalog";
import { JsonLd } from "@/components/JsonLd";
import { BlockRenderer } from "@/components/BlockRenderer";
import { AffiliateButton, ArticleHeader, Breadcrumb, Disclosure, MarkList, SectionRule, Swatch, TitleRows, WorksOn } from "@/components/Label";
import { site } from "@/content/site";
import { DEFAULT_OG_IMAGE, breadcrumbSchema, productOgImage, seoDescription, seoTitle } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) return {};
  const description = seoDescription(`${b.short} Research-based ${b.name} reviews, comparisons and buying advice.`);
  const lead = getProduct(b.products[0] ?? "");
  return {
    title: seoTitle(`${b.name} Reviews`),
    description,
    alternates: { canonical: fullUrl("brand", slug) },
    // Single-product brands with no list or comparison presence duplicate their review.
    ...(brandIsIndexable(slug) ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title: `${b.name} Reviews`,
      description,
      url: fullUrl("brand", slug),
      type: "profile",
      images: [lead ? productOgImage(lead.image, `Illustration of the ${lead.name}`) : DEFAULT_OG_IMAGE],
    },
  };
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBrand(slug);
  if (!b) notFound();
  const brandProducts = (b.products ?? [])
    .map((s) => getProduct(s))
    .filter((x): x is NonNullable<typeof x> => x !== undefined);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: b.updated,
    mainEntity: {
      "@type": "Organization",
      name: b.name,
      description: b.short,
      url: fullUrl("brand", slug),
    },
  };
  const crumbs = breadcrumbSchema([
    { name: "Home", url: site.domain },
    { name: "Brands", url: `${site.domain}/brands` },
    { name: b.name, url: fullUrl("brand", slug) },
  ]);

  const owned = new Set(brandProducts.map((p) => p.slug));
  // Everything below is drawn from the catalog, so each brand page links its real footprint on the site.
  const areas = [...new Set(brandProducts.map((p) => p.category))];
  const placements = bestLists.flatMap((list) =>
    list.picks
      .map((pick, i) => ({ list, pick, rank: i + 1, product: getProduct(pick.productSlug) }))
      .filter((x) => owned.has(x.pick.productSlug) && x.product),
  );
  const matchups = comparisons.filter((c) => owned.has(c.a.productSlug ?? "") || owned.has(c.b.productSlug ?? ""));

  return (
    <article className="mx-auto max-w-4xl px-4 py-10">
      <JsonLd data={schema} />
      <JsonLd data={crumbs} />
      <Breadcrumb trail={[{ name: "Home", href: "/" }, { name: "Brands", href: "/brands" }, { name: b.name }]} />
      <ArticleHeader kicker="Brand" title={`${b.name} — Reviews & Guide`} lede={b.short} />

      {areas.length > 0 && (
        <ul aria-label={`Cleaning areas ${b.name} covers`} className="mt-5 flex flex-wrap gap-2">
          {areas.map((a) => (
            <li key={a}>
              <Link
                href={urlFor("category", a)}
                className="inline-flex min-h-9 items-center gap-2 rounded-[3px] border border-rule-strong bg-label px-2.5 text-sm text-ink-2 transition-colors duration-150 hover:border-ink hover:text-ink"
              >
                <Swatch category={a} />
                {categoryName(a)}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="prose-body mt-6">
        <BlockRenderer blocks={b.intro} />
        <BlockRenderer blocks={b.body} />
      </div>

      {brandProducts.length > 0 && (
        <section aria-labelledby="products-title" className="mt-14">
          <SectionRule
            id="products-title"
            kicker={`${brandProducts.length} ${brandProducts.length === 1 ? "review" : "reviews"}`}
            title={`${b.name} products we cover`}
          />
          <div className="mt-6 space-y-6">
            {brandProducts.map((p) => (
              <BrandProduct key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {placements.length > 0 && (
        <section aria-labelledby="ranked-title" className="mt-14">
          <SectionRule id="ranked-title" kicker="Shortlists" title={`Where ${b.name} ranks in our best-of lists`} />
          <ul className="mt-2 divide-y divide-rule border-b border-rule">
            {placements.map(({ list, pick, rank, product }) => (
              <li key={`${list.slug}-${pick.productSlug}`}>
                <Link href={`${urlFor("best", list.slug)}#pick-${rank}`} className="group grid gap-x-4 gap-y-1 py-4 sm:grid-cols-[auto_1fr] sm:items-baseline">
                  <span className="label-caps w-fit rounded-[3px] border border-ink bg-glove-soft px-2 py-1 text-ink">{pick.tag}</span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg font-bold leading-snug [font-stretch:92%] group-hover:underline group-hover:underline-offset-4">
                      {list.title}
                    </span>
                    <span className="mt-0.5 block text-[0.9375rem] text-ink-3">
                      <span className="num">#{rank}</span> of {list.picks.length}: {product!.name}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {matchups.length > 0 && (
        <section aria-labelledby="matchups-title" className="mt-14">
          <SectionRule id="matchups-title" kicker="Head to head" title={`${b.name} compared`} />
          <TitleRows
            items={matchups.map((c) => ({
              href: urlFor("compare", c.slug),
              title: c.title,
              description: c.metaDescription,
              category: c.category,
            }))}
          />
        </section>
      )}

      <Disclosure />
    </article>
  );
}

/** One product as a cut-down back label: what it works on, what it does well, what to watch for. */
function BrandProduct({ product }: { product: NonNullable<ReturnType<typeof getProduct>> }) {
  const review = getReview(product.slug);
  return (
    <div className="rounded-[6px] border border-rule-strong bg-label">
      <div className="grid gap-5 p-5 sm:grid-cols-[180px_1fr]">
        <div className="self-start overflow-hidden rounded-[4px] border border-rule bg-sink">
          <Image
            src={product.image}
            alt={`Illustration of the ${product.name}`}
            width={360}
            height={270}
            sizes="(min-width: 640px) 180px, 100vw"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="label-caps flex items-center gap-2 text-ink-3">
            <Swatch category={product.category} />
            {product.kind}
          </p>
          <h3 className="mt-1 font-display text-xl font-bold leading-snug [font-stretch:92%]">
            <Link href={urlFor("review", product.slug)} className="hover:underline hover:underline-offset-4">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{product.tagline}</p>
          <div className="mt-3">
            <WorksOn items={product.idealFor} />
          </div>
        </div>
      </div>
      {review && (review.pros.length > 0 || review.cons.length > 0) && (
        <div className="grid gap-5 border-t border-rule px-5 py-4 sm:grid-cols-2 sm:gap-8">
          <MarkList bare title="Strengths" items={review.pros} mark="+" />
          <MarkList bare title="Watch-outs" items={review.cons} mark="−" />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule bg-sink/60 px-5 py-3">
        <AffiliateButton product={product} compact />
        <Link href={urlFor("review", product.slug)} className="ink-link inline-flex min-h-11 items-center text-sm font-semibold">
          Read the full review
        </Link>
      </div>
    </div>
  );
}
