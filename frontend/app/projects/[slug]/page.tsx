import { notFound } from "next/navigation";
import PageLayout from "@/components/templates/PageLayout";
import Badge from "@/components/atoms/Badge";
import StatusBadge from "@/components/atoms/StatusBadge";
import Button from "@/components/atoms/Button";
import { PROJECTS, getProjectBySlug } from "@/data/projects";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <PageLayout>
      <div className="pt-24 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <Button href="/projects" variant="ghost" size="sm" className="mb-8">
            ← Back to Projects
          </Button>

          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.domains.map((d) => <Badge key={d} domain={d} />)}
              <StatusBadge status={project.status} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              {project.title}
            </h1>
            {project.institution && (
              <p className="text-muted text-sm tracking-wide">{project.institution}</p>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-accent via-olive to-transparent mb-10" />

          {/* Description */}
          <div className="prose prose-invert max-w-none mb-12">
            <p className="text-slate-300 text-lg leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Tech Stack */}
          {project.techStack && (
            <div className="mb-10">
              <h2 className="text-white font-bold text-xl mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-sm text-slate-300 bg-navy border border-border px-3 py-1.5 rounded-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {project.highlights && (
            <div className="mb-10">
              <h2 className="text-white font-bold text-xl mb-4">Key Highlights</h2>
              <ul className="flex flex-col gap-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-muted text-sm leading-relaxed">
                    <span className="text-accent mt-0.5 shrink-0">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Future Goals */}
          {project.futureGoals && (
            <div className="bg-navy/40 border border-border rounded-sm p-6">
              <h2 className="text-white font-bold text-xl mb-4">Future Scope</h2>
              <ul className="flex flex-col gap-3">
                {project.futureGoals.map((g) => (
                  <li key={g} className="flex items-start gap-3 text-muted text-sm leading-relaxed">
                    <span className="text-olive mt-0.5 shrink-0">→</span>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
