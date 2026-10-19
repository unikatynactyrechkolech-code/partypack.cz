import type { Metadata } from "next";
import { HeroSlider, type Slide } from "@/components/HeroSlider";
import { Container, Section, SectionTitle } from "@/components/ui";
import { CardLink, ContactSection, Partners, Stats } from "@/components/sections";

export const metadata: Metadata = {
  title: "Partypack - Ta nejlepší zábava na akce",
  description: "Fotokoutek, virtuální realita a další služby do jednoho Partypacku!",
  alternates: { canonical: "/" },
};

const slides: Slide[] = [
  {
    image: "2023/07/MiaGebauer-302",
    title: "Partypack",
    text: "… balíček služeb na vaše akce, který promění každý event v nezapomenutelný zážitek.",
  },
  {
    image: "2024/04/Partypack-specialni-Pozadi-31",
    title: "Partysnap",
    text: "… alias nejlepší fotokoutek široko daleko, který za vámi dorazí klidně na druhý konec světa!",
    cta: { href: "/fotokoutek", label: "Více info" },
  },
  {
    image: "2024/10/038_2024-10-16-Makro-Chefs-Dinner-VIP_Full-scaled",
    title: "Akce bez starostí",
    text: "… pro vás zajišťujeme již 7 let!",
  },
];

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
      <HeroSlider slides={slides} />

      <Section>
        <Container>
          <SectionTitle title="Co dokážeme zajistit?" subtitle="… sestavte si svůj balíček!" />
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-6">
            {services.map((s) => (
              <li key={s.href}>
                <CardLink
                  href={s.href}
                  image={s.image}
                  title={s.title}
                  sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 33vw, 50vw"
                />
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

      <Section className="bg-paper-soft">
        <Container>
          <SectionTitle
            title="Milujeme naší práci"
            subtitle="… proto do toho dáváme srdce a je to znát! Na trhu jsme již pěknou řadu let a nyní nás můžete najít jako balíček služeb Partypack."
          />
          <p className="mx-auto mt-8 max-w-3xl text-center leading-relaxed text-ink text-pretty">
            Specializujeme se na jedinečné zážitky, které oživí každý event, konferenci, firemní večírek,
            narozeniny či svatbu. S námi můžete počítat s profesionálním přístupem, moderním vybavením a
            službami, které zaručeně potěší vaše hosty. Děláme vše pro to, aby vaše událost byla
            nezapomenutelná!
          </p>
        </Container>
      </Section>

      <Partners />

      <section className="border-b border-line">
        <Container>
          <ul className="grid gap-10 py-14 text-center sm:grid-cols-2 sm:py-16 lg:grid-cols-4">
            {highlights.map((h) => (
              <li key={h}>
                <span aria-hidden className="mx-auto block h-px w-8 bg-accent" />
                <p className="mt-4 text-base font-medium text-ink">{h}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactSection
        lead="… Vaší představu o plánovaném eventu, svatbě, (maturitním) plese, nebo konferenci a my se už postaráme o zbytek! Naše služby zajistíme taky na dětské dny, koncerty, narozeniny nebo třeba babyshower!"
      />
    </>
  );
}
