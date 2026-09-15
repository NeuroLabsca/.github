import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { contentKeys, getContentPages } from "@/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const out: MetadataRoute.Sitemap = [{ url: `${site.url}/`, changeFrequency: "weekly", priority: 1 }];
  for (const { vertical, market } of contentKeys()) {
    out.push({ url: `${site.url}/${vertical}/${market}`, changeFrequency: "weekly", priority: 0.9 });
    for (const p of await getContentPages(vertical, market)) out.push({ url: `${site.url}/${vertical}/${market}/${p.slug}`, lastModified: p.updated, changeFrequency: "monthly", priority: 0.8 });
  }
  for (const s of ["how-it-works", "partners", "privacy", "terms", "do-not-sell"]) out.push({ url: `${site.url}/${s}`, changeFrequency: "yearly", priority: 0.3 });
  return out;
}
