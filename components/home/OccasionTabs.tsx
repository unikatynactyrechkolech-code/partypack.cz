"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { EventCard } from "@/components/EventCard";
import type { EventItem } from "@/lib/events";

export type OccasionGroup = { key: string; label: string; href: string; events: EventItem[] };

/** Záložky podle typu akce a pod nimi pás fotek z posledních akcí, který se dá posouvat. */
export function OccasionTabs({ groups, dark = false }: { groups: OccasionGroup[]; dark?: boolean }) {
  const [active, setActive] = useState(0);
  const track = useRef<HTMLUListElement>(null);
  const id = useId();
  const group = groups[active];

  const pick = (i: number) => {
    setActive(i);
    track.current?.scrollTo({ left: 0 });
  };
  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  if (!group) return null;

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Typ akce"
          className="-mx-5 flex min-w-0 flex-1 gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {groups.map((g, i) => (
            <button
              key={g.key}
              type="button"
              role="tab"
              id={`${id}-tab-${g.key}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              onClick={() => pick(i)}
              className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                i === active
                  ? dark
                    ? "border-white bg-white text-ink"
                    : "border-ink bg-ink text-white"
                  : dark
                    ? "border-white/25 text-white hover:border-white"
                    : "border-line bg-white text-ink hover:border-ink"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 sm:flex">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => move(d)}
              aria-label={d === 1 ? "Další fotky" : "Předchozí fotky"}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                dark ? "border-white/25 text-white hover:border-white" : "border-line bg-white text-ink hover:border-ink"
              }`}
            >
              <span aria-hidden className={`block h-2.5 w-2.5 border-current border-t-[1.5px] border-r-[1.5px] ${d === 1 ? "-ml-1 rotate-45" : "-mr-1 -rotate-[135deg]"}`} />
            </button>
          ))}
        </div>
      </div>

      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${group.key}`} className="mt-6">
        <ul
          ref={track}
          key={group.key}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {group.events.map((e) => (
            <li key={e.slug} className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[31%] starting:translate-y-2 starting:opacity-0 transition-[opacity,transform] duration-500">
              <EventCard event={e} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 80vw" />
            </li>
          ))}
          <li className="flex w-[60%] shrink-0 snap-start sm:w-[30%] lg:w-[22%]">
            <Link
              href={group.href}
              className={`flex w-full items-center justify-center rounded-md border px-6 text-center text-base font-semibold transition-colors ${
                dark ? "border-white/40 text-white hover:bg-white hover:text-ink" : "border-ink text-ink hover:bg-ink hover:text-white"
              }`}
            >
              Všechny fotky: {group.label}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
