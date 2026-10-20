import type { Metadata } from "next";
import Link from "next/link";
import { Img } from "@/components/Img";
import { sessionClient } from "@/lib/supabase/server";
import { isAdminRequest } from "@/lib/admin";
import { formatEventDate } from "@/lib/events";
import { serviceLabel } from "@/lib/services";
import { T } from "@/lib/supabase/tables";

export const metadata: Metadata = { title: "Akce" };
const PER_PAGE = 30;

type Row = { id: string; slug: string; title: string; event_date: string; service: string | null; published: boolean; cover_key: string | null };

export default async function AdminEventsPage(props: PageProps<"/admin">) {
  const sp = (await props.searchParams) as { q?: string; strana?: string; ulozeno?: string; smazano?: string };
  const q = (sp.q ?? "").trim().slice(0, 100);
  const page = Math.max(1, Number.parseInt(sp.strana ?? "1", 10) || 1);
  const from = (page - 1) * PER_PAGE;

  if (!(await isAdminRequest())) return null;
  const supabase = await sessionClient();
  let query = supabase
    .from(T.events)
    .select("id,slug,title,event_date,service,published,cover_key", { count: "exact" })
    .order("event_date", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, from + PER_PAGE - 1);
  if (q) query = query.ilike("title", `%${q.replace(/[%_]/g, "")}%`);
  const { data, count, error } = await query;
  const rows = (data ?? []) as Row[];
  const pages = Math.max(1, Math.ceil((count ?? 0) / PER_PAGE));
  const qs = (p: number) => `/admin?${new URLSearchParams({ ...(q ? { q } : {}), ...(p > 1 ? { strana: String(p) } : {}) })}`;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Akce v galerii</h1>
          <p className="mt-1 text-sm">Celkem {count ?? 0} akcí</p>
        </div>
        <Link href="/admin/akce/nova" className="inline-flex items-center rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800">
          Přidat akci
        </Link>
      </div>

      {sp.ulozeno ? <p className="mt-6 rounded-lg border border-line bg-white px-4 py-3 text-sm font-medium">Akce je uložená.</p> : null}
      {sp.smazano ? <p className="mt-6 rounded-lg border border-line bg-white px-4 py-3 text-sm font-medium">Akce je smazaná.</p> : null}
      {error ? <p className="mt-6 text-sm font-medium text-red-600">Načtení se nepovedlo: {error.message}</p> : null}

      <form className="mt-6 flex gap-2" action="/admin">
        <input name="q" defaultValue={q} placeholder="Hledat podle názvu" className="w-full max-w-sm rounded-lg border border-line bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
        <button className="rounded-lg border border-ink px-4 py-2.5 text-sm font-medium">Hledat</button>
      </form>

      <ul className="mt-6 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
        {rows.map((r) => (
          <li key={r.id}>
            <Link href={`/admin/akce/${r.id}`} className="flex items-center gap-4 px-4 py-3 hover:bg-paper-soft">
              <div className="relative h-12 w-[72px] shrink-0 overflow-hidden rounded bg-paper-soft">
                {r.cover_key ? <Img k={r.cover_key} alt="" fill sizes="72px" className="object-cover" /> : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{r.title}</p>
                <p className="text-xs">
                  {formatEventDate(r.event_date)}
                  {serviceLabel(r.service) ? ` · ${serviceLabel(r.service)}` : ""}
                </p>
              </div>
              {!r.published ? <span className="rounded border border-ink px-2 py-0.5 text-xs font-medium">Skrytá</span> : null}
            </Link>
          </li>
        ))}
        {rows.length === 0 ? <li className="px-4 py-6 text-sm">Nic nenalezeno.</li> : null}
      </ul>

      {pages > 1 ? (
        <nav className="mt-6 flex items-center justify-between text-sm font-medium">
          {page > 1 ? <Link href={qs(page - 1)} className="rounded-lg border border-line bg-white px-4 py-2 hover:border-ink">Předchozí</Link> : <span />}
          <span>
            Strana {page} z {pages}
          </span>
          {page < pages ? <Link href={qs(page + 1)} className="rounded-lg border border-line bg-white px-4 py-2 hover:border-ink">Další</Link> : <span />}
        </nav>
      ) : null}
    </div>
  );
}
