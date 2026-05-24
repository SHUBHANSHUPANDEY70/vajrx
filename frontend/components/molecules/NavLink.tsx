"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`font-mono text-xs tracking-widest uppercase transition-colors duration-200 relative group ${
        isActive ? "text-accent" : "text-muted hover:text-white"
      }`}
    >
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}
