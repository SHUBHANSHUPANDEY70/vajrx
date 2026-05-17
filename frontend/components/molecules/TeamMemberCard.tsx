import Image from "next/image";
import React from "react";
import AnimatedCard from "./AnimatedCard";

interface TeamMemberCardProps {
  name: string;
  title: string;
  bio: string;
  imageSrc: string;
  featured?: boolean;
}

export default function TeamMemberCard({
  name,
  title,
  bio,
  imageSrc,
  featured = false,
}: TeamMemberCardProps) {
  return (
    <AnimatedCard className="h-full">
      <div
        className={`h-full bg-surface border ${featured ? "border-accent/50" : "border-border"} rounded-sm overflow-hidden flex flex-col transition-colors duration-200`}
      >
        <div className="relative w-full aspect-square bg-navy overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {featured && (
            <div className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-sm tracking-wider uppercase">
              Founder
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col gap-2 flex-1">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-accent text-sm font-medium tracking-wide">{title}</p>
          <p className="text-muted text-sm leading-relaxed mt-2">{bio}</p>
        </div>
      </div>
    </AnimatedCard>
  );
}
