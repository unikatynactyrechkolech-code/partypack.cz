import Link from "next/link";
import { Img } from "@/components/Img";
import { PackageToggle } from "@/components/home/PackagePicker";
import type { InquiryService } from "@/lib/package";

type Tile = {
  href: string;
  title: string;
  facts: string[];
  price?: string;
  image: string;
  inquiry: InquiryService;
  className: string;
  sizes: string;
};

const SMALL = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

// Fakta a ceny jsou z ceníku a podstránek služeb.
const tiles: Tile[] = [
  {
    href: "/fotokoutek",
    title: "Fotokoutek a GIFy",
    facts: ["Tisk za 7 vteřin", "Neomezený tisk", "Doprava v ceně"],
    price: "od 10 000 Kč",
    image: "2022/01/43531135_2220002654881285_3040242971850047488_n",
    inquiry: "Fotokoutek",
    className: "sm:col-span-2 lg:row-span-2 min-h-[340px] lg:min-h-0",
    sizes: "(min-width: 1024px) 66vw, 100vw",
  },
  {
    href: "/ai-fotokoutek",
    title: "AI fotokoutek",
    facts: ["Až 8 filtrů", "Filtry pro skupiny", "Bez klíčování"],
    price: "od 14 000 Kč",
    image: "2024/04/819a14bd-a2ed-44ee-9e42-29a22cbe3d57",
    inquiry: "AI fotokoutek",
    className: "min-h-[300px] lg:min-h-0",
    sizes: SMALL,
  },
  {
    href: "/partyspin360",
    title: "Partyspin 360°",
    facts: ["4K kamera", "Formát na výšku", "Sdílení přes QR"],
    price: "od 9 900 Kč",
    image: "2023/02/Partyspin-2-promo-foto-scaled",
    inquiry: "360° Partyspin",
    className: "min-h-[300px] lg:min-h-0",
    sizes: SMALL,
  },
  {
    href: "/ai-draw-bot",
    title: "AI Draw Bot",
    facts: ["Portrét do 40 vteřin", "3 robotická ramena", "Vaše logo na papíře"],
    price: "od 19 000 Kč",
    image: "2025/03/DMB1",
    inquiry: "AI Draw Bot",
    className: "min-h-[300px] lg:min-h-0",
    sizes: SMALL,
  },
  {
    href: "/hostesky",
    title: "Hostesky a modelky",
    facts: ["Promotéři", "Šatnářky", "I pro velké akce"],
    price: "od 270 Kč / hod.",
    image: "2023/05/2023-04-25_PIANA_DO_SKOL_photo-adam-costey-copyright-adam-costey.com-015",
    inquiry: "Hostesky",
    className: "min-h-[300px] lg:min-h-0",
    sizes: SMALL,
  },
  {
    href: "/dalsisluzby",
    title: "Další služby na akce",
    facts: ["DJ a moderátor", "Fotograf a kameraman", "Pronájem stanů"],
    image: "2024/04/Partypack-35",
    inquiry: "Něco jiného",
    className: "sm:col-span-2 lg:col-span-1 min-h-[300px] lg:min-h-0",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
];

/**
 * Mozaika služeb: název, tři fakta, cena od, odkaz Více a tlačítko do poptávky.
 * Úzká dlaždice skládá cenu a tlačítka pod sebe.
 */
export function ServiceTiles() {
  return (
    <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:auto-rows-[360px] lg:grid-cols-3 lg:gap-5">
      {tiles.map((t) => (
        <li
          key={t.href}
          className={`group @container relative isolate flex overflow-hidden rounded-md bg-ink text-white ring-[#00b1ff] ring-offset-2 ring-offset-paper transition-shadow duration-300 has-[[aria-pressed=true]]:ring-2 ${t.className}`}
        >
          <Img
            k={t.image}
            alt=""
            fill
            sizes={t.sizes}
            className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 from-15% via-ink/65 via-55% to-ink/0" />
          <div className="mt-auto flex w-full flex-col gap-3 p-4 @[18rem]:p-6">
            <h2 className="text-lg font-semibold tracking-tight text-balance @[18rem]:text-2xl">{t.title}</h2>
            <ul className="flex flex-wrap gap-1.5">
              {t.facts.map((f) => (
                <li
                  key={f}
                  className="rounded-lg bg-white/15 px-2 py-1 text-[11px] font-medium text-white backdrop-blur-sm @[18rem]:px-2.5 @[18rem]:text-xs"
                >
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {t.price ? (
                <p className="w-full text-sm font-semibold tabular-nums @[30rem]:mr-auto @[30rem]:w-auto">{t.price}</p>
              ) : (
                <span className="hidden @[30rem]:mr-auto @[30rem]:block" />
              )}
              {/* Celá dlaždice je odkaz na službu (přes Více), tlačítko poptávky leží nad ním. */}
              <Link
                href={t.href}
                className="inline-flex w-full items-center justify-center rounded-lg border border-white/70 px-3.5 py-2 text-xs font-semibold text-white transition-colors duration-200 outline-none after:absolute after:inset-0 after:content-[''] hover:bg-white hover:text-ink focus-visible:ring-2 focus-visible:ring-white @[18rem]:w-auto"
              >
                Více<span className="sr-only">: {t.title}</span>
              </Link>
              <PackageToggle service={t.inquiry} label={t.title} className="w-full @[18rem]:w-auto" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
