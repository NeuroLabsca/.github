import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { partnerList, partnerListVersion } from "@/config/consent";

export const metadata: Metadata = { title: "Our Partners" };

export default function Partners() {
  return (
    <LegalPage title="Our partners" updated={`version ${partnerListVersion}`}>
      <p>When you request quotes, we may share your request with the following companies and the licensed contractors in their networks. This list is versioned; the version in effect when you submitted is recorded with your request.</p>
      <ul>
        {partnerList.map((p) => (
          <li key={p.name}>{p.url ? <a href={p.url} target="_blank" rel="noopener nofollow" className="underline">{p.name}</a> : p.name}</li>
        ))}
      </ul>
      <p>Each partner may match your request with up to four contractors serving your ZIP code. If a partner cannot find a contractor for your project, your request is not shared with them.</p>
    </LegalPage>
  );
}
