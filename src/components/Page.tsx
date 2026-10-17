import Link from "next/link";
import { Swatch } from "./Label";

export function PageTitle({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <header className="max-w-3xl py-10">
      <div className="border-t-[3px] border-rule-ink pt-4">
        {eyebrow ? <p className="label-caps mb-3 text-ink-3">{eyebrow}</p> : null}
        <h1 className="prose-h">{title}</h1>
        {lede ? <p className="mt-4 text-lg leading-relaxed text-ink-2">{lede}</p> : null}
      </div>
    </header>
  );
}

/** Index-page entry: a label column (ink top rule, no box), with an area swatch when it has one. */
export function CardLink({
  href,
  title,
  description,
  meta,
  category,
}: {
  href: string;
  title: string;
  description: string;
  meta?: string;
  category?: string;
}) {
  return (
    <Link href={href} className="group flex flex-col border-t-2 border-rule-ink pt-3">
      {meta ? (
        <p className="label-caps flex items-center gap-2 text-ink-3">
          {category ? <Swatch category={category} /> : null}
          {meta}
        </p>
      ) : null}
      <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-ink [font-stretch:92%] group-hover:underline group-hover:underline-offset-4">
        {title}
      </h3>
      <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-2">{description}</p>
    </Link>
  );
}
