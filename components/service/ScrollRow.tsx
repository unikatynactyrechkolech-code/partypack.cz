"use client";

import { useRef, type ReactNode } from "react";

/**
 * Vodorovný pás karet, který se dá posouvat (prstem, kolečkem nebo šipkami na počítači).
 * Děti jsou položky <li>.
 */
export function ScrollRow({ children, dark = false, label }: { children: ReactNode; dark?: boolean; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  const arrow = `inline-flex h-11 w-11 items-center justify-center rounded-lg border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent ${
    dark ? "border-white/25 text-white hover:border-white" : "border-ink bg-white text-ink hover:bg-ink hover:text-white"
  }`;
  return (
    <div>
      <div className="mb-5 hidden justify-end gap-2 sm:flex">
        {([-1, 1] as const).map((d) => (
          <button key={d} type="button" onClick={() => move(d)} aria-label={d === 1 ? `Další: ${label}` : `Předchozí: ${label}`} className={arrow}>
            <span aria-hidden className={`block h-2.5 w-2.5 border-current border-t-[1.5px] border-r-[1.5px] ${d === 1 ? "-ml-1 rotate-45" : "-mr-1 -rotate-[135deg]"}`} />
          </button>
        ))}
      </div>
      <ul
        ref={track}
        aria-label={label}
        className="relative -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </div>
  );
}
