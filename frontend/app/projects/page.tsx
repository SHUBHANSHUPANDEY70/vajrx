"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/templates/PageLayout";
import ProjectsGrid from "@/components/organisms/ProjectsGrid";
import { PROJECTS } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <PageLayout>
      <div className="pt-14">
        <section className="relative py-24 px-6 border-b border-border overflow-hidden">
          <div className="absolute inset-0 tech-grid opacity-100" />
          <div className="relative max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-5">Portfolio</p>
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight mb-6">Projects</h1>
              <p className="text-muted text-lg leading-relaxed max-w-xl mb-3">
                Everything we have built and are currently building. Each project is a proof point for indigenous engineering capability.
              </p>
              <p className="font-mono text-xs text-muted/50">
                {PROJECTS.length} project{PROJECTS.length !== 1 ? "s" : ""} &middot; Hover any card to see highlights
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <ProjectsGrid />
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
