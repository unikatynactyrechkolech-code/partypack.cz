import type { Metadata } from "next";
import { Img } from "@/components/Img";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Heading, Prose, Section, TextLink } from "@/components/ui";
import { CtaBand, ImageGrid, Steps } from "@/components/sections";
import { hosteskyGrid } from "@/lib/data";

export const metadata: Metadata = {
  title: "Partypack - hostesky",
  description: "Naše hostesky budou nejkrásnější ozdobou na každé vaší akci! Hostesky, modelky, promotéři a debaras na míru.",
  alternates: { canonical: "/hostesky" },
};

const offer = [
  { title: "Hostesky", image: "2024/03/IMG_1034-scaled" },
  { title: "Modelky", image: "2024/03/3803D970-314D-4E9B-AC80-289E5A4C2318" },
  { title: "Promotéry", image: "2024/03/IMG_3216-2-scaled" },
  { title: "Debaras", image: "2024/03/IMG_1139-3-scaled" },
];

const steps = [
  { title: "Společný start", text: "Pro úspěšnou akci si od vás nejprve vyzjistíme veškeré potřebné informace pro tvorbu kalkulace na míru." },
  { title: "Předvýběr hostesek", text: "Na základě vašich požadavků vám zašleme setkarty vybraných hostesek či promotérů ke schválení." },
  { title: "Finalizace looku", text: "Před akcí připravíme návrhy dress codu, líčení a účesu pro finalizaci celého vzhledu hostesek k dokonalosti." },
  { title: "A je to!", text: "V den D zajistíme, aby na akci proběhlo vše k vaší nejvyšší spokojenosti. Ať už se supervizí přímo na místě či jen na dálku:)" },
];

export default function HosteskyPage() {
  return (
    <>
      <PageHero
        image="2023/09/adamcostey-4"
        title="Naše hostesky budou nejkrásnější ozdobou na každé vaší akci!"
      >
        <Button href="/kontakt" variant="light">Objednat</Button>
      </PageHero>

      <Section>
        <Container>
          <Heading>Zajistíme pro vás</Heading>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {offer.map((o) => (
              <li key={o.title}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-paper-soft">
                  <Img k={o.image} alt={o.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                </div>
                <h3 className="mt-3 text-base font-medium text-ink">{o.title}</h3>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="border-y border-line bg-paper-soft">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white lg:aspect-auto">
              <Img k="2024/02/1942" alt="Hostesky Partypack" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <Heading>Jak to u nás funguje?</Heading>
              <Prose className="mt-6">
                <p>
                  Hostesky na akce vybíráme vždy na míru dle požadavků a představ klienta. Naše velká databáze
                  slečen dokáže pozvednout jakýkoli event. Od firemní konference přes luxusní event až po
                  hostesky či promotéry na veletrhu. Není problém zajistit po celou dobu naší supervizi, která
                  se stará nejen o pohodlí hostesek, ale především o to, aby bylo vše v pořádku a nemuseli jste
                  mít na akci žádné starosti.
                </p>
                <p>
                  Samozřejmostí je pro nás též zajištění specifického dress codu, úpravy vlasů, líčení holek a
                  dalších požadavků.
                </p>
                <p className="font-medium text-ink">
                  Fundus našeho oblečení naleznete{" "}
                  <TextLink
                    href="https://www.canva.com/design/DAF-R99nqG4/kcEjzVnX2IUYYvne-RnKQA/view?utm_content=DAF-R99nqG4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1f1322e84c"
                    external
                  >
                    ZDE
                  </TextLink>{" "}
                  nebo v{" "}
                  <TextLink href="https://partypack.cz/wp-content/uploads/2024/03/Nabidka-obleceni-hostesky.pdf" external>
                    PDF
                  </TextLink>
                  .
                </p>
              </Prose>
            </div>
          </div>
          <div className="mt-14">
            <Steps items={steps} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading>@Partypack_cz</Heading>
            <Button href="https://www.instagram.com/partypack_cz/" variant="secondary" external>
              Instagram
            </Button>
          </div>
          <div className="mt-10">
            <ImageGrid images={hosteskyGrid} alt="Hostesky Partypack" cols="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" />
          </div>
          <p className="mt-10 text-2xl font-semibold tracking-tight text-ink">A nechte svou akci zazářit</p>
        </Container>
      </Section>

      <CtaBand image="2024/02/1902" title="Objednejte si svou první akci s námi!">
        <Button href="/kontakt" variant="light">Objednat</Button>
      </CtaBand>
    </>
  );
}
