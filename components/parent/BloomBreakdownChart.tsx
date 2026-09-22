import { BarChart3 } from "lucide-react";
import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";

export function BloomBreakdownChart({ bloom }: { bloom: Record<string, number> }) {
  const { lang } = useLang();
  const entries = Object.entries(bloom);
  return (
    <div className="bg-white rounded-2xl p-6 bk-card mb-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={16} className="bk-gold" />
        <div className="bk-display text-lg">{t(UI.bloomBreakdown, lang)}</div>
      </div>
      {entries.length === 0 ? (
        <p className="bk-slate text-sm">{t(UI.noAssessmentsYet, lang)}</p>
      ) : (
        <div className="flex flex-col gap-3">
          {entries.map(([level, pct]) => (
            <div key={level}>
              <div className="flex justify-between text-xs mb-1">
                <span>{level}</span>
                <span className="bk-mono bk-slate">{pct}%</span>
              </div>
              <div className="w-full h-2 bg-[#EDE6D3] rounded-full overflow-hidden">
                <div className="h-full bk-bg-gold" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
