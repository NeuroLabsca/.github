import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/config/site";
import { TrustedFormScript } from "@/components/TrustedFormScript";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Compare Denver roofing quotes`, template: `%s | ${site.name}` },
  description: "Compare quotes from licensed Denver roofing contractors for replacement, repair and hail damage. Free, no obligation.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0f5c8f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {children}
        <TrustedFormScript />
      </body>
    </html>
  );
}
