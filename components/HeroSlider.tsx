"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Img } from "@/components/Img";
import { Button, Container, Divider } from "@/components/ui";

export type Slide = {
  image: string;
  title: string;
  text: string;
  cta?: { href: string; label: string };
};

const INTERVAL = 7000;

/** Úvodní slider se třemi slidy – stejná logika jako na původním webu, bez knihovny. */
export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section
      className="relative isolate min-h-svh overflow-hidden bg-ink text-white"
      aria-roledescription="carousel"
    >
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Img k={s.image} alt="" fill priority={i === 0} sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-ink/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/60" />
        </div>
      ))}

      <Container className="relative flex min-h-svh flex-col items-center justify-center pb-24 pt-28 text-center">
        {slides.map((s, i) => (
          <SlideContent key={s.title} active={i === index}>
            <h1 className="text-4xl font-semibold uppercase tracking-tight sm:text-6xl lg:text-7xl">
              {s.title}
            </h1>
            <Divider align="center" light className="mt-6" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white text-pretty sm:text-xl">
              {s.text}
            </p>
            {s.cta ? (
              <div className="mt-8">
                <Button href={s.cta.href} variant="light">
                  {s.cta.label}
                </Button>
              </div>
            ) : null}
          </SlideContent>
        ))}
      </Container>

      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Slide ${i + 1}: ${s.title}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </section>
  );
}

function SlideContent({ active, children }: { active: boolean; children: ReactNode }) {
  return (
    <div
      className={`col-start-1 row-start-1 w-full transition-opacity duration-700 ${
        active ? "relative opacity-100" : "pointer-events-none absolute inset-x-0 opacity-0"
      }`}
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}
