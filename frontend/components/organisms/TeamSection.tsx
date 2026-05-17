"use client";
import { motion } from "framer-motion";
import TeamMemberCard from "@/components/molecules/TeamMemberCard";
import SectionTitle from "@/components/atoms/SectionTitle";

const team = [
  {
    name: "Shubhanshu Pandey",
    title: "Founder & Director",
    bio: "Electrical Engineering student with a strong focus on R&D and embedded systems. Research Intern at NRSC, ISRO, working on indigenization of LDSN lightning detection devices and NavIC integration. National-level aerospace modeling recognition (ISROxIITR 2024). Driving VajrX's vision of indigenous engineering across defence and electronics.",
    imageSrc: "/team/shubhanshu.svg",
    featured: true,
  },
  {
    name: "Subrato Malvia",
    title: "Director",
    bio: "Electrical Engineer specializing in embedded systems, intelligent sensing technologies, and high-reliability electronic system design. Leads development of next-generation sensing and embedded platforms for defence, aerospace, and medical applications at VajrX.",
    imageSrc: "/team/subrato.svg",
    featured: false,
  },
  {
    name: "Avani Pandit",
    title: "Director",
    bio: "Electrical systems engineer and defence-technology entrepreneur. Professional formation at ISRO (NRSC), DRDO-affiliated environments, Army Base Workshop 506, and IISc. Expert in signal processing, embedded architectures, and secure electrical infrastructures. Passionate about BioTechnology-oriented solutions.",
    imageSrc: "/team/avani.svg",
    featured: false,
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle="The people building VajrX.">
          Our Team
        </SectionTitle>
        {/* Founder — full width on mobile, prominent on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="md:max-w-sm">
            <TeamMemberCard {...team[0]} />
          </div>
        </motion.div>
        {/* Directors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.slice(1).map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <TeamMemberCard {...member} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
