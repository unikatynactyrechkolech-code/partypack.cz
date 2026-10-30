import Link from "next/link";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { Container, Section, SectionTitle } from "@/components/ui";
import { SERVICE_CATALOG } from "@/lib/services-catalog";

/** Ostatní služby Partypacku jako řada karet (na telefonu se posouvá do strany). */
export function CrossSell({
  current,
  title = "Další služby na vaši akci",
  subtitle = "Objednáním více služeb najednou získáte slevu 10–30 % podle velikosti objednávky.",
}: {
  current: string;
  title?: string;
  subtitle?: string;
}) {
  const items = SERVICE_CATALOG.filter((s) => s.href !== current);
  return (
    <Section>
      <Container>
        <SectionTitle eyebrow="Další služby" title={title} subtitle={subtitle} />
        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          {items.map((s, i) => (
            <li key={s.href} className="w-[64%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
              <Reveal from="up" delay={i * 80}>
                <Link href={s.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink bg-ink">
                    <Img
                      k={s.image}
                      alt={s.title}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 64vw"
                      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] ${s.position ?? ""}`}
                    />
                  </div>
                  <h2 className="mt-3 text-lg leading-snug font-bold tracking-tight text-ink">{s.title}</h2>
                  {s.price ? <p className="text-sm font-semibold text-ink tabular-nums">{s.price}</p> : null}
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
