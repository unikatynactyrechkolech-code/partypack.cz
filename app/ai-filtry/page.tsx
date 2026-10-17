import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Lead, Section } from "@/components/ui";
import { FilterGrid } from "@/components/FilterGrid";
import { aiFiltersSingle } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nabídka našich AI filtrů",
  description: "AI filtry pro 1 osobu. Vyberte až 8 filtrů z naší nabídky, které fungují pro muže, ženy i děti.",
  alternates: { canonical: "/ai-filtry" },
};

export default function AiFiltryPage() {
  return (
    <>
      <PageHero
        image="2024/03/IMG_2961"
        title="Nabídka našich AI filtrů"
        lead="AI filtry pro 1 osobu"
      >
        <Button href="/skupinove-ai-filtry" variant="light">Skupinové AI filtry</Button>
        <Button href="/kontakt" variant="outline">Napište nám</Button>
      </PageHero>
      <Section>
        <Container>
          <Lead className="max-w-3xl">
            Prosíme o výběr až 8 filtrů z naší nabídky, které fungují pro 1 osobu. Všechny filtry fungují jak
            pro muže, tak pro ženu i dítě.
          </Lead>
          <div className="mt-12">
            <FilterGrid items={aiFiltersSingle} />
          </div>
        </Container>
      </Section>
    </>
  );
}
