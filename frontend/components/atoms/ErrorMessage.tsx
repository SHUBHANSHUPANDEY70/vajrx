import React from "react";

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
      <span className="inline-block w-3 h-3 border border-red-400 rounded-full shrink-0 flex items-center justify-center">
        <span className="block w-px h-1.5 bg-red-400 rounded mx-auto" />
      </span>
      {message}
    </p>
  );
}
