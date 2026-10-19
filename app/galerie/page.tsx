import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Section } from "@/components/ui";
import { CardLink } from "@/components/sections";
import { gallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Partypack - galerie posledních akcí",
  description: "Fotky z našich posledních akcí. Fotokoutek, Partyspin 360, AI fotokoutek a AI Draw Bot na firemních akcích, svatbách i festivalech.",
  alternates: { canonical: "/galerie" },
};

export default function GaleriePage() {
  return (
    <>
      <PageHero
        image="2024/10/038_2024-10-16-Makro-Chefs-Dinner-VIP_Full-scaled"
        title="Galerie posledních akcí"
        lead="... a kde je ta vaše?"
      >
        <Button href="https://eu.zonerama.com/Partypack" external variant="light">
          Všechny galerie na Zonerama
        </Button>
      </PageHero>
      <Section>
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((g) => (
              <li key={g.slug}>
                <CardLink
                  href={g.album ?? "/kontakt"}
                  external={Boolean(g.album)}
                  image={g.img}
                  title={g.title}
                  aspect="aspect-[3/2]"
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
