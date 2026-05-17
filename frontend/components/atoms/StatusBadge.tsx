import React from "react";
import type { ProjectStatus } from "@/data/projects";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

const statusConfig: Record<ProjectStatus, { color: string; dot: string }> = {
  Completed: {
    color: "bg-green-900/30 text-green-400 border border-green-700/50",
    dot: "bg-green-400",
  },
  "In Progress": {
    color: "bg-amber-900/30 text-amber-400 border border-amber-700/50",
    dot: "bg-amber-400 animate-pulse",
  },
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-xs font-medium ${config.color} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}
