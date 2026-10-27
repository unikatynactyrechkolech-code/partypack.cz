"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Seznam karet, které se při scrollu střídají: karta zůstane stát (sticky `li`) a jak ji
 * další karta zespodu překrývá, zeslábne a zmenší se, až zmizí. Karty se tedy neskládají
 * na sebe, vždy je vidět jen ta aktuální. Měří se při scrollu a změně velikosti okna.
 * Každá karta má uvnitř `li` prvek s `data-stack`, na který se míra zmizení aplikuje.
 */
export function CardStack({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = ref.current;
    if (!ul) return;
    const items = [...ul.querySelectorAll<HTMLElement>("[data-stack]")];
    const rows = items.map((el) => el.closest("li") as HTMLElement);
    let raf = 0;
    const update = () => {
      raf = 0;
      for (let i = 0; i < items.length - 1; i++) {
        const cur = rows[i].getBoundingClientRect();
        const next = rows[i + 1].getBoundingClientRect();
        const h = items[i].offsetHeight;
        // 0 = další karta se ještě nedotýká, 1 = další karta tuhle celou překryla.
        const p = Math.min(1, Math.max(0, (cur.top + h - next.top) / h));
        items[i].style.opacity = String(1 - p);
        items[i].style.transform = p ? `scale(${1 - 0.1 * p})` : "";
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
}
