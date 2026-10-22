"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";

const R = 88;
const C = 2 * Math.PI * R;

/**
 * Kruh, který se při zobrazení zaplní a čísla doběhnou do `seconds` (AI portrét do 40 vteřin).
 * Bez animací se ukáže rovnou plný.
 */
export function TimerRing({ seconds, label }: { seconds: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.5);
  const reduce = useReducedMotion();
  const [p, setP] = useState(1);
  const played = useRef(false);

  useEffect(() => {
    if (reduce || !visible || played.current) return;
    played.current = true;
    let raf = 0;
    const start = performance.now();
    const dur = 2400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      setP(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    setP(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, visible]);

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-56 sm:w-64" role="img" aria-label={label}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="100" cy="100" r={R} fill="none" stroke="rgb(255 255 255 / 0.14)" strokeWidth="10" />
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke="#00b1ff"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - p)}
        />
      </svg>
      <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className="text-6xl leading-none font-extrabold tabular-nums sm:text-7xl">{Math.round(seconds * p)}</span>
        <span className="mt-2 text-sm font-semibold">vteřin</span>
      </div>
    </div>
  );
}
