"use client";

import { useEffect, useState } from "react";
import { Img } from "@/components/Img";
import { Button, Container, Divider } from "@/components/ui";

export type Slide = {
  image: string;
  title: string;
  text: string;
  cta?: { href: string; label: string };
};

const INTERVAL = 7000;

/**
 * Úvodní slider se třemi slidy jako na původním webu.
 * Jen první slide nese H1 (název + podtitul), ostatní jsou běžné odstavce,
 * aby stránka měla právě jeden hlavní nadpis.
 */
export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const titleCls = "block text-4xl font-semibold uppercase tracking-tight sm:text-6xl lg:text-7xl";
  const textCls = "mx-auto mt-6 block max-w-2xl text-lg font-normal normal-case leading-relaxed tracking-normal text-white text-pretty sm:text-xl";

  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-ink text-white" aria-roledescription="carousel">
      {slides.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        >
          <Img k={s.image} alt="" fill priority={i === 0} sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-ink/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/60" />
        </div>
      ))}

      <Container className="relative grid min-h-svh place-items-center pb-24 pt-28 text-center">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div
              key={s.title}
              inert={!active}
              className={`col-start-1 row-start-1 w-full transition-opacity duration-700 ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {i === 0 ? (
                <h1>
                  <span className={titleCls}>{s.title}</span>
                  <span className="sr-only"> – </span>
                  <Divider align="center" light className="mt-6" />
                  <span className={textCls}>{s.text}</span>
                </h1>
              ) : (
                <>
                  <p className={titleCls}>{s.title}</p>
                  <Divider align="center" light className="mt-6" />
                  <p className={textCls}>{s.text}</p>
                </>
              )}
              {s.cta ? (
                <div className="mt-8">
                  <Button href={s.cta.href} variant="light">
                    {s.cta.label}
                  </Button>
                </div>
              ) : null}
            </div>
          );
        })}
      </Container>

      <div className="absolute inset-x-0 bottom-8 flex justify-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"}`}
            aria-label={`Slide ${i + 1}: ${s.title}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </section>
  );
}
