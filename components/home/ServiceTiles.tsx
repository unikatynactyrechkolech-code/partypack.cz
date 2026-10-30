import Link from "next/link";
import { Img } from "@/components/Img";
import { PackageToggle } from "@/components/home/PackagePicker";
import { Reveal } from "@/components/Reveal";
import { SERVICE_CATALOG } from "@/lib/services-catalog";

/**
 * Služby jako velké fotky od kraje ke kraji s názvem uprostřed (podle webu, který se klientce líbí).
 * Celá dlaždice vede na podstránku služby, dole jsou tlačítka Více a Do poptávky.
 */
export function ServiceTiles() {
  return (
    <ul className="grid md:grid-cols-2">
      {SERVICE_CATALOG.map((c, i) => (
        <li key={c.href}>
          <Reveal from="up" delay={(i % 2) * 120}>
            <article className="group relative isolate aspect-[4/5] overflow-hidden bg-ink text-white sm:aspect-[16/10]">
              <Img
                k={c.image}
                alt=""
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                quality={85}
                className={`object-cover ${c.position ?? "object-center"} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
              />
              <div className="absolute inset-0 bg-ink/45" />
              <Link
                href={c.href}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 pt-10 pb-24 text-center outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <h2 className="text-4xl font-light tracking-[-0.02em] text-balance sm:text-5xl">{c.title}</h2>
                <p className="mt-4 max-w-md text-base font-light leading-relaxed text-white text-pretty sm:text-lg">{c.statement}</p>
                {c.price ? <p className="mt-5 text-xs font-semibold uppercase tracking-[0.22em]">{c.price}</p> : null}
              </Link>
              <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-3 sm:bottom-8">
                <Link
                  href={c.href}
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/60 px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  Více<span className="sr-only">: {c.title}</span>
                </Link>
                <PackageToggle service={c.inquiry} label={c.title} tone="dark" />
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
