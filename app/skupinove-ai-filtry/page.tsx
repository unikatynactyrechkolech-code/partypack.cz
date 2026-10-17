import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Section } from "@/components/ui";
import { FilterGrid } from "@/components/FilterGrid";
import { aiFiltersGroup } from "@/lib/data";

export const metadata: Metadata = {
  title: "Skupinové AI filtry",
  description: "Výběr AI filtrů pro skupiny až 8 osob. Na místě lze vybírat ze všech dostupných filtrů.",
  alternates: { canonical: "/skupinove-ai-filtry" },
};

export default function SkupinoveAiFiltryPage() {
  return (
    <>
      <PageHero
        image="2025/11/uvodkqsssa"
        title="Skupinové AI filtry"
        lead="Filtry pro skupiny 2-8 osob není potřeba vybírat dopředu. Na místě lze vybírat ze všech dostupných filtrů!"
      >
        <Button href="/ai-filtry" variant="light">AI filtry pro 1 osobu</Button>
        <Button href="/kontakt" variant="outline">Napište nám</Button>
      </PageHero>
      <Section>
        <Container>
          <FilterGrid items={aiFiltersGroup} />
        </Container>
      </Section>
    </>
  );
}
