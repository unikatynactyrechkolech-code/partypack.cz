"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Img } from "@/components/Img";

const INTERVAL = 7000;
const FADE = 1200;

function subscribe(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Střídání fotek na pozadí úvodu s pomalým přiblížením (jako slider na původním webu). */
export function HeroBackground({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % images.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <>
      {images.map((k, i) => {
        const active = i === index;
        return (
          <div
            key={k}
            aria-hidden
            className="absolute inset-0"
            style={{
              opacity: active ? 1 : 0,
              transform: active && !reduce ? "scale(1.1)" : "scale(1)",
              transition: active
                ? `opacity ${FADE}ms ease, transform ${INTERVAL + FADE}ms linear`
                : `opacity ${FADE}ms ease, transform 0s linear ${FADE}ms`,
            }}
          >
            <Img k={k} alt="" fill priority={i === 0} sizes="100vw" className="object-cover object-[65%_center]" />
          </div>
        );
      })}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-3">
        {images.map((k, i) => (
          <button
            key={k}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"}`}
            aria-label={`Fotka ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </>
  );
}
