"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Img } from "@/components/Img";
import { PackageToggle } from "@/components/home/PackagePicker";
import type { InquiryService } from "@/lib/package";

type Card = {
  href: string;
  title: string;
  /** Krátký název do řady záložek nad kartami. */
  short: string;
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
    short: "Fotokoutek",
    statement: "Designová fotobudka s obsluhou, která tiskne fotky do 7 vteřin.",
    facts: ["Neomezený tisk", "Doprava v ceně", "Online galerie"],
    price: "od 10 000 Kč",
    image: "2022/01/43531135_2220002654881285_3040242971850047488_n",
    inquiry: "Fotokoutek",
  },
  {
    href: "/ai-fotokoutek",
    title: "AI fotokoutek",
    short: "AI fotokoutek",
    statement: "Umělá inteligence promění hosty v kohokoli, až v 8 různých stylech.",
    facts: ["Filtry pro jednotlivce i skupiny", "Bez klíčování"],
    price: "od 14 000 Kč",
    image: "2024/04/819a14bd-a2ed-44ee-9e42-29a22cbe3d57",
    inquiry: "AI fotokoutek",
  },
  {
    href: "/partyspin360",
    title: "Partyspin 360°",
    short: "Partyspin 360°",
    statement: "Kamera hosty obtočí a za pár vteřin mají video s hudbou v mobilu.",
    facts: ["4K kamera", "Formát na výšku", "Sdílení přes QR"],
    price: "od 9 900 Kč",
    image: "2023/02/Partyspin-2-promo-foto-scaled",
    inquiry: "360° Partyspin",
  },
  {
    href: "/ai-draw-bot",
    title: "AI Draw Bot",
    short: "AI Draw Bot",
    statement: "Robotická ramena nakreslí portrét hosta přímo na akci do 40 vteřin.",
    facts: ["3 robotická ramena", "Vaše logo na papíře"],
    price: "od 19 000 Kč",
    image: "2025/03/DMB1",
    inquiry: "AI Draw Bot",
  },
  {
    href: "/hostesky",
    title: "Hostesky a modelky",
    short: "Hostesky",
    statement: "Hostesky, modelky i promotéři, které vybereme společně s vámi.",
    facts: ["Šatnářky", "I pro velké akce"],
    price: "od 270 Kč / hod.",
    image: "2023/05/2023-04-25_PIANA_DO_SKOL_photo-adam-costey-copyright-adam-costey.com-015",
    inquiry: "Hostesky",
  },
  {
    href: "/dalsisluzby",
    title: "Další služby na akce",
    short: "Další služby",
    statement: "DJ, fotograf, výzdoba, stany i taneční vystoupení. Doplníme, co k akci chybí.",
    facts: ["DJ a moderátor", "Fotograf a kameraman", "Pronájem stanů"],
    image: "2024/04/Partypack-35",
    inquiry: "Něco jiného",
  },
];

/**
 * Velké karty služeb (fotka vlevo, světlý panel s textem vpravo), které se posouvají do strany.
 * Nad nimi jsou názvy všech služeb, takže je nabídka vidět najednou.
 */
export function ServiceCards() {
  const track = useRef<HTMLUListElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = track.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { root, threshold: 0.6 },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const root = track.current;
    const el = items.current[Math.max(0, Math.min(cards.length - 1, i))];
    if (!root || !el) return;
    const pad = parseFloat(getComputedStyle(root).scrollPaddingLeft) || 0;
    root.scrollTo({ left: el.offsetLeft - root.offsetLeft - pad, behavior: "smooth" });
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between gap-4">
        <div className="-mx-5 flex min-w-0 flex-1 gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
          {cards.map((c, i) => (
            <button
              key={c.href}
              type="button"
              onClick={() => go(i)}
              aria-current={i === active}
              className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                i === active ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"
              }`}
            >
              {c.short}
            </button>
          ))}
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(active + d)}
              disabled={d === -1 ? active === 0 : active === cards.length - 1}
              aria-label={d === 1 ? "Další služba" : "Předchozí služba"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-white text-ink transition-colors outline-none hover:border-ink focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-35 disabled:hover:border-line"
            >
              <span aria-hidden className={`block h-2.5 w-2.5 border-current border-t-[1.5px] border-r-[1.5px] ${d === 1 ? "-ml-1 rotate-45" : "-mr-1 -rotate-[135deg]"}`} />
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={track}
        className="relative -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((c, i) => (
          <li
            key={c.href}
            ref={(el) => {
              items.current[i] = el;
            }}
            data-index={i}
            className="w-[88%] shrink-0 snap-start sm:w-[82%] lg:w-[76%]"
          >
            <article className="group relative grid h-full overflow-hidden rounded-lg ring-[#00b1ff] ring-offset-2 ring-offset-paper transition-shadow duration-300 has-[[aria-pressed=true]]:ring-2 md:grid-cols-[1.05fr_1fr]">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink md:aspect-auto md:min-h-[440px]">
                <Img
                  k={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 88vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="@container flex flex-col justify-center gap-6 bg-paper-soft p-6 sm:p-10 lg:p-12">
                <div className="text-2xl leading-snug font-medium tracking-tight text-ink text-pretty sm:text-[1.75rem] lg:text-[2rem]">
                  <h2 className="inline font-semibold text-[#3a7dff]">{c.title}:</h2> {c.statement}
                </div>
                <p className="text-[15px] text-ink">{c.facts.join(" · ")}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {c.price ? <p className="w-full text-base font-semibold tabular-nums @[24rem]:mr-auto @[24rem]:w-auto">{c.price}</p> : null}
                  <Link
                    href={c.href}
                    className="inline-flex items-center justify-center rounded-lg border border-ink/25 px-3.5 py-2 text-xs font-semibold text-ink transition-colors duration-200 outline-none hover:border-ink hover:bg-ink hover:text-white focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Více<span className="sr-only">: {c.title}</span>
                  </Link>
                  <PackageToggle service={c.inquiry} label={c.title} tone="light" />
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
