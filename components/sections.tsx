import type { ReactNode } from "react";
import Link from "next/link";
import { Img } from "@/components/Img";
import { ContactForm } from "@/components/ContactForm";
import { Container, Heading, Prose, Section, SectionTitle } from "@/components/ui";
import { partners, type Partner } from "@/lib/data";

export function Partners({ items = partners }: { items?: Partner[] }) {
  return (
    <Section className="bg-paper-soft">
      <Container>
        <ul className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-y-14">
          {items.map((p) => (
            <li key={p.img} className="flex items-center justify-center">
              <Img
                k={p.img}
                alt={p.name}
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
                className="h-auto w-full max-w-[260px] object-contain"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function ContactSection({
  title = "Napište nám",
  lead,
}: {
  title?: string;
  lead?: ReactNode;
}) {
  return (
    <Section id="kontakt" className="bg-paper-soft">
      <Container>
        <SectionTitle title={title} subtitle={lead} />
        <div className="mx-auto mt-12 max-w-3xl rounded-lg border border-line bg-white p-6 sm:p-10">
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}

export function Stats({
  items,
  image,
}: {
  items: { value: string; label: string }[];
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {image ? (
        <>
          <Img k={image} alt="" fill sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-ink/50" />
        </>
      ) : null}
      <Container className="relative py-20 sm:py-28">
        <dl className="grid grid-cols-2 gap-10 text-center md:grid-cols-4">
          {items.map((s) => (
            <div key={s.label}>
              <dd className="text-4xl font-semibold tracking-tight sm:text-5xl">{s.value}</dd>
              <dt className="mt-2 text-sm text-white">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/** Karta s názvem přes fotku – stejně jako karty služeb na původním webu. */
export function CardLink({
  href,
  image,
  title,
  external,
  aspect = "aspect-[3/4]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  href: string;
  image: string;
  title: string;
  external?: boolean;
  aspect?: string;
  sizes?: string;
}) {
  const inner = (
    <div className={`relative ${aspect} overflow-hidden rounded-md bg-ink`}>
      <Img
        k={image}
        alt={title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
      <h3 className="absolute inset-x-0 bottom-0 p-5 text-center text-base font-medium text-white sm:text-lg">
        {title}
      </h3>
    </div>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="group block">
      {inner}
    </Link>
  );
}

export function ImageGrid({
  images,
  alt = "",
  cols = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  aspect = "aspect-square",
  featureFirst = false,
}: {
  images: string[];
  alt?: string;
  cols?: string;
  aspect?: string;
  featureFirst?: boolean;
}) {
  return (
    <ul className={`grid gap-3 sm:gap-4 ${cols}`}>
      {images.map((k, i) => (
        <li
          key={k}
          className={`relative ${aspect} overflow-hidden rounded-md bg-paper-soft ${
            featureFirst && i === 0 ? "col-span-2 aspect-[3/2]" : ""
          }`}
        >
          <Img
            k={k}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        </li>
      ))}
    </ul>
  );
}

export type CheckerItem = { title: ReactNode; text: ReactNode; image: string };

/**
 * Šachovnice text / fotka ve třech sloupcích – rozvržení výhod a dalších služeb
 * z původního webu. Fotka vždy sousedí se svým textem.
 */
export function Checkerboard({ items }: { items: CheckerItem[] }) {
  const cells: ReactNode[] = [];
  let t = 0;
  let p = 0;
  const total = items.length * 2;
  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const isText = (row + col) % 2 === 0;
    if (isText && t < items.length) {
      const it = items[t++];
      cells.push(
        <div key={`t${i}`} className="flex min-h-[260px] flex-col items-center justify-center px-6 py-12 text-center sm:min-h-[320px] lg:min-h-[400px]">
          <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">{it.title}</h3>
          <div className="mt-4 max-w-sm text-sm leading-relaxed text-ink text-pretty [&_a]:underline [&_a]:underline-offset-4">
            {it.text}
          </div>
        </div>,
      );
    } else if (!isText && p < items.length) {
      const it = items[p++];
      cells.push(
        <div key={`p${i}`} className="relative min-h-[260px] sm:min-h-[320px] lg:min-h-[400px]">
          <Img k={it.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        </div>,
      );
    }
  }
  return <div className="grid grid-cols-1 sm:grid-cols-3">{cells}</div>;
}

export type SplitRow = {
  title: ReactNode;
  price?: ReactNode;
  image: string;
  children: ReactNode;
};

/** Střídavé řádky text / fotka přes celou šířku – ceník a „Co vše je obsaženo“ na původním webu. */
export function SplitRows({ rows }: { rows: SplitRow[] }) {
  return (
    <div>
      {rows.map((r, i) => {
        const reverse = i % 2 === 1;
        return (
          <div key={i} className="grid lg:grid-cols-2">
            <div className={`relative min-h-[320px] lg:min-h-[520px] ${reverse ? "lg:order-last" : ""}`}>
              <Img k={r.image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center px-5 py-14 sm:px-12 lg:px-16 lg:py-20">
              <div className="max-w-xl">
                <Heading as="h3" className="text-2xl sm:text-3xl">
                  {r.title}
                </Heading>
                {r.price ? <p className="mt-3 text-xl font-medium text-ink">{r.price}</p> : null}
                <Prose className="mt-5">{r.children}</Prose>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Steps({
  items,
  light = false,
}: {
  items: { title: string; text: ReactNode }[];
  light?: boolean;
}) {
  return (
    <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <li key={s.title}>
          <span className={`text-sm font-semibold ${light ? "text-white" : "text-ink"}`}>
            {i + 1}.
          </span>
          <span aria-hidden className={`mt-3 block h-px w-10 ${light ? "bg-white/40" : "bg-line"}`} />
          <h3 className={`mt-4 text-lg font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>
            {s.title}
          </h3>
          <p className={`mt-2 text-sm leading-relaxed text-pretty ${light ? "text-white" : "text-ink"}`}>
            {s.text}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Tmavý pás na fotce s centrovaným nadpisem a tlačítkem. */
export function CtaBand({
  image,
  title,
  children,
}: {
  image: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Img k={image} alt="" fill sizes="100vw" className="object-cover opacity-50" />
      <div className="absolute inset-0 bg-ink/50" />
      <Container className="relative flex flex-col items-center py-24 text-center sm:py-32">
        <h2 className="max-w-3xl text-xl font-semibold uppercase tracking-[0.2em] text-balance sm:text-2xl">
          {title}
        </h2>
        {children ? <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div> : null}
      </Container>
    </section>
  );
}

/** Tmavý pás na fotce s libovolným obsahem (statistiky, kroky, výroky). */
export function DarkBand({
  image,
  children,
  className = "",
}: {
  image: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative isolate overflow-hidden bg-ink text-white ${className}`}>
      <Img k={image} alt="" fill sizes="100vw" className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-ink/55" />
      <Container className="relative py-20 sm:py-28">{children}</Container>
    </section>
  );
}
