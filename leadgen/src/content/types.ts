export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; title: string; text: string }
  | { type: "cta"; text: string };
export type FAQ = { q: string; a: string };
export type ContentPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  intent: "cost" | "insurance" | "comparison" | "financing" | "process" | "local";
  updated: string;
  blocks: ContentBlock[];
  faqs: FAQ[];
  sources: string[];
};
