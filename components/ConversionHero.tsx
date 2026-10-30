import { ScrollLogos } from "@/components/ScrollLogos";
import { HeroVideo } from "@/components/HeroVideo";
import Link from "next/link";
import { Container } from "@/components/ui";
import { partners } from "@/lib/data";
import { site } from "@/lib/site";

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
        {/* Jen měkký stín za nadpisem uprostřed, zbytek videa zůstává světlý. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_30%_at_50%_52%,rgb(11_11_12/0.6),transparent_75%)] lg:bg-[radial-gradient(ellipse_40%_38%_at_50%_52%,rgb(11_11_12/0.62),transparent_75%)]" />
        <Container className="relative flex flex-col items-center justify-center pb-10 pt-24 text-center sm:pb-14 sm:pt-28">
          <div className="mx-auto max-w-3xl lg:max-w-4xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] [text-shadow:0_1px_3px_rgb(0_0_0/0.5)]">{site.tagline}</p>
            <h1 className="text-4xl font-light leading-[1.05] tracking-[-0.02em] text-balance [text-shadow:0_0_32px_rgb(0_0_0/0.45),0_2px_10px_rgb(0_0_0/0.5),0_1px_2px_rgb(0_0_0/0.5)] sm:text-6xl lg:text-7xl">
              Zábava na celou akci od jednoho dodavatele
            </h1>
            <div className="mt-10 flex justify-center">
              <Link
                href="#kontakt"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-[16px] font-semibold text-ink shadow-[0_12px_30px_-12px_rgb(0_0_0/0.6)] transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:px-8 sm:py-4 sm:text-[18px]"
              >
                Chci akci
              </Link>
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
