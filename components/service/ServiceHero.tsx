import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Glow } from "@/components/sections";
import { Img } from "@/components/Img";
import { Eyebrow } from "@/components/ui";
import { CountUp } from "@/components/home/CountUp";

export type Fact = {
  value: string;
  label: string;
  /** Číslo na začátku hodnoty se při zobrazení „natočí“ od nuly (např. „48 h“). */
  count?: boolean;
};

function FactValue({ f }: { f: Fact }) {
  const m = f.count ? f.value.match(/^(\d+)(.*)$/) : null;
  if (!m) return <>{f.value}</>;
  return (
    <>
      <CountUp value={Number(m[1])} />
      {m[2]}
    </>
  );
}

/** Pruh se čtyřmi hlavními fakty pod úvodem: co člověk potřebuje vědět hned. */
export function FactStrip({ facts }: { facts: Fact[] }) {
  return (
    <section aria-label="To hlavní ve zkratce" className="border-b border-ink bg-white">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-6 py-7 sm:py-9 lg:grid-cols-4 lg:gap-x-10">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1.5 text-sm leading-snug text-ink text-pretty sm:text-[15px]">{f.label}</dt>
              <dd className="text-[2rem] leading-none font-light tracking-[-0.02em] text-ink tabular-nums sm:text-5xl">
                <FactValue f={f} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/**
 * Úvod podstránky služby: vlevo co to je, kolik to stojí a tlačítko, vpravo živá ukázka
 * (video, fotky, porovnání před a po). Pod tím pruh s fakty, na počítači vše na jedné obrazovce.
 */
export function ServiceHero({
  title,
  lead,
  price,
  priceNote,
  cta,
  visual,
  facts,
  seed,
  eyebrow,
  background,
}: {
  title: ReactNode;
  lead: ReactNode;
  price?: string;
  priceNote?: string;
  cta: ReactNode;
  visual?: ReactNode;
  facts: Fact[];
  seed: number;
  /** Štítek nad nadpisem („Pronájem fotokoutku“). */
  eyebrow?: string;
  /** Fotka přes celý úvod s textem uprostřed (klidná verze); bez ní je úvod rozdělený na text a ukázku. */
  background?: { k: string; position?: string };
}) {
  if (background) {
    return (
      <div className="flex flex-col lg:min-h-svh">
        <section className="relative isolate flex flex-1 items-center overflow-hidden bg-ink text-white">
          <Img k={background.k} alt="" fill priority sizes="100vw" quality={85} className={`object-cover ${background.position ?? "object-center"}`} />
          <div className="absolute inset-0 bg-ink/55" />
          <Container className="relative flex flex-col items-center pt-36 pb-20 text-center sm:pt-44 sm:pb-24">
            {eyebrow ? <Eyebrow light>{eyebrow}</Eyebrow> : null}
            <h1 className="max-w-4xl text-4xl leading-[1.05] font-light tracking-[-0.02em] text-balance sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white text-pretty sm:text-xl">{lead}</p>
            {price ? (
              <p className="mt-8 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1">
                <span className="text-3xl font-light tracking-[-0.02em] tabular-nums sm:text-4xl">{price}</span>
                {priceNote ? <span className="text-[15px] text-white">{priceNote}</span> : null}
              </p>
            ) : null}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
              {cta}
              <Link href="/cena" className="text-[15px] font-semibold text-white underline decoration-white/50 underline-offset-[6px] hover:decoration-white">
                Celý ceník
              </Link>
            </div>
          </Container>
        </section>
        <FactStrip facts={facts} />
      </div>
    );
  }
  return (
    <div className="flex flex-col lg:min-h-svh">
      <section className="relative isolate flex flex-1 items-center overflow-hidden bg-ink text-white">
        <Glow seed={seed} />
        <Container className="grid items-center gap-10 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:grid-cols-2 lg:gap-16 lg:pt-28 lg:pb-14">
          <div className="max-w-xl">
            {eyebrow ? <Eyebrow light>{eyebrow}</Eyebrow> : null}
            <h1 className="text-4xl leading-[1.05] font-light tracking-[-0.02em] text-balance sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white text-pretty sm:text-xl">{lead}</p>
            {price ? (
              <p className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-3xl font-light tracking-[-0.02em] tabular-nums sm:text-4xl">{price}</span>
                {priceNote ? <span className="text-[15px] text-white">{priceNote}</span> : null}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              {cta}
              <Link href="/cena" className="text-[15px] font-semibold text-white underline decoration-white/50 underline-offset-[6px] hover:decoration-white">
                Celý ceník
              </Link>
            </div>
          </div>
          <div className="min-w-0">{visual}</div>
        </Container>
      </section>
      <FactStrip facts={facts} />
    </div>
  );
}
