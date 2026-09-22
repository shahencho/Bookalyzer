// Shared by both "ordering" and "ranking" question types — they use the
// identical content shape and interaction (reorder a list of items).
export function OrderingInput({
  content,
  value,
  onChange,
}: {
  content: { items: string[] };
  value: number[] | undefined;
  onChange: (value: number[]) => void;
}) {
  const order = value ?? content.items.map((_, i) => i);

  const move = (pos: number, dir: -1 | 1) => {
    const next = [...order];
    const target = pos + dir;
    if (target < 0 || target >= next.length) return;
    [next[pos], next[target]] = [next[target], next[pos]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-2">
      {order.map((itemIdx, pos) => (
        <div key={itemIdx} className="flex items-center gap-2 border bk-border rounded-lg px-3 py-2 text-sm">
          <span className="bk-mono text-[10px] bk-slate w-4">{pos + 1}</span>
          <span className="flex-1">{content.items[itemIdx]}</span>
          <button onClick={() => move(pos, -1)} className="bk-slate hover:bk-ink px-1" aria-label="Move up">
            ↑
          </button>
          <button onClick={() => move(pos, 1)} className="bk-slate hover:bk-ink px-1" aria-label="Move down">
            ↓
          </button>
        </div>
      ))}
    </div>
  );
}
