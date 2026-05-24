"use client";
import React from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedCard({ children, className = "", onClick }: AnimatedCardProps) {
  return (
    <div
      onClick={onClick}
      className={`transition-all duration-300 ease-out hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
}
