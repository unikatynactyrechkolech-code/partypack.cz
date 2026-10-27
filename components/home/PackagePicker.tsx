"use client";

import { useEffect, useState } from "react";
import { packageStore, usePackage, type InquiryService } from "@/lib/package";

/** Tlačítko na dlaždici služby: přidá službu do poptávky, nebo ji z ní odebere. */
export function PackageToggle({
  service,
  label,
  className = "",
  tone = "dark",
}: {
  service: InquiryService;
  label: string;
  className?: string;
  /** light = na bílé kartě (černé tlačítko), dark = na černém panelu (bílé tlačítko). Vybraná služba je obráceně. */
  tone?: "dark" | "light";
}) {
  const picked = usePackage().includes(service);
  return (
    <button
      type="button"
      onClick={() => packageStore.toggle(service)}
      aria-pressed={picked}
      aria-label={picked ? `Odebrat z poptávky: ${label}` : `Přidat do poptávky: ${label}`}
      className={`relative z-10 inline-flex items-center justify-center rounded-full border-2 px-5 py-2 text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 ${tone === "light" ? "focus-visible:ring-accent" : "focus-visible:ring-white"} ${className} ${
        tone === "light"
          ? picked
            ? "border-ink bg-white text-ink hover:bg-gray-50"
            : "border-black bg-black text-white hover:border-gray-800 hover:bg-gray-800"
          : picked
            ? "border-white/50 bg-transparent text-white hover:border-white"
            : "border-white bg-white text-ink hover:bg-gray-100"
      }`}
    >
      {/* V úzké dlaždici (telefon, dvě vedle sebe) kratší text, celý je v aria-label. */}
      {picked ? (
        "V poptávce"
      ) : (
        <>
          <span className="@[18rem]:hidden">Do poptávky</span>
          <span className="hidden @[18rem]:inline">Přidat do poptávky</span>
        </>
      )}
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
      <div className="flex items-center gap-3 rounded-full bg-black py-2 pl-5 pr-2 text-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/25 sm:gap-5">
        <p className="min-w-0 truncate text-sm">
          <span className="font-semibold tabular-nums">
            {count} {word}
          </span>
          <span className="hidden sm:inline"> · {picked.join(", ")}</span>
        </p>
        <a
          href="#kontakt"
          tabIndex={show ? 0 : -1}
          className="shrink-0 rounded-full bg-white px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gray-100"
        >
          Dokončit poptávku
        </a>
      </div>
    </div>
  );
}
