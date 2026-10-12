import Link from "next/link";

export function PageTitle({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <header className="mx-auto max-w-3xl py-10">
      {eyebrow ? <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent-ink">{eyebrow}</p> : null}
      <h1 className="prose-h">{title}</h1>
      {lede ? <p className="mt-3 text-lg leading-relaxed text-muted">{lede}</p> : null}
    </header>
  );
}

export function CardLink({
  href,
  title,
  description,
  meta,
}: {
  href: string;
  title: string;
  description: string;
  meta?: string;
}) {
  return (
    <Link href={href} className="group flex flex-col rounded-xl border border-line bg-paper p-5 transition hover:border-accent">
      <h3 className="font-semibold leading-snug text-ink group-hover:text-accent-ink">{title}</h3>
      {meta ? <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">{meta}</p> : null}
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      <span className="mt-3 text-sm font-semibold text-accent-ink">Read →</span>
    </Link>
  );
}
