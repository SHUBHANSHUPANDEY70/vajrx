"use client";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "@/components/molecules/ProjectCard";
import Link from "next/link";

export default function FeaturedProjects() {
  return (
    <section className="py-28 px-6 bg-[#050912]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs text-accent tracking-[0.25em] uppercase mb-3">Portfolio</p>
            <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-3">
              Current Projects
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <div className="h-px w-4 bg-accent/30" />
            </div>
            <p className="text-muted text-base max-w-lg leading-relaxed">
              Active builds and completed systems. Hover any card to see key highlights. Each project is a step toward engineering sovereignty.
            </p>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors duration-200 shrink-0 font-medium"
          >
            View all projects
            <span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex items-center gap-4 border-t border-white/10 pt-8"
        >
          <span className="font-mono text-xs text-muted/50">More projects in development.</span>
          <div className="h-px flex-1 bg-white/10 max-w-[120px]" />
          <Link href="/submit-idea" className="font-mono text-xs text-accent/70 hover:text-accent transition-colors duration-200">
            Have an idea? Submit it &#8594;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
