"use client";
import { motion } from "framer-motion";
import DomainCard from "@/components/molecules/DomainCard";
import SectionTitle from "@/components/atoms/SectionTitle";

const domains = [
  {
    domain: "Electronics" as const,
    description:
      "Custom embedded systems, sensor platforms, RF engineering, and signal processing solutions built for precision and reliability in demanding environments.",
    capabilities: [
      "Custom embedded systems (STM32, ARM Cortex)",
      "RF engineering and signal processing",
      "Sensor integration and IoT platforms",
      "PCB design and hardware prototyping",
      "Firmware development in C, C++, Python",
      "Cloud-connected data logging systems",
    ],
  },
  {
    domain: "Defence" as const,
    description:
      "Indigenous defence technology from lightning detection networks to NavIC-integrated systems engineered for national significance and operational resilience.",
    capabilities: [
      "Indigenous alternatives to imported defence systems",
      "NavIC-integrated navigation and tracking",
      "Lightning detection and meteorological monitoring",
      "Secure communication system design",
      "Signal intelligence and EW support systems",
      "Embedded architectures for operational resilience",
    ],
  },
  {
    domain: "Medical" as const,
    description:
      "AI-driven medical devices and clinical decision support systems that reduce human error and improve outcomes in critical healthcare settings.",
    capabilities: [
      "AI/ML models for clinical decision support",
      "Pre-operative risk assessment tools",
      "Medical device prototyping and design",
      "BioTechnology-oriented embedded solutions",
      "Hospital workflow integration systems",
      "Patient monitoring and data analytics",
    ],
  },
  {
    domain: "AR/VR" as const,
    description:
      "Immersive simulation and spatial computing solutions built for defence training, medical procedures, and industrial operations requiring precision extended reality.",
    capabilities: [
      "AR training overlays for technical and tactical workflows",
      "VR mission rehearsal and simulation environments",
      "Mixed-reality interface design and system integration",
      "Head-mounted display (HMD) hardware development",
      "Real-time 3D rendering and spatial mapping",
      "Defence and medical simulation platforms",
    ],
  },
];

export default function DomainsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 border-y border-white/10 section-overlay">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Engineering Domains"
          subtitle="Four disciplines. One unified mission: build what India needs."
        >
          What We Build
        </SectionTitle>
        <p className="text-muted text-sm mb-10 max-w-xl -mt-8 leading-relaxed">
          Each vertical is a self-contained engineering discipline with dedicated expertise and tooling.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border border-white/10">
          {domains.map((d, i) => (
            <motion.div
              key={d.domain}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className={[
                "border-white/10",
                i < domains.length - 1 ? "border-b" : "",
                i < 2 ? "sm:border-b" : "sm:border-b-0",
                i % 2 === 0 ? "sm:border-r" : "sm:border-r-0",
                i < domains.length - 1 ? "xl:border-r" : "xl:border-r-0",
                "xl:border-b-0",
              ].filter(Boolean).join(" ")}
            >
              <DomainCard
                domain={d.domain}
                description={d.description}
                capabilities={d.capabilities}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
