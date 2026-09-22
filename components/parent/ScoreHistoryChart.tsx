"use client";

import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { t, UI, type Lang } from "@/lib/i18n";

interface HistoryPoint {
  date: string;
  score: number;
}

export function ScoreHistoryChart({ history, lang }: { history: HistoryPoint[]; lang: Lang }) {
  const data = history
    .slice()
    .reverse()
    .map((h) => ({ date: new Date(h.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }), score: h.score }));

  return (
    <div className="bg-white rounded-2xl p-6 bk-card mb-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} className="bk-gold" />
        <div className="bk-display text-lg">{t(UI.overallProgress, lang)}</div>
      </div>
      {data.length === 0 ? (
        <p className="bk-slate text-sm">{t(UI.noAssessmentsYet, lang)}</p>
      ) : (
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDE6D3" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#5B6B7C" }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#5B6B7C" }} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#E3A94F" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
