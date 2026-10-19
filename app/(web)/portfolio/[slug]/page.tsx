import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { EventCard } from "@/components/EventCard";
import { Button, Container, Prose, Section, SectionTitle } from "@/components/ui";
import { ContactSection } from "@/components/sections";
import { formatEventDate, getEvent, recentEvents } from "@/lib/events";
import { serviceLabel, SERVICES } from "@/lib/services";
import { R2_BASE } from "@/lib/site";

export const revalidate = 600;

function describe(title: string, date: string | null, service: string | null) {
  const parts = [`Fotky z akce ${title}${date ? ` (${date})` : ""}.`];
  const label = serviceLabel(service);
  if (label) parts.push(`${label} od Partypacku.`);
  parts.push("Celou galerii najdete na Zoneramě. Chcete podobnou akci? Pošlete nezávaznou poptávku.");
  return parts.join(" ").slice(0, 160);
}

export async function generateMetadata(props: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const e = await getEvent(slug);
  if (!e) return {};
  const date = formatEventDate(e.eventDate);
  const description = describe(e.title, date, e.service);
  return {
    title: `${e.title} – fotky z akce`,
    description,
    alternates: { canonical: `/portfolio/${e.slug}` },
    openGraph: {
      title: `${e.title} – fotky z akce | Partypack`,
      description,
      url: `/portfolio/${e.slug}`,
      type: "article",
      images: e.coverKey ? [{ url: `${R2_BASE}/${e.coverKey}.webp`, width: e.coverW ?? undefined, height: e.coverH ?? undefined, alt: e.title }] : undefined,
    },
  };
}

export default async function EventPage(props: PageProps<"/portfolio/[slug]">) {
  const { slug } = await props.params;
  const e = await getEvent(slug);
  if (!e) notFound();
  const [more, date] = [await recentEvents(6, e.slug), formatEventDate(e.eventDate)];
  const service = SERVICES.find((s) => s.value === e.service);
  const lead = [date, service?.label].filter(Boolean).join(" · ");

  return (
    <>
      <PageHero image={e.coverKey ?? "2024/10/038_2024-10-16-Makro-Chefs-Dinner-VIP_Full-scaled"} title={e.title} lead={lead || undefined}>
        {e.albumUrl ? (
          <Button href={e.albumUrl} external variant="light">
            Celá galerie zde
          </Button>
        ) : null}
        {service && service.value !== "jine" ? (
          <Button href={service.href} variant="outline">
            {service.label}
          </Button>
        ) : null}
      </PageHero>

      {e.description ? (
        <Section>
          <Container>
            <Prose className="mx-auto max-w-3xl text-center text-lg">
              {e.description.split(/\n{2,}/).map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </Prose>
          </Container>
        </Section>
      ) : null}

      {more.length ? (
        <Section className={e.description ? "border-t border-line" : ""}>
          <Container>
            <SectionTitle title="Další akce" subtitle="… a kde je ta vaše?" />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((m) => (
                <li key={m.slug}>
                  <EventCard event={m} />
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <Button href="/galerie" variant="secondary">
                Celá galerie
              </Button>
            </div>
          </Container>
        </Section>
      ) : null}

      <ContactSection lead="Chcete podobnou akci? Napište nám datum a představu a my se postaráme o zbytek." />
    </>
  );
}
