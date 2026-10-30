import Link from "next/link";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import type { GridItem } from "@/components/service/CardGrid";

const COLS = { 2: "md:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" } as const;

/**
 * Fotky od kraje ke kraji bez mezer, v každé název a věta uprostřed
 * (podle webu, který se klientce líbí). Položka s odkazem je celá klikací.
 */
export function PhotoTiles({
  items,
  cols = 3,
  headingAs: H = "h3",
  aspect = "aspect-[4/5] sm:aspect-[4/3]",
}: {
  items: GridItem[];
  cols?: 2 | 3;
  headingAs?: "h2" | "h3";
  aspect?: string;
}) {
  return (
    <ul className={`grid ${COLS[cols]}`}>
      {items.map((it, i) => {
        const inner = (
          <>
            <Img
              k={it.image ?? ""}
              alt=""
              fill
              sizes={cols === 2 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
              quality={85}
              className={`object-cover ${it.position ?? "object-center"} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
            />
            <div className="absolute inset-0 bg-ink/45" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <H className="text-2xl font-light tracking-[-0.02em] text-balance sm:text-3xl">{it.title}</H>
              {it.text ? <p className="mt-3 max-w-xs text-[15px] font-light leading-relaxed text-white text-pretty">{it.text}</p> : null}
              {it.price ? <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em]">{it.price}</p> : null}
            </div>
          </>
        );
        const cls = `group relative isolate block overflow-hidden bg-ink text-white ${aspect}`;
        return (
          <li key={it.title}>
            <Reveal from="up" delay={(i % cols) * 90}>
              {it.href ? (
                <Link href={it.href} className={`${cls} outline-none focus-visible:ring-2 focus-visible:ring-white`}>
                  {inner}
                </Link>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
