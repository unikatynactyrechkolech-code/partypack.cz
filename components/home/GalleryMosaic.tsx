import Link from "next/link";
import { Img } from "@/components/Img";

type Photo = { slug: string; title: string; image: string; position: string; className: string; sizes: string };

// Ručně vybraný mix: firemní párty, neonové speciální pozadí, svatba, AI fotokoutek, AI Draw Bot
// a parta u fotokoutku. Fotky z akcí vedou na stránku akce, pozadí na speciální pozadí.
const photos: Photo[] = [
  {
    slug: "summer-boat-party",
    title: "Summer Boat Party",
    image: "2026/08/Partypack-173",
    position: "object-center lg:object-top",
    className: "col-span-2 row-span-2 lg:col-span-5 lg:col-start-1 lg:row-span-1 lg:row-start-1",
    sizes: "(min-width: 1024px) 560px, 480px",
  },
  {
    slug: "",
    title: "Speciální pozadí do fotokoutku",
    image: "2024/04/Partypack-106",
    position: "object-[9%_center]",
    className: "row-span-2 lg:col-span-3 lg:col-start-6 lg:row-span-2 lg:row-start-1",
    sizes: "(min-width: 1024px) 880px, 460px",
  },
  {
    slug: "svatba-katerina-a-matej",
    title: "Svatba Kateřina a Matěj",
    image: "2026/09/Partypack-3",
    position: "object-center",
    className: "lg:col-span-4 lg:col-start-9 lg:row-start-1",
    sizes: "(min-width: 1024px) 440px, 460px",
  },
  {
    slug: "firemni-akce-4fin-ai",
    title: "Firemní akce 4fin – AI",
    image: "2026/06/Template-pro-klienty-fotokoutek-5-7",
    position: "object-[18%_center]",
    className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
    sizes: "(min-width: 1024px) 440px, 460px",
  },
  {
    slug: "oez-den-otevrenych-dveri-ai-draw-bot",
    title: "OEZ – Den otevřených dveří – AI DRAW BOT",
    image: "2026/09/WhatsApp-Image-2026-09-07-at-12.22.16",
    position: "object-center",
    className: "row-span-2 lg:col-span-3 lg:col-start-3 lg:row-span-1 lg:row-start-2",
    sizes: "(min-width: 1024px) 420px, 460px",
  },
  {
    slug: "miagebauer",
    title: "Workshop svatební fotografie by Mia Gebauer",
    image: "2026/05/MiaGebauer-16",
    position: "object-center",
    className: "row-span-2 lg:col-span-4 lg:col-start-9 lg:row-span-1 lg:row-start-2",
    sizes: "(min-width: 1024px) 440px, 460px",
  },
];

/** Ukázka galerie: mozaika fotek z akcí od kraje ke kraji, s úzkými mezerami. */
export function GalleryMosaic() {
  return (
    <ul className="mt-12 grid auto-rows-[170px] grid-cols-2 gap-1.5 sm:auto-rows-[220px] sm:gap-3 lg:auto-rows-[320px] lg:grid-cols-12">
      {photos.map((p) => (
        <li key={p.slug} className={p.className}>
          <Link href={p.slug ? `/portfolio/${p.slug}` : "/specialni-pozadi"} className="group relative block h-full overflow-hidden bg-paper-soft">
            <Img
              k={p.image}
              alt={p.title}
              fill
              sizes={p.sizes}
              quality={85}
              className={`object-cover ${p.position} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
