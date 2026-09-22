export function StarField({ count = 40 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => {
    const seed = (i * 97) % 100;
    return {
      top: `${(i * 37) % 100}%`,
      left: `${(i * 61 + seed) % 100}%`,
      size: 1 + (i % 3),
      opacity: 0.3 + ((i * 13) % 50) / 100,
    };
  });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <div
          key={i}
          className="bk-star-dot"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity }}
        />
      ))}
    </div>
  );
}
