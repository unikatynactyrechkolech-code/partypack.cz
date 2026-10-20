"use client";

import { useEffect, useRef } from "react";
import { Img } from "@/components/Img";
import type { Partner } from "@/lib/data";

const SPEED = 45; // px za sekundu

/**
 * Pruh log, který jede sám dokola. Scrollování mění směr:
 * dolů = zprava doleva, nahoru = zleva doprava.
 */
export function ScrollLogos({ logos }: { logos: Partner[] }) {
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let offset = 0;
    let dir = 1;
    let lastY = window.scrollY;
    let last = performance.now();
    let raf = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (delta > 0) dir = 1;
      else if (delta < 0) dir = -1;
      offset += delta * 0.3;
    };
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const half = el.scrollWidth / 2;
      if (half > 0) {
        offset += dir * SPEED * dt;
        offset = ((offset % half) + half) % half;
        el.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <ul ref={track} className="flex w-max items-center gap-10 will-change-transform">
        {[...logos, ...logos].map((p, i) => (
          <li key={`${p.img}-${i}`} aria-hidden={i >= logos.length} className="shrink-0">
            <Img k={p.img} alt={i < logos.length ? p.name : ""} sizes="120px" className="h-9 w-auto max-w-[110px] object-contain sm:h-10" />
          </li>
        ))}
      </ul>
    </div>
  );
}
