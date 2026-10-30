import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata, seo } from "@/lib/seo";
import { ConversionHero } from "@/components/ConversionHero";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { ContactSection, Glow, Partners, Stats } from "@/components/sections";
import { ServiceTiles } from "@/components/home/ServiceTiles";
import { GalleryMosaic } from "@/components/home/GalleryMosaic";
import { PackageBar } from "@/components/home/PackagePicker";
import { MobileCtaBar } from "@/components/home/MobileCtaBar";
import { PhotoBand } from "@/components/PhotoBand";
import { OccasionTabs, type OccasionGroup } from "@/components/home/OccasionTabs";
import { Faq, type FaqItem } from "@/components/Faq";
import { listEvents } from "@/lib/events";
import { EVENT_TYPES, type EventTypeValue } from "@/lib/services";
import { SERVICE_CATALOG } from "@/lib/services-catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata(seo.home);

// Fotky z posledních akcí se načítají z databáze, stránka se obnovuje po 10 minutách
// (a hned po uložení akce v administraci).
export const revalidate = 600;

// Ceny se berou ze stejného seznamu služeb jako karty nahoře, aby se nerozešly.
const prices = SERVICE_CATALOG.filter((s) => s.price)
  .map((s) => `${s.title} ${s.price}`)
  .join(", ")
  .replace(/\.?$/, ".");

// Odpovědi vycházejí z ceníku a podstránek služeb.
const faq: FaqItem[] = [
  {
    q: "Kolik stojí pronájem fotokoutku a dalších služeb?",
    a: (
      <>
        {prices} Všechny ceny a balíčky najdete v <Link href="/cena">ceníku</Link>.
      </>
    ),
  },
  {
    q: "Jak dlouho dopředu je potřeba rezervovat?",
    a: "Čím dřív, tím líp, hlavně na oblíbená data. Máme ale 12 strojů, takže akci zvládneme zajistit i když zavoláte den předem.",
  },
  { q: "Je sleva při objednání více služeb?", a: "Ano. Když si objednáte víc služeb najednou, získáte slevu 10–30 % podle velikosti objednávky." },
  { q: "Může akce probíhat venku?", a: "Ano, jen musíme stát pod přístřeškem nebo stanem. Když ho nemáte, přivezeme vlastní černý stan 3 × 3 m s bočnicemi." },
  {
    q: "Kdy dostaneme fotky z akce?",
    a: "Fotky z fotokoutku jsou v online galerii do 48 hodin po akci, z AI fotokoutku do 24 hodin. Galerie je pod heslem ke stažení i sdílení.",
  },
  {
    q: "Máte nabídku na plesy?",
    a: (
      <>
        Ano. Na plesy nad 500 hostů je fotokoutek pro organizátory zdarma a hosté platí 60 Kč za fotku. Další plesové balíčky
        najdete v <Link href="/cena">ceníku</Link>.
      </>
    ),
  },
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

      <Section className="pb-0 sm:pb-0">
        <Container>
          <SectionTitle
            eyebrow="Naše služby"
            title="Služby na akce v jednom balíčku"
            subtitle="Vyberte jednu službu, nebo si poskládejte celý balíček. Při více službách vám připravíme zvýhodněnou nabídku."
          />
        </Container>
        <div className="mt-14">
          <ServiceTiles />
        </div>
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

      <Section className="bg-sand">
        <Container>
          <SectionTitle eyebrow="Galerie" title="Galerie fotek z firemních akcí a svateb" />
        </Container>
        <div className="px-1.5 sm:px-3">
          <GalleryMosaic />
        </div>
        <Container>
          <div className="mt-10 flex justify-center">
            <Button href="/galerie" className="px-7 py-3.5 text-base">
              Celá galerie
            </Button>
          </div>
        </Container>
      </Section>

      {occasions.length ? (
        <>
          <PhotoBand
            k="2022/10/Partypack-50-kopie"
            eyebrow="Z našich akcí"
            title="Zábava na firemní akce, konference i svatby"
            text="Podívejte se, jak to u nás vypadá."
          />
          <Section className="relative isolate overflow-hidden bg-ink text-white">
            <Glow variant="events" />
            <Container>
              <OccasionTabs groups={occasions} dark />
            </Container>
          </Section>
        </>
      ) : null}

      <Partners className="bg-paper" />

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle
              align="left"
              eyebrow="Časté dotazy"
              title="Časté dotazy k pronájmu fotokoutku a dalších služeb"
              subtitle={
                <>
                  Nenašli jste odpověď? Zavolejte nám na{" "}
                  <a href={site.phoneHref} className="font-semibold whitespace-nowrap underline underline-offset-4">
                    {site.phone}
                  </a>{" "}
                  nebo nám <a href="#kontakt" className="font-semibold underline underline-offset-4">napište</a>.
                </>
              }
            />
          </div>
          <Faq items={faq} />
        </Container>
      </Section>

      <ContactSection lead="Napište nám datum a představu o akci a my se postaráme o zbytek. Zajistíme i dětské dny, koncerty nebo třeba babyshower." />

      <PackageBar />
      <MobileCtaBar />
    </>
  );
}
