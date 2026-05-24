import React from "react";
import Link from "next/link";
import type { ProjectDomain } from "@/data/projects";

interface DomainCardProps {
  domain: ProjectDomain;
  description: string;
  capabilities: string[];
}

const domainConfig: Record<ProjectDomain, {
  border: string;
  hoverBorder: string;
  topLine: string;
  accent: string;
  label: string;
  icon: React.ReactNode;
}> = {
  Electronics: {
    border: "border-blue-200",
    hoverBorder: "group-hover:border-blue-400",
    topLine: "bg-blue-500",
    accent: "text-blue-600",
    label: "EL",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="10" height="10" rx="1" />
        <rect x="16" y="16" width="10" height="10" rx="1" />
        <path d="M7 12v4M7 16h9M16 16V7M16 7H12" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="21" cy="21" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  Defence: {
    border: "border-green-200",
    hoverBorder: "group-hover:border-green-500",
    topLine: "bg-green-600",
    accent: "text-green-700",
    label: "DF",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="14" cy="14" r="11" />
        <circle cx="14" cy="14" r="3.5" />
        <line x1="14" y1="3" x2="14" y2="10.5" />
        <line x1="14" y1="17.5" x2="14" y2="25" />
        <line x1="3" y1="14" x2="10.5" y2="14" />
        <line x1="17.5" y1="14" x2="25" y2="14" />
      </svg>
    ),
  },
  Medical: {
    border: "border-red-200",
    hoverBorder: "group-hover:border-red-400",
    topLine: "bg-red-500",
    accent: "text-red-600",
    label: "MD",
    icon: (
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="2,14 7,14 10,5 13,23 16,9 19,14 26,14" />
      </svg>
    ),
  },
};

export default function DomainCard({ domain, description, capabilities }: DomainCardProps) {
  const config = domainConfig[domain];

  return (
    <div className={`group relative h-full bg-surface border ${config.border} ${config.hoverBorder} transition-all duration-350 overflow-hidden shadow-sm hover:shadow-md`}>
      <div className={`h-px w-0 group-hover:w-full transition-all duration-500 ease-out ${config.topLine}`} />

      <div className="p-8 flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div className={`${config.accent} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
            {config.icon}
          </div>
          <span className={`font-mono text-xs ${config.accent} opacity-30 group-hover:opacity-50 transition-opacity duration-300 tracking-widest`}>
            {config.label}
          </span>
        </div>

        <div>
          <h3 className={`font-display text-xl font-bold ${config.accent} mb-2`}>{domain}</h3>
          <p className="text-muted text-sm leading-relaxed">{description}</p>
        </div>

        <div className="overflow-hidden max-h-0 group-hover:max-h-80 transition-all duration-500 ease-in-out">
          <div className="border-t border-border pt-5 flex flex-col gap-3">
            <p className="font-mono text-xs text-muted tracking-[0.2em] uppercase">Capabilities</p>
            <ul className="flex flex-col gap-2.5">
              {capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-3 text-sm text-foreground/70 leading-snug">
                  <span className="mt-1.5 w-3 h-px bg-accent/60 shrink-0 inline-block" />
                  {cap}
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className={`mt-2 inline-flex items-center gap-2 text-sm font-medium ${config.accent} opacity-80 hover:opacity-100 transition-opacity duration-200`}
            >
              View all capabilities <span className="text-xs">&#8594;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
