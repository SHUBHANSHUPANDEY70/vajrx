import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export default function Label({ children, required, className = "", ...props }: LabelProps) {
  return (
    <label
      className={`block text-sm font-medium text-foreground/80 mb-1.5 tracking-wide ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
