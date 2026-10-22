import Link from "next/link";
import { Img } from "@/components/Img";
import { PackageToggle } from "@/components/home/PackagePicker";
import { Reveal } from "@/components/Reveal";
import { SERVICE_CATALOG } from "@/lib/services-catalog";

const cards = SERVICE_CATALOG;

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
                <Link
                  href={c.href}
                  tabIndex={-1}
                  aria-hidden
                  className={`relative block aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[420px] ${left ? "" : "md:order-2"}`}
                >
                  <Img
                    k={c.image}
                    alt={c.title}
                    fill
                    sizes="(min-width: 768px) 1000px, 600px"
                    quality={85}
                    className={`object-cover ${c.position ?? "object-center"} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                  />
                </Link>
                <div className={`@container flex flex-col justify-center gap-7 p-6 sm:p-10 lg:px-14 ${left ? "" : "md:order-1"}`}>
                  <div className="text-2xl leading-snug font-medium tracking-tight text-pretty sm:text-3xl lg:text-[2.4rem] lg:leading-[1.2]">
                    <h2 className="inline font-semibold">{c.title}:</h2> {c.statement}
                  </div>
                  {/* V úzké kartě (telefon) je cena nad tlačítky a obě tlačítka jsou vedle sebe. */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                    {c.price ? (
                      <p className="w-full text-base font-semibold tabular-nums @[26rem]:mr-3 @[26rem]:w-auto">{c.price}</p>
                    ) : null}
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
