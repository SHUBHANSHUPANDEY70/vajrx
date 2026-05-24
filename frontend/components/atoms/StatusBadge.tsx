import React from "react";
import type { ProjectStatus } from "@/data/projects";

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

const statusConfig: Record<ProjectStatus, { color: string; dot: string }> = {
  Completed: {
    color: "bg-green-50 text-green-700 border border-green-200",
    dot: "bg-green-500",
  },
  "In Progress": {
    color: "bg-amber-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-500 animate-pulse",
  },
};

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-medium ${config.color} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}
