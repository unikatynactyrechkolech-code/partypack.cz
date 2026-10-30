"use client";

import { useEffect, useState } from "react";
import { usePackage } from "@/lib/package";
import { site } from "@/lib/site";

/**
 * Lišta dole na telefonu (klidná verze podle webu, který se klientce líbí): Chci akci a Zavolat.
 * Když jsou vybrané služby, hlavní tlačítko vede k dokončení poptávky i s počtem.
 * Schová se, když je vidět poptávkový formulář.
 */
export function MobileCtaBar() {
  const picked = usePackage();
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("kontakt");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.15 });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const count = picked.length;
  return (
    <>
      {/* Místo pro lištu, aby nezakrývala konec stránky (černé, mezi poptávkou a patičkou). */}
      <div aria-hidden className="h-[4.5rem] bg-ink lg:hidden" />
      <div
        data-cta-bar
        aria-hidden={formVisible}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink bg-white/92 backdrop-blur-md transition-transform duration-300 lg:hidden ${
          formVisible ? "translate-y-full" : "translate-y-0"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <a
            href="#kontakt"
            tabIndex={formVisible ? -1 : 0}
            className="flex flex-1 items-center justify-center rounded-full bg-black px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-gray-800"
          >
            {count ? `Dokončit poptávku (${count})` : "Chci akci"}
          </a>
          <a
            href={site.phoneHref}
            tabIndex={formVisible ? -1 : 0}
            className="flex items-center justify-center rounded-full border-2 border-ink px-5 py-2.5 text-[15px] font-semibold text-ink transition-colors hover:bg-gray-50"
          >
            Zavolat
          </a>
        </div>
      </div>
    </>
  );
}
