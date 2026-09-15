import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Do Not Sell or Share My Personal Information" };

export default function DoNotSell() {
  return (
    <LegalPage title="Do Not Sell or Share My Personal Information" updated="September 15, 2026">
      <p>Submitting a quote request is how we share your information with contractors and partners. If you do not want your information shared, do not submit a request.</p>
      <p>If you already submitted a request and want us to stop any further sharing and to ask our partners to delete it, email <a className="underline" href={`mailto:${site.supportEmail}?subject=Do%20Not%20Sell%20Request`}>{site.supportEmail}</a> from the email address you used, or include the phone number you submitted. We process opt-outs within 15 business days and confirm by email.</p>
      <p>We honor Global Privacy Control signals for the browser session in which they are sent by not creating a quote request from that session unless you affirmatively submit the form.</p>
    </LegalPage>
  );
}
