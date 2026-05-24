"use client";
import { motion } from "framer-motion";
import CredibilityItem from "@/components/molecules/CredibilityItem";

const partners = [
  { name: "ISRO — NRSC", subtitle: "National Remote Sensing Centre" },
  { name: "Army Base Workshop 506", subtitle: "Jabalpur" },
  { name: "Airports Authority of India", subtitle: "Jabalpur Airport" },
  { name: "ISROxIITR", subtitle: "Rocket Modeling 2024" },
  { name: "DRDO", subtitle: "Affiliated Research Environments" },
];

export default function CredibilityBanner() {
  return (
    <section className="py-24 px-6 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <p className="font-mono text-xs text-accent tracking-[0.25em] uppercase mb-3">Institutional Affiliations</p>
              <h2 className="font-display font-bold text-3xl text-foreground leading-tight mb-4">Trusted By</h2>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-accent" />
                <div className="h-px w-4 bg-accent/30" />
              </div>
              <p className="text-muted text-sm leading-relaxed">
                Our work has been conducted within and alongside some of India's most strategically significant research and defence institutions.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-border divide-x divide-y divide-border shadow-sm">
              {partners.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <CredibilityItem name={p.name} subtitle={p.subtitle} />
                </motion.div>
              ))}
              <div className="hidden lg:block p-6 bg-surface-raised">
                <p className="font-mono text-xs text-muted/40 leading-relaxed">More partnerships in progress.</p>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-border pt-6"
        >
          <p className="font-mono text-xs text-muted/40 max-w-2xl">
            Affiliations represent research collaborations, internship environments, and project development contexts. VajrX Technology operates independently as a technology startup.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
