import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata: Metadata = legalMetadata(
  "Affiliate Disclosure",
  "CleaningProductsReviews.com participates in affiliate programs. We are transparent about how links work and that we may earn from qualifying purchases.",
);

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage
      title="Affiliate Disclosure"
      lede="The short version: we may earn a commission if you buy through our links. It never changes what we recommend."
    >
      <p>
        CleaningProductsReviews.com is a participant in the Amazon Associates Program and other affiliate programs. When you
        click a link to a retailer and buy something, we may earn a small commission at no extra cost to you.
      </p>
      <p>
        Some links on the site are affiliate links and are marked with <em>rel="sponsored"</em> so search engines and browsers
        can treat them accordingly. Display advertising and any paid placements are always clearly labelled.
      </p>
      <p>
        <strong>Commission does not influence our opinions.</strong> We choose what to cover based on what readers buy and ask
        about, not on who pays us. We do not accept payment in exchange for a favourable review, and products are not ranked by
        affiliate revenue. Every page that touches money carries this disclosure.
      </p>
    </LegalPage>
  );
}
