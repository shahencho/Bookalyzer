"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";

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
  const { lang } = useLang();
  const [children, setChildren] = useState<ChildSummary[]>([]);

  useEffect(() => {
    fetch("/api/parent/children")
      .then((r) => r.json())
      .then(setChildren);
  }, []);

  return (
    <div className="bk-bg-cream min-h-[560px] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="bk-display text-2xl mb-1">{t(UI.parentHeading, lang)}</h2>
        <p className="bk-slate text-sm mb-6">{t(UI.parentSub, lang)}</p>
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
