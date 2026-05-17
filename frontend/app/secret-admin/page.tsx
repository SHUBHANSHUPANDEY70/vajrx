"use client";
import { useState, useEffect } from "react";
import AdminLayout from "@/components/templates/AdminLayout";
import AdminLogin from "@/components/organisms/AdminLogin";
import SubmissionsTable from "@/components/organisms/SubmissionsTable";
import Logo from "@/components/atoms/Logo";
import Button from "@/components/atoms/Button";
import { getContacts, getIdeas } from "@/lib/api";

type Tab = "contacts" | "ideas";

interface ContactRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
}

interface IdeaRow {
  id: number;
  name: string;
  email: string;
  idea_details: string;
  created_at: string;
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("contacts");
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [ideas, setIdeas] = useState<IdeaRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_token");
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([getContacts(), getIdeas()])
      .then(([c, i]) => {
        setContacts((c as ContactRow[]) || []);
        setIdeas((i as IdeaRow[]) || []);
      })
      .catch(() => {
        sessionStorage.removeItem("admin_token");
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) {
    return (
      <AdminLayout>
        <AdminLogin onSuccess={(t) => setToken(t)} />
      </AdminLayout>
    );
  }

  const contactColumns = [
    { key: "name" as keyof ContactRow, label: "Name" },
    { key: "email" as keyof ContactRow, label: "Email" },
    { key: "phone" as keyof ContactRow, label: "Phone" },
    { key: "message" as keyof ContactRow, label: "Message" },
    { key: "created_at" as keyof ContactRow, label: "Date", render: (v: ContactRow[keyof ContactRow]) => new Date(String(v)).toLocaleString() },
  ];

  const ideaColumns = [
    { key: "name" as keyof IdeaRow, label: "Name" },
    { key: "email" as keyof IdeaRow, label: "Email" },
    { key: "idea_details" as keyof IdeaRow, label: "Idea" },
    { key: "created_at" as keyof IdeaRow, label: "Date", render: (v: IdeaRow[keyof IdeaRow]) => new Date(String(v)).toLocaleString() },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-background px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <Logo />
              <span className="text-muted text-sm tracking-widest uppercase">Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { sessionStorage.removeItem("admin_token"); setToken(null); }}
            >
              Sign Out
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-surface border border-border rounded-sm p-6">
              <p className="text-muted text-xs uppercase tracking-widest mb-1">Contact Submissions</p>
              <p className="text-4xl font-black text-white">{contacts.length}</p>
            </div>
            <div className="bg-surface border border-border rounded-sm p-6">
              <p className="text-muted text-xs uppercase tracking-widest mb-1">Idea Submissions</p>
              <p className="text-4xl font-black text-accent">{ideas.length}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-surface border border-border rounded-sm p-1 w-fit">
            {(["contacts", "ideas"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 text-sm font-medium rounded-sm transition-colors duration-200 capitalize ${
                  tab === t ? "bg-accent text-white" : "text-muted hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tables */}
          {tab === "contacts" && (
            <SubmissionsTable
              columns={contactColumns}
              data={contacts}
              loading={loading}
              emptyMessage="No contact submissions yet."
            />
          )}
          {tab === "ideas" && (
            <SubmissionsTable
              columns={ideaColumns}
              data={ideas}
              loading={loading}
              emptyMessage="No idea submissions yet."
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
