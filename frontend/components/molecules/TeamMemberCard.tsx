import Image from "next/image";
import React from "react";

interface TeamMemberCardProps {
  name: string;
  title: string;
  bio: string;
  imageSrc: string;
  featured?: boolean;
}

export default function TeamMemberCard({ name, title, bio, imageSrc, featured = false }: TeamMemberCardProps) {
  return (
    <div className={`group h-full bg-surface border ${featured ? "border-accent/50" : "border-border"} hover:border-accent/40 transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-md`}>
      {featured && <div className="h-px bg-accent" />}

      <div className="relative w-full aspect-square bg-navy overflow-hidden">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {featured && (
          <div className="absolute top-3 right-3 bg-accent text-white font-mono text-xs font-medium px-2.5 py-1 tracking-widest uppercase">
            Founder
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col gap-2 flex-1">
        <h3 className="font-display font-bold text-lg text-foreground group-hover:text-accent transition-colors duration-300">
          {name}
        </h3>
        <p className="font-mono text-xs text-accent tracking-wide uppercase">{title}</p>
        <p className="text-muted text-sm leading-relaxed mt-2">{bio}</p>
      </div>
    </div>
  );
}
