import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VajrX — Forged for the Frontier",
  description:
    "VajrX builds cutting-edge projects across Electronics, Defence, and Medical domains. Indigenous engineering for the next generation.",
  keywords: ["VajrX", "defence technology", "electronics", "medical devices", "embedded systems", "India"],
  openGraph: {
    title: "VajrX — Forged for the Frontier",
    description: "Indigenous engineering across Electronics, Defence, and Medical domains.",
    url: "https://vajrx.com",
    siteName: "VajrX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
