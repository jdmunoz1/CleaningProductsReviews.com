import Link from "next/link";
import { resolve } from "@/lib/catalog";
import { ProductMini } from "./ProductMini";
import type { Block } from "@/content/types";

/* Same ink everywhere; only the left rule and a faint tint say what kind of note it is. */
const calloutStyles: Record<string, string> = {
  tip: "border-cloth-green bg-[#eef5f0]",
  warn: "border-glove-deep bg-glove-soft",
  info: "border-rinse bg-rinse-soft",
  research: "border-ink bg-sink",
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
              <blockquote key={i} className="my-5 border-l-2 border-rule-strong pl-4 text-lg italic leading-relaxed text-ink-2">
                {block.text}
              </blockquote>
            );
          case "callout":
            return (
              <div key={i} className={`not-prose my-5 rounded-r-[4px] border-l-[3px] px-4 py-3 text-[0.9375rem] leading-relaxed text-ink ${calloutStyles[block.tone] ?? calloutStyles.info}`}>
                <p className="label-caps mb-1 text-ink-2">{block.title ?? calloutTitles[block.tone]}</p>
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
    <Link href={rel.url} className="group my-2 flex min-h-11 items-center gap-3 rounded-[4px] border border-rule-strong bg-label px-3 py-2 text-[0.9375rem] text-ink transition-colors duration-150 hover:border-ink">
      <span className="label-caps flex-none rounded-[3px] bg-sink px-1.5 py-1 text-ink-2">
        {type === "best" ? "Best list" : type === "compare" ? "Comparison" : "Guide"}
      </span>
      <span className="min-w-0 font-semibold first-letter:uppercase group-hover:underline group-hover:underline-offset-4">{slug.split("-").join(" ")}</span>
      <span aria-hidden className="ml-auto text-ink-3 group-hover:text-ink">→</span>
    </Link>
  );
}

export function BlockCursor({ url }: { url: string }) {
  return (
    <a href={url} className="ink-link inline-flex items-center gap-1 text-sm font-semibold">
      Read the full review <span aria-hidden>→</span>
    </a>
  );
}
