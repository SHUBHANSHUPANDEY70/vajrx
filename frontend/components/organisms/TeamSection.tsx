"use client";
import { motion } from "framer-motion";
import TeamMemberCard from "@/components/molecules/TeamMemberCard";
import SectionTitle from "@/components/atoms/SectionTitle";

const team = [
  {
    name: "Shubhanshu Pandey",
    title: "Founder & Director",
    bio: "Electrical Engineer with a strong focus on R&D and embedded systems. Research Intern at NRSC, ISRO, working on indigenization of LDSN lightning detection devices and NavIC integration. Driving VajrX Technology's vision of indigenous engineering across defence and electronics.",
    imageSrc: "/team/shubhanshu.png",
    featured: true,
  },
  {
    name: "Subrato Malvia",
    title: "Founder & Director",
    bio: "Electrical Engineer specializing in embedded systems, intelligent sensing technologies, and high-reliability electronic system design. Leads development of next-generation sensing and embedded platforms for defence, aerospace, and medical applications at VajrX Technology.",
    imageSrc: "/team/subrato.png",
    featured: true,
  },
  {
    name: "Avani Pandit",
    title: "Founder & Director",
    bio: "Electrical Engineer and defence-technology entrepreneur. Professional formation at ISRO (NRSC), DRDO-affiliated environments, Army Base Workshop 506, and IISc. Expert in signal processing, embedded architectures, and secure electrical infrastructures.",
    imageSrc: "/team/avani.png",
    featured: true,
  },
];

export default function TeamSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionTitle label="Leadership" subtitle="The founders and engineers building VajrX Technology.">
          Our Team
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className="h-full"
            >
              <TeamMemberCard {...member} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
