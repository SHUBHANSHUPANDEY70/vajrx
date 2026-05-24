import Link from "next/link";
import React from "react";
import Badge from "@/components/atoms/Badge";
import StatusBadge from "@/components/atoms/StatusBadge";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <div className="h-full bg-surface border border-border group-hover:border-accent/50 transition-all duration-300 flex flex-col overflow-hidden shadow-sm group-hover:shadow-md">
        <div className="h-px w-0 group-hover:w-full bg-accent transition-all duration-500" />

        <div className="p-7 flex flex-col gap-4 flex-1">
          <div className="flex flex-wrap gap-2">
            {project.domains.map((d) => <Badge key={d} domain={d} />)}
            <StatusBadge status={project.status} />
          </div>

          <h3 className="font-display font-bold text-xl text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-muted text-sm leading-relaxed flex-1">{project.shortDescription}</p>

          {project.highlights && (
            <div className="overflow-hidden max-h-0 group-hover:max-h-56 transition-all duration-500 ease-in-out">
              <div className="border-t border-border pt-4 flex flex-col gap-2.5">
                <p className="font-mono text-xs text-muted tracking-[0.2em] uppercase mb-1">Key Highlights</p>
                <ul className="flex flex-col gap-2">
                  {project.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-xs text-foreground/60 leading-snug">
                      <span className="mt-1.5 w-2 h-px bg-accent/50 shrink-0 inline-block" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {project.techStack && (
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border mt-auto">
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className="font-mono text-xs text-muted bg-surface-raised px-2 py-0.5 border border-border">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="font-mono text-xs text-muted/60">+{project.techStack.length - 4} more</span>
              )}
            </div>
          )}
        </div>

        <div className="px-7 py-4 border-t border-border bg-surface-raised flex items-center justify-between">
          <span className="text-xs text-muted font-mono">{project.institution ?? "VajrX Technology"}</span>
          <span className="flex items-center gap-1.5 text-sm text-accent font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            View details <span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
