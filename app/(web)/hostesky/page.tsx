import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { Img } from "@/components/Img";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { ContactSection, Glow } from "@/components/sections";
import { PackageBar } from "@/components/home/PackagePicker";
import { ServiceHero, type Fact } from "@/components/service/ServiceHero";
import { HeroSlides } from "@/components/service/HeroSlides";
import { WantButton } from "@/components/service/WantButton";
import { StepsShowcase } from "@/components/service/StepsShowcase";
import { PriceFaq } from "@/components/service/PriceFaq";
import { CrossSell } from "@/components/service/CrossSell";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata(seo.hostesky);

const FUNDUS_CANVA =
  "https://www.canva.com/design/DAF-R99nqG4/kcEjzVnX2IUYYvne-RnKQA/view?utm_content=DAF-R99nqG4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1f1322e84c";
const FUNDUS_PDF = "https://partypack.cz/wp-content/uploads/2024/03/Nabidka-obleceni-hostesky.pdf";

const facts: Fact[] = [
  { value: "Setkarty", label: "výběr hostesek ke schválení" },
  { value: "Dress code", label: "líčení a účes na míru" },
  { value: "Supervize", label: "po celou dobu akce" },
  { value: "24/7", label: "koordinátorka k dispozici" },
];

const roles = [
  { title: "Hostesky", image: "2024/03/IMG_1034-scaled" },
  { title: "Modelky", image: "2024/03/3803D970-314D-4E9B-AC80-289E5A4C2318" },
  { title: "Promotéři", image: "2024/03/IMG_3216-2-scaled" },
  { title: "Debaras", image: "2024/03/IMG_1139-3-scaled" },
];

const steps = [
  { title: "Společný start", text: "Zjistíme, co potřebujete, a připravíme kalkulaci na míru." },
  { title: "Předvýběr hostesek", text: "Pošleme vám setkarty vybraných hostesek nebo promotérů ke schválení." },
  { title: "Finalizace looku", text: "Navrhneme dress code, líčení i účes." },
  { title: "A je to!", text: "V den D dohlédneme, aby vše proběhlo k vaší spokojenosti. Na místě nebo na dálku." },
];

const stepMedia = [
  <Img key="1" k="2024/02/1941" alt="Hostesky na recepci firemní akce" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-[60%_center]" />,
  <Img key="2" k="2024/01/1699370566691" alt="Hosteska v bílých šatech" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-[center_20%]" />,
  <Img key="3" k="2024/02/1885" alt="Detail líčení a účesu hostesky" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-[65%_center]" />,
  <Img key="4" k="2023/05/IMG_7323-scaled" alt="Čtyři hostesky na červeném koberci" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-[center_35%]" />,
];

const mosaic = [
  { k: "2024/02/428602804_18402737443064219_7569630170312541958_n", alt: "Hostesky na galavečeru" },
  { k: "2024/02/IMG_1991", alt: "Hostesky v jednotných kostýmech" },
  { k: "2023/03/IMG_4274-scaled", alt: "Hostesky na konferenci" },
  { k: "2024/02/1904", alt: "Hosteska s květinovým kloboukem" },
  { k: "2024/02/IMG_1994", alt: "Hostesky na předávání cen" },
  { k: "2022/10/292872982_2243424255838501_8221896312880025471_n", alt: "Hostesky a modelka na firemní akci" },
];

export default function HosteskyPage() {
  return (
    <>
      <ServiceHero
        seed={127}
        title="Hostesky na akce"
        lead="Hostesky, modelky i promotéři, které vybereme společně s vámi."
        price="od 270 Kč / hod."
        cta={<WantButton service="Hostesky">Chci hostesky</WantButton>}
        facts={facts}
        visual={
          <HeroSlides
            aspect="aspect-[4/5] max-h-[60svh] mx-auto"
            slides={[
              { k: "2023/05/2023-04-25_PIANA_DO_SKOL_photo-adam-costey-copyright-adam-costey.com-015", alt: "Tři hostesky v černých šatech", position: "object-[center_40%]" },
              { k: "2024/02/428366052_18402737434064219_2781783368005086114_n", alt: "Čtyři hostesky ve večerních šatech" },
              { k: "2023/05/IMG_7310_2-scaled", alt: "Hostesky v růžových šatech" },
              { k: "2024/02/1942", alt: "Usměvavá hosteska na firemní akci", position: "object-[65%_center]" },
            ]}
          />
        }
      />

      <Section>
        <Container>
          <SectionTitle title="Hostesky, modelky a promotéři" subtitle="Personál na konference, veletrhy, firemní akce i luxusní eventy." />
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {roles.map((r, i) => (
              <li key={r.title}>
                <Reveal from="up" delay={i * 90}>
                  <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink">
                    <Img
                      k={r.image}
                      alt={r.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                    <h2 className="absolute inset-x-0 bottom-0 p-4 text-xl font-bold tracking-tight text-white sm:p-5 sm:text-2xl">{r.title}</h2>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <section className="relative isolate overflow-hidden bg-ink py-16 text-white sm:py-24">
        <Glow seed={131} />
        <Container>
          <SectionTitle title="Jak probíhá výběr hostesek" subtitle="Hostesky vybíráme vždy na míru podle vašich požadavků a představ." light />
          <div className="mt-12">
            <StepsShowcase steps={steps} media={stepMedia} mediaAspect="aspect-[4/5]" dark />
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-2xl border border-white/20 p-6 sm:p-8">
            <div>
              <p className="text-xl font-bold">Fundus našeho oblečení</p>
              <p className="mt-1 text-[15px] text-white">Zajistíme i specifický dress code, úpravu vlasů a líčení.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={FUNDUS_CANVA} external variant="light">
                Prohlédnout fundus
              </Button>
              <Button href={FUNDUS_PDF} external variant="outline">
                Stáhnout PDF
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionTitle title="Hostesky na konference, veletrhy a firemní akce" align="left" />
            <Button href={site.instagram} external variant="secondary">
              {site.instagramHandle}
            </Button>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {mosaic.map((m, i) => (
              <li key={m.k}>
                <Reveal from="up" delay={(i % 3) * 90}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-soft">
                    <Img k={m.k} alt={m.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <PriceFaq
        seed={137}
        heading="Objednejte si hostesky na svou akci"
        price="od 270 Kč / hod."
        includedLabel="Zajistíme"
        included={["Hostesky a promotéry", "Modelky", "Šatnářky", "Dress code, líčení a účes", "Supervizi na místě"]}
        note="Objednáte víc služeb najednou? Získáte slevu 10–30 % podle velikosti objednávky."
        service="Hostesky"
        serviceLabel="Hostesky"
        faq={[
          { q: "Kolik hostesek dokážete zajistit?", a: "Při včasném objednání zvládneme i opravdu velké akce s větším počtem personálu." },
          { q: "Máte pro hostesky oblečení?", a: "Ano, máme vlastní fundus. Zajistíme i specifický dress code, úpravu vlasů a líčení." },
          { q: "Kdo hostesky koordinuje?", a: "Naše koordinátorka Tina, která je týmu hostesek k dispozici 24/7." },
          { q: "Budete na akci s námi?", a: "Supervizi zajistíme po celou dobu akce, přímo na místě nebo na dálku." },
        ]}
      />

      <CrossSell current="/hostesky" />

      <ContactSection lead="Napište nám datum a představu o akci a my se postaráme o zbytek." />

      <PackageBar />
    </>
  );
}
