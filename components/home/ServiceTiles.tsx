import Link from "next/link";
import { Img } from "@/components/Img";
import { PackageToggle } from "@/components/home/PackagePicker";
import type { InquiryService } from "@/lib/package";

type Tile = {
  href: string;
  title: string;
  line: string;
  facts: string[];
  price?: string;
  image: string;
  inquiry: InquiryService;
  className: string;
  sizes: string;
};

// Fakta a ceny jsou z ceníku a podstránek služeb.
const tiles: Tile[] = [
  {
    href: "/fotokoutek",
    title: "Fotokoutek a GIFy",
    line: "Designová fotobudka s obsluhou, rekvizitami a pozadím podle vás.",
    facts: ["Tisk za 7 vteřin", "Neomezený tisk", "Doprava v ceně"],
    price: "od 10 000 Kč",
    image: "2022/01/43531135_2220002654881285_3040242971850047488_n",
    inquiry: "Fotokoutek",
    className: "sm:col-span-2 lg:row-span-2 min-h-[360px] lg:min-h-0",
    sizes: "(min-width: 1024px) 66vw, 100vw",
  },
  {
    href: "/ai-fotokoutek",
    title: "AI fotokoutek",
    line: "Umělá inteligence promění hosty v kohokoli.",
    facts: ["Až 8 filtrů", "Filtry pro skupiny", "Bez klíčování"],
    price: "od 14 000 Kč",
    image: "2024/04/819a14bd-a2ed-44ee-9e42-29a22cbe3d57",
    inquiry: "AI fotokoutek",
    className: "min-h-[300px] lg:min-h-0",
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    href: "/partyspin360",
    title: "Partyspin 360°",
    line: "Kamera hosty obtočí a za pár vteřin je video s hudbou v mobilu.",
    facts: ["4K kamera", "Formát na výšku", "Sdílení přes QR"],
    price: "od 9 900 Kč",
    image: "2023/02/Partyspin-2-promo-foto-scaled",
    inquiry: "360° Partyspin",
    className: "min-h-[300px] lg:min-h-0",
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    href: "/ai-draw-bot",
    title: "AI Draw Bot",
    line: "Robot nakreslí portrét hosta přímo na akci.",
    facts: ["Portrét do 40 vteřin", "3 robotická ramena", "Vaše logo na papíře"],
    price: "od 19 000 Kč",
    image: "2025/03/DMB1",
    inquiry: "AI Draw Bot",
    className: "min-h-[300px] lg:min-h-0",
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    href: "/hostesky",
    title: "Hostesky a modelky",
    line: "Hostesky, modelky i promotéři. Vybereme je společně s vámi.",
    facts: ["Promotéři", "Šatnářky", "I pro velké akce"],
    price: "od 270 Kč / hod.",
    image: "2023/05/2023-04-25_PIANA_DO_SKOL_photo-adam-costey-copyright-adam-costey.com-015",
    inquiry: "Hostesky",
    className: "min-h-[300px] lg:min-h-0",
    sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  },
  {
    href: "/dalsisluzby",
    title: "Další služby na akce",
    line: "DJ, fotograf, výzdoba, stany i taneční vystoupení. Doplníme, co k akci chybí.",
    facts: ["DJ a moderátor", "Fotograf a kameraman", "Pronájem stanů"],
    image: "2024/04/Partypack-35",
    inquiry: "Něco jiného",
    className: "sm:col-span-2 lg:col-span-1 min-h-[300px] lg:min-h-0",
    sizes: "(min-width: 1024px) 33vw, 100vw",
  },
];

/** Mozaika služeb: co to je, tři fakta, cena od a tlačítko do poptávky. */
export function ServiceTiles() {
  return (
    <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:auto-rows-[360px] lg:grid-cols-3 lg:gap-5">
      {tiles.map((t) => (
        <li
          key={t.href}
          className={`group relative isolate flex overflow-hidden rounded-md bg-ink text-white ring-[#00b1ff] ring-offset-2 ring-offset-paper transition-shadow duration-300 has-[[aria-pressed=true]]:ring-2 ${t.className}`}
        >
          <Img
            k={t.image}
            alt=""
            fill
            sizes={t.sizes}
            className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 from-15% via-ink/65 via-55% to-ink/0" />
          <div className="mt-auto flex w-full flex-col gap-3 p-5 sm:p-6">
            <h2 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">
              {/* Celá dlaždice je odkaz na službu, tlačítko poptávky leží nad ním. */}
              <Link href={t.href} className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline">
                {t.title}
              </Link>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white text-pretty">{t.line}</p>
            <ul className="flex flex-wrap gap-1.5">
              {t.facts.map((f) => (
                <li key={f} className="rounded-lg bg-white/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
              {t.price ? <p className="text-sm font-semibold tabular-nums">{t.price}</p> : <span />}
              <PackageToggle service={t.inquiry} label={t.title} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
