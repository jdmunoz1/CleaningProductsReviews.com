import Image from "next/image";
import Link from "next/link";
import { urlFor, getProduct } from "@/lib/catalog";
import { AffiliateButton, WorksOn } from "./Label";

/** One product row used on hubs, reviews and best lists: a strip cut from the back label. */
export function ProductMini({
  slug,
  rankLabel,
  image = true,
}: {
  slug: string;
  rankLabel?: string;
  image?: boolean;
}) {
  const product = getProduct(slug);
  if (!product) return null;
  return (
    <div className="not-prose my-4 flex flex-col gap-4 rounded-[6px] border border-rule-strong bg-label p-4 sm:flex-row sm:items-start">
      {image && (
        <div className="relative flex-none overflow-hidden rounded-[4px] border border-rule bg-sink sm:w-40">
          <Image
            src={product.image}
            alt={`Illustration of the ${product.name}`}
            width={320}
            height={240}
            sizes="(min-width: 640px) 160px, 100vw"
            className="aspect-[4/3] w-full object-cover"
          />
          {rankLabel ? (
            <span className="label-caps absolute left-2 top-2 rounded-[3px] border border-ink bg-glove px-2 py-1 text-ink">{rankLabel}</span>
          ) : null}
        </div>
      )}
      <div className="min-w-0 flex-1">
        {rankLabel && !image ? (
          <span className="label-caps mb-2 inline-block rounded-[3px] border border-ink bg-glove px-2 py-1 text-ink">{rankLabel}</span>
        ) : null}
        <p className="label-caps text-ink-3">{product.brand}</p>
        <Link
          href={urlFor("review", product.slug)}
          className="mt-1 block font-display text-lg font-bold leading-snug text-ink [font-stretch:92%] hover:underline hover:underline-offset-4"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{product.tagline}</p>
        <div className="mt-3">
          <WorksOn items={product.idealFor} max={3} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <AffiliateButton product={product} compact />
          <Link href={urlFor("review", product.slug)} className="ink-link inline-flex min-h-11 items-center text-sm font-semibold">
            Read the review
          </Link>
        </div>
      </div>
    </div>
  );
}
