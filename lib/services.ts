/** Služby, ke kterým se váže akce v galerii. Hodnota odpovídá sloupci events.service. */
export const SERVICES = [
  { value: "fotokoutek", label: "Fotokoutek", href: "/fotokoutek" },
  { value: "ai-fotokoutek", label: "AI fotokoutek", href: "/ai-fotokoutek" },
  { value: "partyspin", label: "Partyspin 360°", href: "/partyspin360" },
  { value: "ai-draw-bot", label: "AI Draw Bot", href: "/ai-draw-bot" },
  { value: "hostesky", label: "Hostesky", href: "/hostesky" },
  { value: "jine", label: "Jiné", href: "/dalsisluzby" },
] as const;

export type ServiceValue = (typeof SERVICES)[number]["value"];

export function isServiceValue(v: unknown): v is ServiceValue {
  return typeof v === "string" && SERVICES.some((s) => s.value === v);
}

export function serviceLabel(v: string | null | undefined) {
  return SERVICES.find((s) => s.value === v)?.label ?? null;
}

/** Typ akce (kategorie z původního webu). Hodnota odpovídá sloupci events.event_type. */
export const EVENT_TYPES = [
  { value: "event", label: "Firemní akce a eventy" },
  { value: "svatba", label: "Svatby" },
  { value: "ples", label: "Plesy" },
  { value: "narozeniny", label: "Narozeniny" },
] as const;

export type EventTypeValue = (typeof EVENT_TYPES)[number]["value"];

export function isEventTypeValue(v: unknown): v is EventTypeValue {
  return typeof v === "string" && EVENT_TYPES.some((t) => t.value === v);
}

/** Odhad služby z názvu akce (pro staré akce bez vyplněné služby). */
export function inferService(title: string): ServiceValue | null {
  const t = title.toLowerCase();
  if (t.includes("draw bot") || t.includes("drawbot")) return "ai-draw-bot";
  if (t.includes("partyspin") || t.includes("360") || t.includes("spin")) return "partyspin";
  if (/\bai\b/.test(t) && (t.includes("fotokout") || t.includes("fotobud") || t.includes("filtr"))) return "ai-fotokoutek";
  if (t.includes("hostes") || t.includes("promot")) return "hostesky";
  if (t.includes("fotokout") || t.includes("fotobud") || t.includes("photobooth")) return "fotokoutek";
  return null;
}

/** Služby, které si zákazník může zaškrtnout v poptávce (texty z původního formuláře). */
export const INQUIRY_SERVICES = ["Fotokoutek", "Hostesky", "AI fotokoutek", "AI Draw Bot", "360° Partyspin", "Něco jiného"] as const;
