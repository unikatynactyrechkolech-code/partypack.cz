import type { InquiryService } from "@/lib/package";
import type { ServiceValue } from "@/lib/services";

/** Služba Partypacku pro karty na hlavní stránce a pro odkazy „Další služby“ na podstránkách. */
export type CatalogService = {
  href: string;
  title: string;
  /** Jedna věta, co služba je. Vychází z ceníku a podstránek. */
  statement: string;
  /** Tři krátké fakty do pilulek na kartě, stejné jako na podstránce. */
  tags?: string[];
  price?: string;
  image: string;
  /** Zarovnání fotky ve výřezu, u fotek na výšku nahoru, aby byl vidět obličej. */
  position?: string;
  inquiry: InquiryService;
  /** Hodnota filtru galerie (?sluzba=). */
  gallery?: ServiceValue;
};

export const SERVICE_CATALOG: CatalogService[] = [
  {
    href: "/fotokoutek",
    title: "Fotokoutek a GIFy",
    statement: "Designová fotobudka s obsluhou, která tiskne fotky do 7 vteřin.",
    tags: ["Neomezený tisk", "45 rekvizit", "Online galerie"],
    price: "od 10 000 Kč",
    image: "2022/01/43531135_2220002654881285_3040242971850047488_n",
    inquiry: "Fotokoutek",
    gallery: "fotokoutek",
  },
  {
    href: "/ai-fotokoutek",
    title: "AI fotokoutek",
    statement: "Umělá inteligence promění hosty v kohokoli, až v 8 různých stylech.",
    tags: ["Až 8 AI filtrů", "Skupiny až 10 osob", "Grafika na míru"],
    price: "od 14 000 Kč",
    image: "2024/08/AI-cenik",
    position: "object-[center_12%]",
    inquiry: "AI fotokoutek",
    gallery: "ai-fotokoutek",
  },
  {
    href: "/partyspin360",
    title: "Partyspin 360°",
    statement: "Kamera hosty obtočí a za pár vteřin mají video s hudbou v mobilu.",
    tags: ["4K video", "Grafika na míru", "LED stěna"],
    price: "od 9 900 Kč",
    image: "2023/02/Partyspin-2-promo-foto-scaled",
    position: "object-[center_18%]",
    inquiry: "360° Partyspin",
    gallery: "partyspin",
  },
  {
    href: "/ai-draw-bot",
    title: "AI Draw Bot",
    statement: "Robotická ramena nakreslí portrét hosta přímo na akci do 40 vteřin.",
    tags: ["3 kreslící roboti", "Portrét za 40 s", "Vaše logo na papírku"],
    price: "od 19 000 Kč",
    image: "2025/03/DMB1",
    inquiry: "AI Draw Bot",
    gallery: "ai-draw-bot",
  },
  {
    href: "/hostesky",
    title: "Hostesky a modelky",
    statement: "Hostesky, modelky i promotéři, které vybereme společně s vámi.",
    tags: ["1000+ ověřených hostesek", "Dress code na míru", "Supervize na akci"],
    price: "od 270 Kč / hod.",
    image: "2023/05/2023-04-25_PIANA_DO_SKOL_photo-adam-costey-copyright-adam-costey.com-015",
    position: "object-[center_42%]",
    inquiry: "Hostesky",
    gallery: "hostesky",
  },
  {
    href: "/dalsisluzby",
    title: "Další služby na akce",
    statement: "DJ, fotograf, výzdoba, stany i taneční vystoupení. Doplníme, co k akci chybí.",
    tags: ["DJ a moderátor", "Fotograf", "Výzdoba a stany"],
    image: "2024/04/Partypack-35",
    inquiry: "Něco jiného",
  },
];
