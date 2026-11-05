"use client";

import { useEffect, useRef } from "react";

const fmt = (n: number) => n.toLocaleString("cs-CZ");

/**
 * Číslo, které se při prvním zobrazení „natočí“ od nuly: ze začátku letí rychle
 * a před koncem výrazně zpomalí (exponenciální dojezd), poslední čísla doťukají pomalu.
 * Server i návštěvník bez animací vidí rovnou konečnou hodnotu.
 */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Animuje se jen číslo, které je zatím pod okrajem obrazovky.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.textContent = fmt(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / 2600);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -9 * p);
          el.textContent = fmt(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = fmt(value);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {fmt(value)}
    </span>
  );
}
