import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata: Metadata = legalMetadata(
  "Editorial Policy",
  "The rules that govern what we publish — independence, honesty and traceable claims.",
);

export default function EditorialPolicyPage() {
  return (
    <LegalPage title="Editorial Policy" lede="The values behind every guide, review and comparison we publish.">
      <p><strong>Independence.</strong> No manufacturer, retailer or advertiser decides what we cover or how we rank it. We don&apos;t accept money for favourable coverage, and sponsored content is labelled as such.</p>
      <p><strong>Honesty.</strong> We say when we haven&apos;t physically tested a product. Claims about performance are grounded in documentation, specifications and broadly-reported owner experience — never in invented lab tests, prices or ratings.</p>
      <p><strong>Traceability.</strong> If a number is quoted, it comes from a source we can name. When the evidence is ambiguous, we say so rather than pretending certainty.</p>
      <p><strong>Corrections.</strong> Mistakes get fixed promptly and prominently. We will not bury a correction.</p>
      <p><strong>Disclosure.</strong> Where a page can earn money, it says so clearly. Affiliate links are marked structurally so nothing is hidden.</p>
    </LegalPage>
  );
}
