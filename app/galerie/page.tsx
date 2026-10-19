import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { CardLink } from "@/components/sections";
import { gallery } from "@/lib/data";

export const metadata: Metadata = pageMetadata(seo.galerie);

export default function GaleriePage() {
  return (
    <>
      <PageHero
        image="2024/10/038_2024-10-16-Makro-Chefs-Dinner-VIP_Full-scaled"
        title="Fotky z našich akcí"
        lead="… a kde je ta vaše?"
      >
        <Button href="https://eu.zonerama.com/Partypack" external variant="light">
          Všechny galerie na Zonerama
        </Button>
      </PageHero>
      <Section>
        <Container>
          <SectionTitle title="Poslední firemní akce, svatby a festivaly" subtitle="Fotokoutek, AI fotokoutek, Partyspin 360° a AI Draw Bot v akci. Celé galerie najdete na Zoneramě." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
