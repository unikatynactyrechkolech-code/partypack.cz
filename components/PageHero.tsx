import type { ReactNode } from "react";
import { Img } from "@/components/Img";
import { Container, Heading } from "@/components/ui";

export function PageHero({
  image,
  title,
  lead,
  children,
}: {
  image: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-ink text-white">
      <Img
        k={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
      <Container className="relative flex min-h-svh flex-col justify-end pb-16 pt-32 sm:pb-24">
        <div className="max-w-3xl">
          <Heading as="h1" className="text-white">
            {title}
          </Heading>
          {lead ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 text-pretty">
              {lead}
            </p>
          ) : null}
          {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
        </div>
      </Container>
    </section>
  );
}
