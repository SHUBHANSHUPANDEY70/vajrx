const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

function authHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? sessionStorage.getItem("admin_token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Public endpoints
export const postContact = (data: { name: string; email: string; phone: string; message: string }) =>
  request("/api/contact", { method: "POST", body: JSON.stringify(data) });

export const postIdea = (data: { name: string; email: string; ideaDetails: string }) =>
  request("/api/idea", { method: "POST", body: JSON.stringify(data) });

// Admin endpoints
export const adminLogin = (password: string): Promise<{ token: string }> =>
  request("/api/admin/login", { method: "POST", body: JSON.stringify({ password }) });

export const getContacts = () =>
  request("/api/admin/contacts", { headers: authHeaders() });

export const getIdeas = () =>
  request("/api/admin/ideas", { headers: authHeaders() });
