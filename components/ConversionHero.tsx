import { ScrollLogos } from "@/components/ScrollLogos";
import { HeroBackground } from "@/components/HeroBackground";
import { Button, Container } from "@/components/ui";
import { partners } from "@/lib/data";

const HERO_IMAGES = [
  "2023/07/MiaGebauer-302",
  "2024/04/Partypack-specialni-Pozadi-31",
  "2024/10/038_2024-10-16-Makro-Chefs-Dinner-VIP_Full-scaled",
];

/**
 * Úvod podle konverzní struktury: hlavní sdělení (jaký problém řešíme a pro koho),
 * jasná výzva k akci a hned pod tím pruh s referencemi, viditelný bez scrollování.
 */
export function ConversionHero() {
  return (
    <div className="flex min-h-svh flex-col">
      <section className="relative isolate flex flex-1 overflow-hidden bg-ink text-white">
        <HeroBackground images={HERO_IMAGES} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/40" />
        <div className="pointer-events-none absolute inset-0 bg-ink/35 lg:hidden" />
        <Container className="relative flex flex-col justify-center pb-10 pt-24 sm:pb-14 sm:pt-28">
          <div className="max-w-2xl">
            <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Zábava na celou akci od jednoho dodavatele
            </h1>
            <div className="mt-8 flex gap-3">
              <Button href="#kontakt" variant="light" className="px-5 py-3 sm:px-7 sm:py-3.5 sm:text-base">
                Poptat akci
              </Button>
              <Button href="/cena" variant="outline" className="px-5 py-3 sm:px-7 sm:py-3.5 sm:text-base">
                Ceník
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Reference" className="border-b border-line bg-white">
        <Container className="flex items-center gap-6 py-5">
          <p className="shrink-0 text-sm font-medium text-ink">Důvěřují nám</p>
          <ScrollLogos logos={partners} />
        </Container>
      </section>
    </div>
  );
}
