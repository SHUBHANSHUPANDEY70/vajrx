"use client";
import { motion } from "framer-motion";
import CredibilityItem from "@/components/molecules/CredibilityItem";
import SectionTitle from "@/components/atoms/SectionTitle";

const partners = [
  { name: "ISRO — NRSC", subtitle: "National Remote Sensing Centre" },
  { name: "Army Base Workshop 506", subtitle: "Jabalpur" },
  { name: "Airports Authority of India", subtitle: "Jabalpur Airport" },
  { name: "ISROxIITR", subtitle: "Rocket Modeling 2024" },
  { name: "DRDO", subtitle: "Affiliated Research Environments" },
];

export default function CredibilityBanner() {
  return (
    <section className="py-24 px-6 bg-navy/20 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <SectionTitle centered subtitle="Institutions and organisations we have worked with.">
          Trusted By
        </SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {partners.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <CredibilityItem name={p.name} subtitle={p.subtitle} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
