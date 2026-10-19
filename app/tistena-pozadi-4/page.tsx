import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Heading, Section } from "@/components/ui";
import { LabeledGrid } from "@/components/LabeledGrid";
import { printedBackdrops } from "@/lib/data";

export const metadata: Metadata = pageMetadata(seo.tistenaPozadi);

export default function TistenaPozadiPage() {
  return (
    <>
      <PageHero
        image="2026/05/MiaGebauer-16"
        title="Tištěná pozadí do fotokoutku"
        lead="Tištěná pozadí různých motivů! Nechte svou akci zazářit"
      >
        <Button href="/kontakt" variant="light">Napište nám</Button>
        <Button href="https://partypack.cz/wp-content/uploads/2023/09/Tistena-pozadi-PDF-2.pdf" external variant="outline">Katalog PDF</Button>
      </PageHero>

      <Section>
        <Container>
          <Heading>Tištěná pozadí v ceně každého balíčku</Heading>
          <div className="mt-10">
            <LabeledGrid items={printedBackdrops} />
          </div>
        </Container>
      </Section>
    </>
  );
}
