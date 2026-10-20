import "server-only";
import { cache } from "react";
import { gallery } from "@/lib/data";
import { inferService, isEventTypeValue, isServiceValue, type EventTypeValue, type ServiceValue } from "@/lib/services";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { publicClient } from "@/lib/supabase/public";
import { T } from "@/lib/supabase/tables";

export type EventItem = {
  slug: string;
  title: string;
  eventDate: string | null;
  service: ServiceValue | null;
  eventType: EventTypeValue | null;
  albumUrl: string | null;
  description: string | null;
  coverKey: string | null;
  coverW: number | null;
  coverH: number | null;
};

export const EVENTS_PER_PAGE = 24;
const COLUMNS = "slug,title,event_date,service,event_type,album_url,description,cover_key,cover_w,cover_h";

type Row = {
  slug: string;
  title: string;
  event_date: string | null;
  service: string | null;
  event_type: string | null;
  album_url: string | null;
  description: string | null;
  cover_key: string | null;
  cover_w: number | null;
  cover_h: number | null;
};

function fromRow(r: Row): EventItem {
  return {
    slug: r.slug,
    title: r.title,
    eventDate: r.event_date,
    service: isServiceValue(r.service) ? r.service : null,
    eventType: isEventTypeValue(r.event_type) ? r.event_type : null,
    albumUrl: r.album_url,
    description: r.description,
    coverKey: r.cover_key,
    coverW: r.cover_w,
    coverH: r.cover_h,
  };
}

/** Záloha, dokud není Supabase nastavené: 36 akcí převzatých z původního webu. */
function fallbackEvents(): EventItem[] {
  return gallery.map((g) => ({
    slug: g.slug,
    title: g.title,
    eventDate: null,
    service: inferService(g.title),
    eventType: null,
    albumUrl: g.album,
    description: null,
    coverKey: g.img,
    coverW: null,
    coverH: null,
  }));
}

export async function listEvents({
  page = 1,
  service,
  type,
  perPage = EVENTS_PER_PAGE,
}: {
  page?: number;
  service?: ServiceValue | null;
  type?: EventTypeValue | null;
  perPage?: number;
}): Promise<{ items: EventItem[]; total: number; page: number; pages: number }> {
  const safePage = Math.max(1, Math.floor(page) || 1);
  const from = (safePage - 1) * perPage;

  if (isSupabaseConfigured()) {
    let q = publicClient()
      .from(T.events)
      .select(COLUMNS, { count: "exact" })
      .eq("published", true)
      .order("event_date", { ascending: false })
      .order("created_at", { ascending: false })
      .range(from, from + perPage - 1);
    if (service) q = q.eq("service", service);
    if (type) q = q.eq("event_type", type);
    const { data, count, error } = await q;
    if (!error && data) {
      const total = count ?? data.length;
      return { items: (data as Row[]).map(fromRow), total, page: safePage, pages: Math.max(1, Math.ceil(total / perPage)) };
    }
    console.error("[events] list failed, using fallback:", error?.message);
  }

  const all = fallbackEvents().filter((e) => (!service || e.service === service) && (!type || e.eventType === type));
  return {
    items: all.slice(from, from + perPage),
    total: all.length,
    page: safePage,
    pages: Math.max(1, Math.ceil(all.length / perPage)),
  };
}

export const getEvent = cache(async (slug: string): Promise<EventItem | null> => {
  if (isSupabaseConfigured()) {
    const { data, error } = await publicClient().from(T.events).select(COLUMNS).eq("slug", slug).eq("published", true).maybeSingle();
    if (!error) return data ? fromRow(data as Row) : null;
    console.error("[events] get failed, using fallback:", error.message);
  }
  return fallbackEvents().find((e) => e.slug === slug) ?? null;
});

export async function recentEvents(limit: number, excludeSlug?: string): Promise<EventItem[]> {
  const { items } = await listEvents({ page: 1, perPage: limit + 1 });
  return items.filter((e) => e.slug !== excludeSlug).slice(0, limit);
}

/** Všechny publikované akce pro sitemap (po 1000 kvůli limitu API). */
export async function allEventSlugs(): Promise<{ slug: string; updatedAt: string | null }[]> {
  if (!isSupabaseConfigured()) return fallbackEvents().map((e) => ({ slug: e.slug, updatedAt: null }));
  const out: { slug: string; updatedAt: string | null }[] = [];
  for (let from = 0; from < 20000; from += 1000) {
    const { data, error } = await publicClient()
      .from(T.events)
      .select("slug,updated_at")
      .eq("published", true)
      .order("event_date", { ascending: false })
      .range(from, from + 999);
    if (error || !data) {
      console.error("[events] sitemap failed:", error?.message);
      if (out.length === 0) return fallbackEvents().map((e) => ({ slug: e.slug, updatedAt: null }));
      break;
    }
    out.push(...(data as { slug: string; updated_at: string | null }[]).map((r) => ({ slug: r.slug, updatedAt: r.updated_at })));
    if (data.length < 1000) break;
  }
  return out;
}

export function formatEventDate(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso + "T12:00:00");
  return new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" }).format(d);
}
