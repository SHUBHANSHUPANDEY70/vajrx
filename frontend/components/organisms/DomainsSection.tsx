"use client";
import { motion } from "framer-motion";
import DomainCard from "@/components/molecules/DomainCard";
import SectionTitle from "@/components/atoms/SectionTitle";

const domains = [
  {
    domain: "Electronics" as const,
    icon: "⚡",
    description:
      "Custom embedded systems, sensor platforms, RF engineering, and signal processing solutions built for precision and reliability in demanding environments.",
  },
  {
    domain: "Defence" as const,
    icon: "🛡",
    description:
      "Indigenous defence technology — from lightning detection networks to NavIC-integrated systems — engineered for national significance and operational resilience.",
  },
  {
    domain: "Medical" as const,
    icon: "🩺",
    description:
      "AI-driven medical devices and clinical decision support systems that reduce human error and improve outcomes in critical healthcare settings.",
  },
];

export default function DomainsSection() {
  return (
    <section className="py-24 px-6 bg-navy/30">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="Three domains. One mission: build what India needs.">
          What We Build
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((d, i) => (
            <motion.div
              key={d.domain}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <DomainCard domain={d.domain} icon={d.icon} description={d.description} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
