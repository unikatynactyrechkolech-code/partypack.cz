import type { ReactNode } from "react";
import Link from "next/link";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";

export type GridItem = {
  title: string;
  text?: ReactNode;
  image?: string;
  position?: string;
  /** Cena nebo příplatek, např. „+ 3 500 Kč“. */
  price?: string;
  href?: string;
  external?: boolean;
  linkLabel?: string;
};

/**
 * Mřížka položek s fotkou, nadpisem a jednou větou („Co je v ceně“, doplňky, příležitosti).
 * `variant="card"`: bílá karta s černým okrajem jako na hlavní stránce. Položka bez fotky
 * se vykreslí jako orámovaná dlaždice s výrazným nadpisem. Položky se při scrollu postupně odkryjí.
 * Na telefonu jsou položky s textem pod sebou (fotka vlevo, text vpravo), samotné fotky po dvou.
 */
export function CardGrid({
  items,
  cols = 3,
  variant = "plain",
  headingAs: H = "h3",
  aspect = "aspect-[4/3]",
  sizes,
}: {
  items: GridItem[];
  cols?: 2 | 3 | 4;
  variant?: "plain" | "card";
  headingAs?: "h2" | "h3";
  aspect?: string;
  sizes?: string;
}) {
  const imgSizes = sizes ?? (cols === 2 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 50vw");
  // Dvě položky s textem vedle sebe jsou na telefonu moc malé, proto jdou pod sebe jako řádky.
  const rows = cols > 2 && items.some((it) => it.text);
  const colClass =
    cols === 2 ? "sm:grid-cols-2" : `${rows ? "sm:grid-cols-2" : "grid-cols-2"} ${cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`;
  return (
    <ul className={`mt-12 grid gap-x-4 ${rows ? "gap-y-4" : "gap-y-8"} sm:gap-x-6 sm:gap-y-8 lg:gap-x-8 lg:gap-y-12 ${colClass}`}>
      {items.map((it, i) => {
        const card = variant === "card";
        const row = rows && !!it.image;
        const body = (
          <>
            {it.image ? (
              <div
                className={`relative overflow-hidden bg-paper-soft ${aspect} ${card ? "" : "rounded-2xl"} ${
                  row ? "max-sm:aspect-auto max-sm:min-h-32 max-sm:w-[38%] max-sm:shrink-0" : ""
                }`}
              >
                <Img
                  k={it.image}
                  alt={it.title}
                  fill
                  sizes={imgSizes}
                  className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${it.position ?? ""}`}
                />
              </div>
            ) : null}
            <div
              className={
                card
                  ? `flex flex-1 flex-col p-5 sm:p-7 ${row ? "max-sm:p-4" : ""}`
                  : it.image
                    ? `pt-4 ${row ? "max-sm:self-center max-sm:pt-0 max-sm:pl-4" : ""}`
                    : "flex h-full flex-col rounded-2xl border border-ink p-5 sm:p-7"
              }
            >
              <H className={`${it.image ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"} leading-snug font-bold tracking-tight text-ink text-balance`}>{it.title}</H>
              {it.text ? <p className="mt-1.5 text-[15px] leading-relaxed text-ink text-pretty">{it.text}</p> : null}
              {it.price || it.href ? (
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4">
                  {it.price ? <p className="text-base font-extrabold tabular-nums">{it.price}</p> : null}
                  {it.href ? (
                    it.external ? (
                      <a href={it.href} target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold underline underline-offset-4">
                        {it.linkLabel ?? "Více"}
                      </a>
                    ) : (
                      <Link href={it.href} className="text-[15px] font-semibold underline underline-offset-4">
                        {it.linkLabel ?? "Více"}
                      </Link>
                    )
                  ) : null}
                </div>
              ) : null}
            </div>
          </>
        );
        return (
          <li key={it.title} className="flex">
            <Reveal from="up" delay={(i % cols) * 90} className="flex w-full">
              <div className={`group flex w-full flex-col ${row ? "max-sm:flex-row" : ""} ${card ? "overflow-hidden rounded-2xl border border-ink bg-white" : ""}`}>
                {body}
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
