import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Terms of Use" };

export default function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="September 15, 2026">
      <p>These terms govern your use of {site.name}, operated by {site.legalEntity}. By using the site or submitting a quote request you agree to them.</p>
      <h2>What we are and are not</h2>
      <p>We are a referral and matching service. We are not a roofing contractor, insurer, lender or adjuster, and we do not perform, supervise or guarantee any work. Any contract for roofing services is between you and the contractor you choose. We do not endorse any contractor and we are not responsible for their work, pricing, licensing, insurance, or conduct. Verify licenses and insurance yourself before signing anything.</p>
      <h2>How we are paid</h2>
      <p>The service is free to homeowners. We are paid by contractors and lead-marketplace partners when we send them your request. Our compensation does not change the price a contractor charges you, but you should always compare more than one quote.</p>
      <h2>Your request</h2>
      <p>You agree that the information you submit is accurate, that you are at least 18, and that you are the owner of the property or authorized to request work on it. Submitting false information, duplicate requests, or requests on behalf of others without their consent is prohibited.</p>
      <h2>Content</h2>
      <p>Cost ranges, timelines and other figures on this site are estimates compiled from public sources and industry data for general information. They are not quotes and will differ from what a contractor charges for your specific roof. Insurance and legal information is general and is not professional advice.</p>
      <h2>Acceptable use</h2>
      <p>No scraping, automated submissions, interference with the site, or use of the site for anything unlawful.</p>
      <h2>Disclaimer and limitation of liability</h2>
      <p>The site is provided as is. To the fullest extent permitted by law we disclaim all warranties and are not liable for indirect, incidental or consequential damages arising from use of the site or from any contractor or partner. Our total liability to you for any claim is limited to $100.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of Colorado, without regard to conflict-of-law rules.</p>
      <h2>Contact</h2>
      <p>{site.supportEmail}</p>
    </LegalPage>
  );
}
