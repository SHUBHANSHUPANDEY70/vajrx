"use client";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Ideate",
    description: "Submit your problem statement or concept. We review every submission with attention to technical feasibility, national relevance, and potential for indigenization.",
    detail: "Online submission form with structured intake",
  },
  {
    number: "02",
    title: "Evaluate",
    description: "Our team conducts a technical and feasibility analysis. We assess complexity, required resources, timelines, and strategic fit within our engineering domains.",
    detail: "24 to 48 hour response time on all submissions",
  },
  {
    number: "03",
    title: "Engineer",
    description: "We develop the solution using a rigorous design-build-test methodology. Every component is documented, every decision is justified, and every prototype is stress-tested.",
    detail: "Full documentation and version control throughout",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Tested, documented, and ready for deployment. We hand off a working system with full technical documentation, source code, and integration guides.",
    detail: "Complete handoff with source code and schematics",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-xs text-accent tracking-[0.25em] uppercase mb-3">Methodology</p>
              <h2 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-5">How We Build</h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-accent" />
                <div className="h-px w-4 bg-accent/30" />
              </div>
              <p className="text-muted text-base leading-relaxed mb-4">
                Our engineering process is structured, transparent, and repeatable. From first contact to final delivery, every step is deliberate.
              </p>
              <p className="text-muted/70 text-sm leading-relaxed">
                We apply aerospace grade discipline to every project regardless of scale, because the systems we build may one day operate in environments where failure is not an option.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <div className="flex flex-col gap-0 border border-white/10 divide-y divide-white/10 shadow-sm glass-card">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="group p-5 sm:p-8 hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="font-display font-bold text-3xl sm:text-5xl text-white/10 group-hover:text-accent/30 transition-colors duration-300 tabular-nums shrink-0 leading-none mt-0.5">
                      {step.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-lg sm:text-2xl text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed mb-3">{step.description}</p>
                      <p className="font-mono text-xs text-accent/60 group-hover:text-accent/80 transition-colors duration-300 break-words">{step.detail}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
