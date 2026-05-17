import React from "react";

interface CredibilityItemProps {
  name: string;
  subtitle?: string;
}

export default function CredibilityItem({ name, subtitle }: CredibilityItemProps) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4 border border-border rounded-sm bg-surface/50 hover:border-accent/40 transition-colors duration-200">
      <span className="text-sm font-semibold text-slate-200 text-center tracking-wide">
        {name}
      </span>
      {subtitle && (
        <span className="text-xs text-muted text-center">{subtitle}</span>
      )}
    </div>
  );
}
