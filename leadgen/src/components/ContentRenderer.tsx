import Link from "next/link";
import type { ContentBlock } from "@/content/types";

export function ContentRenderer({ blocks, vertical }: { blocks: ContentBlock[]; vertical: string }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2": return <h2 key={i}>{b.text}</h2>;
          case "h3": return <h3 key={i}>{b.text}</h3>;
          case "p": return <p key={i}>{b.text}</p>;
          case "ul": return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
          case "table":
            return (
              <div key={i} className="overflow-x-auto">
                <table><thead><tr>{b.headers.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>)}</tbody></table>
              </div>
            );
          case "callout":
            return (<div key={i} className="my-6 rounded-xl border border-brand/20 bg-brand-soft p-5"><div className="font-semibold">{b.title}</div><p className="!my-1 text-[15px]">{b.text}</p></div>);
          case "cta":
            return (
              <div key={i} className="my-8 flex flex-col items-start gap-3 rounded-xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="!my-0 font-medium">{b.text}</p>
                <Link href={`/quote/${vertical}`} className="btn-primary shrink-0">Get free quotes</Link>
              </div>
            );
        }
      })}
    </>
  );
}
