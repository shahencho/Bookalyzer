import { useLang } from "@/components/layout/LangProvider";
import { t, UI } from "@/lib/i18n";

export function OpenInput({
  value,
  onChange,
}: {
  content: unknown;
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  const { lang } = useLang();
  return (
    <textarea
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      rows={4}
      placeholder={t(UI.writeAnswer, lang)}
      className="w-full border bk-border rounded-lg px-3 py-2 outline-none text-sm"
    />
  );
}
