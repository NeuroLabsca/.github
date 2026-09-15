import { site } from "./site";

// Consent text and partner list are versioned. Changing either means adding a
// new version, never editing an old one: leads reference the version they saw.

export const partnerListVersion = "2026-09-15.1";

export const partnerList: { name: string; url?: string }[] = [
  { name: "Modernize (QuinStreet, Inc.)", url: "https://modernize.com" },
  { name: "Networx Systems, Inc.", url: "https://www.networx.com" },
  { name: "Prime Lead Exchange, LLC", url: "https://primeleadexchange.com" },
  { name: "Service Direct, LLC", url: "https://servicedirect.com" },
];

export const consentTextVersion = "2026-09-15.1";

// Shown unchecked and adjacent to the submit button. Keep it factual: this is
// the text buyers will see in the lead record and courts will read.
export function consentText(maxPartners = 4) {
  return (
    `By clicking "Get My Quote", I agree to the Terms of Use and Privacy Policy and provide my express written consent ` +
    `to be contacted by ${site.legalEntity} and up to ${maxPartners} of its ` +
    `roofing partners, and their affiliates, at the phone number and email I provided, including via automated technology, ` +
    `AI-generated or prerecorded voice, and SMS text messages, about my roofing project, even if my number is on a ` +
    `federal, state, or company do-not-call list. Consent is not a condition of purchase. Message and data rates may apply. ` +
    `Reply STOP to opt out of texts. I confirm I am 18 or older and the owner or authorized decision-maker for this property.`
  );
}
