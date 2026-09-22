export function ProgressPath({ steps, currentIndex }: { steps: string[]; currentIndex: number }) {
  return (
    <div className="flex items-center w-full max-w-xl mx-auto mb-8">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className="bk-node flex items-center justify-center"
              style={{
                background: i <= currentIndex ? "#1B2436" : "#EDE6D3",
                border: i === currentIndex ? "2px solid #E3A94F" : "none",
              }}
            />
            <span className="bk-mono text-[10px] bk-slate whitespace-nowrap">{label}</span>
          </div>
          {i < steps.length - 1 && <div className="bk-node-line mx-2 mb-4" />}
        </div>
      ))}
    </div>
  );
}
