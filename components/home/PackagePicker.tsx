"use client";

import { useEffect, useState } from "react";
import { packageStore, usePackage, type InquiryService } from "@/lib/package";

/** Tlačítko na dlaždici služby: přidá službu do poptávky, nebo ji z ní odebere. */
export function PackageToggle({ service, label }: { service: InquiryService; label: string }) {
  const picked = usePackage().includes(service);
  return (
    <button
      type="button"
      onClick={() => packageStore.toggle(service)}
      aria-pressed={picked}
      aria-label={picked ? `Odebrat z poptávky: ${label}` : `Přidat do poptávky: ${label}`}
      className={`relative z-10 inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white ${
        picked ? "border-white bg-white text-ink" : "border-white/70 text-white hover:bg-white hover:text-ink"
      }`}
    >
      <span aria-hidden className={`relative block h-2.5 w-2.5 transition-transform duration-300 ${picked ? "rotate-45" : ""}`}>
        <span className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-current" />
        <span className="absolute inset-y-0 left-1/2 w-[1.5px] -translate-x-1/2 bg-current" />
      </span>
      {picked ? "V poptávce" : "Přidat do poptávky"}
    </button>
  );
}

/**
 * Plovoucí lišta s vybranými službami. Ukáže se po prvním výběru
 * a schová se, když je na obrazovce poptávkový formulář.
 */
export function PackageBar() {
  const picked = usePackage();
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("kontakt");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const show = picked.length > 0 && !formVisible;
  const count = picked.length;
  const word = count === 1 ? "služba" : count < 5 ? "služby" : "služeb";

  return (
    <div
      aria-hidden={!show}
      className={`fixed right-4 left-20 z-40 transition-[transform,opacity] duration-300 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      style={{ bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="flex items-center gap-3 rounded-lg bg-ink py-2 pl-5 pr-2 text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/25 sm:gap-5">
        <p className="min-w-0 truncate text-sm">
          <span className="font-semibold tabular-nums">
            {count} {word}
          </span>
          <span className="hidden sm:inline"> · {picked.join(", ")}</span>
        </p>
        <a
          href="#kontakt"
          tabIndex={show ? 0 : -1}
          className="shrink-0 rounded-md bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-paper-soft"
        >
          Dokončit poptávku
        </a>
      </div>
    </div>
  );
}
