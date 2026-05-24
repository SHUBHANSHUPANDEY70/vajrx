import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  label?: string;
  className?: string;
}

export default function SectionTitle({
  children,
  subtitle,
  centered = false,
  label,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`mb-14 ${centered ? "text-center" : ""} ${className}`}>
      {label && (
        <p className="text-xs font-mono text-accent tracking-[0.25em] uppercase mb-3">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted text-base leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-5 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <div className="h-px w-8 bg-accent" />
        <div className="h-px w-4 bg-accent/30" />
        <div className="h-px w-2 bg-accent/10" />
      </div>
    </div>
  );
}
