import type { ReactNode } from "react";
import Link from "next/link";
import { Img } from "@/components/Img";
import { ContactForm } from "@/components/ContactForm";
import { Container, Heading, Prose, Section, SectionTitle } from "@/components/ui";
import { partners, type Partner } from "@/lib/data";
import { CountUp } from "@/components/home/CountUp";

// Modrá záře z barev loga v tmavých sekcích. Každá sekce ji má jinde, jinak velkou a jinak silnou,
// aby nepůsobila jako opakovaný vzor.
const GLOWS = {
  events:
    "radial-gradient(34% 48% at 78% 14%, rgb(0 177 255 / 0.17), transparent 70%), radial-gradient(22% 30% at 12% 82%, rgb(0 212 243 / 0.09), transparent 70%)",
  // Záře u poptávky dozní před spodním okrajem, aby navazovala na patičku bez viditelné hrany.
  contact:
    "radial-gradient(44% 30% at 26% 62%, rgb(58 125 255 / 0.19), transparent 72%), radial-gradient(20% 24% at 91% 12%, rgb(0 177 255 / 0.11), transparent 70%), radial-gradient(14% 16% at 64% 36%, rgb(0 212 243 / 0.05), transparent 70%)",
  footer: "radial-gradient(26% 60% at 95% 72%, rgb(0 177 255 / 0.11), transparent 70%)",
} as const;

// Záře podle čísla: dvě až tři skvrny v barvách loga, pokaždé jinde a jinak velké.
// Deterministický generátor, takže server i prohlížeč vykreslí totéž.
function seededGlow(seed: number) {
  let a = seed >>> 0;
  const rnd = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const colors = ["0 212 243", "0 177 255", "58 125 255"];
  const count = 2 + Math.floor(rnd() * 2);
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const w = Math.round(16 + rnd() * 30);
    const h = Math.round(18 + rnd() * 34);
    const x = Math.round(4 + rnd() * 92);
    const y = Math.round(rnd() * 100);
    const alpha = (i === 0 ? 0.13 + rnd() * 0.08 : 0.05 + rnd() * 0.07).toFixed(2);
    parts.push(`radial-gradient(${w}% ${h}% at ${x}% ${y}%, rgb(${colors[Math.floor(rnd() * 3)]} / ${alpha}), transparent 72%)`);
  }
  return parts.join(", ");
}

/** Sekce musí mít relative isolate overflow-hidden. Buď pojmenovaná záře, nebo `seed` pro nahodilou. */
export function Glow({ variant, seed }: { variant?: keyof typeof GLOWS; seed?: number }) {
  const background = variant ? GLOWS[variant] : seededGlow(seed ?? 1);
  return <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background }} />;
}

export function Partners({ items = partners, className = "bg-paper-soft" }: { items?: Partner[]; className?: string }) {
  return (
    <Section className={className}>
      <Container>
        <ul className="mx-auto grid max-w-5xl grid-cols-3 items-center gap-x-6 gap-y-8 sm:grid-cols-4 md:grid-cols-6 lg:gap-x-10">
          {items.map((p) => (
            <li key={p.img} className="flex items-center justify-center">
              <Img
                k={p.img}
                alt={p.name}
                sizes="120px"
                className="h-auto w-full max-w-[110px] object-contain"
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function ContactSection({
  title = "Poptávka fotokoutku, hostesek a dalších služeb",
  lead,
}: {
  title?: string;
  lead?: ReactNode;
}) {
  return (
    <Section id="kontakt" className="relative isolate overflow-hidden bg-ink text-white">
      <Glow variant="contact" />
      <Container>
        <SectionTitle title={title} subtitle={lead} light />
        <div className="mx-auto mt-12 max-w-3xl rounded-lg bg-white p-6 text-ink sm:p-10">
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}

export function Stats({
  items,
  image,
  position = "object-center",
  animate = false,
}: {
  items: { value: string; label: string }[];
  image?: string;
  /** Zarovnání fotky v pásu, třeba object-[center_20%], aby byla vidět hlava. */
  position?: string;
  /** Čísla se při zobrazení natočí od nuly (hlavní stránka). */
  animate?: boolean;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {image ? (
        <>
          <Img k={image} alt="" fill sizes="100vw" quality={85} className={`object-cover ${position}`} />
          <div className="absolute inset-0 bg-ink/55" />
        </>
      ) : null}
      <Container className="relative py-20 sm:py-28">
        <dl className="grid grid-cols-2 gap-10 text-center md:grid-cols-4">
          {items.map((s) => (
            <div key={s.label}>
              <dd className="text-5xl font-light tracking-[-0.02em] sm:text-6xl">
                {animate && /^\d+$/.test(s.value) ? <CountUp value={Number(s.value)} /> : s.value}
              </dd>
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
      <h2 className="absolute inset-x-0 bottom-0 p-5 text-center text-base font-medium text-white sm:text-lg">
        {title}
      </h2>
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

export type SplitRow = {
  title: ReactNode;
  price?: ReactNode;
  image: string;
  children: ReactNode;
};

/** Střídavé řádky text / fotka přes celou šířku – ceník a „Co vše je obsaženo“ na původním webu. */
export function SplitRows({ rows, headingAs = "h3" }: { rows: SplitRow[]; headingAs?: "h2" | "h3" }) {
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
                <Heading as={headingAs} className="text-2xl sm:text-3xl">
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
        <h2 className="max-w-3xl text-xl font-extrabold uppercase tracking-[0.2em] text-balance sm:text-2xl">
          {title}
        </h2>
        {children ? <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div> : null}
      </Container>
    </section>
  );
}
