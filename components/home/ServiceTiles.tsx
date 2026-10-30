import Link from "next/link";
import { Img } from "@/components/Img";
import { PackageToggle } from "@/components/home/PackagePicker";
import { Reveal } from "@/components/Reveal";
import { SERVICE_CATALOG } from "@/lib/services-catalog";

/**
 * Služby jako velké fotky s názvem uprostřed (klidná verze podle webu, který se klientce líbí).
 * Celá dlaždice vede na podstránku služby, vpravo dole je tlačítko do poptávky.
 */
export function ServiceTiles() {
  return (
    <ul className="mt-14 grid gap-4 sm:gap-6 md:grid-cols-2">
      {SERVICE_CATALOG.map((c, i) => (
        <li key={c.href}>
          <Reveal from="up" delay={(i % 2) * 120}>
            <article className="group relative isolate aspect-[4/3] overflow-hidden rounded-2xl bg-ink text-white sm:aspect-[3/2]">
              <Img
                k={c.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={85}
                className={`object-cover ${c.position ?? "object-center"} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/30 to-ink/15" />
              <Link
                href={c.href}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-16 pt-8 text-center outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <h2 className="text-3xl font-light tracking-[-0.02em] text-balance sm:text-4xl">{c.title}</h2>
                <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-white text-pretty">{c.statement}</p>
                {c.price ? <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em]">{c.price}</p> : null}
              </Link>
              <div className="absolute right-4 bottom-4 z-10 sm:right-5 sm:bottom-5">
                <PackageToggle service={c.inquiry} label={c.title} tone="dark" />
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
