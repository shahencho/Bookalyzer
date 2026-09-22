"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Sparkles, Clock } from "lucide-react";
import { BloomBreakdownChart } from "@/components/parent/BloomBreakdownChart";
import { ScoreHistoryChart } from "@/components/parent/ScoreHistoryChart";
import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";
import { fetchOrRedirect } from "@/lib/fetchOrRedirect";

interface ChildDetail {
  id: number;
  name: string;
  nickname: string;
  age: number;
  xp: number;
  booksCompleted: number;
  attempts: number;
  lastScore: number | null;
  bloom: Record<string, number>;
  insight: string;
  history: { date: string; mode: string; score: number; book: string }[];
}

export default function ChildDetailPage({ params }: { params: Promise<{ childId: string }> }) {
  const { childId } = use(params);
  const router = useRouter();
  const { lang } = useLang();
  const [child, setChild] = useState<ChildDetail | null>(null);

  useEffect(() => {
    fetchOrRedirect<ChildDetail | null>(`/api/parent/children/${childId}`, router, "/parent/login", null).then(setChild);
  }, [childId, router]);

  if (!child) return <div className="bk-bg-cream min-h-[560px] px-6 py-10 text-center bk-slate text-sm">Loading...</div>;

  return (
    <div className="bk-bg-cream min-h-[560px] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/parent/dashboard" className="flex items-center gap-1 bk-slate text-sm mb-6 hover:bk-ink">
          <ArrowLeft size={14} /> {t(UI.backDash, lang)}
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bk-bg-night flex items-center justify-center">
            <User size={20} className="bk-gold" />
          </div>
          <div>
            <h2 className="bk-display text-2xl">{child.name}</h2>
            <div className="bk-mono text-[10px] bk-slate">AGE {child.age} · @{child.nickname}</div>
          </div>
        </div>

        <div className="grid sm:grid-cols-4 gap-3 mb-6">
          {[
            [t(UI.booksCompleted, lang), child.booksCompleted],
            [t(UI.attempts, lang), child.attempts],
            [t(UI.lastScore, lang), child.lastScore !== null ? `${child.lastScore}%` : "—"],
            [t(UI.xpEarned, lang), child.xp],
          ].map(([label, val]) => (
            <div key={label as string} className="bg-white rounded-xl p-4 bk-card text-center">
              <div className="bk-display text-2xl">{val}</div>
              <div className="bk-mono text-[9px] bk-slate mt-1">{(label as string).toUpperCase()}</div>
            </div>
          ))}
        </div>

        <ScoreHistoryChart history={child.history} lang={lang} />

        <BloomBreakdownChart bloom={child.bloom} />

        <div className="bg-white rounded-2xl p-6 bk-card mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="bk-gold" />
            <div className="bk-display text-lg">{t(UI.insight, lang)}</div>
          </div>
          <p className="bk-slate text-sm leading-relaxed">{child.insight}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 bk-card">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="bk-gold" />
            <div className="bk-display text-lg">{t(UI.readingHistory, lang)}</div>
          </div>
          <div className="flex flex-col divide-y bk-border">
            {child.history.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 text-sm gap-2">
                <span className="bk-slate text-xs w-20 shrink-0">{new Date(h.date).toLocaleDateString()}</span>
                <span className="flex-1 truncate">{h.book}</span>
                <span className="bk-mono text-[10px] bk-slate shrink-0">{h.mode}</span>
                <span className="bk-mono shrink-0">{h.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
