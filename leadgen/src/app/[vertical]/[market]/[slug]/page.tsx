import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVertical } from "@/config/verticals";
import { getMarket } from "@/config/markets";
import { contentKeys, getContentPage, getContentPages } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tracker } from "@/components/Tracker";
import { ZipForm } from "@/components/ZipForm";
import { ContentRenderer } from "@/components/ContentRenderer";
import { site } from "@/config/site";

type Params = { vertical: string; market: string; slug: string };

export async function generateStaticParams() {
  const out: Params[] = [];
  for (const { vertical, market } of contentKeys()) {
    for (const p of await getContentPages(vertical, market)) out.push({ vertical, market, slug: p.slug });
  }
  return out;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { vertical, market, slug } = await params;
  const page = await getContentPage(vertical, market, slug);
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/${vertical}/${market}/${slug}` } };
}

export default async function ContentPage({ params }: { params: Promise<Params> }) {
  const { vertical, market, slug } = await params;
  const v = getVertical(vertical), m = getMarket(market);
  const page = await getContentPage(vertical, market, slug);
  if (!v || !m || !page) notFound();
  const siblings = (await getContentPages(vertical, market)).filter((p) => p.slug !== slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", headline: page.h1, description: page.description, dateModified: page.updated, author: { "@type": "Organization", name: site.name }, mainEntityOfPage: `${site.url}/${vertical}/${market}/${slug}` },
      { "@type": "FAQPage", mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <Header ctaHref={`/quote/${v.slug}`} />
      <Tracker vertical={v.slug} market={m.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="container-x flex-1 py-10">
        <nav className="text-sm text-ink-muted" aria-label="Breadcrumb">
          <Link href={`/${v.slug}/${m.slug}`} className="hover:text-ink">{m.shortName} roofing</Link> <span aria-hidden>/</span> <span>{page.h1}</span>
        </nav>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{page.h1}</h1>
            <p className="mt-3 text-sm text-ink-muted">Updated {new Date(page.updated).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} · {m.name}</p>
            <div className="prose-content mt-4">
              <ContentRenderer blocks={page.blocks} vertical={v.slug} />
            </div>
            {page.faqs.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
                <div className="mt-4 divide-y divide-line rounded-[var(--radius-card)] border border-line bg-white">
                  {page.faqs.map((f) => (
                    <details key={f.q} className="group p-5">
                      <summary className="cursor-pointer list-none font-semibold">{f.q}</summary>
                      <p className="mt-2 leading-7 text-ink-muted">{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
            {page.sources.length > 0 && (
              <section className="mt-10 text-sm text-ink-muted">
                <h2 className="font-semibold text-ink">Sources</h2>
                <ul className="mt-2 list-disc space-y-1 pl-5 break-all">{page.sources.map((s) => <li key={s}><a href={s} rel="nofollow noopener" target="_blank" className="underline">{s}</a></li>)}</ul>
              </section>
            )}
          </article>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h2 className="text-lg font-semibold">Get {m.shortName} roofing quotes</h2>
              <p className="mt-1 text-sm text-ink-muted">Free. Up to four licensed contractors. No obligation.</p>
              <div className="relative mt-4"><ZipForm vertical={v.slug} size="md" ctaLabel="Start" /></div>
            </div>
            {siblings.length > 0 && (
              <div className="card p-6">
                <h2 className="font-semibold">Related guides</h2>
                <ul className="mt-3 space-y-2 text-sm">{siblings.map((s) => <li key={s.slug}><Link href={`/${v.slug}/${m.slug}/${s.slug}`} className="text-brand hover:underline">{s.h1}</Link></li>)}</ul>
              </div>
            )}
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
