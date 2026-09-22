"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

// Client-side count-up stopwatch, no auto-submit/time pressure (consistent
// with "learning over testing"). The value is sent along with submit purely
// as parent-dashboard telemetry — it is client-reported and unverified,
// never used for scoring or any security decision.
export function AssessmentTimer({ onTick }: { onTick?: (seconds: number) => void }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        const next = s + 1;
        onTick?.(next);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onTick]);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <span className="bk-mono text-[10px] bk-slate flex items-center gap-1">
      <Clock size={11} /> {mins}:{secs}
    </span>
  );
}
