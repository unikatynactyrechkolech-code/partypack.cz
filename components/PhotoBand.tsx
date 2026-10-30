import type { ReactNode } from "react";
import { Img } from "@/components/Img";
import { Container, Eyebrow } from "@/components/ui";

/**
 * Fotka přes celou šířku stránky s textem uprostřed (podle webu, který se klientce líbí):
 * štítek, nadpis, věta a případně tlačítka. Používá se jako úvod sekce nebo předěl.
 */
export function PhotoBand({
  k,
  position = "object-center",
  eyebrow,
  title,
  text,
  as: Tag = "h2",
  children,
  className = "min-h-[60svh]",
}: {
  k: string;
  position?: string;
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  as?: "h1" | "h2";
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative isolate flex items-center overflow-hidden bg-ink text-white ${className}`}>
      <Img k={k} alt="" fill sizes="100vw" quality={85} className={`object-cover ${position}`} />
      <div className="absolute inset-0 bg-ink/50" />
      <Container className="relative flex flex-col items-center py-24 text-center sm:py-32">
        {eyebrow ? <Eyebrow light>{eyebrow}</Eyebrow> : null}
        <Tag className="max-w-4xl text-4xl leading-[1.05] font-light tracking-[-0.02em] text-balance sm:text-5xl lg:text-6xl">{title}</Tag>
        {text ? <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white text-pretty sm:text-xl">{text}</p> : null}
        {children ? <div className="mt-10 flex flex-wrap items-center justify-center gap-4">{children}</div> : null}
      </Container>
    </section>
  );
}
