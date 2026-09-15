import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="September 15, 2026">
      <p>{site.legalEntity} (&quot;we&quot;) operates {site.name}. This policy explains what we collect when you use the site or request quotes, how we use it, who we share it with, and the choices you have.</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Quote request details you give us:</strong> name, email, phone number, property address or ZIP code, and answers about your project (for example roof type, age, timeline, and whether an insurance claim is involved).</li>
        <li><strong>Consent evidence:</strong> the exact consent language you agreed to, the date and time, your IP address, browser, the page you were on, and a third-party consent certificate (ActiveProspect TrustedForm) that records your form session.</li>
        <li><strong>Usage data:</strong> pages viewed, referring site, campaign parameters (UTM), device type, and a first-party session identifier. We do not use third-party advertising cookies.</li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To match your request with roofing contractors and lead-marketplace partners that serve your area, and to send them your request.</li>
        <li>To verify requests are genuine, prevent fraud and duplicates, and keep records required by law.</li>
        <li>To measure which pages and channels lead to requests, and to improve the site.</li>
      </ul>
      <h2>Sale or sharing of personal information</h2>
      <p>When you submit a quote request, we transfer your request, including your contact details, to one or more contractors or lead-marketplace partners in exchange for payment. Under the California Consumer Privacy Act and similar state laws this is a &quot;sale&quot; of personal information. The current list of partners we may share with is on our <Link href="/partners">partners page</Link>. We do not sell the personal information of anyone we know to be under 16.</p>
      <p>You can opt out at any time on our <Link href="/do-not-sell">Do Not Sell or Share My Personal Information</Link> page. Opting out stops future sharing; it does not withdraw a request that has already been sent to a partner, and partners you have already been connected with may still contact you until you ask them to stop.</p>
      <h2>Your rights</h2>
      <p>Depending on where you live you may have the right to know what we hold about you, to correct it, to delete it, to opt out of sale or sharing, and to not be discriminated against for exercising these rights. Email {site.supportEmail} with the subject &quot;Privacy request&quot;. We verify requests by matching the email or phone number on the request to our records and respond within 45 days.</p>
      <h2>Retention</h2>
      <p>We keep quote requests and consent evidence for five years to meet partner contract and telemarketing-law record requirements, then delete or anonymize them. Usage data is kept for 26 months.</p>
      <h2>Communications and opting out of calls and texts</h2>
      <p>By submitting a request you consent to calls and texts from us and our partners as described at the point of submission. To stop texts reply STOP to any message. To stop calls, tell the caller or email us and we will pass the request to the partners we shared your request with.</p>
      <h2>Security</h2>
      <p>Data is encrypted in transit and at rest. IP addresses are stored as one-way hashes for fraud analysis. Access is limited to staff who need it to operate the service.</p>
      <h2>Children</h2>
      <p>The site is for adults. We do not knowingly collect information from anyone under 18.</p>
      <h2>Changes</h2>
      <p>We will post changes here with a new date. Material changes to how we share data will be flagged on the quote form.</p>
      <h2>Contact</h2>
      <p>{site.legalEntity}, {site.supportEmail}.</p>
    </LegalPage>
  );
}
