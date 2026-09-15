import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "How It Works" };

export default function HowItWorks() {
  return (
    <LegalPage title="How it works" updated="September 15, 2026">
      <p>{site.name} is a free matching service for homeowners in the Denver metro who need roofing work. Here is exactly what happens when you use it.</p>
      <h2>1. You describe the project</h2>
      <p>Five questions: what the roof needs, its material, the property type, the roof&apos;s age, and whether an insurance claim is involved. Then your timeline and contact details.</p>
      <h2>2. We check the request</h2>
      <p>We confirm the ZIP code, screen out duplicate and automated submissions, and record your consent so contractors know you asked to be contacted.</p>
      <h2>3. We send it to contractors who serve your area</h2>
      <p>Your request goes to our <Link href="/partners">partners</Link>, who match it with up to four licensed roofing contractors working in your ZIP code. Contractors pay for these introductions; you pay nothing.</p>
      <h2>4. Contractors contact you</h2>
      <p>Expect calls or texts, usually within a business day, to schedule a free inspection. You are never obligated to hire anyone. We recommend getting at least two written quotes and reading our guide on <Link href="/roofing/denver/how-to-choose-a-roofer">how to choose a roofer</Link>.</p>
      <h2>Why trust us</h2>
      <ul>
        <li>We disclose who we share with, and we keep a versioned record of that list.</li>
        <li>We never sell your information to anyone not on the partner list.</li>
        <li>Our guides are researched for Colorado homes, cite sources, and are updated when the facts change.</li>
      </ul>
    </LegalPage>
  );
}
