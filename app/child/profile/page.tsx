"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, Award, Clock } from "lucide-react";
import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";
import { RewardBar } from "@/components/child/RewardBar";
import { BadgeTally } from "@/components/child/BadgeTally";
import { fetchOrRedirect } from "@/lib/fetchOrRedirect";

interface ChildMe {
  name: string;
  nickname: string;
  xp: number;
  booksCompleted: number;
  attempts: number;
  lastScore: number | null;
  badgeTally: { GOLD: number; SILVER: number; BRONZE: number };
  rewardCount: number;
  rewardGoal: number;
  history: { date: string; book: string; mode: string; score: number }[];
}

const MODE_LABEL_KEY: Record<string, string> = { SHORT: "modeShort", EXTENDED: "modeExtended", PHYSICAL: "modePhysical" };

export default function ChildProfilePage() {
  const router = useRouter();
  const { lang } = useLang();
  const [me, setMe] = useState<ChildMe | null>(null);

  useEffect(() => {
    fetchOrRedirect<ChildMe | null>("/api/child/me", router, "/child/login", null).then(setMe);
  }, [router]);

  if (!me) return <div className="bk-bg-cream min-h-[560px] px-6 py-10 text-center bk-slate text-sm">...</div>;

  return (
    <div className="bk-bg-cream min-h-[560px] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <Link href="/child/library" className="flex items-center gap-1 bk-slate text-sm mb-6 hover:bk-ink">
          <ArrowLeft size={14} /> {t(UI.backToLibrary, lang)}
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bk-bg-night flex items-center justify-center">
            <User size={20} className="bk-gold" />
          </div>
          <div>
            <h2 className="bk-display text-2xl">{me.name}</h2>
            <div className="bk-mono text-[10px] bk-slate">@{me.nickname}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            [t(UI.booksCompleted, lang), me.booksCompleted],
            [t(UI.attempts, lang), me.attempts],
            [me.lastScore !== null ? `${me.lastScore}%` : "—", t(UI.lastScore, lang)],
            [me.xp, t(UI.xpEarned, lang)],
          ].map(([val, label], i) => (
            <div key={i} className="bg-white rounded-xl p-4 bk-card text-center">
              <div className="bk-display text-2xl bk-gold">{val}</div>
              <div className="bk-mono text-[8px] bk-slate mt-1">{String(label).toUpperCase()}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 bk-card mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} className="bk-gold" />
            <div className="bk-display text-lg">{t(UI.myBadges, lang)}</div>
          </div>
          <BadgeTally tally={me.badgeTally} />
        </div>

        <div className="bg-white rounded-2xl p-6 bk-card mb-6">
          <RewardBar count={me.rewardCount} goal={me.rewardGoal} lang={lang} />
        </div>

        <div className="bg-white rounded-2xl p-6 bk-card">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={16} className="bk-gold" />
            <div className="bk-display text-lg">{t(UI.myHistory, lang)}</div>
          </div>
          <div className="flex flex-col divide-y bk-border">
            {me.history.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 text-sm gap-2">
                <span className="bk-slate text-xs w-24 shrink-0">{new Date(h.date).toLocaleDateString()}</span>
                <span className="flex-1">{h.book}</span>
                <span className="bk-mono text-[10px] bk-slate">{t(UI[MODE_LABEL_KEY[h.mode]], lang)}</span>
                <span className="bk-mono">{h.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
