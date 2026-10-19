import Link from "next/link";
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
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}

type Align = "left" | "center";

/** Krátká linka pod nadpisem – motiv převzatý z původního webu. */
export function Divider({
  align = "left",
  light = false,
  className = "",
}: {
  align?: Align;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`block h-px w-10 ${light ? "bg-white/60" : "bg-accent"} ${
        align === "center" ? "mx-auto" : ""
      } ${className}`}
    />
  );
}

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
  const size =
    Tag === "h1"
      ? "text-3xl sm:text-5xl lg:text-6xl uppercase"
      : Tag === "h2"
        ? "text-2xl sm:text-3xl lg:text-4xl uppercase"
        : "text-xl sm:text-2xl";
  return (
    <Tag
      className={`font-semibold tracking-tight text-ink text-balance ${size} ${
        align === "center" ? "text-center" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Nadpis sekce ve stylu původního webu: nadpis, linka, podtitulek. */
export function SectionTitle({
  title,
  subtitle,
  align = "center",
  as = "h2",
  light = false,
  className = "",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: Align;
  as?: "h1" | "h2" | "h3";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      <Heading as={as} align={align} className={light ? "text-white" : ""}>
        {title}
      </Heading>
      <Divider align={align} light={light} className="mt-5" />
      {subtitle ? (
        <p
          className={`mt-5 text-lg leading-relaxed text-pretty ${
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
  className?: string;
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
  const styles = {
    primary: "bg-ink text-white hover:bg-zinc-800",
    secondary: "border border-line bg-white text-ink hover:border-ink",
    light: "bg-white text-ink hover:bg-zinc-100",
    outline: "border border-white/50 bg-transparent text-white hover:border-white hover:bg-white/10",
  }[variant];
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles} ${className}`}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
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
