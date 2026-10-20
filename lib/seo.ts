import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://partypack.cz").replace(/\/$/, "");
export const OG_IMAGE = "https://pub-32c9b24c8e42465eb3608a2e395531b5.r2.dev/2023/07/MiaGebauer-302.webp";

type PageSeo = { path: string; title: string; description: string; absolute?: boolean };

/**
 * Titulky a popisky pro vyhledávače. Titulek podstránky se doplní o „ | Partypack“
 * (šablona v app/layout.tsx), celkem 50–60 znaků. Popisky 140–160 znaků.
 */
export const seo = {
  home: {
    path: "/",
    title: "Partypack – fotokoutek, hostesky a zábava na firemní akce",
    absolute: true,
    description:
      "Fotokoutek, AI fotokoutek, Partyspin 360°, AI Draw Bot i hostesky v jednom balíčku. Zábava na firemní akce, konference, svatby a oslavy od jednoho dodavatele.",
  },
  fotokoutek: {
    path: "/fotokoutek",
    title: "Fotokoutek na svatbu, firemní akci i ples",
    description:
      "Pronájem fotokoutku s obsluhou, neomezeným tiskem, 45 rekvizitami a pozadím na míru. Fotobudka Partysnap na svatby, firemní akce i plesy od 10 000 Kč.",
  },
  aiFotokoutek: {
    path: "/ai-fotokoutek",
    title: "AI fotokoutek s umělou inteligencí na akce",
    description:
      "AI fotokoutek promění hosty v kohokoli. Přes 150 filtrů pro jednotlivce i skupiny, neomezený tisk a sdílení přes QR kód. Na firemní akce, svatby i plesy.",
  },
  aiFiltry: {
    path: "/ai-filtry",
    title: "AI filtry do fotokoutku pro jednotlivce",
    description:
      "Přes 150 AI filtrů pro jednu osobu, od pilota a superhrdiny po Van Gogha. Vyberte až 8 filtrů pro AI fotokoutek na vaší akci. Fungují pro muže, ženy i děti.",
  },
  skupinoveAiFiltry: {
    path: "/skupinove-ai-filtry",
    title: "Skupinové AI filtry do fotokoutku pro 2–8 osob",
    description:
      "Skupinové AI filtry pro 2 až 8 osob. Safari, piráti, Římané nebo Mount Everest. Skupinky si na akci vybírají přímo ve fotokoutku z více než 50 filtrů.",
  },
  hostesky: {
    path: "/hostesky",
    title: "Hostesky, promotéři a modelky na firemní akce",
    description:
      "Hostesky, modelky a promotéři na konference, veletrhy, firemní akce i luxusní eventy. Výběr na míru, dress code, líčení i supervize na místě. Od 270 Kč/hod.",
  },
  partyspin: {
    path: "/partyspin360",
    title: "360° fotokoutek Partyspin – video na akce",
    description:
      "Partyspin 360° natočí hosty ze všech úhlů a za pár vteřin připraví video s hudbou a grafikou na míru. Ideální na Reels a TikTok. Pronájem od 9 900 Kč.",
  },
  aiDrawBot: {
    path: "/ai-draw-bot",
    title: "AI Draw Bot – robot kreslí portréty na akcích",
    description:
      "AI Draw Bot nakreslí robotickým ramenem portrét hosta do 40 vteřin. Tři roboty pro velké akce a papír s vaším logem. Na konference i firemní akce od 19 000 Kč.",
  },
  galerie: {
    path: "/galerie",
    title: "Fotky z akcí – fotokoutek, Partyspin a AI",
    description:
      "Fotky z firemních akcí, svateb a festivalů, kde jsme zajišťovali fotokoutek, AI fotokoutek, Partyspin 360° a AI Draw Bot. Celé galerie najdete na Zoneramě.",
  },
  pozadi: {
    path: "/pozadi",
    title: "Pozadí do fotokoutku – speciální i tištěná",
    description:
      "Vyberte pozadí do fotokoutku: speciální pozadí na míru, tištěné motivy, klíčovací greenscreen nebo AI filtry. Na plesy, svatby, narozeniny i firemní akce.",
  },
  specialniPozadi: {
    path: "/specialni-pozadi",
    title: "Speciální pozadí do fotokoutku na míru",
    description:
      "Přes 50 speciálních pozadí do fotokoutku v ceně balíčku i prémiová pozadí za příplatek, třeba LED nebo balónková stěna. Na plesy, svatby a firemní akce.",
  },
  tistenaPozadi: {
    path: "/tistena-pozadi-4",
    title: "Tištěná pozadí do fotokoutku – katalog",
    description:
      "Katalog 42 tištěných pozadí do fotokoutku v ceně každého balíčku. Vyberte si motiv z naší nabídky, nebo vám pozadí natiskneme přímo na míru vaší akci.",
  },
  dalsiSluzby: {
    path: "/dalsisluzby",
    title: "Služby na akce: DJ, fotograf, výzdoba a další",
    description:
      "Doplňte balíček o Partyprint GO, módní přehlídku, fotografa a kameramana, výzdobu, knihu hostů, dětské aktivity, DJ, stan nebo taneční vystoupení.",
  },
  cena: {
    path: "/cena",
    title: "Ceník – fotokoutek, hostesky, AI Draw Bot",
    description:
      "Ceník Partypack: fotokoutek od 10 000 Kč, Partyspin 360° od 9 900 Kč, AI fotokoutek od 14 000 Kč, hostesky od 270 Kč/hod. a AI Draw Bot od 19 000 Kč.",
  },
  kontakt: {
    path: "/kontakt",
    title: "Kontakt a poptávka fotokoutku a služeb na akce",
    description:
      "Napište, zavolejte nebo se stavte na kafe. Partypack, Mandloňová 1175/16, Praha 9. Tel. +420 720 448 660, info@partypack.cz. Pošlete poptávku.",
  },
} satisfies Record<string, PageSeo>;

export function pageMetadata(p: PageSeo): Metadata {
  const fullTitle = p.absolute ? p.title : `${p.title} | Partypack`;
  return {
    title: p.absolute ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: {
      title: fullTitle,
      description: p.description,
      url: p.path,
      siteName: "Partypack",
      locale: "cs_CZ",
      type: "website",
      images: [{ url: OG_IMAGE, width: 2000, height: 1334, alt: "Partypack – fotokoutek a zábava na akce" }],
    },
  };
}
