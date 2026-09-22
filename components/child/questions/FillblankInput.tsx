import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";

export function FillblankInput({
  value,
  onChange,
}: {
  content: unknown;
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  const { lang } = useLang();
  return (
    <input
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t(UI.typeAnswer, lang)}
      className="w-full border bk-border rounded-lg px-3 py-2 outline-none text-sm"
    />
  );
}
