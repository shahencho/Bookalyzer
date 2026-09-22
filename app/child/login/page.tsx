"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Rocket } from "lucide-react";
import { StarField } from "@/components/layout/StarField";
import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";

export default function ChildLoginPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [nickname, setNickname] = useState("ani_star");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/child/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, pin }),
    });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Login failed");
      return;
    }
    router.push("/child/library");
  }

  return (
    <div className="relative bk-bg-night min-h-[560px] flex items-center justify-center px-6 py-16 overflow-hidden">
      <StarField count={50} />
      <div className="relative bk-bg-cream rounded-2xl p-8 w-full max-w-sm bk-card">
        <Rocket className="bk-gold mb-4" size={26} />
        <h2 className="bk-display text-2xl mb-1">{t(UI.loginHeading, lang)}</h2>
        <p className="bk-slate text-sm mb-6">{t(UI.loginSub, lang)}</p>
        <label className="bk-mono text-[10px] bk-slate">{t(UI.nicknameLabel, lang)}</label>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="ani_star"
          className="w-full border bk-border rounded-lg px-3 py-2 mt-1 mb-4 outline-none"
        />
        <label className="bk-mono text-[10px] bk-slate">{t(UI.pinLabel, lang)}</label>
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          type="password"
          maxLength={4}
          placeholder="••••"
          className="w-full border bk-border rounded-lg px-3 py-2 mt-1 mb-2 outline-none"
        />
        {error && <p className="text-xs text-red-600 mb-4">{error}</p>}
        <button
          disabled={loading}
          onClick={handleLogin}
          className="w-full bk-btn-primary rounded-lg py-2.5 font-medium mt-4 disabled:opacity-50"
        >
          {loading ? "..." : t(UI.startReading, lang)}
        </button>
      </div>
    </div>
  );
}
