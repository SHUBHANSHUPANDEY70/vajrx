import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

const EarthGlobe = dynamic(() => import("@/components/organisms/EarthGlobe"), { ssr: false });
const SpaceCanvas = dynamic(() => import("@/components/organisms/SpaceCanvas"), { ssr: false });

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
        {/* Mounts the Earth canvas directly to body via useEffect */}
        <EarthGlobe />
        {/* Dark vignette so page content is readable over the globe */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 1, background: "radial-gradient(ellipse at center, rgba(0,0,10,0.45) 0%, rgba(0,0,10,0.75) 60%, rgba(0,0,10,0.96) 100%)" }}
        />
        {/* Meteor streaks on top of everything */}
        <SpaceCanvas />
        {/* Page content */}
        <div className="relative" style={{ zIndex: 3 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
