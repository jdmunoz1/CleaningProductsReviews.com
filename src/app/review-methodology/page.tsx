import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata: Metadata = legalMetadata(
  "Review Methodology",
  "How we assess cleaning products — the research-based method behind every recommendation.",
);

export default function ReviewMethodologyPage() {
  return (
    <LegalPage title="Review Methodology" lede="A simple, honest method: read the documentation, compare the specs, weigh owner experience, disclose the limits.">
      <p><strong>Sources.</strong> For every product we use three kinds of evidence: official documentation and specifications, hands-on experience when we genuinely have it, and the long tail of owner feedback across forums, retailers and communities.</p>
      <p><strong>Criteria.</strong> Each category has its own weights — for vacuums it&apos;s suction, filtration, floor range, ergonomics and maintenance; for cleaning chemistry it&apos;s efficacy, safety and surface fit. The criteria are named on each review.</p>
      <p><strong>What we never do.</strong> We never invent measurements, prices, star ratings or original lab results. If an attribute is a marketing claim without corroboration, we label it as such.</p>
      <p><strong>Testing.</strong> When we say &ldquo;we tested,&rdquo; a member of the team physically used the product and we describe what happened. Otherwise we say so openly — most reviews on this site are research-based, and every one says which it is.</p>
    </LegalPage>
  );
}
