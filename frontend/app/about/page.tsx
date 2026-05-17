"use client";
import { motion } from "framer-motion";
import PageLayout from "@/components/templates/PageLayout";
import TeamSection from "@/components/organisms/TeamSection";
import SectionTitle from "@/components/atoms/SectionTitle";

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="pt-24">
        {/* Hero */}
        <section className="py-24 px-6 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-accent text-sm font-semibold tracking-[0.3em] uppercase mb-4">About VajrX</p>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
                Engineering Sovereignty.
                <span className="block text-accent">Delivering Excellence.</span>
              </h1>
              <p className="text-muted text-lg leading-relaxed max-w-2xl">
                VajrX is a technology startup building indigenous solutions across Electronics, Defence, and Medical domains. We take ideas and turn them into precision-engineered realities — built in India, for India and the world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 px-6 bg-navy/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionTitle>Mission</SectionTitle>
              <p className="text-muted leading-relaxed">
                To develop cost-effective, high-reliability indigenous technology solutions that reduce India's dependence on imported systems — across defence, electronics, and medical domains. We build what others import.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SectionTitle>Vision</SectionTitle>
              <p className="text-muted leading-relaxed">
                To become a formidable participant in India's next-generation engineering landscape — a company known for precision, resilience, and strategic relevance. We envision a future where Indian-made technology sets the global standard.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <TeamSection />

        {/* Future Goals */}
        <section className="py-24 px-6 bg-navy/20 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <SectionTitle subtitle="Where we are headed.">Future Roadmap</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "National Lightning Network",
                  desc: "Deploy a decentralized, NavIC-integrated Time-of-Arrival lightning location network across India using our indigenous sensor nodes.",
                },
                {
                  title: "Clinical AI Deployment",
                  desc: "Validate and deploy our airway assessment ML model in hospital pre-operative workflows, expanding to broader anesthesiology risk assessment.",
                },
                {
                  title: "Defence Technology Scale",
                  desc: "Expand our embedded systems and signal processing capabilities into broader defence and aerospace applications, contributing to India's sovereign technology stack.",
                },
              ].map((goal, i) => (
                <motion.div
                  key={goal.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-surface border border-border rounded-sm p-6"
                >
                  <div className="w-8 h-px bg-accent mb-4" />
                  <h3 className="text-white font-bold mb-3">{goal.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{goal.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
