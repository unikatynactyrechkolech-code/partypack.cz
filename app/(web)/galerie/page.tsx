import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { EventCard } from "@/components/EventCard";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { listEvents } from "@/lib/events";
import { EVENT_TYPES, isEventTypeValue, isServiceValue, SERVICES, type EventTypeValue, type ServiceValue } from "@/lib/services";
import { pageMetadata, seo } from "@/lib/seo";

type Search = { strana?: string; sluzba?: string; typ?: string };
type Filter = { service: ServiceValue | null; type: EventTypeValue | null };

function parse(sp: Search) {
  const page = Math.max(1, Number.parseInt(sp.strana ?? "1", 10) || 1);
  const service: ServiceValue | null = isServiceValue(sp.sluzba) ? sp.sluzba : null;
  const type: EventTypeValue | null = isEventTypeValue(sp.typ) ? sp.typ : null;
  return { page, filter: { service, type } as Filter };
}

function href(page: number, { service, type }: Filter) {
  const p = new URLSearchParams();
  if (service) p.set("sluzba", service);
  if (type) p.set("typ", type);
  if (page > 1) p.set("strana", String(page));
  const q = p.toString();
  return q ? `/galerie?${q}` : "/galerie";
}

export async function generateMetadata(props: PageProps<"/galerie">): Promise<Metadata> {
  const { page, filter } = parse((await props.searchParams) as Search);
  const base = pageMetadata(seo.galerie);
  if (page === 1 && !filter.service && !filter.type) return base;
  return { ...base, alternates: { canonical: href(page, filter) } };
}

export default async function GaleriePage(props: PageProps<"/galerie">) {
  const { page, filter } = parse((await props.searchParams) as Search);
  const { items, pages, total } = await listEvents({ page, service: filter.service, type: filter.type });
  const serviceChips = [
    { label: "Všechny služby", to: { ...filter, service: null }, active: !filter.service },
    ...SERVICES.filter((s) => s.value !== "jine").map((s) => ({
      label: s.label,
      to: { ...filter, service: s.value },
      active: filter.service === s.value,
    })),
  ];
  const typeChips = [
    { label: "Všechny akce", to: { ...filter, type: null }, active: !filter.type },
    ...EVENT_TYPES.map((t) => ({ label: t.label, to: { ...filter, type: t.value }, active: filter.type === t.value })),
  ];

  return (
    <>
      <PageHero
        image="2024/10/038_2024-10-16-Makro-Chefs-Dinner-VIP_Full-scaled"
        title="Fotky z našich akcí"
        lead="… a kde je ta vaše?"
      >
        <Button href="https://eu.zonerama.com/Partypack" external variant="light">
          Všechny galerie na Zonerama
        </Button>
      </PageHero>
      <Section>
        <Container>
          <SectionTitle
            title="Poslední firemní akce, svatby a festivaly"
            subtitle="Fotokoutek, AI fotokoutek, Partyspin 360° a AI Draw Bot v akci. Celé galerie najdete na Zoneramě."
          />

          <div className="mt-10 space-y-3">
            <Chips label="Filtr podle služby" chips={serviceChips} />
            <Chips label="Filtr podle typu akce" chips={typeChips} />
          </div>

          {items.length ? (
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((e) => (
                <li key={e.slug}>
                  <EventCard event={e} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-12 text-center text-lg text-ink">Pro tento filtr zatím nemáme žádné akce.</p>
          )}

          {pages > 1 ? <Pagination page={page} pages={pages} filter={filter} total={total} /> : null}
        </Container>
      </Section>
    </>
  );
}

function Chips({ label, chips }: { label: string; chips: { label: string; to: Filter; active: boolean }[] }) {
  return (
    <nav aria-label={label} className="flex flex-wrap justify-center gap-2">
      {chips.map((c) => (
        <Link
          key={c.label}
          href={href(1, c.to)}
          aria-current={c.active ? "page" : undefined}
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
            c.active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"
          }`}
        >
          {c.label}
        </Link>
      ))}
    </nav>
  );
}

function Pagination({ page, pages, filter, total }: { page: number; pages: number; filter: Filter; total: number }) {
  const nums = new Set<number>([1, pages, page - 1, page, page + 1].filter((n) => n >= 1 && n <= pages));
  const list = [...nums].sort((a, b) => a - b);
  const btn = "inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium";
  return (
    <nav aria-label={`Stránkování galerie, celkem ${total} akcí`} className="mt-14 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={href(page - 1, filter)} rel="prev" className={`${btn} border-line hover:border-ink`}>
          Předchozí
        </Link>
      ) : null}
      {list.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          {i > 0 && n - list[i - 1] > 1 ? <span className="px-1 text-ink">…</span> : null}
          <Link
            href={href(n, filter)}
            aria-current={n === page ? "page" : undefined}
            className={`${btn} ${n === page ? "border-ink bg-ink text-white" : "border-line hover:border-ink"}`}
          >
            {n}
          </Link>
        </span>
      ))}
      {page < pages ? (
        <Link href={href(page + 1, filter)} rel="next" className={`${btn} border-line hover:border-ink`}>
          Další
        </Link>
      ) : null}
    </nav>
  );
}
