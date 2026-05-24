"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/templates/PageLayout";
import TeamSection from "@/components/organisms/TeamSection";
import SectionTitle from "@/components/atoms/SectionTitle";

const values = [
  {
    title: "Indigenous First",
    description: "Every system we build starts from the assumption that it can and should be made domestically. We do not default to imported alternatives unless genuinely unavoidable.",
  },
  {
    title: "Precision Over Speed",
    description: "We move deliberately. Every design decision is justified, every component is tested, and every system is documented. We would rather build it right than build it fast.",
  },
  {
    title: "Operational Relevance",
    description: "We do not build for portfolios or demonstrations. We build for deployment — in hospitals, in defence installations, in research environments. Real-world utility is the only metric that matters.",
  },
  {
    title: "Transparent Process",
    description: "From scoping through delivery, clients and collaborators see exactly what we're building, how, and why. No surprises. No scope creep without consent.",
  },
];

const roadmapItems = [
  {
    title: "National Lightning Network",
    timeline: "2025 — 2026",
    desc: "Deploy a decentralized, NavIC-integrated Time-of-Arrival lightning location network across India using our indigenous sensor nodes. Target coverage: major meteorological zones.",
    status: "Planned",
  },
  {
    title: "Clinical AI Deployment",
    timeline: "2025 — Ongoing",
    desc: "Validate and deploy our airway assessment ML model in hospital pre-operative workflows. Phase 1: clinical validation. Phase 2: hospital system integration.",
    status: "In Progress",
  },
  {
    title: "Defence Technology Scale",
    timeline: "2026+",
    desc: "Expand embedded systems and signal processing capabilities into broader defence and aerospace applications, contributing to India's sovereign technology stack.",
    status: "Roadmap",
  },
  {
    title: "Product Commercialization",
    timeline: "2026+",
    desc: "Transition from project-based work to commercializing core IP — starting with the lightning detection sensor node as a standalone deployable product.",
    status: "Roadmap",
  },
];

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="pt-14">
        <section className="relative py-28 px-6 border-b border-border overflow-hidden">
          <div className="absolute inset-0 tech-grid opacity-100" />
          <div className="relative max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-5">About VajrX Technology</p>
              <h1 className="font-display font-bold text-5xl md:text-7xl text-foreground tracking-tight leading-tight mb-6">
                Engineering Sovereignty.
                <span className="block text-accent">Built in India.</span>
              </h1>
              <p className="text-muted text-lg leading-relaxed max-w-2xl mb-4">
                VajrX Technology is a startup building indigenous solutions across Electronics, Defence, and Medical domains. We take ideas and turn them into precision-engineered realities.
              </p>
              <p className="text-muted/70 text-base leading-relaxed max-w-2xl">
                Founded by engineers from Jabalpur Engineering College with hands-on experience at ISRO, DRDO, and defence institutions — VajrX Technology was built on the conviction that India can and should manufacture the systems it currently imports.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-6 bg-navy/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border divide-y md:divide-y-0 md:divide-x divide-border shadow-sm bg-surface">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-10"
              >
                <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">Mission</p>
                <h2 className="font-display font-bold text-3xl text-foreground mb-5">What We Are Here to Do</h2>
                <p className="text-muted leading-relaxed mb-4">
                  To develop cost-effective, high-reliability indigenous technology solutions that reduce India's dependence on imported systems — across defence, electronics, and medical domains.
                </p>
                <p className="text-muted/70 text-sm leading-relaxed">
                  We build what others import. Every project is a proof point that Indian engineering capability is world-class when given the resources and structure to demonstrate it.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-10"
              >
                <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">Vision</p>
                <h2 className="font-display font-bold text-3xl text-foreground mb-5">Where We Are Going</h2>
                <p className="text-muted leading-relaxed mb-4">
                  To become a formidable participant in India's next-generation engineering landscape — a company known for precision, resilience, and strategic relevance.
                </p>
                <p className="text-muted/70 text-sm leading-relaxed">
                  We envision a future where Indian-made technology sets the global standard in critical domains. VajrX Technology is building the foundation for that future.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <SectionTitle label="Principles" subtitle="The values that define how we work and what we build.">
              Engineering Philosophy
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border divide-x divide-y divide-border shadow-sm">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="group p-8 bg-surface hover:bg-surface-raised transition-colors duration-300 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs text-accent/50 tabular-nums">0{i + 1}</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                    {v.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <TeamSection />

        <section className="py-24 px-6 bg-navy/30 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <SectionTitle label="Future Roadmap" subtitle="Planned milestones and active development tracks.">
              Where We Are Headed
            </SectionTitle>

            <div className="flex flex-col gap-0 border border-border divide-y divide-border shadow-sm bg-surface">
              {roadmapItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="group p-8 hover:bg-surface-raised transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                    <div className="md:col-span-3">
                      <p className="font-mono text-xs text-accent/60 mb-2">{item.timeline}</p>
                      <span className={`inline-block font-mono text-xs px-2 py-0.5 tracking-widest uppercase ${
                        item.status === "In Progress"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : item.status === "Planned"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-surface-raised text-muted border border-border"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="md:col-span-9">
                      <h3 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
