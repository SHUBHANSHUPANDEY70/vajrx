import { notFound } from "next/navigation";
import Link from "next/link";
import PageLayout from "@/components/templates/PageLayout";
import Badge from "@/components/atoms/Badge";
import StatusBadge from "@/components/atoms/StatusBadge";
import { PROJECTS, getProjectBySlug } from "@/data/projects";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <PageLayout>
      <div className="pt-14">
        <section className="relative py-20 px-6 border-b border-white/10 overflow-hidden bg-navy/20">
          <div className="absolute inset-0 tech-grid opacity-100" />
          <div className="relative max-w-5xl mx-auto">
            <Link href="/projects" className="group inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors duration-200 mb-8">
              <span className="transition-transform duration-200 group-hover:-translate-x-1">&#8592;</span>
              Back to Projects
            </Link>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.domains.map((d) => <Badge key={d} domain={d} />)}
              <StatusBadge status={project.status} />
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-tight mb-4">
              {project.title}
            </h1>
            {project.institution && (
              <div className="flex items-center gap-2">
                <span className="h-px w-4 bg-accent/50" />
                <p className="font-mono text-xs text-muted tracking-wide">{project.institution}</p>
              </div>
            )}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 pb-16 border-b border-white/10">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">Project Overview</p>
              <p className="text-foreground/80 text-lg leading-relaxed">{project.fullDescription}</p>
            </div>
            <div className="lg:col-span-4">
              <div className="border border-white/10 glass-card shadow-sm">
                <div className="px-5 py-3 border-b border-white/10 bg-white/5">
                  <p className="font-mono text-xs text-muted tracking-widest uppercase">Project Info</p>
                </div>
                <div className="flex flex-col divide-y divide-border">
                  <div className="px-5 py-3">
                    <p className="font-mono text-xs text-muted mb-1.5">Status</p>
                    <StatusBadge status={project.status} />
                  </div>
                  <div className="px-5 py-3">
                    <p className="font-mono text-xs text-muted mb-1.5">Domains</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.domains.map((d) => <Badge key={d} domain={d} />)}
                    </div>
                  </div>
                  {project.institution && (
                    <div className="px-5 py-3">
                      <p className="font-mono text-xs text-muted mb-1">Institution</p>
                      <p className="text-sm text-foreground/80">{project.institution}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {project.techStack && (
            <div className="mb-16 pb-16 border-b border-white/10">
              <p className="font-mono text-xs text-accent tracking-widest uppercase mb-6">Technology Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="font-mono text-sm text-foreground/80 glass-card border border-white/10 px-3 py-2 hover:border-accent/40 transition-colors duration-200 shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.highlights && (
            <div className="mb-16 pb-16 border-b border-white/10">
              <p className="font-mono text-xs text-accent tracking-widest uppercase mb-6">Key Highlights</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10 divide-x divide-y divide-border shadow-sm">
                {project.highlights.map((h, i) => (
                  <div key={h} className="group p-5 glass-card hover:bg-white/5 transition-colors duration-200">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-accent/40 mt-0.5 tabular-nums shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-muted text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-200">{h}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.futureGoals && (
            <div>
              <p className="font-mono text-xs text-accent tracking-widest uppercase mb-6">Future Scope</p>
              <div className="border border-white/10 glass-card shadow-sm">
                <div className="flex flex-col divide-y divide-border">
                  {project.futureGoals.map((g, i) => (
                    <div key={g} className="group flex items-start gap-5 p-6 hover:bg-white/5 transition-colors duration-200">
                      <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
                        <span className="font-mono text-xs text-accent/50 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        {i < (project.futureGoals?.length ?? 0) - 1 && <div className="w-px h-4 bg-border mt-1" />}
                      </div>
                      <p className="text-muted text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-200">{g}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link href="/projects" className="group inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors duration-200">
              <span className="transition-transform duration-200 group-hover:-translate-x-1">&#8592;</span>
              All Projects
            </Link>
            <Link href="/submit-idea" className="group inline-flex items-center gap-2 font-mono text-xs text-accent/70 hover:text-accent transition-colors duration-200">
              Have a similar idea?
              <span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
