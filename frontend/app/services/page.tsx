"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/templates/PageLayout";
import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";

const services = [
  {
    domain: "Electronics",
    icon: "⚡",
    color: "border-blue-700/40 text-blue-400",
    items: [
      "Custom embedded systems design (STM32, Arduino, Raspberry Pi)",
      "RF engineering and signal processing",
      "Sensor integration and IoT platforms",
      "PCB design and hardware prototyping",
      "Firmware development (C, C++, Python)",
      "Cloud-connected data logging systems",
    ],
  },
  {
    domain: "Defence",
    icon: "🛡",
    color: "border-olive/40 text-green-400",
    items: [
      "Indigenous alternatives to imported defence systems",
      "NavIC-integrated navigation and tracking solutions",
      "Lightning detection and meteorological monitoring networks",
      "Secure communication system design",
      "Defence equipment architecture analysis",
      "Signal intelligence and electronic warfare support systems",
    ],
  },
  {
    domain: "Medical",
    icon: "🩺",
    color: "border-red-700/40 text-red-400",
    items: [
      "AI/ML models for clinical decision support",
      "Pre-operative risk assessment tools",
      "Medical device prototyping and design",
      "BioTechnology-oriented embedded solutions",
      "Hospital workflow integration systems",
      "Patient monitoring and data analytics platforms",
    ],
  },
];

export default function ServicesPage() {
  return (
    <PageLayout>
      <div className="pt-24 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="We take your idea and build it — from concept to working prototype.">
            What We Build
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {services.map((s, i) => (
              <motion.div
                key={s.domain}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`bg-surface border ${s.color.split(" ")[0]} rounded-sm p-8 flex flex-col gap-6`}
              >
                <div className="text-4xl">{s.icon}</div>
                <h2 className={`text-2xl font-bold ${s.color.split(" ")[1]}`}>{s.domain}</h2>
                <ul className="flex flex-col gap-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-muted text-sm leading-relaxed">
                      <span className="text-accent mt-0.5 shrink-0">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-navy border border-accent/30 rounded-sm p-12 text-center"
          >
            <h2 className="text-3xl font-black text-white mb-4">Have a project in mind?</h2>
            <p className="text-muted mb-8 max-w-xl mx-auto">
              Tell us your idea. We'll evaluate it and get back to you with a plan.
            </p>
            <Button href="/submit-idea" size="lg">Submit Your Idea</Button>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
}
