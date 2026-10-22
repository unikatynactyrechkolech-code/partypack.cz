"use client";

import { useId, useState, type ReactNode } from "react";

export type FaqItem = { q: string; a: ReactNode };

/** Časté dotazy jako rozbalovací seznam. První otázka je otevřená. */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="divide-y divide-ink border-y border-ink">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg leading-snug font-bold tracking-tight text-ink outline-none focus-visible:underline"
              >
                {it.q}
                <span aria-hidden className={`relative block h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                  <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-current" />
                  <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-${i}`}
              role="region"
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="pb-5 text-[15px] leading-relaxed text-ink text-pretty [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
