"use client";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "@/components/molecules/ProjectCard";
import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";

export default function FeaturedProjects() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle subtitle="Our current and completed builds.">
            Projects
          </SectionTitle>
          <Button href="/projects" variant="ghost" size="sm">
            View All →
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
