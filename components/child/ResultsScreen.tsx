import { Check, X, Trophy } from "lucide-react";
import { StarField } from "@/components/layout/StarField";
import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";

interface Breakdown {
  questionId: number;
  prompt: string;
  bloomLevel: string;
  score: number;
  explanation: string;
}

export function ResultsScreen({
  overallScore,
  xpEarned,
  badgeEarned,
  breakdown,
  onDone,
}: {
  overallScore: number;
  xpEarned: number;
  badgeEarned: "BRONZE" | "SILVER" | "GOLD";
  breakdown: Breakdown[];
  onDone: () => void;
}) {
  const { lang } = useLang();
  const badgeClass =
    badgeEarned === "GOLD" ? "bk-bg-gold" : badgeEarned === "SILVER" ? "bk-bg-silver" : "bk-bg-bronze";

  return (
    <div className="max-w-xl mx-auto">
      <div className="bk-bg-night rounded-2xl p-8 text-center bk-card mb-6 relative overflow-hidden">
        <StarField count={25} />
        <div className="relative">
          <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-4 ${badgeClass}`}>
            <Trophy size={22} className="text-white" />
          </div>
          <div className="bk-mono text-[10px] bk-gold mb-2">{badgeEarned} {t(UI.badgeEarned, lang)}</div>
          <h2 className="bk-display bk-cream-text text-3xl mb-1">{overallScore}%</h2>
          <p className="bk-cream-slate text-sm">{t(UI.overallScore, lang)} · +{xpEarned} {t(UI.xpEarned, lang)}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {breakdown.map((b) => {
          const correct = b.score === 1;
          return (
            <div key={b.questionId} className="bg-white rounded-xl p-4 bk-card">
              <div className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    correct ? "bk-bg-sage" : b.score > 0 ? "bk-bg-gold" : "bg-[#E7B0B7]"
                  }`}
                >
                  {correct ? <Check size={13} className="text-white" /> : <X size={13} className="text-white" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium mb-1">{b.prompt}</div>
                  <div className="bk-mono text-[10px] bk-slate mb-1">
                    {b.score === 1
                      ? t(UI.correct, lang)
                      : b.score > 0
                        ? `${t(UI.partialCredit, lang)} (${Math.round(b.score * 100)}%)`
                        : t(UI.notQuite, lang)}{" "}
                    · {b.bloomLevel}
                  </div>
                  <div className="bk-slate text-xs">{b.explanation}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={onDone} className="w-full bk-btn-dark rounded-lg py-2.5 text-sm font-medium mt-6">
        {t(UI.backToLibrary, lang)}
      </button>
    </div>
  );
}
