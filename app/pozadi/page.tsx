import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Container, Heading, Lead, Prose, Section, TextLink } from "@/components/ui";
import { CardLink, ContactSection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Partypack - Nabídka pozadí",
  description: "Naše nabídka pozadí obsahuje 3 sekce: speciální pozadí, tištěná pozadí a klíčovací greenscreen. Plus AI filtry pro jednotlivce i skupinky.",
  alternates: { canonical: "/pozadi" },
};

const options = [
  { href: "/specialni-pozadi", title: "Speciální pozadí", image: "2024/02/Partypack-21-2" },
  { href: "https://partypack.cz/wp-content/uploads/2023/09/Tistena-pozadi-PDF-2.pdf", title: "Tištěná pozadí", image: "2022/10/IMG_0449", external: true },
  { href: "/kontakt", title: "Klíčovací pozadí", image: "2022/07/Partypack-58" },
  { href: "/ai-filtry", title: "AI Filtry", image: "2024/03/niky" },
];

export default function PozadiPage() {
  return (
    <>
      <PageHero
        image="2022/01/Maslikovaa"
        title="Vyberte si svého favorita"
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div>
              <Heading>Naše nabídka pozadí</Heading>
              <Lead className="mt-4">
                obsahuje 3 sekce, ze kterých si lze libovolně vybrat vašeho favorita!
              </Lead>
            </div>
            <Prose>
              <p>
                <strong className="text-ink">1. Speciální</strong> = <Link href="/specialni-pozadi">zde</Link>{" "}
                naleznete na míru vytvořené speciální kousky, které rozzáří vaší akce! Hodí se na plesy, svatby,
                narozeniny i firemní eventy.
              </p>
              <p>
                <strong className="text-ink">2. Tištěné</strong> = <Link href="/tistena-pozadi-4">V této sekci</Link>{" "}
                si můžete vybrat klasické natištěné motivy, které okoření jakoukoli akci. Zároveň máte možnost si
                nechat pozadí natisknout i úplně nové přímo na míru vaší akci:)
              </p>
              <p>
                <strong className="text-ink">3. Klíčovácí greenscreen</strong> = Na akci dovezeme velkou zelenou
                stěnu, na které dokážeme naklíčovat jakýkoli motiv. Výběr je tedy neomezený! Napište nám vaší
                představu a my vše připravíme:)
              </p>
              <p>
                <strong className="text-ink">4. AI Fotokoutek</strong>
                <br />
                A = 1 osoba = <Link href="/ai-filtry">ZDE</Link> si můžete vybrat AI filtry pro 1 osobu
                <br />
                B = skupinky = <Link href="/skupinove-ai-filtry">ZDE</Link> poté výběr AI filtrů pro skupiny až 8
                osob
              </p>
            </Prose>
          </div>

          <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {options.map((o) => (
              <li key={o.title}>
                <CardLink href={o.href} image={o.image} title={o.title} external={o.external} sizes="(min-width: 1024px) 25vw, 50vw" />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            Tištěná pozadí k prohlédnutí také na stránce{" "}
            <TextLink href="/tistena-pozadi-4">Tištěná pozadí</TextLink>.
          </p>
        </Container>
      </Section>

      <ContactSection title="Máte dotazy?" />
    </>
  );
}
