"use client";

import { useId, useState } from "react";
import { Img } from "@/components/Img";

/** Porovnání před / po s posuvníkem – jako na původní stránce AI fotokoutku. */
export function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const id = useId();
  return (
    <div className="relative aspect-[3/4] select-none overflow-hidden rounded-md bg-paper-soft">
      <Img k={after} alt="Po úpravě AI filtrem" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img k={before} alt="Před úpravou" fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-ink/70 text-xs text-white backdrop-blur">
          ‹ ›
        </span>
      </div>
      <label htmlFor={id} className="sr-only">
        Porovnání před a po
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <span className="pointer-events-none absolute left-3 top-3 rounded bg-ink/60 px-2 py-1 text-xs font-medium uppercase tracking-wide text-white">
        Před
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded bg-ink/60 px-2 py-1 text-xs font-medium uppercase tracking-wide text-white">
        Po
      </span>
    </div>
  );
}
