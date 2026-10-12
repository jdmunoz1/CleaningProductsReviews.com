import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata: Metadata = legalMetadata(
  "Contact",
  "Get in touch with CleaningProductsReviews.com for corrections, feedback or business enquiries.",
);

export default function ContactPage() {
  return (
    <LegalPage
      title="Contact"
      lede="We read everything. Corrections and factual feedback are the fastest way to win a reply."
    >
      <p>Preferred channel: email <strong>hello@cleaningproductsreviews.com</strong> (joins are not required).</p>
      <p>For corrections, include the page URL and your source so we can verify and update.</p>
      <p>For affiliate/manufacturer partnerships and guest pitches, use the subject line&nbsp;— <em>partnership</em> — so it lands in the right place.</p>
    </LegalPage>
  );
}
