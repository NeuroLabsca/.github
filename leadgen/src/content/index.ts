import type { ContentPage } from "./types";

// Content is keyed by vertical + market. Add a market by adding a module.
const registry: Record<string, () => Promise<ContentPage[]>> = {
  "roofing/denver": () => import("./roofing-denver").then((m) => m.default),
};

export async function getContentPages(vertical: string, market: string): Promise<ContentPage[]> {
  const loader = registry[`${vertical}/${market}`];
  return loader ? loader() : [];
}

export async function getContentPage(vertical: string, market: string, slug: string) {
  const pages = await getContentPages(vertical, market);
  return pages.find((p) => p.slug === slug) ?? null;
}

export function contentKeys() {
  return Object.keys(registry).map((k) => { const [vertical, market] = k.split("/"); return { vertical, market }; });
}
