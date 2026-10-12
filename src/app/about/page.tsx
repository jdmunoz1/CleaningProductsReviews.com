import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are and how CleaningProductsReviews.com approaches independent, research-based reviews.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="prose-h">About {site.name}</h1>
      <div className="prose-body mt-4 text-[15px]">
        <p>
          <strong>CleaningProductsReviews.com</strong> started with a simple observation: most people clean a home with products
          chosen by habit, not by evidence. The shelf is enormous and the marketing is louder than ever; knowing which cleaner,
          vacuum or mop deserves your money shouldn't require a chemistry degree or a fleet of review gadgets.
        </p>
        <p>
          We are an independent editorial site. We read product documentation, compare official specifications, synthesise the
          long tail of owner experience, and write honest buying guidance. When we cannot verify a claim, we say so. We never
          invent test results, prices or star ratings.
        </p>
        <p>Today the site covers nine cleaning clusters and more than {140 + 8} pages; as we grow, every page stays grounded in the same rules.</p>
      </div>
    </div>
  );
}
