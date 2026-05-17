import Link from "next/link";
import React from "react";
import AnimatedCard from "./AnimatedCard";
import Badge from "@/components/atoms/Badge";
import StatusBadge from "@/components/atoms/StatusBadge";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <AnimatedCard className="h-full">
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div className="h-full bg-surface border border-border hover:border-accent/40 rounded-sm p-6 flex flex-col gap-4 transition-colors duration-200">
          <div className="flex flex-wrap gap-2">
            {project.domains.map((d) => (
              <Badge key={d} domain={d} />
            ))}
            <StatusBadge status={project.status} />
          </div>
          <h3 className="text-lg font-bold text-white leading-snug">
            {project.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed flex-1">
            {project.shortDescription}
          </p>
          {project.techStack && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-border">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs text-slate-400 bg-navy px-2 py-0.5 rounded-sm border border-border"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-xs text-muted">
                  +{project.techStack.length - 3} more
                </span>
              )}
            </div>
          )}
          <div className="flex items-center gap-1 text-accent text-sm font-medium mt-2">
            View Project
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </AnimatedCard>
  );
}
