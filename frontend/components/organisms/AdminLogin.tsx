"use client";
import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import Logo from "@/components/atoms/Logo";
import { adminLogin } from "@/lib/api";

interface AdminLoginProps {
  onSuccess: (token: string) => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) { setError("Password is required"); return; }
    setLoading(true);
    setError("");
    try {
      const { token } = await adminLogin(password);
      sessionStorage.setItem("admin_token", token);
      onSuccess(token);
    } catch {
      setError("Invalid password. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Logo size="lg" />
          <p className="text-muted text-sm mt-3 tracking-widest uppercase">Admin Access</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-sm p-8 flex flex-col gap-4">
          <Input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            hasError={!!error}
            autoFocus
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <Button type="submit" disabled={loading} fullWidth>
            {loading ? "Verifying..." : "Access Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
}
