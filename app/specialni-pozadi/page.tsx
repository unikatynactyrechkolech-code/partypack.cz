import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Heading, Section } from "@/components/ui";
import { LabeledGrid } from "@/components/LabeledGrid";
import { specialIncluded, specialPaid } from "@/lib/data";

export const metadata: Metadata = {
  title: "Speciální pozadí",
  description: "Speciální pozadí vytvořená na míru vašim akcím. Pozadí v ceně každého balíčku i speciální pozadí za příplatek.",
  alternates: { canonical: "/specialni-pozadi" },
};

export default function SpecialniPozadiPage() {
  return (
    <>
      <PageHero
        image="2024/04/Partypack-17-1"
        title="Speciální pozadí"
        lead="Vytvořené na míru vašim akcím! Nechte svou akci zazářit"
      >
        <Button href="/kontakt" variant="light">Napište nám</Button>
        <Button href="/pozadi" variant="outline">Nabídka pozadí</Button>
      </PageHero>

      <Section>
        <Container>
          <Heading>Speciální pozadí za příplatek</Heading>
          <div className="mt-10">
            <LabeledGrid items={specialPaid} />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line bg-paper-soft">
        <Container>
          <Heading>Speciální pozadí v ceně každého balíčku</Heading>
          <div className="mt-10">
            <LabeledGrid items={specialIncluded} />
          </div>
        </Container>
      </Section>
    </>
  );
}
