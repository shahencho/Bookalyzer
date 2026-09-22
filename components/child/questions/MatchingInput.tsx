import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";

export function MatchingInput({
  content,
  value,
  onChange,
}: {
  content: { left: string[]; right: string[] };
  value: Record<string, number> | undefined;
  onChange: (value: Record<string, number>) => void;
}) {
  const { lang } = useLang();
  const current = value ?? {};
  return (
    <div className="flex flex-col gap-2">
      {content.left.map((l, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-sm w-40 shrink-0">{l}</span>
          <select
            value={current[String(i)] ?? ""}
            onChange={(e) => onChange({ ...current, [String(i)]: Number(e.target.value) })}
            className="flex-1 border bk-border rounded-lg px-2 py-1.5 text-sm outline-none"
          >
            <option value="" disabled>
              {t(UI.chooseMatch, lang)}
            </option>
            {content.right.map((r, j) => (
              <option key={j} value={j}>
                {r}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
