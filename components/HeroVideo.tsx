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

/**
 * Video na pozadí úvodu. Hraje vždy, když je vidět: po načtení, po návratu nahoru,
 * po návratu z jiné stránky (i přes tlačítko Zpět) a po přepnutí zpět do prohlížeče.
 * Když prohlížeč automatické přehrání odmítne (třeba úsporný režim na iPhonu),
 * spustí se při prvním dotyku nebo kliknutí. Mimo obrazovku se pozastaví kvůli baterii.
 */
export function HeroVideo() {
  preload(POSTER, { as: "image", fetchPriority: "high" });
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Safari povolí automatické přehrání jen ztlumenému videu; vlastnost musí být nastavená i v DOM.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    if (reduce) {
      v.pause();
      return;
    }

    let visible = true;
    const play = () => {
      if (!visible || document.hidden || !v.paused) return;
      v.play()?.catch(() => {});
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) play();
        else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(v);

    const onVisibility = () => (document.hidden ? v.pause() : play());
    const onPageShow = () => play();
    const onGesture = () => play();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("touchend", onGesture, { passive: true });
    window.addEventListener("click", onGesture);
    v.addEventListener("canplay", play);
    // Kdyby se přehrávání samo zastavilo (výpadek dat, systém), zkusí se znovu.
    v.addEventListener("pause", play);
    play();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("touchend", onGesture);
      window.removeEventListener("click", onGesture);
      v.removeEventListener("canplay", play);
      v.removeEventListener("pause", play);
    };
  }, [reduce]);

  return (
    <video
      ref={ref}
      aria-hidden
      autoPlay={!reduce}
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER}
      disablePictureInPicture
      className="absolute inset-0 h-full w-full object-cover lg:object-top"
    >
      <source src={`${BASE}-1080.mp4`} type="video/mp4" media="(max-width: 1023px)" />
      <source src={`${BASE}-1440.mp4`} type="video/mp4" />
    </video>
  );
}
