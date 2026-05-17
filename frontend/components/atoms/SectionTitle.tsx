import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionTitle({
  children,
  subtitle,
  centered = false,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-px bg-gradient-to-r from-accent via-olive to-transparent ${centered ? "mx-auto max-w-xs" : "max-w-xs"}`} />
    </div>
  );
}
