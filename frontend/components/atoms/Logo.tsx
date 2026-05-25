import Link from "next/link";
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { width: 80, height: 28 },
  md: { width: 110, height: 38 },
  lg: { width: 130, height: 44 },
};

export default function Logo({ size = "md" }: LogoProps) {
  const dims = sizeMap[size];
  return (
    <Link href="/" className="inline-flex items-center leading-none">
      <img
        src="/vajrx.png"
        alt="VajrX Technology"
        width={dims.width}
        height={dims.height}
        className="object-contain"
      />
    </Link>
  );
}
