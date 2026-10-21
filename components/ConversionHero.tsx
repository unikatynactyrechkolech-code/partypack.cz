import { ScrollLogos } from "@/components/ScrollLogos";
import { HeroVideo } from "@/components/HeroVideo";
import { Button, Container } from "@/components/ui";
import { partners } from "@/lib/data";

/**
 * Úvod podle konverzní struktury: hlavní sdělení (jaký problém řešíme a pro koho),
 * jasná výzva k akci a hned pod tím pruh s referencemi, viditelný bez scrollování.
 */
export function ConversionHero() {
  return (
    <div className="flex flex-col lg:min-h-svh">
      {/* Na telefonu je úvod nižší než obrazovka, aby video vyplnilo celou plochu bez černých pruhů
          a nebylo tolik oříznuté. Skleněná hlavička leží přímo na videu. Na počítači je úvod přes celou obrazovku. */}
      <section className="relative isolate flex h-[68svh] min-h-[480px] overflow-hidden bg-ink text-white sm:h-[72svh] lg:h-auto lg:min-h-0 lg:flex-1">
        <div className="absolute inset-0">
          <HeroVideo />
        </div>
        {/* Jen měkký stín za nadpisem, zbytek videa zůstává světlý. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_30%_at_40%_50%,rgb(11_11_12/0.6),transparent_75%)] lg:bg-[radial-gradient(ellipse_50%_58%_at_20%_52%,rgb(11_11_12/0.72),transparent_75%)]" />
        <Container className="relative flex flex-col justify-center pb-10 pt-24 sm:pb-14 sm:pt-28">
          <div className="max-w-2xl">
            <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-balance [text-shadow:0_0_32px_rgb(0_0_0/0.45),0_2px_10px_rgb(0_0_0/0.5),0_1px_2px_rgb(0_0_0/0.5)] sm:text-5xl lg:text-6xl">
              Zábava na celou akci od jednoho dodavatele
            </h1>
            <div className="mt-7 flex gap-2.5">
              <Button href="#kontakt" variant="light" className="px-4! py-2! shadow-[0_8px_24px_-8px_rgb(0_0_0/0.55)] sm:px-5! sm:py-2.5! sm:text-[15px]!">
                Poptat akci
              </Button>
              <Button
                href="/cena"
                variant="outline"
                className="bg-ink/25! px-4! py-2! backdrop-blur-sm [text-shadow:0_1px_3px_rgb(0_0_0/0.5)] hover:bg-ink/40! sm:px-5! sm:py-2.5! sm:text-[15px]!"
              >
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
