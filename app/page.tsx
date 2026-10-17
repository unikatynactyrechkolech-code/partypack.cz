import type { Metadata } from "next";
import { Img } from "@/components/Img";
import { Button, Container, Heading, Lead, Section } from "@/components/ui";
import { CardLink, ContactSection, ImageGrid, Partners, Stats } from "@/components/sections";
import { homeGallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Partypack - Ta nejlepší zábava na akce",
  description: "Fotokoutek, virtuální realita a další služby do jednoho Partypacku!",
  alternates: { canonical: "/" },
};

const services = [
  { href: "/fotokoutek", title: "Fotobudka | GIFy", image: "2022/01/43531135_2220002654881285_3040242971850047488_n" },
  { href: "/hostesky", title: "Hostesky | Modelky", image: "2023/05/2023-04-25_PIANA_DO_SKOL_photo-adam-costey-copyright-adam-costey.com-015" },
  { href: "/ai-fotokoutek", title: "Fotokoutek s AI", image: "2024/04/819a14bd-a2ed-44ee-9e42-29a22cbe3d57" },
  { href: "/partyspin360", title: "360° Partyspin", image: "2023/02/Partyspin-2-promo-foto-scaled" },
  { href: "/ai-draw-bot", title: "AI Draw Bot", image: "2025/03/DMB1" },
  { href: "/dalsisluzby", title: "Další služby", image: "2024/04/Partypack-35" },
];

const highlights = [
  "Příjemné zpestření vašich akcí",
  "Výhodná cena zajištěním balíčku",
  "Svatby, firemní akce, plesy, narozky",
  "Nejkrásnější hostesky široko daleko",
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-svh overflow-hidden bg-ink text-white">
        <Img
          k="2023/07/MiaGebauer-302"
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
            <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              PARTYPACK
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/85 text-pretty sm:text-2xl">
              … balíček služeb na vaše akce, který promění každý event v nezapomenutelný zážitek.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/kontakt" variant="light">
                Napište nám
              </Button>
              <Button href="/cena" variant="outline">
                Cena
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-2xl">
            <Heading>Co dokážeme zajistit?</Heading>
            <Lead className="mt-4">… sestavte si svůj balíček! Pro vás zajišťujeme již 7 let.</Lead>
          </div>
          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.href}>
                <CardLink href={s.href} image={s.image} title={s.title} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Stats
        image="2022/01/33103039_1018111845036421_263485012270120960_n"
        items={[
          { value: "10", label: "let na trhu" },
          { value: "3750", label: "úspěšných akcí" },
          { value: "702380", label: "úsměvů" },
          { value: "2188", label: "spokojených klientů" },
        ]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-soft lg:aspect-auto lg:min-h-[560px]">
              <Img
                k="2024/04/Partypack-specialni-Pozadi-31"
                alt="Fotokoutek Partysnap"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <Heading>
                … alias nejlepší fotokoutek široko daleko, který za vámi dorazí klidně na druhý konec světa!
              </Heading>
              <div className="mt-8">
                <Button href="/fotokoutek">Více info</Button>
              </div>

              <div className="mt-14 border-t border-line pt-10">
                <Heading as="h3">Milujeme naší práci</Heading>
                <Lead className="mt-4">
                  … proto do toho dáváme srdce a je to znát! Na trhu jsme již pěknou řadu let a nyní nás
                  můžete najít jako balíček služeb Partypack.
                </Lead>
                <p className="mt-4 leading-relaxed text-ink-soft text-pretty">
                  Specializujeme se na jedinečné zážitky, které oživí každý event, konferenci, firemní
                  večírek, narozeniny či svatbu. S námi můžete počítat s profesionálním přístupem,
                  moderním vybavením a službami, které zaručeně potěší vaše hosty. Děláme vše pro to, aby
                  vaše událost byla nezapomenutelná!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Partners />

      <Section>
        <Container>
          <ImageGrid
            images={homeGallery}
            alt="Partypack na akci"
            cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
            aspect="aspect-[3/4]"
          />
          <ul className="mt-14 grid gap-6 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <li key={h} className="text-lg font-medium tracking-tight text-ink">
                {h}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <ContactSection
        lead="… Vaší představu o plánovaném eventu, svatbě, (maturitním) plese, nebo konferenci a my se už postaráme o zbytek! Naše služby zajistíme taky na dětské dny, koncerty, narozeniny nebo třeba babyshower!"
      />
    </>
  );
}
