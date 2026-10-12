import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = legalMetadata(
  "Privacy Policy",
  "How CleaningProductsReviews.com handles data — we keep the analysis, discard the personal identifiers.",
);

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lede="Our approach to data is deliberately minimal: we never see personal data we don't need, and we don't sell it."
    >
      <p><strong>What we collect:</strong> standard server logs (IP addresses, browser type, pages visited) to operate and protect the site, plus analytics data to understand which guides are useful. We may use display advertising, which can use cookies to show relevant ads.</p>
      <p><strong>What we don&apos;t collect:</strong> we don&apos;t require an account, we don&apos;t sell personal data, and we don&apos;t run member paywalls.</p>
      <p><strong>Affiliate links:</strong> when you click a link to a retailer, that retailer&apos;s own privacy policy applies to what happens next. We don&apos;t see or store what you buy there.</p>
      <p><strong>Your controls:</strong> you can block cookies in your browser, and you can ask us to delete or correct anything we hold about you at {site.email}.</p>
    </LegalPage>
  );
}
