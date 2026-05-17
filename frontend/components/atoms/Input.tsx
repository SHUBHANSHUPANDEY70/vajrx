import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export default function Input({ hasError = false, className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full bg-surface border ${hasError ? "border-red-500" : "border-border"} text-white placeholder-muted rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors duration-200 ${className}`}
      {...props}
    />
  );
}
