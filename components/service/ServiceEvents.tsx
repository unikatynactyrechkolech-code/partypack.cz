import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { Glow } from "@/components/sections";
import { EventCard } from "@/components/EventCard";
import { ScrollRow } from "@/components/service/ScrollRow";
import { listEvents } from "@/lib/events";
import type { ServiceValue } from "@/lib/services";

/** Poslední akce s danou službou z galerie (databáze), jako pás fotek na tmavém pozadí. */
export async function ServiceEvents({
  service,
  title,
  subtitle,
  seed,
}: {
  service: ServiceValue;
  title: string;
  subtitle?: string;
  seed: number;
}) {
  const { items } = await listEvents({ service, perPage: 16 });
  const events = items.filter((e) => e.coverKey).slice(0, 10);
  if (!events.length) return null;
  return (
    <Section className="relative isolate overflow-hidden bg-ink text-white">
      <Glow seed={seed} />
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow="Galerie" title={title} subtitle={subtitle} align="left" light />
          <Button href={`/galerie?sluzba=${service}`} variant="outline">
            Celá galerie
          </Button>
        </div>
        <div className="mt-8">
          <ScrollRow dark label="Fotky z akcí">
            {events.map((e) => (
              <li key={e.slug} className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
                <EventCard event={e} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 80vw" />
              </li>
            ))}
          </ScrollRow>
        </div>
      </Container>
    </Section>
  );
}
