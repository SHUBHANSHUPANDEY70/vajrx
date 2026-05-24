import React from "react";

interface CredibilityItemProps {
  name: string;
  subtitle?: string;
}

export default function CredibilityItem({ name, subtitle }: CredibilityItemProps) {
  return (
    <div className="group flex flex-col gap-1.5 px-6 py-5 border border-border bg-surface/40 hover:bg-surface hover:border-accent/30 transition-all duration-300 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-accent/40 transition-all duration-500" />
      <span className="text-sm font-semibold text-slate-200 tracking-wide leading-snug">
        {name}
      </span>
      {subtitle && (
        <span className="text-xs text-muted">{subtitle}</span>
      )}
    </div>
  );
}
