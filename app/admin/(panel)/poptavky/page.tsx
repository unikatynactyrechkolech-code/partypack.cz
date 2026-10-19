import type { Metadata } from "next";
import Link from "next/link";
import { InquiryStatusSelect } from "@/components/admin/InquiryStatusSelect";
import { sessionClient } from "@/lib/supabase/server";
import { isAdminRequest } from "@/lib/admin";

export const metadata: Metadata = { title: "Poptávky" };
const PER_PAGE = 30;
const FILTERS = [
  { value: "", label: "Vše" },
  { value: "nova", label: "Nové" },
  { value: "resi-se", label: "Řeší se" },
  { value: "hotovo", label: "Hotovo" },
];

type Row = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  source: string | null;
  services: string[];
  message: string | null;
  page: string | null;
  status: string;
};

const dt = new Intl.DateTimeFormat("cs-CZ", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Prague" });

export default async function InquiriesPage(props: PageProps<"/admin/poptavky">) {
  const sp = (await props.searchParams) as { stav?: string; strana?: string };
  const stav = FILTERS.some((f) => f.value === sp.stav) ? (sp.stav ?? "") : "";
  const page = Math.max(1, Number.parseInt(sp.strana ?? "1", 10) || 1);
  const from = (page - 1) * PER_PAGE;

  if (!(await isAdminRequest())) return null;
  const supabase = await sessionClient();
  let query = supabase
    .from("inquiries")
    .select("id,created_at,name,email,phone,source,services,message,page,status", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + PER_PAGE - 1);
  if (stav) query = query.eq("status", stav);
  const { data, count, error } = await query;
  const rows = (data ?? []) as Row[];
  const pages = Math.max(1, Math.ceil((count ?? 0) / PER_PAGE));
  const qs = (p: number, s = stav) => `/admin/poptavky?${new URLSearchParams({ ...(s ? { stav: s } : {}), ...(p > 1 ? { strana: String(p) } : {}) })}`;

  return (
    <div>
      <h1 className="text-2xl font-semibold">Poptávky</h1>
      <nav className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.value}
            href={qs(1, f.value)}
            className={`rounded-lg border px-4 py-2 text-sm font-medium ${f.value === stav ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"}`}
          >
            {f.label}
          </Link>
        ))}
      </nav>
      {error ? <p className="mt-6 text-sm font-medium text-red-600">Načtení se nepovedlo: {error.message}</p> : null}

      <ul className="mt-6 grid gap-4">
        {rows.map((r) => (
          <li key={r.id} className="rounded-lg border border-line bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold">{r.name}</p>
                <p className="text-sm">{dt.format(new Date(r.created_at))}</p>
              </div>
              <InquiryStatusSelect id={r.id} status={r.status} />
            </div>
            <dl className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold">E-mail</dt>
                <dd>
                  <a href={`mailto:${r.email}`} className="underline underline-offset-4">{r.email}</a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Telefon</dt>
                <dd>
                  <a href={`tel:${r.phone.replace(/\s+/g, "")}`} className="underline underline-offset-4">{r.phone}</a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Služby</dt>
                <dd>{r.services.join(", ") || "Neuvedeno"}</dd>
              </div>
              <div>
                <dt className="font-semibold">Kde na nás narazili</dt>
                <dd>{r.source || "Neuvedeno"}</dd>
              </div>
              {r.message ? (
                <div className="sm:col-span-2">
                  <dt className="font-semibold">Datum akce a zpráva</dt>
                  <dd className="whitespace-pre-wrap">{r.message}</dd>
                </div>
              ) : null}
              {r.page ? (
                <div className="sm:col-span-2">
                  <dt className="font-semibold">Odesláno ze stránky</dt>
                  <dd>{r.page}</dd>
                </div>
              ) : null}
            </dl>
          </li>
        ))}
        {rows.length === 0 ? <li className="rounded-lg border border-line bg-white p-5 text-sm">Žádné poptávky.</li> : null}
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
