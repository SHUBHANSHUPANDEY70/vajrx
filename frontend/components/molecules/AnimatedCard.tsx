"use client";
import { motion } from "framer-motion";
import React from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedCard({ children, className = "", onClick }: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 24px rgba(59,130,246,0.25)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
}
