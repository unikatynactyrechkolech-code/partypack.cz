import Link from "next/link";
import { Img } from "@/components/Img";

type Photo = { slug: string; title: string; image: string; position: string; className: string; sizes: string };

// Ručně vybraný mix z posledních akcí: firemní párty, zábava s rekvizitami, svatba, AI fotokoutek,
// AI Draw Bot a parta u fotokoutku. Každá fotka vede na stránku své akce.
const photos: Photo[] = [
  {
    slug: "summer-boat-party",
    title: "Summer Boat Party",
    image: "2026/08/Partypack-173",
    position: "object-center lg:object-top",
    className: "col-span-2 row-span-2 lg:col-span-5 lg:col-start-1 lg:row-span-1 lg:row-start-1",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    slug: "firemni-teambuilding",
    title: "Firemní teambuilding",
    image: "2026/08/Partypack-26",
    position: "object-[58%_center]",
    className: "row-span-2 lg:col-span-3 lg:col-start-6 lg:row-span-2 lg:row-start-1",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
  {
    slug: "svatba-katerina-a-matej",
    title: "Svatba Kateřina a Matěj",
    image: "2026/09/Partypack-3",
    position: "object-center",
    className: "lg:col-span-4 lg:col-start-9 lg:row-start-1",
    sizes: "(min-width: 1024px) 33vw, 50vw",
  },
  {
    slug: "firemni-akce-4fin-ai",
    title: "Firemní akce 4fin – AI",
    image: "2026/06/Template-pro-klienty-fotokoutek-5-7",
    position: "object-[18%_center]",
    className: "lg:col-span-2 lg:col-start-1 lg:row-start-2",
    sizes: "(min-width: 1024px) 17vw, 50vw",
  },
  {
    slug: "oez-den-otevrenych-dveri-ai-draw-bot",
    title: "OEZ – Den otevřených dveří – AI DRAW BOT",
    image: "2026/09/WhatsApp-Image-2026-09-07-at-12.22.16",
    position: "object-center",
    className: "row-span-2 lg:col-span-3 lg:col-start-3 lg:row-span-1 lg:row-start-2",
    sizes: "(min-width: 1024px) 25vw, 50vw",
  },
  {
    slug: "miagebauer",
    title: "Workshop svatební fotografie by Mia Gebauer",
    image: "2026/05/MiaGebauer-16",
    position: "object-center",
    className: "row-span-2 lg:col-span-4 lg:col-start-9 lg:row-span-1 lg:row-start-2",
    sizes: "(min-width: 1024px) 33vw, 50vw",
  },
];

/** Ukázka galerie: mozaika fotek z akcí se zaoblenými rohy. */
export function GalleryMosaic() {
  return (
    <ul className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 lg:auto-rows-[280px] lg:grid-cols-12">
      {photos.map((p) => (
        <li key={p.slug} className={p.className}>
          <Link href={`/portfolio/${p.slug}`} className="group relative block h-full overflow-hidden rounded-2xl bg-paper-soft">
            <Img
              k={p.image}
              alt={p.title}
              fill
              sizes={p.sizes}
              className={`object-cover ${p.position} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
