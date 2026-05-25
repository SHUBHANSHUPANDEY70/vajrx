import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 z-[2] pointer-events-none" style={{ background: "rgba(0,0,8,0.68)" }} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
