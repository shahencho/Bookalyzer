import { Medal } from "lucide-react";

export function BadgeTally({ tally }: { tally: { GOLD: number; SILVER: number; BRONZE: number } }) {
  const rows: [string, number, string][] = [
    ["Gold", tally.GOLD, "bk-bg-gold"],
    ["Silver", tally.SILVER, "bk-bg-silver"],
    ["Bronze", tally.BRONZE, "bk-bg-bronze"],
  ];
  return (
    <div className="flex items-center gap-6">
      {rows.map(([name, count, cls]) => (
        <div key={name} className="flex items-center gap-2">
          <span className={`inline-flex items-center justify-center rounded-full ${cls}`} style={{ width: 26, height: 26 }}>
            <Medal size={13} className="text-white" />
          </span>
          <span className="bk-display text-lg">{count}</span>
        </div>
      ))}
    </div>
  );
}
