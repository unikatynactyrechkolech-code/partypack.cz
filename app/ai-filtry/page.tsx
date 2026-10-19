import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { FilterGrid } from "@/components/FilterGrid";
import { aiFiltersSingle } from "@/lib/data";

export const metadata: Metadata = pageMetadata(seo.aiFiltry);

export default function AiFiltryPage() {
  return (
    <>
      <PageHero
        image="2024/03/IMG_2961"
        title="AI filtry pro jednotlivce"
        lead="Nabídka našich AI filtrů do fotokoutku pro 1 osobu"
      >
        <Button href="/skupinove-ai-filtry" variant="light">Skupinové AI filtry</Button>
        <Button href="/kontakt" variant="outline">Napište nám</Button>
      </PageHero>
      <Section>
        <Container>
          <SectionTitle
            title="Vyberte až 8 AI filtrů pro svou akci"
            subtitle="Prosíme o výběr až 8 filtrů z naší nabídky, které fungují pro 1 osobu. Všechny filtry fungují jak pro muže, tak pro ženu i dítě."
          />
          <div className="mt-12">
            <FilterGrid items={aiFiltersSingle} />
          </div>
        </Container>
      </Section>
    </>
  );
}
