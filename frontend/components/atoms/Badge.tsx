import React from "react";
import type { ProjectDomain } from "@/data/projects";

interface BadgeProps {
  domain: ProjectDomain;
  className?: string;
}

const domainColors: Record<ProjectDomain, string> = {
  Electronics: "bg-blue-50 text-blue-700 border border-blue-200",
  Defence: "bg-green-50 text-green-800 border border-green-200",
  Medical: "bg-red-50 text-red-700 border border-red-200",
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
