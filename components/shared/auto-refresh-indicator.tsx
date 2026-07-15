"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

export function AutoRefreshIndicator({ intervalSeconds = 30 }: { intervalSeconds?: number }) {
  const [secondsLeft, setSecondsLeft] = useState(intervalSeconds);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setSpinning(true);
          setTimeout(() => setSpinning(false), 600);
          return intervalSeconds;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [intervalSeconds]);

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1 text-xs text-gray-500">
      <RefreshCw className={`h-3 w-3 text-primary-500 ${spinning ? "animate-spin" : ""}`} />
      Live · refreshes in {secondsLeft}s
    </div>
  );
}
