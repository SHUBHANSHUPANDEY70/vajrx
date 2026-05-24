"use client";
import { motion } from "framer-motion";

const metrics = [
  {
    value: "03",
    unit: "Domains",
    description: "Electronics, Defence, Medical",
  },
  {
    value: "05+",
    unit: "Partnerships",
    description: "ISRO, DRDO, AAI, Army",
  },
  {
    value: "02",
    unit: "Projects",
    description: "Completed and in progress",
  },
  {
    value: "100%",
    unit: "Indigenous",
    description: "Designed and built in India",
  },
];

export default function StatsSection() {
  return (
    <section className="border-y border-border bg-surface/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
          {metrics.map((m, i) => (
            <motion.div
              key={m.unit}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group px-8 py-8 flex flex-col gap-1.5 hover:bg-surface transition-colors duration-300"
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display font-bold text-3xl text-white tabular-nums group-hover:text-accent transition-colors duration-300">
                  {m.value}
                </span>
                <span className="text-sm font-semibold text-muted tracking-wide">
                  {m.unit}
                </span>
              </div>
              <p className="font-mono text-xs text-muted/60">{m.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
