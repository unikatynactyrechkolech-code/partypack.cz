import type { ReactNode } from "react";
import { Img } from "@/components/Img";
import { Container, Divider, Heading } from "@/components/ui";

export function PageHero({
  image,
  title,
  lead,
  children,
  align = "center",
  position = "object-center",
}: {
  image: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  align?: "center" | "left";
  position?: string;
}) {
  const centered = align === "center";
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-ink text-white">
      <Img k={image} alt="" fill priority sizes="100vw" className={`object-cover ${position}`} />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/60" />
      <Container
        className={`relative flex min-h-svh flex-col justify-center pb-20 pt-28 ${
          centered ? "items-center text-center" : ""
        }`}
      >
        <div className="max-w-3xl">
          <Heading as="h1" align={align} className="text-white">
            {title}
          </Heading>
          <Divider align={align} light className="mt-6" />
          {lead ? (
            <p className="mt-6 text-lg leading-relaxed text-white text-pretty sm:text-xl">
              {lead}
            </p>
          ) : null}
          {children ? (
            <div className={`mt-8 flex flex-wrap gap-3 ${centered ? "justify-center" : ""}`}>
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
