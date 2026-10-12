import Image from "next/image";
import Link from "next/link";
import { merchants } from "@/content/merchants";
import { urlFor, getProduct } from "@/lib/catalog";
import { affiliateUrl } from "@/content/merchants";

/** One product card used on hubs, reviews and best lists. */
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
  const merchant = merchants[product.merchantId];
  return (
    <div className="flex items-start gap-4 rounded-xl border border-line bg-paper-soft p-4">
      {rankLabel ? (
        <div className="grid flex-none place-items-center rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-bold tracking-wide text-accent-ink">
          {rankLabel}
        </div>
      ) : null}
      {image && (
        <Image
          src={product.image}
          alt={product.name}
          width={160}
          height={120}
          className="flex-none rounded-lg object-cover"
          priority={false}
        />
      )}
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">{product.brand}</p>
        <Link href={urlFor("review", product.slug)} className="prose-h font-semibold leading-tight hover:text-accent-ink">
          {product.name}
        </Link>
        <p className="mt-1 text-sm leading-relaxed text-muted">{product.tagline}</p>
        <a
          href={affiliateUrl(product.merchantId, product.productKey)}
          rel={merchant.rel}
          target="_blank"
          referrerPolicy="no-referrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-sm font-semibold text-white hover:bg-accent-ink"
        >
          {merchant.cta}
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
