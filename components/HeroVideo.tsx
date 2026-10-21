"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { preload } from "react-dom";
import { R2_BASE } from "@/lib/site";

// Smyčka 8,5 s z videí fotokoutku a AI Draw Bota (bez zvuku). Počítač dostane 1440p,
// telefon a tablet Full HD (na displejích s vysokým rozlišením by se 720p rozmazávalo).
const BASE = `${R2_BASE}/video/partypack-hero-v2`;
const POSTER = `${BASE}-poster.webp`;

const query = "(prefers-reduced-motion: reduce)";
function subscribe(cb: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Video na pozadí úvodu. Do načtení a při omezení animací je vidět první snímek. */
export function HeroVideo() {
  preload(POSTER, { as: "image", fetchPriority: "high" });
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduce) {
      v.pause();
      return;
    }
    v.muted = true;
    // Přehrání může prohlížeč odmítnout (třeba úsporný režim), pak zůstane první snímek.
    v.play().catch(() => {});
  }, [reduce]);

  return (
    <video
      ref={ref}
      aria-hidden
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
      className="absolute inset-0 h-full w-full object-cover lg:object-top"
    >
      <source src={`${BASE}-1080.mp4`} type="video/mp4" media="(max-width: 1023px)" />
      <source src={`${BASE}-1440.mp4`} type="video/mp4" />
    </video>
  );
}
