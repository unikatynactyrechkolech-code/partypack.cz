import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { FilterGrid } from "@/components/FilterGrid";
import { aiFiltersGroup } from "@/lib/data";

export const metadata: Metadata = pageMetadata(seo.skupinoveAiFiltry);

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
          <SectionTitle title="AI filtry pro skupiny 2–8 osob" />
          <div className="mt-12">
            <FilterGrid items={aiFiltersGroup} />
          </div>
        </Container>
      </Section>
    </>
  );
}
