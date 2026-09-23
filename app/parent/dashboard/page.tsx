"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Plus } from "lucide-react";
import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";
import { fetchOrRedirect } from "@/lib/fetchOrRedirect";

interface ChildSummary {
  id: number;
  name: string;
  nickname: string;
  age: number;
  xp: number;
  booksCompleted: number;
  lastScore: number | null;
}

export default function ParentDashboardPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [children, setChildren] = useState<ChildSummary[]>([]);
  const [showAddChild, setShowAddChild] = useState(false);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [pin, setPin] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchOrRedirect("/api/parent/children", router, "/parent/login", [] as ChildSummary[]).then(setChildren);
  }, [router]);

  async function handleAddChild() {
    setSaving(true);
    setError(null);
    const res = await fetch("/api/parent/children", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, nickname, pin, age: Number(age) }),
    });
    setSaving(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Could not add child");
      return;
    }
    const created = await res.json();
    setChildren((prev) => [...prev, created]);
    setShowAddChild(false);
    setName("");
    setNickname("");
    setPin("");
    setAge("");
  }

  return (
    <div className="bk-bg-cream min-h-[560px] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-1">
          <h2 className="bk-display text-2xl">{t(UI.parentHeading, lang)}</h2>
          <button
            onClick={() => setShowAddChild((v) => !v)}
            className="flex items-center gap-1 bk-btn-outline rounded-lg px-3 py-1.5 text-sm font-medium"
          >
            <Plus size={14} /> Add child
          </button>
        </div>
        <p className="bk-slate text-sm mb-6">{t(UI.parentSub, lang)}</p>
        {showAddChild && (
          <div className="bg-white rounded-2xl p-5 bk-card mb-4">
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="bk-mono text-[10px] bk-slate">NAME</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border bk-border rounded-lg px-3 py-2 mt-1 outline-none"
                />
              </div>
              <div>
                <label className="bk-mono text-[10px] bk-slate">NICKNAME (for login)</label>
                <input
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="lowercase, letters/numbers/_"
                  className="w-full border bk-border rounded-lg px-3 py-2 mt-1 outline-none"
                />
              </div>
              <div>
                <label className="bk-mono text-[10px] bk-slate">PIN (4 digits)</label>
                <input
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  type="password"
                  maxLength={4}
                  placeholder="••••"
                  className="w-full border bk-border rounded-lg px-3 py-2 mt-1 outline-none"
                />
              </div>
              <div>
                <label className="bk-mono text-[10px] bk-slate">AGE</label>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                  min={4}
                  max={17}
                  className="w-full border bk-border rounded-lg px-3 py-2 mt-1 outline-none"
                />
              </div>
            </div>
            {error && <p className="text-xs text-red-600 mb-3">{error}</p>}
            <div className="flex gap-2">
              <button
                disabled={saving}
                onClick={handleAddChild}
                className="bk-btn-primary rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50"
              >
                {saving ? "Adding..." : "Add child"}
              </button>
              <button
                onClick={() => setShowAddChild(false)}
                className="bk-btn-outline rounded-lg px-4 py-2 text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-2 gap-4">
          {children.map((c) => (
            <Link
              key={c.id}
              href={`/parent/child/${c.id}`}
              className="text-left bg-white rounded-2xl p-5 bk-card hover:-translate-y-1 transition-transform block"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bk-bg-night flex items-center justify-center">
                  <User size={16} className="bk-gold" />
                </div>
                <div>
                  <div className="bk-display text-lg leading-tight">{c.name}</div>
                  <div className="bk-mono text-[10px] bk-slate">AGE {c.age} · @{c.nickname}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="bk-display text-lg">{c.booksCompleted}</div>
                  <div className="bk-mono text-[9px] bk-slate">{t(UI.booksLabel, lang)}</div>
                </div>
                <div>
                  <div className="bk-display text-lg">{c.lastScore ?? "—"}%</div>
                  <div className="bk-mono text-[9px] bk-slate">{t(UI.lastScoreLabel, lang)}</div>
                </div>
                <div>
                  <div className="bk-display text-lg bk-gold">{c.xp}</div>
                  <div className="bk-mono text-[9px] bk-slate">{t(UI.xpLabelShort, lang)}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
