import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

const EarthGlobe = dynamic(() => import("@/components/organisms/EarthGlobe"), { ssr: false });

export const metadata: Metadata = {
  title: "VajrX Technology — Forged for the Frontier",
  description:
    "VajrX Technology builds precision-engineered projects across Electronics, Defence, and Medical domains. Indigenous engineering for the next generation.",
  keywords: ["VajrX Technology", "defence technology", "electronics", "medical devices", "embedded systems", "India", "indigenous engineering"],
  openGraph: {
    title: "VajrX Technology — Forged for the Frontier",
    description: "Indigenous engineering across Electronics, Defence, and Medical domains.",
    url: "https://vajrx.com",
    siteName: "VajrX Technology",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Earth canvas — fixed, covers full viewport, paints space+stars+globe */}
        <EarthGlobe />
        {/* Page content at z-index:2 — transparent sections composite against Earth below */}
        <div className="relative" style={{ zIndex: 2 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
