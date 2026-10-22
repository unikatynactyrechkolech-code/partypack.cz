import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

const REDUCE = "(prefers-reduced-motion: reduce)";

function subscribeReduce(cb: () => void) {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** true, když si návštěvník v systému vypnul animace. Na serveru vždy false. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribeReduce, () => window.matchMedia(REDUCE).matches, () => false);
}

/** Je prvek (aspoň zčásti) na obrazovce? */
export function useInView(ref: RefObject<Element | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

/**
 * Ztlumené video ve smyčce, které hraje, jen když je vidět. Spustí se znovu po návratu
 * na stránku, po přepnutí zpět do prohlížeče a při prvním dotyku, když prohlížeč
 * automatické přehrání odmítne (úsporný režim na iPhonu). Mimo obrazovku se pozastaví.
 */
export function useAutoplayVideo(ref: RefObject<HTMLVideoElement | null>, disabled: boolean) {
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    if (disabled) {
      v.pause();
      return;
    }
    let visible = false;
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
      { threshold: 0.15 },
    );
    io.observe(v);
    const onVisibility = () => (document.hidden ? v.pause() : play());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", play);
    window.addEventListener("touchend", play, { passive: true });
    window.addEventListener("click", play);
    v.addEventListener("canplay", play);
    v.addEventListener("pause", play);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", play);
      window.removeEventListener("touchend", play);
      window.removeEventListener("click", play);
      v.removeEventListener("canplay", play);
      v.removeEventListener("pause", play);
    };
  }, [ref, disabled]);
}
