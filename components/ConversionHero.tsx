import { ScrollLogos } from "@/components/ScrollLogos";
import { HeroVideo } from "@/components/HeroVideo";
import Link from "next/link";
import { Container } from "@/components/ui";
import { partners } from "@/lib/data";

/**
 * Úvod podle konverzní struktury: hlavní sdělení (jaký problém řešíme a pro koho),
 * jasná výzva k akci a hned pod tím pruh s referencemi, viditelný bez scrollování.
 */
export function ConversionHero() {
  return (
    <div className="flex min-h-svh flex-col">
      {/* Úvod přes celou výšku obrazovky (pod ním jen pruh s logy). Video vyplní celou plochu
          i za skleněnou hlavičkou; telefon na výšku dostane vlastní video na výšku. */}
      <section className="relative isolate flex min-h-[520px] flex-1 overflow-hidden bg-ink text-white">
        <div className="absolute inset-0">
          <HeroVideo />
        </div>
        {/* Jen měkký stín za nadpisem uprostřed, zbytek videa zůstává světlý. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_30%_at_50%_52%,rgb(11_11_12/0.6),transparent_75%)] lg:bg-[radial-gradient(ellipse_40%_38%_at_50%_52%,rgb(11_11_12/0.62),transparent_75%)]" />
        <Container className="relative flex flex-col items-center justify-center pb-10 pt-24 text-center sm:pb-14 sm:pt-28">
          <div className="mx-auto max-w-3xl lg:max-w-4xl">
            <h1 className="text-[1.85rem] font-extrabold uppercase leading-[1.05] tracking-[0.005em] text-balance [text-shadow:0_0_32px_rgb(0_0_0/0.45),0_2px_10px_rgb(0_0_0/0.5),0_1px_2px_rgb(0_0_0/0.5)] sm:text-5xl lg:text-6xl">
              Zábava na celou akci od jednoho dodavatele
            </h1>
            <div className="mt-8 flex justify-center">
              <Link
                href="#kontakt"
                className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 px-6 py-2.5 text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_30px_-12px_rgb(0_0_0/0.55)] backdrop-blur-md backdrop-saturate-150 transition-colors [text-shadow:0_1px_3px_rgb(0_0_0/0.45)] hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-7 sm:py-3 sm:text-base"
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
