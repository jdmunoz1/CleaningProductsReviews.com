import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata: Metadata = legalMetadata(
  "Terms of Use",
  "The terms that apply when you use CleaningProductsReviews.com.",
);

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" lede="Simple, reasonable terms for the site. We try to keep everything readable.">
      <p>By using CleaningProductsReviews.com you agree to these terms. Content is provided &ldquo;as-is&rdquo; for information purposes and is not professional advice specific to your situation — always follow the product label and your own surfaces.</p>
      <p>We may update these terms at any time; continued use after an update means you accept the new terms. If you see something that appears wrong on the site, let us know.</p>
      <p>All rights in the site&apos;s original editorial content remain with {`CleaningProductsReviews.com.`} You may quote small portions with attribution; wholesale copying is not permitted.</p>
    </LegalPage>
  );
}
