"use client";

import type { ReactNode } from "react";
import { packageStore, type InquiryService } from "@/lib/package";

/**
 * Hlavní tlačítko na podstránce služby: přidá službu do poptávky (ve formuláři je pak
 * zaškrtnutá) a sjede k formuláři.
 */
export function WantButton({
  service,
  children,
  className = "",
}: {
  service: InquiryService;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href="#kontakt"
      onClick={() => {
        if (!packageStore.get().includes(service)) packageStore.toggle(service);
      }}
      className={`inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-[15px] font-semibold text-ink shadow-[0_12px_30px_-14px_rgb(0_0_0/0.7)] transition-colors hover:bg-paper-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${className}`}
    >
      {children}
    </a>
  );
}
