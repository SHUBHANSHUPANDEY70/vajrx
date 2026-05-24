import Link from "next/link";
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };
const subSizeMap = { sm: "text-[9px]", md: "text-[10px]", lg: "text-xs" };

export default function Logo({ size = "md" }: LogoProps) {
  return (
    <Link href="/" className="inline-flex items-end gap-1.5 group leading-none">
      <div className="flex items-baseline gap-0.5">
        <span className={`font-display font-bold tracking-tight ${sizeMap[size]} text-foreground group-hover:text-accent transition-colors duration-200`}>
          Vajr
        </span>
        <span className={`font-display font-bold tracking-tight ${sizeMap[size]} text-accent group-hover:text-foreground transition-colors duration-200`}>
          X
        </span>
      </div>
      <span className={`font-mono ${subSizeMap[size]} text-muted tracking-widest uppercase mb-0.5 group-hover:text-accent/70 transition-colors duration-200`}>
        Technology
      </span>
    </Link>
  );
}
