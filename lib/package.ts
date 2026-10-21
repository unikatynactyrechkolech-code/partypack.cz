import { useSyncExternalStore } from "react";
import type { INQUIRY_SERVICES } from "@/lib/services";

/**
 * Služby, které si návštěvník „přidal do poptávky“ na hlavní stránce.
 * Sdílí je dlaždice služeb, plovoucí lišta a poptávkový formulář (zaškrtne je sám).
 */
export type InquiryService = (typeof INQUIRY_SERVICES)[number];

const EMPTY: readonly InquiryService[] = [];
let selected: readonly InquiryService[] = EMPTY;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export const packageStore = {
  get: () => selected,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  set(next: readonly InquiryService[]) {
    selected = next.length ? next : EMPTY;
    emit();
  },
  toggle(service: InquiryService) {
    packageStore.set(selected.includes(service) ? selected.filter((s) => s !== service) : [...selected, service]);
  },
};

export function usePackage() {
  return useSyncExternalStore(packageStore.subscribe, packageStore.get, () => EMPTY);
}
