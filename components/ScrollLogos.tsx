"use client";

import { useEffect, useRef } from "react";
import { Img } from "@/components/Img";
import type { Partner } from "@/lib/data";

/** Pruh log, který se posouvá podle scrollování: dolů zprava doleva, nahoru zpět. */
export function ScrollLogos({ logos }: { logos: Partner[] }) {
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const half = el.scrollWidth / 2;
      const offset = half > 0 ? (window.scrollY * 0.6) % half : 0;
      el.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
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
