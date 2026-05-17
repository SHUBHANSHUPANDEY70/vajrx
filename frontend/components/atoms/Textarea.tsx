import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export default function Textarea({ hasError = false, className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full bg-surface border ${hasError ? "border-red-500" : "border-border"} text-white placeholder-muted rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors duration-200 resize-none ${className}`}
      {...props}
    />
  );
}
