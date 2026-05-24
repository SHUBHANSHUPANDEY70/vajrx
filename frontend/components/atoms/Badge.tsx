import React from "react";
import type { ProjectDomain } from "@/data/projects";

interface BadgeProps {
  domain: ProjectDomain;
  className?: string;
}

const domainColors: Record<ProjectDomain, string> = {
  Electronics: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
  Defence: "bg-green-500/10 text-green-400 border border-green-500/30",
  Medical: "bg-red-500/10 text-red-400 border border-red-500/30",
};

export default function Badge({ domain, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-mono font-medium tracking-wider uppercase ${domainColors[domain]} ${className}`}
    >
      {domain}
    </span>
  );
}
