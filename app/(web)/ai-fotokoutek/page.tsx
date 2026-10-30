import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { Img } from "@/components/Img";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { ContactSection } from "@/components/sections";
import { PackageBar } from "@/components/home/PackagePicker";
import { MobileCtaBar } from "@/components/home/MobileCtaBar";
import { ServiceHero, type Fact } from "@/components/service/ServiceHero";
import { WantButton } from "@/components/service/WantButton";
import { StepsShowcase } from "@/components/service/StepsShowcase";
import { FilterMarquee } from "@/components/service/FilterMarquee";
import { CardGrid, type GridItem } from "@/components/service/CardGrid";
import { ServiceEvents } from "@/components/service/ServiceEvents";
import { PriceFaq } from "@/components/service/PriceFaq";
import { CrossSell } from "@/components/service/CrossSell";
import { PhotoBand } from "@/components/PhotoBand";
import { Reveal } from "@/components/Reveal";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata(seo.aiFotokoutek);

const facts: Fact[] = [
  { value: "8", label: "AI filtrů pro jednotlivce", count: true },
  { value: "10", label: "osob najednou ve skupinovém filtru", count: true },
  { value: "24 h", label: "online galerie po akci", count: true },
  { value: "2 × 2 m", label: "prostor, který stačí" },
];

// Ukázky filtrů z naší nabídky (stránka AI filtry).
const marquee = [
  { name: "Superhrdinové", img: "2026/10/Partypack-120" },
  { name: "Zimní královna", img: "2026/10/Partypack-73" },
  { name: "Pilot", img: "2026/10/Partypack-41" },
  { name: "Red Carpet", img: "2026/10/Partypack-230" },
  { name: "Magická bytost", img: "2026/10/Partypack-8" },
  { name: "Astronaut", img: "2026/10/Partypack-145" },
  { name: "Nákupy v Paříži", img: "2026/10/Partypack-195" },
  { name: "Pirát", img: "2026/10/Partypack-6" },
  { name: "Van Gogh", img: "2026/10/Partypack" },
  { name: "Silvestrovské oslavy", img: "2026/10/Partypack-112" },
  { name: "Dračí doupě", img: "2026/10/Partypack-21" },
  { name: "80s", img: "2026/10/Partypack-173" },
  { name: "ZOO", img: "2026/10/Partypack-37" },
  { name: "Retro Párty", img: "2026/10/Partypack-200" },
];

const groupThumbs = [
  { name: "Mexico", img: "2025/11/ajyzhtrge" },
  { name: "Piráti", img: "2025/11/wdefrgtr" },
  { name: "Galaxie", img: "2025/11/12" },
  { name: "Santovi pomocníci", img: "2025/11/werrtterw" },
];

const steps = [
  { title: "Výběr filtru", text: "Host si přímo na akci vybere svého favorita." },
  { title: "Generování", text: "Za chvilku umělá inteligence vytvoří výsledný snímek." },
  { title: "Tisk a sdílení", text: "Neomezený tisk a sdílení přes QR kód rovnou do mobilu." },
  { title: "Grafika a galerie", text: "Vaše grafika v každé fotce a online galerie do 24 hodin." },
];

const stepMedia = [
  <div key="vyber" className="grid h-full grid-cols-2 grid-rows-2 gap-1.5 p-1.5">
    {groupThumbs.map((g) => (
      <div key={g.img} className="relative overflow-hidden rounded-xl">
        <Img k={g.img} alt={`Skupinový filtr ${g.name}`} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover object-top" />
      </div>
    ))}
  </div>,
  <Img key="generovani" k="2026/10/Partypack-73" alt="Výsledek AI filtru Zimní královna" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-[center_20%]" />,
  <Img key="tisk" k="2025/04/IMG_2202-scaled" alt="Host s vytištěnou AI fotkou" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-[center_25%]" />,
  <Img key="grafika" k="2026/06/Template-pro-klienty-fotokoutek-5-9" alt="AI fotky s grafikou firemního večírku" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />,
];

const abilities: GridItem[] = [
  { title: "Grafika na míru", text: "Do každé fotky připravíme nápis nebo grafiku vaší akce." },
  { title: "Žádné klíčování", text: "Díky umělé inteligenci je každá fotka unikát." },
  { title: "Tisk a sdílení", text: "Neomezený tisk po celou akci a sdílení přes QR kód." },
  { title: "Filtr na míru", text: "Nenašli jste svůj filtr? Napište nám o cenu filtru na míru." },
];

export default function AiFotokoutekPage() {
  return (
    <>
      <ServiceHero
        eyebrow="Fotokoutek s umělou inteligencí"
        background={{ k: "2024/08/AI-cenik", position: "object-[center_12%]" }}
        seed={41}
        title="AI fotokoutek na vaši akci"
        lead="Staň se kýmkoli, kdekoli. Umělá inteligence promění hosty až v 8 různých stylech."
        price="od 14 000 Kč"
        cta={<WantButton service="AI fotokoutek">Chci AI fotokoutek</WantButton>}
        facts={facts}
        visual={
          <BeforeAfter
            autoplay
            priority
            before="2024/08/454878840_10228646758811796_1529734258425616764_n"
            after="2025/02/image_1739353633937"
            aspect="aspect-[4/5] max-h-[60svh] mx-auto"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        }
      />

      <Section>
        <Container>
          <SectionTitle eyebrow="Filtry" title="AI filtry pro jednotlivce i skupiny" subtitle="Všechny filtry fungují pro muže, ženy i děti." />
        </Container>
        <div className="mt-12">
          <FilterMarquee items={marquee} />
        </div>
        <Container>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal from="up">
              <div className="flex h-full flex-col rounded-2xl border border-ink p-6 sm:p-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-ink">Až 8 filtrů pro jednotlivce</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink">Vyberete je předem z naší bohaté nabídky.</p>
                <div className="mt-auto pt-6">
                  <Button href="/ai-filtry">Vybrat filtry</Button>
                </div>
              </div>
            </Reveal>
            <Reveal from="up" delay={90}>
              <div className="flex h-full flex-col rounded-2xl border border-ink p-6 sm:p-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-ink">Skupinové filtry až pro 10 osob</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-ink">Není potřeba je vybírat dopředu. Na místě jsou k dispozici všechny.</p>
                <div className="mt-auto pt-6">
                  <Button href="/skupinove-ai-filtry">Skupinové filtry</Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="bg-sand">
        <Container>
          <SectionTitle eyebrow="Jak to funguje" title="Jak funguje AI fotokoutek" />
          <div className="mt-12">
            <StepsShowcase steps={steps} media={stepMedia} mediaAspect="aspect-[4/5]" reverse />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr_1.1fr] lg:gap-10">
            <div>
              <SectionTitle eyebrow="Před a po" title="AI fotky před a po" subtitle="Posuňte jezdcem a porovnejte skutečnou fotku s výsledkem." align="left" />
            </div>
            <BeforeAfter
              before="2024/08/301557972_10209961384586974_2088446339125162929_n"
              after="2024/08/c56d962a-7e90-42d6-8517-cfd1cc873f38"
              sizes="(min-width: 1024px) 400px, 100vw"
            />
            <BeforeAfter
              before="2024/08/336092111_718099589959109_1018636651805042301_n"
              after="2024/08/58768807-6935-40bb-bd65-5ecb1af5b9fa"
              sizes="(min-width: 1024px) 400px, 100vw"
            />
          </div>
        </Container>
      </Section>

      <PhotoBand k="2026/06/Template-pro-klienty-fotokoutek-5-9" eyebrow="Co umí" title="Co umí fotokoutek s umělou inteligencí" />
      <Section className="bg-sand pt-6 sm:pt-10">
        <Container>
          <CardGrid items={abilities} cols={4} />
        </Container>
      </Section>

      <ServiceEvents seed={53} service="ai-fotokoutek" title="Fotky z akcí s AI fotokoutkem" />

      <PriceFaq
        seed={61}
        heading="Kolik stojí AI fotokoutek?"
        price="od 14 000 Kč"
        included={["Až 8 filtrů", "Neomezený tisk", "Sdílení přes QR kód", "Grafika na míru", "Online galerie do 24 h"]}
        extras={[{ label: "Filtr na míru", price: "cena na dotaz" }]}
        note="Objednáte víc služeb najednou? Získáte slevu 10–30 % podle velikosti objednávky."
        service="AI fotokoutek"
        serviceLabel="AI fotokoutek"
        faq={[
          { q: "Co je potřeba zajistit?", a: "Prostor 2 × 2 m a místo s dobrým signálem wifi nebo mobilních dat." },
          { q: "Musí si hosté filtry vybrat předem?", a: "Filtry pro jednotlivce vybíráte předem, až 8 z naší nabídky. Skupinové filtry se vybírají až na místě." },
          { q: "Jde udělat filtr na míru?", a: "Ano. Když v nabídce nenajdete ten pravý, napište nám o cenu filtru na míru." },
          { q: "Jak dlouho dopředu je potřeba rezervovat?", a: "Čím dřív, tím líp, hlavně na oblíbená data. Máme ale 12 strojů, takže akci zvládneme zajistit i když zavoláte den předem." },
        ]}
      />

      <CrossSell current="/ai-fotokoutek" />

      <ContactSection lead="Napište nám datum a představu o akci a my se postaráme o zbytek." />

      <PackageBar />
      <MobileCtaBar />
    </>
  );
}
