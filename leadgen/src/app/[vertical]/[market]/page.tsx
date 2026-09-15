import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVertical, verticals } from "@/config/verticals";
import { getMarket, markets } from "@/config/markets";
import { getContentPages } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tracker } from "@/components/Tracker";
import { ZipForm } from "@/components/ZipForm";

type Params = { vertical: string; market: string };

export function generateStaticParams() {
  return Object.keys(verticals).flatMap((vertical) => Object.keys(markets).map((market) => ({ vertical, market })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { vertical, market } = await params;
  const v = getVertical(vertical), m = getMarket(market);
  if (!v || !m) return {};
  return {
    title: `${m.shortName} Roofing Quotes: Compare Licensed Roofers (2026)`,
    description: `Get free quotes from licensed ${m.shortName} roofing contractors for replacement, repair and hail damage. Typical replacement runs $${m.facts.avgReplacementLow.toLocaleString()} to $${m.facts.avgReplacementHigh.toLocaleString()}.`,
    alternates: { canonical: `/${v.slug}/${m.slug}` },
  };
}

export default async function MarketLanding({ params }: { params: Promise<Params> }) {
  const { vertical, market } = await params;
  const v = getVertical(vertical), m = getMarket(market);
  if (!v || !m) notFound();
  const pages = await getContentPages(v.slug, m.slug);

  return (
    <>
      <Header ctaHref={`/quote/${v.slug}`} />
      <Tracker vertical={v.slug} market={m.slug} />
      <main className="flex-1">
        <section className="bg-white">
          <div className="container-x grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">{m.name} · {m.stateName}</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Compare {m.shortName} roofing quotes from licensed contractors.</h1>
              <p className="mt-4 text-lg leading-8 text-ink-muted">
                Tell us about your roof. We match you with up to four vetted {m.shortName}-area roofers for replacement, repair or hail damage, and you compare quotes before you commit. Free, no obligation.
              </p>
              <div className="relative mt-8"><ZipForm vertical={v.slug} /></div>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
                <li>✓ Licensed and insured contractors</li>
                <li>✓ Free inspections</li>
                <li>✓ Insurance claim help</li>
              </ul>
            </div>
            <div className="card p-6 sm:p-8">
              <h2 className="text-lg font-semibold">What a new roof costs in {m.shortName}</h2>
              <dl className="mt-4 grid grid-cols-2 gap-4">
                <Stat label="Typical replacement" value={`$${(m.facts.avgReplacementLow / 1000).toFixed(1)}k to $${(m.facts.avgReplacementHigh / 1000).toFixed(0)}k`} />
                <Stat label="Hail season" value={m.facts.hailSeason} />
                <Stat label="Quotes to compare" value="2 to 4" />
                <Stat label="Cost to you" value="$0" />
              </dl>
              <p className="mt-4 text-sm text-ink-muted">Ranges reflect asphalt shingle replacements on typical single-family homes. Metal, tile and steep or complex roofs cost more. <Link href={`/${v.slug}/${m.slug}/roof-replacement-cost`} className="text-brand underline">See the full cost guide.</Link></p>
            </div>
          </div>
        </section>

        <section className="container-x py-14">
          <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <HowStep n={1} title="Describe your roof" text="Five quick questions: what it needs, the material, the property, its age, and whether insurance is involved." />
            <HowStep n={2} title="We match local contractors" text={`We route your request to licensed roofers who work in your ${m.shortName} ZIP code and want your kind of project.`} />
            <HowStep n={3} title="Compare and choose" text="Contractors reach out to schedule a free inspection. Compare at least two written quotes. You pick, or you walk away." />
          </div>
        </section>

        {pages.length > 0 && (
          <section className="bg-white py-14">
            <div className="container-x">
              <h2 className="text-2xl font-bold tracking-tight">{m.shortName} roofing guides</h2>
              <p className="mt-2 text-ink-muted">Researched for Front Range homes: costs, hail claims, materials and how to vet a roofer.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {pages.map((p) => (
                  <Link key={p.slug} href={`/${v.slug}/${m.slug}/${p.slug}`} className="card p-5 transition hover:border-brand">
                    <div className="text-xs font-semibold uppercase tracking-wide text-brand">{p.intent}</div>
                    <div className="mt-2 font-semibold leading-6">{p.h1}</div>
                    <p className="mt-2 line-clamp-3 text-sm text-ink-muted">{p.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="container-x py-14">
          <div className="card flex flex-col items-center gap-4 p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold tracking-tight">Ready for quotes?</h2>
            <p className="max-w-xl text-ink-muted">It takes about two minutes. We serve {m.cities.slice(0, 6).join(", ")} and the rest of the {m.name}.</p>
            <div className="relative"><ZipForm vertical={v.slug} /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (<div><dt className="text-xs uppercase tracking-wide text-ink-muted">{label}</dt><dd className="mt-1 text-lg font-bold">{value}</dd></div>);
}
function HowStep({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div className="card p-6">
      <div className="grid h-9 w-9 place-items-center rounded-full bg-brand text-sm font-bold text-white">{n}</div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-muted">{text}</p>
    </div>
  );
}
