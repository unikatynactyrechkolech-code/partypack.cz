import type { CSSProperties } from "react";

type Kind = "zigzag" | "ring" | "chevron";

// Tvary vycházejí z čáry v logu Partypacku (rovná linka a cikcak) a barvy jsou tři modré z loga.
const SHAPES: Record<Kind, { viewBox: string; d?: string; ring?: boolean }> = {
  zigzag: { viewBox: "0 0 120 72", d: "M10 22 H36 L52 52 L68 22 L84 52 L104 26" },
  chevron: { viewBox: "0 0 76 60", d: "M12 46 L38 16 L64 46" },
  ring: { viewBox: "0 0 80 80", ring: true },
};

/**
 * Dekorativní lesklý tvar v barvách loga, pomalu se vznáší (bez animace, když si to návštěvník nepřeje).
 * Umisťuje se absolutně přes className, `id` musí být na stránce unikátní (kvůli přechodu barev).
 */
export function BrandShape({ kind, id, className = "", rotate = 0, delay = 0 }: { kind: Kind; id: string; className?: string; rotate?: number; delay?: number }) {
  const s = SHAPES[kind];
  const grad = `pp-grad-${id}`;
  const stroke = `url(#${grad})`;
  return (
    <svg
      aria-hidden
      viewBox={s.viewBox}
      fill="none"
      className={`pp-float pointer-events-none absolute drop-shadow-[0_12px_18px_rgb(0_120_255/0.28)] ${className}`}
      style={{ "--r": `${rotate}deg`, animationDelay: `${delay}s` } as CSSProperties}
    >
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d4f3" />
          <stop offset="50%" stopColor="#00b1ff" />
          <stop offset="100%" stopColor="#3a7dff" />
        </linearGradient>
      </defs>
      {s.ring ? (
        <>
          <circle cx="40" cy="40" r="25" stroke={stroke} strokeWidth="13" />
          <circle cx="40" cy="40" r="25" stroke="white" strokeOpacity="0.35" strokeWidth="3" strokeDasharray="34 200" strokeDashoffset="-150" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d={s.d} stroke={stroke} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
          <path d={s.d} stroke="white" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" transform="translate(-1.5 -2.5)" />
        </>
      )}
    </svg>
  );
}
