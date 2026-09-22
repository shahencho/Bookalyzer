export function McInput({
  content,
  value,
  onChange,
}: {
  content: { options: string[] };
  value: number | undefined;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {content.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`text-left px-4 py-2.5 rounded-lg border text-sm ${
            value === i ? "bk-bg-night bk-cream-text border-transparent" : "bk-border hover:bg-[#FBF7EF]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
