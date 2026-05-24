import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export default function Textarea({ hasError = false, className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full bg-white/5 border ${hasError ? "border-red-400" : "border-white/10"} text-foreground placeholder-muted px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors duration-200 resize-none ${className}`}
      {...props}
    />
  );
}
