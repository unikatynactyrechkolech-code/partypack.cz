"use client";

import { useRef } from "react";
import { useAutoplayVideo, useReducedMotion } from "@/lib/hooks";
import { R2_BASE } from "@/lib/site";

/** Cesta k videu v R2 (složka video/) a k jeho náhledu. */
export function videoUrls(name: string) {
  return { src: `${R2_BASE}/video/${name}.mp4`, poster: `${R2_BASE}/video/${name}-poster.webp` };
}

/**
 * Krátké ztlumené video ve smyčce (ukázka služby). Hraje, jen když je vidět.
 * `eager` načte video hned (pro úvod stránky), jinak až při přehrání.
 */
export function LoopVideo({ name, eager = false, className = "" }: { name: string; eager?: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  useAutoplayVideo(ref, reduce);
  const { src, poster } = videoUrls(name);
  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      poster={poster}
      disablePictureInPicture
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

/** Video ve stylizovaném telefonu (výsledek z Partyspinu tak, jak ho hosté dostanou). */
export function PhoneVideo({ name, eager = false, className = "" }: { name: string; eager?: boolean; className?: string }) {
  return (
    <div
      className={`relative rounded-[2.4rem] border-[9px] border-[#141416] bg-black shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/15 ${className}`}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem]">
        <LoopVideo name={name} eager={eager} className="absolute inset-0 h-full w-full object-cover" />
        <span aria-hidden className="absolute left-1/2 top-2 z-10 h-[18px] w-[32%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
