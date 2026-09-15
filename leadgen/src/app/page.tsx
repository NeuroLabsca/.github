import { redirect } from "next/navigation";
import { site } from "@/config/site";

// The MVP serves one vertical in one market; the home page is that landing page.
export default function Home() {
  redirect(`/${site.defaultVertical}/${site.defaultMarket}`);
}
