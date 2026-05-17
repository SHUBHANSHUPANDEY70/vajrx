"use client";
import { useState } from "react";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import { postContact } from "@/lib/api";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email";
  if (!form.phone.trim()) errors.phone = "Phone is required";
  if (!form.message.trim()) errors.message = "Message is required";
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", message: "" });
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
      await postContact(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-900/20 border border-green-700/50 rounded-sm p-8 text-center">
        <p className="text-green-400 text-lg font-semibold mb-2">Message sent.</p>
        <p className="text-muted text-sm">We'll get back to you at {form.email || "your email"} shortly.</p>
        <button onClick={() => setStatus("idle")} className="mt-4 text-accent text-sm hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <FormField id="name" label="Full Name" placeholder="Shubhanshu Pandey" value={form.name} onChange={handleChange} error={errors.name} required />
      <FormField id="email" label="Email Address" type="email" placeholder="contact@vajrx.com" value={form.email} onChange={handleChange} error={errors.email} required />
      <FormField id="phone" label="Phone Number" type="tel" placeholder="+91 6266995073" value={form.phone} onChange={handleChange} error={errors.phone} required />
      <FormField id="message" label="Message" placeholder="Tell us what you have in mind..." value={form.message} onChange={handleChange} error={errors.message} required multiline rows={5} />
      {status === "error" && (
        <p className="text-red-400 text-sm bg-red-900/20 border border-red-700/50 rounded-sm px-4 py-3">{errorMsg}</p>
      )}
      <Button type="submit" disabled={status === "loading"} fullWidth>
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
