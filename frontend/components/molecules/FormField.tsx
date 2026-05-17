import React from "react";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import ErrorMessage from "@/components/atoms/ErrorMessage";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  multiline = false,
  rows = 4,
}: FormFieldProps) {
  return (
    <div className="flex flex-col">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {multiline ? (
        <Textarea
          id={id}
          name={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          hasError={!!error}
          rows={rows}
          required={required}
        />
      ) : (
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          hasError={!!error}
          required={required}
        />
      )}
      <ErrorMessage message={error} />
    </div>
  );
}
