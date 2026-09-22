export function ClassificationInput({
  content,
  value,
  onChange,
}: {
  content: { groupA: string; groupB: string; options: { label: string }[] };
  value: Record<string, "A" | "B"> | undefined;
  onChange: (value: Record<string, "A" | "B">) => void;
}) {
  const current = value ?? {};
  return (
    <div className="flex flex-col gap-2">
      {content.options.map((opt, i) => (
        <div key={i} className="flex items-center justify-between border bk-border rounded-lg px-3 py-2">
          <span className="text-sm">{opt.label}</span>
          <div className="flex gap-1.5">
            {(["A", "B"] as const).map((g) => (
              <button
                key={g}
                onClick={() => onChange({ ...current, [String(i)]: g })}
                className={`bk-mono text-[10px] px-2.5 py-1 rounded-full border ${
                  current[String(i)] === g ? "bk-bg-night bk-cream-text border-transparent" : "bk-border"
                }`}
              >
                {g === "A" ? content.groupA : content.groupB}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
