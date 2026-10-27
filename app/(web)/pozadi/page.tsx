import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Img } from "@/components/Img";
import { Container, Heading, Prose, Section, SectionTitle } from "@/components/ui";
import { CardLink } from "@/components/sections";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata(seo.pozadi);

const options = [
  { href: "/specialni-pozadi", title: "Speciální pozadí", image: "2024/02/Partypack-21-2" },
  { href: "/tistena-pozadi-4", title: "Tištěná pozadí", image: "2022/10/IMG_0449" },
  { href: "/kontakt", title: "Klíčovací pozadí", image: "2022/07/Partypack-58" },
  { href: "/ai-filtry", title: "AI Filtry", image: "2024/03/niky" },
];

export default function PozadiPage() {
  return (
    <>
      <PageHero image="2022/01/Maslikovaa" title="Pozadí do fotokoutku" lead="Vyberte si svého favorita" />

      <Section>
        <Container>
          <SectionTitle
            title="Speciální, tištěná a klíčovací pozadí"
            subtitle="Naše nabídka pozadí obsahuje 3 sekce, ze kterých si lze libovolně vybrat vašeho favorita!"
          />
          <Prose className="mx-auto mt-8 max-w-3xl text-center">
            <p>
              <strong>1. Speciální</strong> = <Link href="/specialni-pozadi">zde</Link> naleznete na míru
              vytvořené speciální kousky, které rozzáří vaší akce! Hodí se na plesy, svatby, narozeniny i
              firemní eventy.
            </p>
            <p>
              <strong>2. Tištěné</strong> = <Link href="/tistena-pozadi-4">V této sekci</Link> si můžete
              vybrat klasické natištěné motivy, které okoření jakoukoli akci. Zároveň máte možnost si nechat
              pozadí natisknout i úplně nové přímo na míru vaší akci:)
            </p>
            <p>
              <strong>3. Klíčovácí greenscreen</strong> = Na akci dovezeme velkou zelenou stěnu, na které
              dokážeme naklíčovat jakýkoli motiv. Výběr je tedy neomezený! Napište nám vaší představu a my
              vše připravíme:)
            </p>
            <p>
              <strong>4. AI Fotokoutek</strong>
              <br />
              A = 1 osoba = <Link href="/ai-filtry">ZDE</Link> si můžete vybrat AI filtry pro 1 osobu
              <br />
              B = skupinky = <Link href="/skupinove-ai-filtry">ZDE</Link> poté výběr AI filtrů pro skupiny až
              10 osob
            </p>
          </Prose>

          <ul className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {options.map((o) => (
              <li key={o.title}>
                <CardLink href={o.href} image={o.image} title={o.title} sizes="(min-width: 1024px) 25vw, 50vw" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <section className="relative isolate overflow-hidden bg-ink">
        <Img k="2024/04/Pozadi-Special-45" alt="" fill sizes="100vw" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-ink/40" />
        <Container className="relative py-16 sm:py-24">
          <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 sm:p-10">
            <Heading as="h2" className="text-2xl! tracking-wide!">Máte dotazy k pozadí?</Heading>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 text-center text-sm text-white sm:grid-cols-3">
            <li><a href={site.phoneHref} className="hover:underline">{site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></li>
            <li>{site.address}</li>
          </ul>
        </Container>
      </section>
    </>
  );
}
