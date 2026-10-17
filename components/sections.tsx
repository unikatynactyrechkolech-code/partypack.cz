import type { ReactNode } from "react";
import Link from "next/link";
import { Img } from "@/components/Img";
import { ContactForm } from "@/components/ContactForm";
import { Container, Heading, Section } from "@/components/ui";
import { partners, type Partner } from "@/lib/data";

export function Partners({ items = partners }: { items?: Partner[] }) {
  return (
    <Section className="border-y border-line bg-paper-soft py-12 sm:py-16">
      <Container>
        <ul className="grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {items.map((p) => (
            <li key={p.img} className="flex items-center justify-center">
              <Img
                k={p.img}
                alt={p.name}
                sizes="(min-width: 1024px) 140px, 25vw"
                className="h-10 w-auto max-w-[120px] object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
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
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <Heading>{title}</Heading>
            {lead ? (
              <p className="mt-5 text-lg leading-relaxed text-ink-soft text-pretty">{lead}</p>
            ) : null}
          </div>
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
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
      <Container className="relative py-16 sm:py-20">
        <dl className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {items.map((s) => (
            <div key={s.label}>
              <dd className="text-4xl font-semibold tracking-tight sm:text-5xl">{s.value}</dd>
              <dt className="mt-2 text-sm text-white/70">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function CardLink({
  href,
  image,
  title,
  external,
  aspect = "aspect-[4/5]",
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
    <>
      <div className={`relative ${aspect} overflow-hidden rounded-xl bg-paper-soft`}>
        <Img
          k={image}
          alt={title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="mt-3 text-base font-medium text-ink">{title}</h3>
    </>
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
          className={`relative ${aspect} overflow-hidden rounded-xl bg-paper-soft ${
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

export function FeatureList({
  items,
}: {
  items: { title: string; text: ReactNode; image?: string }[];
}) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <li key={f.title} className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white">
          {f.image ? (
            <div className="relative aspect-[3/2] bg-paper-soft">
              <Img
                k={f.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="p-6">
            <h3 className="text-lg font-semibold tracking-tight text-ink">{f.title}</h3>
            <div className="mt-2 text-sm leading-relaxed text-ink-soft text-pretty [&_a]:underline [&_a]:underline-offset-4">
              {f.text}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Steps({
  items,
}: {
  items: { title: string; text: ReactNode }[];
}) {
  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s, i) => (
        <li key={s.title} className="rounded-2xl border border-line bg-white p-6">
          <span className="text-xs font-semibold tracking-[0.2em] text-muted">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft text-pretty">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

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
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-ink/30" />
      <Container className="relative py-20 sm:py-28">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
