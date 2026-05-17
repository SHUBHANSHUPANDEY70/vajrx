import Link from "next/link";
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
};

export default function Logo({ size = "md" }: LogoProps) {
  return (
    <Link href="/" className="inline-flex items-center gap-1 group">
      <span className={`font-black tracking-tighter ${sizeMap[size]} text-white group-hover:text-accent transition-colors duration-200`}>
        Vajr
      </span>
      <span className={`font-black tracking-tighter ${sizeMap[size]} text-accent group-hover:text-white transition-colors duration-200`}>
        X
      </span>
    </Link>
  );
}
