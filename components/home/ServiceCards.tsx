import Link from "next/link";
import { Img } from "@/components/Img";
import { PackageToggle } from "@/components/home/PackagePicker";
import type { InquiryService } from "@/lib/package";

type Card = {
  href: string;
  title: string;
  statement: string;
  facts: string[];
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
    facts: ["Neomezený tisk", "Doprava v ceně", "Online galerie"],
    price: "od 10 000 Kč",
    image: "2022/01/43531135_2220002654881285_3040242971850047488_n",
    inquiry: "Fotokoutek",
  },
  {
    href: "/ai-fotokoutek",
    title: "AI fotokoutek",
    statement: "Umělá inteligence promění hosty v kohokoli, až v 8 různých stylech.",
    facts: ["Filtry pro jednotlivce i skupiny", "Bez klíčování"],
    price: "od 14 000 Kč",
    image: "2024/04/819a14bd-a2ed-44ee-9e42-29a22cbe3d57",
    inquiry: "AI fotokoutek",
  },
  {
    href: "/partyspin360",
    title: "Partyspin 360°",
    statement: "Kamera hosty obtočí a za pár vteřin mají video s hudbou v mobilu.",
    facts: ["4K kamera", "Formát na výšku", "Sdílení přes QR"],
    price: "od 9 900 Kč",
    image: "2023/02/Partyspin-2-promo-foto-scaled",
    inquiry: "360° Partyspin",
  },
  {
    href: "/ai-draw-bot",
    title: "AI Draw Bot",
    statement: "Robotická ramena nakreslí portrét hosta přímo na akci do 40 vteřin.",
    facts: ["3 robotická ramena", "Vaše logo na papíře"],
    price: "od 19 000 Kč",
    image: "2025/03/DMB1",
    inquiry: "AI Draw Bot",
  },
  {
    href: "/hostesky",
    title: "Hostesky a modelky",
    statement: "Hostesky, modelky i promotéři, které vybereme společně s vámi.",
    facts: ["Šatnářky", "I pro velké akce"],
    price: "od 270 Kč / hod.",
    image: "2023/05/2023-04-25_PIANA_DO_SKOL_photo-adam-costey-copyright-adam-costey.com-015",
    inquiry: "Hostesky",
  },
  {
    href: "/dalsisluzby",
    title: "Další služby na akce",
    statement: "DJ, fotograf, výzdoba, stany i taneční vystoupení. Doplníme, co k akci chybí.",
    facts: ["DJ a moderátor", "Fotograf a kameraman", "Pronájem stanů"],
    image: "2024/04/Partypack-35",
    inquiry: "Něco jiného",
  },
];

/**
 * Služby pod sebou na střídačku: fotka v černém bloku se zaobleným rohem a vedle světlý panel
 * s názvem služby, větou, fakty, cenou a tlačítky. Lichá služba má fotku vlevo, sudá vpravo.
 * Řádky jdou přes celou šířku, sekce kolem musí být černá.
 */
export function ServiceCards() {
  return (
    <ul className="mt-12 grid gap-10 sm:mt-14 sm:gap-14">
      {cards.map((c, i) => {
        const left = i % 2 === 0;
        return (
          <li key={c.href}>
            <article className="group grid bg-paper-soft text-ink md:grid-cols-2">
              <div
                className={`flex bg-ink px-5 pb-8 sm:px-8 md:items-center md:px-10 md:py-10 lg:px-16 ${
                  left ? "md:justify-end md:rounded-br-[2.5rem]" : "md:order-2 md:justify-start md:rounded-tl-[2.5rem]"
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg ring-[#00b1ff] md:aspect-[4/5] ring-offset-4 ring-offset-ink transition-shadow duration-300 group-has-[[aria-pressed=true]]:ring-2 md:max-w-sm">
                  <Img
                    k={c.image}
                    alt={c.title}
                    fill
                    sizes="(min-width: 768px) 384px, 90vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </div>
              <div
                className={`@container flex flex-col justify-center px-5 py-10 sm:px-8 md:py-16 lg:px-16 ${
                  left ? "" : "md:order-1 md:items-end"
                }`}
              >
                <div className="flex w-full max-w-xl flex-col gap-6">
                  <div className="text-2xl leading-snug font-medium tracking-tight text-pretty sm:text-3xl lg:text-[2.6rem] lg:leading-[1.2]">
                    <h2 className="inline font-semibold text-[#3a7dff]">{c.title}:</h2> {c.statement}
                  </div>
                  <p className="text-[15px]">{c.facts.join(" · ")}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {c.price ? <p className="mr-3 text-base font-semibold tabular-nums">{c.price}</p> : null}
                    <Link
                      href={c.href}
                      className="inline-flex items-center justify-center rounded-lg border border-ink/25 px-3.5 py-2 text-xs font-semibold text-ink transition-colors duration-200 outline-none hover:border-ink hover:bg-ink hover:text-white focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      Více<span className="sr-only">: {c.title}</span>
                    </Link>
                    <PackageToggle service={c.inquiry} label={c.title} tone="light" />
                  </div>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
