"use client";
import Link from "next/link";
import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover border border-accent hover:border-accent-hover",
  secondary:
    "bg-surface text-white hover:bg-surface-raised border border-border hover:border-muted",
  ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-surface border border-transparent",
  outline:
    "bg-transparent text-accent hover:bg-accent hover:text-white border border-accent/60 hover:border-accent",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-xs font-mono tracking-wide",
  md: "px-6 py-3 text-sm font-semibold tracking-wide",
  lg: "px-8 py-4 text-sm font-semibold tracking-wide",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={base}
    >
      {children}
    </button>
  );
}
