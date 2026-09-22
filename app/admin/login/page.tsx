"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("shahen.grigoryan@gmail.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Login failed");
      return;
    }
    router.push("/admin/books");
  }

  return (
    <div className="bk-bg-cream min-h-[560px] flex items-center justify-center px-6 py-16">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm bk-card">
        <BarChart3 className="bk-gold mb-4" size={26} />
        <h2 className="bk-display text-2xl mb-1">Admin login</h2>
        <p className="bk-slate text-sm mb-6">Manage books, covers, and publishing status.</p>
        <label className="bk-mono text-[10px] bk-slate">EMAIL</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border bk-border rounded-lg px-3 py-2 mt-1 mb-4 outline-none"
        />
        <label className="bk-mono text-[10px] bk-slate">PASSWORD</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full border bk-border rounded-lg px-3 py-2 mt-1 mb-2 outline-none"
        />
        {error && <p className="text-xs text-red-600 mb-4">{error}</p>}
        <button
          disabled={loading}
          onClick={handleLogin}
          className="w-full bk-btn-primary rounded-lg py-2.5 font-medium mt-4 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </div>
    </div>
  );
}
