"use client";

import { useEffect, useRef, useState } from "react";
import { Img } from "@/components/Img";
import { useInView, useReducedMotion } from "@/lib/hooks";

export type Slide = { k: string; alt: string; position?: string };

const FADE = 1200;

/**
 * Fotky, které se v kartě prolínají a pomalu přibližují (jako dřív v úvodu hlavní stránky).
 * Střídají se, jen když je karta vidět. Tečkami jde přepnout ručně.
 */
export function HeroSlides({
  slides,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 600px, 100vw",
  interval = 5000,
  className = "",
}: {
  slides: Slide[];
  aspect?: string;
  sizes?: string;
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, 0.2);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !visible || slides.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => window.clearInterval(id);
  }, [reduce, visible, slides.length, interval]);

  return (
    <div ref={ref} className={`relative isolate overflow-hidden rounded-2xl bg-white/5 ${aspect} ${className}`}>
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.k}
            aria-hidden={!active}
            className="pp-zoom absolute inset-0"
            style={{
              opacity: active ? 1 : 0,
              transform: active && !reduce ? "scale(1.08)" : "scale(1)",
              transition: active
                ? `opacity ${FADE}ms ease, transform ${interval + FADE}ms linear`
                : `opacity ${FADE}ms ease, transform 0s linear ${FADE}ms`,
            }}
          >
            <Img k={s.k} alt={s.alt} fill priority={i === 0} sizes={sizes} quality={85} className={`object-cover ${s.position ?? ""}`} />
          </div>
        );
      })}
      {slides.length > 1 ? (
        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.k}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Fotka ${i + 1} z ${slides.length}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
