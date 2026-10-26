import Link from "next/link";
import { products } from "@/content/products";
import { bestLists } from "@/content/best";
import { guides } from "@/content/guides";
import { site } from "@/content/site";
import { JsonLd } from "@/components/JsonLd";
import { hubs, AreaRows, BestRows, GuideRows, SectionRule, ReviewCard } from "@/components/Label";
import { ORGANIZATION, ORGANIZATION_REF } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Independent, research-based reviews, comparisons and buying guides for vacuums, carpet cleaners, mops, sprays, laundry and pet cleaning products.",
  alternates: { canonical: "/" },
};

/** What we read before we recommend anything. Mirrors /review-methodology. */
const method = [
  { n: "01", title: "The manual", body: "Manufacturer documentation, specifications and care instructions." },
  { n: "02", title: "The owners", body: "How long-term owners describe the product after months of real use." },
  { n: "03", title: "The criteria", body: "Our buying criteria for that surface, that mess and that budget." },
];

export default function HomePage() {
  const featured = products.slice(0, 9);
  const lists = bestLists.slice(0, 6);
  const guideList = guides.slice(0, 8);

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

      {/* Hero: the question first, the area picker right beside it. */}
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div className="lg:pt-6">
            <p className="label-caps text-ink-3">
              Independent reviews · Since <span className="num">{site.founded}</span>
            </p>
            <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.1rem)] font-extrabold leading-[0.98] tracking-[-0.025em] [font-stretch:86%]">
              {site.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/product-finder"
                className="inline-flex min-h-12 items-center rounded-[4px] bg-ink px-5 text-[0.9375rem] font-semibold text-enamel transition-colors duration-150 hover:bg-ink-2"
              >
                Use the product finder
              </Link>
              <Link
                href="/reviews"
                className="inline-flex min-h-12 items-center rounded-[4px] border border-rule-strong px-5 text-[0.9375rem] font-semibold text-ink transition-colors duration-150 hover:border-ink"
              >
                Browse all <span className="num mx-1">{products.length}</span> reviews
              </Link>
            </div>
            <p className="mt-8 max-w-lg border-l-2 border-glove pl-4 text-[0.9375rem] leading-relaxed text-ink-2">
              Research-based recommendations from documentation, specifications and owner feedback. Never a lab we
              don&rsquo;t have, and never a score we didn&rsquo;t earn.
            </p>
          </div>

          <nav aria-labelledby="areas-title" className="rounded-[6px] border border-rule-strong bg-label">
            <div className="flex items-baseline justify-between gap-3 border-b-[3px] border-rule-ink px-5 py-3">
              <h2 id="areas-title" className="label-caps text-ink">What are you cleaning?</h2>
              <span aria-hidden className="label-caps text-ink-4">Reviews</span>
            </div>
            <AreaRows items={hubs} />
          </nav>
        </div>
      </section>

      {/* How we review: the honesty statement, set as label directions. */}
      <section aria-labelledby="method-title" className="bg-sink">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-[14rem_1fr]">
            <div>
              <h2 id="method-title" className="label-caps text-ink">How we review</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-3">
                Every review says how it was made.{" "}
                <Link href="/review-methodology" className="ink-link">Read the methodology</Link>
              </p>
            </div>
            <ol className="grid gap-6 sm:grid-cols-3">
              {method.map((m) => (
                <li key={m.n} className="border-t border-rule-strong pt-3">
                  <span className="num font-display text-sm font-bold text-ink-3">{m.n}</span>
                  <p className="mt-1 font-display text-lg font-bold [font-stretch:92%]">{m.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{m.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section aria-labelledby="latest-title" className="mx-auto max-w-6xl px-4 pt-14">
        <SectionRule id="latest-title" kicker="Latest" title="Reviews" href="/reviews" linkText="See all reviews" />
        <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <ReviewCard key={p.slug} product={p} priority={i < 3} />
          ))}
        </div>
      </section>

      <section aria-labelledby="best-title" className="mx-auto max-w-6xl px-4 pt-16">
        <SectionRule id="best-title" kicker="Shortlists" title="Best-of lists" href="/best" linkText="All best-of lists" />
        <BestRows lists={lists} />
      </section>

      <section aria-labelledby="guides-title" className="mx-auto max-w-6xl px-4 pt-16">
        <SectionRule
          id="guides-title"
          kicker="Before you buy"
          title="Buying guides"
          href="/guides"
          linkText={`All ${guides.length} guides`}
        />
        <GuideRows guides={guideList} />
      </section>
    </>
  );
}
