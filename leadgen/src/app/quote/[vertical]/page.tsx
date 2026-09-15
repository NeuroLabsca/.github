import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVertical } from "@/config/verticals";
import { consentText, consentTextVersion, partnerListVersion } from "@/config/consent";
import { site } from "@/config/site";
import { Funnel } from "@/components/Funnel";
import { Header } from "@/components/Header";
import { Tracker } from "@/components/Tracker";

export const metadata: Metadata = { title: "Get your roofing quotes", robots: { index: false } };

export default async function QuotePage({ params, searchParams }: { params: Promise<{ vertical: string }>; searchParams: Promise<{ zip?: string }> }) {
  const { vertical } = await params;
  const { zip } = await searchParams;
  const v = getVertical(vertical);
  if (!v) notFound();
  return (
    <>
      <Header ctaHref={`/quote/${v.slug}`} />
      <Tracker vertical={v.slug} />
      <main className="container-x flex-1 py-8 sm:py-12">
        <Funnel
          vertical={{ slug: v.slug, name: v.name, ctaLabel: v.ctaLabel, questions: v.questions, timelines: v.timelines }}
          initialZip={zip && /^\d{5}$/.test(zip) ? zip : ""}
          consent={{ text: consentText(), version: consentTextVersion, partnerListVersion }}
          formVersion={site.formVersion}
        />
      </main>
    </>
  );
}
