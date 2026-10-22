"use client";

import { useEffect, useRef } from "react";
import { Img } from "@/components/Img";

const SPEED = 32; // px za sekundu

/**
 * Pás ukázek AI filtrů, který jede sám dokola. Scroll stránky mění směr jako u log
 * na hlavní stránce (dolů = zprava doleva, nahoru = zleva doprava).
 */
export function FilterMarquee({ items }: { items: { name: string; img: string }[] }) {
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let offset = 0;
    let dir = 1;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;
    let visible = false;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (delta > 0) dir = 1;
      else if (delta < 0) dir = -1;
      offset += delta * 0.25;
    };
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const half = el.scrollWidth / 2;
      if (visible && half > 0) {
        offset += dir * SPEED * dt;
        offset = ((offset % half) + half) % half;
        el.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <ul ref={track} className="flex w-max gap-4 will-change-transform">
        {[...items, ...items].map((f, i) => (
          <li key={`${f.img}-${i}`} aria-hidden={i >= items.length} className="w-36 shrink-0 sm:w-44">
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-paper-soft">
              <Img k={f.img} alt={i < items.length ? `AI filtr ${f.name}` : ""} fill sizes="180px" className="object-cover" />
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">{f.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
