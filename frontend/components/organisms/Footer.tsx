import Logo from "@/components/atoms/Logo";
import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/submit-idea", label: "Submit an Idea" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <Logo size="lg" />
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Engineering sovereignty across Defence, Electronics, and Medical domains. Built in India.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Navigation</h4>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted text-sm hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Contact</h4>
            <a
              href="mailto:contact@vajrx.com"
              className="text-muted text-sm hover:text-accent transition-colors duration-200"
            >
              contact@vajrx.com
            </a>
            <a
              href="tel:+916266995073"
              className="text-muted text-sm hover:text-accent transition-colors duration-200"
            >
              +91 6266995073
            </a>
            <p className="text-muted text-sm">vajrx.com</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} VajrX Technology. All rights reserved.
          </p>
          <p className="text-muted text-xs">Forged for the Frontier.</p>
        </div>
      </div>
    </footer>
  );
}
