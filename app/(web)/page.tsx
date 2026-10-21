import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { ConversionHero } from "@/components/ConversionHero";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { ContactSection, Glow, Partners, Stats } from "@/components/sections";
import { ServiceCards } from "@/components/home/ServiceCards";
import { GalleryMosaic } from "@/components/home/GalleryMosaic";
import { PackageBar } from "@/components/home/PackagePicker";
import { OccasionTabs, type OccasionGroup } from "@/components/home/OccasionTabs";
import { listEvents } from "@/lib/events";
import { EVENT_TYPES, type EventTypeValue } from "@/lib/services";

export const metadata: Metadata = pageMetadata(seo.home);

// Fotky z posledních akcí se načítají z databáze, stránka se obnovuje po 10 minutách
// (a hned po uložení akce v administraci).
export const revalidate = 600;



const OCCASION_LABELS: Record<EventTypeValue, string> = {
  event: "Firemní akce",
  svatba: "Svatby",
  ples: "Plesy",
  narozeniny: "Narozeniny",
};

async function occasionGroups(): Promise<OccasionGroup[]> {
  const groups = await Promise.all(
    EVENT_TYPES.map(async (t) => {
      const { items } = await listEvents({ type: t.value, perPage: 16 });
      return {
        key: t.value,
        label: OCCASION_LABELS[t.value],
        href: `/galerie?typ=${t.value}`,
        events: items.filter((e) => e.coverKey).slice(0, 8),
      };
    }),
  );
  return groups.filter((g) => g.events.length > 0);
}

export default async function HomePage() {
  const occasions = await occasionGroups();

  return (
    <>
      <ConversionHero />

      <Section className="overflow-x-clip">
        <Container>
          <SectionTitle
            title="Služby na akce v jednom balíčku"
            subtitle="Vyberte jednu službu, nebo si poskládejte celý balíček. Při více službách vám připravíme zvýhodněnou nabídku."
          />
          <ServiceCards />
        </Container>
      </Section>

      <Stats
        animate
        image="2024/03/IMG_6079-scaled"
        position="object-[center_12%]"
        items={[
          { value: "10", label: "let na trhu" },
          { value: "3750", label: "úspěšných akcí" },
          { value: "702380", label: "úsměvů" },
          { value: "2188", label: "spokojených klientů" },
        ]}
      />

      <Section>
        <Container>
          <SectionTitle title="Galerie fotek z firemních akcí a svateb" />
          <GalleryMosaic />
          <div className="mt-10 flex justify-center">
            <Button href="/galerie" className="px-7 py-3.5 text-base">
              Celá galerie
            </Button>
          </div>
        </Container>
      </Section>

      {occasions.length ? (
        <Section className="relative isolate overflow-hidden bg-ink text-white">
          <Glow variant="events" />
          <Container>
            <SectionTitle title="Zábava na firemní akce, konference i svatby" subtitle="Podívejte se, jak to u nás vypadá." light />
            <OccasionTabs groups={occasions} dark />
          </Container>
        </Section>
      ) : null}

      <Partners className="bg-paper" />


      <ContactSection lead="Napište nám datum a představu o akci a my se postaráme o zbytek. Zajistíme i dětské dny, koncerty nebo třeba babyshower." />

      <PackageBar />
    </>
  );
}
