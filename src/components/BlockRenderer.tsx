import Link from "next/link";
import { resolve } from "@/lib/catalog";
import { ProductMini } from "./ProductMini";
import type { Block } from "@/content/types";

const calloutStyles: Record<string, string> = {
  tip: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warn: "border-amber-200 bg-amber-50 text-amber-900",
  info: "border-sky-200 bg-sky-50 text-sky-900",
  research: "border-violet-200 bg-violet-50 text-violet-950",
};
const calloutTitles: Record<string, string> = {
  tip: "Tip",
  warn: "Watch out",
  info: "Good to know",
  research: "Research note",
};

export function BlockRenderer({ blocks, inArticle = true }: { blocks: Block[]; inArticle?: boolean }) {
  return (
    <div className={inArticle ? "prose-body" : ""}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return <p key={i}>{block.text}</p>;
          case "h2":
            return <h2 key={i} className="prose-h h2">{block.text}</h2>;
          case "h3":
            return <h3 key={i} className="prose-h h3">{block.text}</h3>;
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {block.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className="border-l-4 border-line pl-4 italic text-muted">
                {block.text}
              </blockquote>
            );
          case "callout":
            return (
              <div key={i} className={`my-4 rounded-lg border-l-4 p-4 text-sm leading-relaxed ${calloutStyles[block.tone] ?? calloutStyles.info}`}>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider">{block.title ?? calloutTitles[block.tone]}</p>
                <p>{block.text}</p>
              </div>
            );
          case "product":
            return <ProductMini key={i} slug={block.slug} />;
          case "bestlist":
            return <InlineRelated key={i} type="best" slug={block.slug} />;
          case "guide":
            return <InlineRelated key={i} type="guide" slug={block.slug} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function InlineRelated({ type, slug }: { type: "best" | "guide" | "compare"; slug: string }) {
  const rel = resolve(type, slug);
  return (
    <Link href={rel.url} className="mt-2 inline-flex items-center gap-2 rounded-md border border-line bg-paper-soft px-3 py-2 text-sm font-medium text-accent-ink hover:bg-accent-soft">
      {type === "best" ? "🏆 Best list" : type === "compare" ? "⚖️ Comparison" : "📖 Guide"}
      <span className="font-semibold">{slug.split("-").join(" ")}</span>
      <span aria-hidden>→</span>
    </Link>
  );
}

export function BlockCursor({ url }: { url: string }) {
  return (
    <a href={url} className="inline-flex items-center gap-1 text-sm font-semibold text-accent-ink hover:underline">
      Read the full review <span aria-hidden>→</span>
    </a>
  );
}
