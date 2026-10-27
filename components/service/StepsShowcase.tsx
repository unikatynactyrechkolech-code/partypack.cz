"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useAutoplayVideo, useInView, useReducedMotion } from "@/lib/hooks";
import { videoUrls } from "@/components/service/LoopVideo";

export type Step = { title: string; text: ReactNode };

/**
 * „Jak to funguje“: kroky, které se samy postupně zvýrazňují, a vedle nich ukázka.
 * Ukázka je buď fotka ke každému kroku (`media`), nebo video (`video`), se kterým se kroky
 * synchronizují podle času (`marks` = začátek každého kroku v sekundách).
 * Na krok jde kliknout. Bez animací (nastavení systému) se nic samo nepřepíná.
 */
export function StepsShowcase({
  steps,
  media,
  video,
  interval = 4200,
  mediaAspect = "aspect-square",
  reverse = false,
  dark = false,
}: {
  steps: Step[];
  media?: ReactNode[];
  video?: { name: string; marks: number[] };
  interval?: number;
  mediaAspect?: string;
  reverse?: boolean;
  dark?: boolean;
}) {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const startRef = useRef(0);
  // Po kliknutí na krok se odpočet do dalšího kroku spustí znovu (nastaví se v animační smyčce).
  const restartRef = useRef(false);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const visible = useInView(rootRef, 0.25);
  const reduce = useReducedMotion();
  useAutoplayVideo(videoRef, reduce || !video);

  const show = useCallback((i: number) => {
    activeRef.current = i;
    setActive(i);
  }, []);

  const setBar = (i: number, p: number) => {
    bars.current.forEach((b, n) => {
      if (b) b.style.transform = `scaleX(${n === i ? Math.max(0, Math.min(1, p)) : 0})`;
    });
  };

  useEffect(() => {
    if (reduce || !visible) return;
    let raf = 0;
    startRef.current = performance.now();
    const tick = (now: number) => {
      if (video && videoRef.current) {
        const v = videoRef.current;
        const t = v.currentTime;
        const marks = video.marks;
        let i = 0;
        for (let n = 0; n < marks.length; n++) if (t >= marks[n]) i = n;
        const end = i + 1 < marks.length ? marks[i + 1] : v.duration || marks[i] + 2;
        if (i !== activeRef.current) show(i);
        setBar(i, (t - marks[i]) / Math.max(0.1, end - marks[i]));
      } else {
        if (restartRef.current) {
          restartRef.current = false;
          startRef.current = now;
        }
        const p = (now - startRef.current) / interval;
        if (p >= 1) {
          show((activeRef.current + 1) % steps.length);
          startRef.current = now;
          setBar(activeRef.current, 0);
        } else {
          setBar(activeRef.current, p);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, visible, video, interval, steps.length, show]);

  const pick = (i: number) => {
    show(i);
    restartRef.current = true;
    if (video && videoRef.current) {
      videoRef.current.currentTime = video.marks[i] + 0.02;
      videoRef.current.play()?.catch(() => {});
    }
  };

  const urls = video ? videoUrls(video.name) : null;

  return (
    <div ref={rootRef} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      <div className={`relative overflow-hidden rounded-2xl bg-ink ${mediaAspect} ${reverse ? "lg:order-2" : ""}`}>
        {urls ? (
          <video
            ref={videoRef}
            aria-hidden
            muted
            loop
            playsInline
            preload="none"
            poster={urls.poster}
            disablePictureInPicture
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={urls.src} type="video/mp4" />
          </video>
        ) : (
          media?.map((m, i) => (
            <div
              key={i}
              aria-hidden={i !== active}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              {m}
            </div>
          ))
        )}
      </div>

      <ol className="grid gap-3">
        {steps.map((s, i) => {
          const on = i === active;
          const card = on
            ? dark
              ? "border-white bg-white text-ink"
              : "border-ink bg-ink text-white"
            : dark
              ? "border-white/20 text-white hover:border-white/60"
              : "border-ink bg-white text-ink hover:bg-paper-soft";
          const badge = on
            ? dark
              ? "border-ink bg-ink text-white"
              : "border-white bg-white text-ink"
            : "border-current";
          return (
            <li
              key={s.title}
              onClick={() => pick(i)}
              className={`relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-colors duration-300 sm:p-6 ${card}`}
            >
              <div className="flex gap-4">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold tabular-nums transition-colors duration-300 ${badge}`}>
                  {i + 1}
                </span>
                <div className="min-w-0 pt-1">
                  <h3 className="text-lg leading-snug font-bold tracking-tight">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        pick(i);
                      }}
                      aria-current={on ? "step" : undefined}
                      className="text-left outline-none focus-visible:underline"
                    >
                      {s.title}
                    </button>
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-pretty">{s.text}</p>
                </div>
              </div>
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px]">
                <span
                  ref={(el) => {
                    bars.current[i] = el;
                  }}
                  className="block h-full origin-left bg-[#00b1ff]"
                  style={{ transform: "scaleX(0)" }}
                />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
