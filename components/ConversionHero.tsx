import { Img } from "@/components/Img";
import { ScrollLogos } from "@/components/ScrollLogos";
import { Button, Container } from "@/components/ui";
import { partners } from "@/lib/data";

/**
 * Úvod podle konverzní struktury: hlavní sdělení (jaký problém řešíme a pro koho),
 * jasná výzva k akci a hned pod tím pruh s referencemi, viditelný bez scrollování.
 */
export function ConversionHero() {
  return (
    <div className="flex min-h-svh flex-col">
      <section className="relative isolate flex flex-1 overflow-hidden bg-ink text-white">
        <Img k="2023/07/MiaGebauer-302" alt="" fill priority sizes="100vw" className="object-cover object-[65%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/40" />
        <div className="absolute inset-0 bg-ink/35 lg:hidden" />
        <Container className="relative flex flex-col justify-center pb-10 pt-24 sm:pb-14 sm:pt-28">
          <div className="max-w-2xl">
            <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Zábava na celou akci od jednoho dodavatele
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white text-pretty sm:text-lg">
              Fotokoutek, AI fotokoutek, Partyspin 360°, AI Draw Bot a hostesky pro firemní eventy, svatby i plesy.
              Přivezeme, postavíme a celou akci obsloužíme.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#kontakt" variant="light" className="px-7 py-3.5 text-base">
                Nezávazně poptat akci
              </Button>
              <Button href="/cena" variant="outline" className="px-7 py-3.5 text-base">
                Zobrazit ceník
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
