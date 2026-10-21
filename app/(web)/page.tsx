import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { ConversionHero } from "@/components/ConversionHero";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { ContactSection, Glow, Partners, Stats } from "@/components/sections";
import { ServiceCards } from "@/components/home/ServiceCards";
import { BrandShape } from "@/components/BrandShape";
import { PackageBar } from "@/components/home/PackagePicker";
import { OccasionTabs, type OccasionGroup } from "@/components/home/OccasionTabs";
import { listEvents } from "@/lib/events";
import { EVENT_TYPES, type EventTypeValue } from "@/lib/services";

export const metadata: Metadata = pageMetadata(seo.home);

// Fotky z posledních akcí se načítají z databáze, stránka se obnovuje po 10 minutách
// (a hned po uložení akce v administraci).
export const revalidate = 600;

const highlights = [
  "Příjemné zpestření vašich akcí",
  "Výhodná cena zajištěním balíčku",
  "Svatby, firemní akce, plesy, narozky",
  "Nejkrásnější hostesky široko daleko",
];

const steps = [
  { title: "Vyberte služby", text: "Jednu službu, nebo celý balíček." },
  { title: "Napište nám", text: "Datum a představu o akci. Ozveme se vám co nejdříve." },
  { title: "Postaráme se o zbytek", text: "Přijedeme s obsluhou a vy se věnujete hostům." },
];

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

      {/* Služby na střídačku přes celou šířku na černém pozadí. */}
      <Section className="bg-ink text-white">
        <Container>
          <SectionTitle
            title="Služby na akce v jednom balíčku"
            subtitle="Vyberte jednu službu, nebo si poskládejte celý balíček. Při více službách vám připravíme zvýhodněnou nabídku."
            light
          />
        </Container>
        <ServiceCards />
      </Section>

      <Stats
        animate
        image="2022/01/33103039_1018111845036421_263485012270120960_n"
        items={[
          { value: "10", label: "let na trhu" },
          { value: "3750", label: "úspěšných akcí" },
          { value: "702380", label: "úsměvů" },
          { value: "2188", label: "spokojených klientů" },
        ]}
      />

      <Section className="relative isolate overflow-hidden">
        {/* Pár tvarů z čáry loga, ať bílá sekce není prázdná. */}
        <BrandShape kind="zigzag" id="steps-zigzag" rotate={-14} className="-z-10 top-8 left-[4%] w-20 sm:top-14 sm:w-32 lg:left-[8%]" />
        <BrandShape kind="ring" id="steps-ring" delay={1.5} className="-z-10 top-10 right-[5%] w-12 sm:top-20 sm:w-20 lg:right-[9%]" />
        <BrandShape kind="chevron" id="steps-chevron" rotate={12} delay={3} className="-z-10 hidden bottom-14 right-[16%] w-16 md:block" />
        <Container>
          <SectionTitle title="Jak objednat fotokoutek a další služby na akci" />
          <ol className="relative mx-auto mt-12 grid max-w-md gap-8 md:mt-14 md:max-w-none md:grid-cols-3 md:gap-8">
            <span aria-hidden className="absolute top-12 right-[16%] left-[16%] hidden h-px bg-ink/15 md:block" />
            {steps.map((s, i) => (
              <li key={s.title} className="relative flex items-center gap-5 md:block md:text-center">
                <span
                  aria-hidden
                  className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-ink/15 bg-paper-soft text-3xl font-semibold tabular-nums text-ink md:mx-auto md:h-24 md:w-24 md:text-5xl"
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight md:mt-6 md:text-xl">{s.title}</h3>
                  <p className="mt-1 leading-relaxed text-ink text-pretty md:mx-auto md:mt-2 md:max-w-xs">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-14 flex flex-col items-center gap-5 text-center">
            <p className="max-w-xl text-ink text-pretty">
              Máme k dispozici 12 strojů, takže akci zvládneme zajistit i den předem.
            </p>
            <Button href="#kontakt" className="px-7 py-3.5 text-base">
              Poptat akci
            </Button>
          </div>
        </Container>
      </Section>

      {occasions.length ? (
        <Section className="relative isolate overflow-hidden bg-ink text-white">
          <Glow />
          <Container>
            <SectionTitle title="Zábava na firemní akce, konference i svatby" subtitle="Podívejte se, jak to u nás vypadá." light />
            <OccasionTabs groups={occasions} dark />
          </Container>
        </Section>
      ) : null}

      <Partners className="bg-paper" />

      <section className="border-b border-line">
        <Container>
          <ul className="grid gap-10 py-14 text-center sm:grid-cols-2 sm:py-16 lg:grid-cols-4">
            {highlights.map((h) => (
              <li key={h}>
                <span aria-hidden className="mx-auto block h-px w-8 bg-accent" />
                <p className="mt-4 text-base font-medium text-ink">{h}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactSection lead="Napište nám datum a představu o akci a my se postaráme o zbytek. Zajistíme i dětské dny, koncerty nebo třeba babyshower." />

      <PackageBar />
    </>
  );
}
