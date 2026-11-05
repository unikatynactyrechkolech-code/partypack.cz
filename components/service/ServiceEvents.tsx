import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { EventCard } from "@/components/EventCard";
import { ScrollRow } from "@/components/service/ScrollRow";
import { listEvents } from "@/lib/events";
import type { ServiceValue } from "@/lib/services";

/** Poslední akce s danou službou z galerie (databáze), jako pás fotek. */
export async function ServiceEvents({
  service,
  title,
  subtitle,
}: {
  service: ServiceValue;
  title: string;
  subtitle?: string;
  /** Už se nepoužívá (dřív číslo modré záře na černém pozadí), stránky ho zatím posílají. */
  seed?: number;
}) {
  const { items } = await listEvents({ service, perPage: 16 });
  const events = items.filter((e) => e.coverKey).slice(0, 10);
  if (!events.length) return null;
  return (
    <Section>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow="Galerie" title={title} subtitle={subtitle} align="left" />
          <Button href={`/galerie?sluzba=${service}`} variant="secondary">
            Celá galerie
          </Button>
        </div>
        <div className="mt-8">
          <ScrollRow label="Fotky z akcí">
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
