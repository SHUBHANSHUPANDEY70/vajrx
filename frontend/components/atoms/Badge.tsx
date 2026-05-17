import React from "react";
import type { ProjectDomain } from "@/data/projects";

interface BadgeProps {
  domain: ProjectDomain;
  className?: string;
}

const domainColors: Record<ProjectDomain, string> = {
  Electronics: "bg-blue-900/40 text-blue-300 border border-blue-700/50",
  Defence: "bg-olive/30 text-green-300 border border-olive/50",
  Medical: "bg-red-900/30 text-red-300 border border-red-700/50",
};

export default function Badge({ domain, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium tracking-wider uppercase ${domainColors[domain]} ${className}`}
    >
      {domain}
    </span>
  );
}
