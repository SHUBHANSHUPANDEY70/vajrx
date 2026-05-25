import Logo from "@/components/atoms/Logo";
import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const domains = [
  { label: "Electronics", href: "/services" },
  { label: "Defence", href: "/services" },
  { label: "Medical", href: "/services" },
  { label: "AR/VR", href: "/services" },
];

export default function Footer() {
  return (
    <footer className="bg-[#050912] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Logo size="lg" />
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Indigenous engineering startup building precision systems across Electronics, Defence, Medical, and AR/VR domains. Designed and built in India.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
              <span className="font-mono text-xs text-muted/60 tracking-wide">Jabalpur, Madhya Pradesh, India</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs text-muted tracking-[0.2em] uppercase">Navigate</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/submit-idea"
                className="text-sm text-accent/70 hover:text-accent transition-colors duration-200 mt-1"
              >
                Submit an Idea
              </Link>
            </div>
          </div>

          {/* Contact + Domains */}
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs text-muted tracking-[0.2em] uppercase">Contact</h4>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:contact@vajrx.com" className="text-sm text-muted hover:text-accent transition-colors duration-200">
                contact@vajrx.com
              </a>
              <a href="tel:+916266995073" className="font-mono text-sm text-muted hover:text-accent transition-colors duration-200">
                +91 6266995073
              </a>
              <a href="tel:+918103882405" className="font-mono text-sm text-muted hover:text-accent transition-colors duration-200">
                +91 81038 82405
              </a>
              <span className="text-sm text-muted/50">vajrx.com</span>
            </div>

            <h4 className="font-mono text-xs text-muted tracking-[0.2em] uppercase mt-4">Domains</h4>
            <div className="flex flex-col gap-2">
              {domains.map((d) => (
                <Link key={d.label} href={d.href} className="text-sm text-muted hover:text-foreground transition-colors duration-200">
                  {d.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-muted/50">
            &copy; {new Date().getFullYear()} VajrX Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-muted/30">Built in India</span>
            <span className="h-3 w-px bg-border" />
            <span className="font-mono text-xs text-muted/30">Forged for the Frontier</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
