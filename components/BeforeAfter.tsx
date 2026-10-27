"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Img } from "@/components/Img";
import { useInView, useReducedMotion } from "@/lib/hooks";

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Porovnání před / po s posuvníkem. S `autoplay` se jezdec sám projede tam a zpět, dokud je
 * porovnání vidět a návštěvník na něj nesáhne (ukáže, že se dá posouvat).
 */
export function BeforeAfter({
  before,
  after,
  autoplay = false,
  aspect = "aspect-[3/4]",
  sizes = "(min-width: 640px) 33vw, 100vw",
  priority = false,
  className = "",
}: {
  before: string;
  after: string;
  autoplay?: boolean;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.4);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!autoplay || touched || reduce || !visible) return;
    let raf = 0;
    const start = performance.now();
    // 50 → 88 → 12 → 50 za 3,6 s, pak 3 s pauza, a znovu.
    const keys = [50, 88, 12, 50];
    const run = 3600;
    const cycle = run + 3000;
    const tick = (now: number) => {
      const t = (now - start) % cycle;
      if (t < run) {
        const seg = (t / run) * (keys.length - 1);
        const i = Math.min(keys.length - 2, Math.floor(seg));
        setPos(keys[i] + (keys[i + 1] - keys[i]) * ease(seg - i));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoplay, touched, reduce, visible]);

  return (
    <div ref={ref} className={`relative select-none overflow-hidden rounded-2xl bg-paper-soft ${aspect} ${className}`}>
      <Img k={after} alt="Po úpravě AI filtrem" fill priority={priority} sizes={sizes} quality={85} className="object-cover object-top" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img k={before} alt="Před úpravou" fill priority={priority} sizes={sizes} quality={85} className="object-cover object-top" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.15)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full bg-white text-ink shadow-[0_8px_24px_-8px_rgb(0_0_0/0.6)]">
          <span className="block h-2 w-2 -rotate-[135deg] border-t-2 border-r-2 border-current" />
          <span className="block h-2 w-2 rotate-45 border-t-2 border-r-2 border-current" />
        </span>
      </div>
      <label htmlFor={id} className="sr-only">
        Porovnání před a po
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => {
          setTouched(true);
          setPos(Number(e.target.value));
        }}
        onPointerDown={() => setTouched(true)}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">Před</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">Po</span>
    </div>
  );
}
