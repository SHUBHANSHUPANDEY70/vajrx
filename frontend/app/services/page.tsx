"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/templates/PageLayout";
import Link from "next/link";

const services = [
  {
    domain: "Electronics",
    code: "EL",
    border: "border-blue-200 hover:border-blue-400",
    accent: "text-blue-600",
    description: "Custom hardware and firmware development for embedded systems, IoT platforms, and signal processing applications. We design from PCB-level up through cloud-connected deployment.",
    items: [
      { title: "Embedded Systems Design", detail: "STM32, ARM Cortex, Arduino, Raspberry Pi platforms" },
      { title: "RF Engineering & Signal Processing", detail: "Antenna design, interference suppression, spectrum analysis" },
      { title: "Sensor Integration & IoT", detail: "Multi-sensor fusion, edge computing, remote data platforms" },
      { title: "PCB Design & Prototyping", detail: "Schematic to fabrication, design for manufacture" },
      { title: "Firmware Development", detail: "C, C++, Python — HAL, RTOS, bare-metal" },
      { title: "Cloud-Connected Data Systems", detail: "Real-time logging, remote monitoring, analytics pipelines" },
    ],
  },
  {
    domain: "Defence",
    code: "DF",
    border: "border-green-200 hover:border-green-500",
    accent: "text-green-700",
    description: "Indigenous alternatives to imported defence and dual-use systems. From detection networks to navigation solutions — designed for operational resilience and national strategic value.",
    items: [
      { title: "Indigenous Defence Systems", detail: "Cost-effective alternatives to commercial and imported technology" },
      { title: "NavIC Integration", detail: "Navigation, tracking, and time-synchronization using India's satellite network" },
      { title: "Lightning & Meteorological Detection", detail: "Sensor node design, network architecture, real-time cloud logging" },
      { title: "Secure Communication Design", detail: "System architecture for secure data transmission and storage" },
      { title: "Defence Equipment Analysis", detail: "Technical evaluation, indigenization assessment" },
      { title: "Signal Intelligence Support", detail: "EW support systems, spectrum analysis, signal classification" },
    ],
  },
  {
    domain: "Medical",
    code: "MD",
    border: "border-red-200 hover:border-red-400",
    accent: "text-red-600",
    description: "AI-powered clinical tools and medical device prototypes that reduce human error in critical healthcare settings. Built to clinical standards with deployment in real workflows.",
    items: [
      { title: "Clinical AI/ML Models", detail: "Decision support systems trained on clinical datasets" },
      { title: "Pre-Operative Risk Assessment", detail: "Standardized scoring tools for anaesthesiology workflows" },
      { title: "Medical Device Prototyping", detail: "Concept through working prototype with full documentation" },
      { title: "BioTech-Oriented Embedded Systems", detail: "Sensor integration for patient monitoring and diagnostics" },
      { title: "Hospital Workflow Integration", detail: "System design for integration into existing clinical platforms" },
      { title: "Patient Monitoring & Analytics", detail: "Real-time data capture, processing, and clinical reporting" },
    ],
  },
];

const engagementTypes = [
  { type: "Project Development", description: "Full-cycle development from concept to delivered prototype. We scope, engineer, test, and document.", timeline: "4–16 weeks depending on complexity" },
  { type: "Technical Consultation", description: "Expert review and analysis of existing systems, feasibility studies, and technical direction.", timeline: "1–2 week engagement" },
  { type: "Research Collaboration", description: "Joint R&D with academic or institutional partners — with shared IP arrangements.", timeline: "Ongoing or project-based" },
  { type: "Proof of Concept", description: "Rapid validation of a technical approach before full investment in development.", timeline: "2–4 weeks" },
];

export default function ServicesPage() {
  return (
    <PageLayout>
      <div className="pt-14">
        <section className="relative py-28 px-6 border-b border-border overflow-hidden">
          <div className="absolute inset-0 tech-grid opacity-100" />
          <div className="relative max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="font-mono text-xs text-accent tracking-[0.3em] uppercase mb-5">Services</p>
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight mb-6">What We Build</h1>
              <p className="text-muted text-lg leading-relaxed max-w-2xl">
                We take your idea and build it — from concept to working prototype. Three engineering domains. One standard: precision, reliability, and indigenous design.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-6">
              {services.map((s, i) => (
                <motion.div
                  key={s.domain}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className={`group border ${s.border} bg-surface transition-all duration-300 shadow-sm hover:shadow-md`}
                >
                  <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-4">
                      <div className="flex items-start justify-between mb-4">
                        <span className={`font-mono text-xs ${s.accent} tracking-widest opacity-60`}>{s.code}</span>
                      </div>
                      <h2 className={`font-display font-bold text-2xl md:text-4xl ${s.accent} mb-4`}>{s.domain}</h2>
                      <p className="text-muted text-sm leading-relaxed">{s.description}</p>
                    </div>
                    <div className="lg:col-span-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-border divide-x divide-y divide-border">
                        {s.items.map((item) => (
                          <div key={item.title} className="group/item p-4 hover:bg-surface-raised transition-colors duration-200">
                            <h4 className="text-sm font-semibold text-foreground mb-1 group-hover/item:text-accent transition-colors duration-200">
                              {item.title}
                            </h4>
                            <p className="text-xs text-muted leading-snug">{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-navy/30 border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <p className="font-mono text-xs text-accent tracking-[0.25em] uppercase mb-3">Engagement Models</p>
                  <h2 className="font-display font-bold text-2xl md:text-4xl text-foreground leading-tight mb-5">How We Work Together</h2>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-px w-8 bg-accent" />
                    <div className="h-px w-4 bg-accent/30" />
                  </div>
                  <p className="text-muted text-sm leading-relaxed">
                    Every engagement is scoped before work begins. We agree on deliverables, timelines, and documentation standards upfront.
                  </p>
                </motion.div>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-border divide-x divide-y divide-border shadow-sm">
                  {engagementTypes.map((e, i) => (
                    <motion.div
                      key={e.type}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="group p-6 bg-surface hover:bg-surface-raised transition-colors duration-300"
                    >
                      <h3 className="font-display font-bold text-base text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                        {e.type}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed mb-3">{e.description}</p>
                      <p className="font-mono text-xs text-accent/60">{e.timeline}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-accent/20 bg-surface relative overflow-hidden p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-md"
            >
              <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-accent/40" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-accent/40" />
              <div>
                <h2 className="font-display font-bold text-4xl text-foreground mb-4">Have a project in mind?</h2>
                <p className="text-muted text-base leading-relaxed">
                  Tell us your idea. We'll evaluate it and get back to you with a technical assessment and proposed approach within 48 hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-start">
                <Link href="/submit-idea" className="group inline-flex items-center justify-between px-6 py-4 bg-accent hover:bg-accent-hover text-white text-sm font-semibold tracking-wide transition-colors duration-200">
                  Submit Your Idea
                  <span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
                </Link>
                <Link href="/contact" className="group inline-flex items-center justify-between px-6 py-4 border border-border hover:border-accent/50 text-muted hover:text-foreground text-sm font-medium tracking-wide transition-all duration-200">
                  Contact Us Directly
                  <span className="transition-transform duration-200 group-hover:translate-x-1">&#8594;</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
