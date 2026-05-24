"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/atoms/Logo";
import NavLink from "@/components/molecules/NavLink";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/96 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-background/80 backdrop-blur-sm border-b border-border/50"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/submit-idea"
            className="inline-flex items-center gap-2 px-4 py-2 border border-accent/50 hover:border-accent text-accent hover:bg-accent hover:text-white text-xs font-semibold tracking-wide font-mono transition-all duration-200"
          >
            Submit an Idea
          </Link>
        </div>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`h-px bg-foreground transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`h-px bg-foreground transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px bg-foreground transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border shadow-sm"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.href} className="py-1.5">
                  <NavLink href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</NavLink>
                </div>
              ))}
              <div className="pt-4 mt-2 border-t border-border">
                <Link
                  href="/submit-idea"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-accent/50 text-accent text-xs font-semibold tracking-wide font-mono transition-colors duration-200"
                >
                  Submit an Idea
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
