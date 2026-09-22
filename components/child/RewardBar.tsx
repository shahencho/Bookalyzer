import { Gift } from "lucide-react";
import { t, UI, type Lang } from "@/lib/i18n";

export function RewardBar({ count, goal, lang }: { count: number; goal: number; lang: Lang }) {
  const pct = Math.min(100, Math.round((count / goal) * 100));
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="flex items-center gap-1.5 text-sm font-medium">
          <Gift size={15} className="bk-gold" /> {t(UI.rewardHeading, lang)}
        </span>
        <span className="bk-mono text-[10px] bk-slate">
          {count}/{goal}
        </span>
      </div>
      <div className="w-full h-2 bg-[#EDE6D3] rounded-full overflow-hidden mb-1">
        <div className="h-full bk-bg-gold" style={{ width: `${pct}%` }} />
      </div>
      <p className="bk-slate text-xs mt-1.5">{t(UI.rewardExplain, lang)}</p>
    </div>
  );
}
