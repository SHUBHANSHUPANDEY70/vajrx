"use client";
import { useState } from "react";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import { postIdea } from "@/lib/api";

interface FormState {
  name: string;
  email: string;
  ideaDetails: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  ideaDetails?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email";
  if (!form.ideaDetails.trim()) errors.ideaDetails = "Please describe your idea";
  else if (form.ideaDetails.trim().length < 20) errors.ideaDetails = "Please provide more detail (at least 20 characters)";
  return errors;
}

export default function IdeaForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", ideaDetails: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus("loading");
    try {
      await postIdea(form);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-900/20 border border-green-700/50 rounded-sm p-8 text-center">
        <p className="text-green-400 text-lg font-semibold mb-2">Idea submitted.</p>
        <p className="text-muted text-sm">We'll review your idea and reach out to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <FormField id="name" label="Full Name" placeholder="Your name" value={form.name} onChange={handleChange} error={errors.name} required />
      <FormField id="email" label="Email Address" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} error={errors.email} required />
      <FormField id="ideaDetails" label="Project Idea" placeholder="Describe your project idea in detail — what problem it solves, what domain it falls under, and any technical requirements you have in mind..." value={form.ideaDetails} onChange={handleChange} error={errors.ideaDetails} required multiline rows={8} />
      {status === "error" && (
        <p className="text-red-400 text-sm bg-red-900/20 border border-red-700/50 rounded-sm px-4 py-3">{errorMsg}</p>
      )}
      <Button type="submit" disabled={status === "loading"} fullWidth>
        {status === "loading" ? "Submitting..." : "Submit Idea"}
      </Button>
    </form>
  );
}
