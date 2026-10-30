import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

type Align = "left" | "center";


export function Heading({
  children,
  as: Tag = "h2",
  align = "left",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: Align;
  className?: string;
}) {
  // Klidná verze: velké nadpisy tenkým písmem, jako na webu, který se klientce líbí.
  const size =
    Tag === "h1"
      ? "text-4xl leading-[1.05] sm:text-6xl lg:text-7xl"
      : Tag === "h2"
        ? "text-3xl leading-[1.1] sm:text-4xl lg:text-5xl"
        : "text-xl sm:text-2xl";
  return (
    <Tag
      className={`${Tag === "h3" ? "font-medium tracking-[-0.01em]" : "font-light tracking-[-0.02em]"} text-ink text-balance ${size} ${
        align === "center" ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Štítek nad nadpisem: malé prostrkané verzálky. */
export function Eyebrow({ children, light = false, className = "" }: { children: ReactNode; light?: boolean; className?: string }) {
  return <p className={`mb-5 text-xs font-semibold uppercase tracking-[0.22em] ${light ? "text-white" : "text-ink"} ${className}`}>{children}</p>;
}

/** Nadpis sekce: štítek, nadpis, podtitulek. */
export function SectionTitle({
  title,
  subtitle,
  eyebrow,
  align = "center",
  as = "h2",
  light = false,
  className = "",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  /** Malý prostrkaný štítek nad nadpisem („Naše služby“). */
  eyebrow?: string;
  align?: Align;
  as?: "h1" | "h2" | "h3";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {eyebrow ? <Eyebrow light={light}>{eyebrow}</Eyebrow> : null}
      <Heading as={as} align={align} className={light ? "text-white" : ""}>
        {title}
      </Heading>
      {subtitle ? (
        <p
          className={`mt-6 text-lg font-light leading-relaxed text-pretty sm:text-xl ${
            light ? "text-white" : "text-ink"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function Lead({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-lg leading-relaxed text-ink text-pretty ${className}`}>
      {children}
    </p>
  );
}

export function Prose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`space-y-4 text-base leading-relaxed text-ink text-pretty [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-ink [&_a]:text-ink [&_strong]:text-ink ${className}`}
    >
      {children}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "outline";
  /** lg = velké tlačítko v úvodu stránky. */
  size?: "md" | "lg";
  /** Šipka doprava za textem. */
  arrow?: boolean;
  className?: string;
  external?: boolean;
};

/**
 * Tlačítka jsou pilulky v barvách první verze webu (ta se klientce líbí nejvíc):
 * černé s bílým textem, bílé na tmavém pozadí, obrysové bílé na fotce a obrysové černé na bílé.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  external,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
  const sizes = { md: "px-6 py-2.5 text-[16px]", lg: "px-8 py-4 text-[18px]" }[size];
  const styles = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "border-2 border-ink bg-white text-ink hover:bg-gray-50",
    light: "bg-white text-ink hover:bg-gray-100",
    outline: "border-2 border-white/50 bg-transparent text-white hover:border-white hover:bg-white/10",
  }[variant];
  const cls = `${base} ${sizes} ${styles} ${className}`;
  const inner = (
    <>
      {children}
      {arrow ? <ArrowRightIcon className={size === "lg" ? "h-5 w-5" : "h-4 w-4"} /> : null}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const cls =
    "font-medium text-ink underline underline-offset-4 decoration-ink";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
