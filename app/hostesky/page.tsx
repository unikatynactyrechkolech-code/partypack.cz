import type { Metadata } from "next";
import { Img } from "@/components/Img";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Section, SectionTitle, TextLink } from "@/components/ui";
import { CtaBand, DarkBand, Steps } from "@/components/sections";
import { hosteskyGrid } from "@/lib/data";
import { site } from "@/lib/site";

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
      <PageHero image="2023/09/adamcostey-4" title="Naše hostesky budou nejkrásnější ozdobou na každé vaší akci!">
        <Button href="/kontakt" variant="light">Objednat</Button>
      </PageHero>

      <Section>
        <Container>
          <SectionTitle title="Zajistíme pro vás" />
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {offer.map((o) => (
              <li key={o.title} className="relative aspect-[3/4] overflow-hidden rounded-md bg-ink">
                <Img k={o.image} alt={o.title} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <h3 className="absolute inset-x-0 bottom-0 p-5 text-center text-lg font-medium text-white">{o.title}</h3>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <DarkBand image="2024/02/1942">
        <SectionTitle title="Jak to u nás funguje?" light />
        <div className="mx-auto mt-8 max-w-3xl space-y-4 text-center leading-relaxed text-white text-pretty">
          <p>
            Hostesky na akce vybíráme vždy na míru dle požadavků a představ klienta. Naše velká databáze
            slečen dokáže pozvednout jakýkoli event. Od firemní konference přes luxusní event až po hostesky
            či promotéry na veletrhu. Není problém zajistit po celou dobu naší supervizi, která se stará nejen
            o pohodlí hostesek, ale především o to, aby bylo vše v pořádku a nemuseli jste mít na akci žádné
            starosti.
          </p>
          <p>
            Samozřejmostí je pro nás též zajištění specifického dress codu, úpravy vlasů, líčení holek a
            dalších požadavků.
          </p>
          <p className="text-lg font-medium text-white">
            Fundus našeho oblečení naleznete{" "}
            <a
              href="https://www.canva.com/design/DAF-R99nqG4/kcEjzVnX2IUYYvne-RnKQA/view?utm_content=DAF-R99nqG4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1f1322e84c"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              ZDE
            </a>{" "}
            (
            <a
              href="https://partypack.cz/wp-content/uploads/2024/03/Nabidka-obleceni-hostesky.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              PDF
            </a>
            )
          </p>
        </div>
        <div className="mt-14">
          <Steps items={steps} light />
        </div>
      </DarkBand>

      <Section>
        <Container>
          <div className="flex items-center justify-between gap-6">
            <TextLink href={site.instagram} external>
              {site.instagramHandle}
            </TextLink>
            <Button href={site.instagram} variant="secondary" external>
              Instagram
            </Button>
          </div>
          <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-12 sm:gap-3">
            {hosteskyGrid.map((k) => (
              <li key={k} className="relative aspect-square overflow-hidden rounded-md bg-paper-soft">
                <Img k={k} alt="Hostesky Partypack" fill sizes="(min-width: 1024px) 8vw, (min-width: 640px) 16vw, 33vw" className="object-cover" />
              </li>
            ))}
          </ul>
          <p className="mt-14 text-center text-base font-semibold uppercase tracking-[0.2em] text-ink">
            A nechte svou akci zazářit
          </p>
        </Container>
      </Section>

      <CtaBand image="2024/02/1902" title="Objednejte si svou první akci s námi!">
        <Button href="/kontakt" variant="outline">Objednat</Button>
      </CtaBand>
    </>
  );
}
