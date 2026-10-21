import Link from "next/link";
import { Img } from "@/components/Img";
import { PackageToggle } from "@/components/home/PackagePicker";
import { Reveal } from "@/components/Reveal";
import type { InquiryService } from "@/lib/package";

type Card = {
  href: string;
  title: string;
  statement: string;
  price?: string;
  image: string;
  inquiry: InquiryService;
};

// Věty, fakta a ceny vycházejí z ceníku a podstránek služeb.
const cards: Card[] = [
  {
    href: "/fotokoutek",
    title: "Fotokoutek a GIFy",
    statement: "Designová fotobudka s obsluhou, která tiskne fotky do 7 vteřin.",
    price: "od 10 000 Kč",
    image: "2022/01/43531135_2220002654881285_3040242971850047488_n",
    inquiry: "Fotokoutek",
  },
  {
    href: "/ai-fotokoutek",
    title: "AI fotokoutek",
    statement: "Umělá inteligence promění hosty v kohokoli, až v 8 různých stylech.",
    price: "od 14 000 Kč",
    image: "2024/04/819a14bd-a2ed-44ee-9e42-29a22cbe3d57",
    inquiry: "AI fotokoutek",
  },
  {
    href: "/partyspin360",
    title: "Partyspin 360°",
    statement: "Kamera hosty obtočí a za pár vteřin mají video s hudbou v mobilu.",
    price: "od 9 900 Kč",
    image: "2023/02/Partyspin-2-promo-foto-scaled",
    inquiry: "360° Partyspin",
  },
  {
    href: "/ai-draw-bot",
    title: "AI Draw Bot",
    statement: "Robotická ramena nakreslí portrét hosta přímo na akci do 40 vteřin.",
    price: "od 19 000 Kč",
    image: "2025/03/DMB1",
    inquiry: "AI Draw Bot",
  },
  {
    href: "/hostesky",
    title: "Hostesky a modelky",
    statement: "Hostesky, modelky i promotéři, které vybereme společně s vámi.",
    price: "od 270 Kč / hod.",
    image: "2023/05/2023-04-25_PIANA_DO_SKOL_photo-adam-costey-copyright-adam-costey.com-015",
    inquiry: "Hostesky",
  },
  {
    href: "/dalsisluzby",
    title: "Další služby na akce",
    statement: "DJ, fotograf, výzdoba, stany i taneční vystoupení. Doplníme, co k akci chybí.",
    image: "2024/04/Partypack-35",
    inquiry: "Něco jiného",
  },
];

// Mírný náklon karet od první k poslední (ve stupních), ať sekce má charakter.
const TILT = [-1.2, -0.75, -0.3, 0.3, 0.75, 1.2];

/**
 * Služby pod sebou na střídačku: bílá karta s černým okrajem, fotka přitisknutá k okraji
 * na jedné straně, na druhé název služby s větou, cena a tlačítka (vše černé).
 * Lichá služba má fotku vlevo a přiletí zleva, sudá vpravo a přiletí zprava.
 */
export function ServiceCards() {
  return (
    <ul className="mt-12 grid gap-8 sm:mt-14 sm:gap-12">
      {cards.map((c, i) => {
        const left = i % 2 === 0;
        return (
          <li key={c.href}>
            <Reveal rotate={TILT[i] ?? 0} from={left ? "left" : "right"}>
              <article className="group grid overflow-hidden rounded-2xl border border-ink bg-white text-ink ring-[#00b1ff] ring-offset-2 ring-offset-paper transition-shadow duration-300 has-[[aria-pressed=true]]:ring-2 md:grid-cols-2">
                <div className={`relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[420px] ${left ? "" : "md:order-2"}`}>
                  <Img
                    k={c.image}
                    alt={c.title}
                    fill
                    sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className={`@container flex flex-col justify-center gap-7 p-6 sm:p-10 lg:px-14 ${left ? "" : "md:order-1"}`}>
                  <div className="text-2xl leading-snug font-medium tracking-tight text-pretty sm:text-3xl lg:text-[2.4rem] lg:leading-[1.2]">
                    <h2 className="inline font-semibold">{c.title}:</h2> {c.statement}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {c.price ? <p className="mr-3 text-base font-semibold tabular-nums">{c.price}</p> : null}
                    <Link
                      href={c.href}
                      className="inline-flex items-center justify-center rounded-lg border border-ink px-3.5 py-2 text-xs font-semibold text-ink transition-colors duration-200 outline-none hover:bg-ink hover:text-white focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Více<span className="sr-only">: {c.title}</span>
                    </Link>
                    <PackageToggle service={c.inquiry} label={c.title} tone="light" />
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
