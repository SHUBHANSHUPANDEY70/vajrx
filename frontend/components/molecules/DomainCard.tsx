import React from "react";
import AnimatedCard from "./AnimatedCard";
import type { ProjectDomain } from "@/data/projects";

interface DomainCardProps {
  domain: ProjectDomain;
  description: string;
  icon: string;
}

const domainStyles: Record<ProjectDomain, string> = {
  Electronics: "border-blue-700/40 hover:border-blue-500/60",
  Defence: "border-olive/40 hover:border-olive/70",
  Medical: "border-red-700/40 hover:border-red-500/60",
};

const domainAccent: Record<ProjectDomain, string> = {
  Electronics: "text-blue-400",
  Defence: "text-green-400",
  Medical: "text-red-400",
};

export default function DomainCard({ domain, description, icon }: DomainCardProps) {
  return (
    <AnimatedCard className="h-full">
      <div
        className={`h-full bg-surface border ${domainStyles[domain]} rounded-sm p-8 flex flex-col gap-4 transition-colors duration-200`}
      >
        <div className="text-4xl">{icon}</div>
        <h3 className={`text-xl font-bold ${domainAccent[domain]}`}>{domain}</h3>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </AnimatedCard>
  );
}
