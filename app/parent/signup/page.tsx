"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users } from "lucide-react";

// English-only, matching /parent/login (no parent-flow strings exist in the
// source translations — the reference demo never had these screens).
export default function ParentSignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/parent/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Signup failed");
      return;
    }
    router.push("/parent/dashboard");
  }

  return (
    <div className="bk-bg-cream min-h-[560px] flex items-center justify-center px-6 py-16">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm bk-card">
        <Users className="bk-gold mb-4" size={26} />
        <h2 className="bk-display text-2xl mb-1">Create parent account</h2>
        <p className="bk-slate text-sm mb-6">Track how your children are reading.</p>
        <label className="bk-mono text-[10px] bk-slate">NAME</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border bk-border rounded-lg px-3 py-2 mt-1 mb-4 outline-none"
        />
        <label className="bk-mono text-[10px] bk-slate">EMAIL</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
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
          onClick={handleSignup}
          className="w-full bk-btn-primary rounded-lg py-2.5 font-medium mt-4 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
        <p className="text-xs bk-slate mt-4 text-center">
          Already have an account?{" "}
          <Link href="/parent/login" className="underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
