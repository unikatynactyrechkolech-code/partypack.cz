import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { Img } from "@/components/Img";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { ContactSection, Glow } from "@/components/sections";
import { PackageBar } from "@/components/home/PackagePicker";
import { ServiceHero, type Fact } from "@/components/service/ServiceHero";
import { HeroSlides } from "@/components/service/HeroSlides";
import { WantButton } from "@/components/service/WantButton";
import { PhoneVideo } from "@/components/service/LoopVideo";
import { StepsShowcase } from "@/components/service/StepsShowcase";
import { CardGrid, type GridItem } from "@/components/service/CardGrid";
import { ServiceEvents } from "@/components/service/ServiceEvents";
import { PriceFaq } from "@/components/service/PriceFaq";
import { CrossSell } from "@/components/service/CrossSell";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata(seo.partyspin);

const facts: Fact[] = [
  { value: "360°", label: "kamera hosty obtočí" },
  { value: "4K", label: "kvalita videa" },
  { value: "9:16", label: "na výšku pro Reels a TikTok" },
  { value: "3", label: "způsoby, jak poslat video do mobilu", count: true },
];

const steps = [
  { title: "Natáčení", text: "Stoupnete si na Partyspin a kamera vás několikrát obtočí." },
  { title: "Výsledné video", text: "Za pár vteřin se na něj podíváte na našem kiosku s iPadem." },
  { title: "Sdílení", text: "Pošlete si ho e-mailem, přes AirDrop nebo QR kód rovnou do mobilu." },
  { title: "Formát na výšku", text: "Video je připravené pro Instagram Stories, Reels i TikTok." },
];

const stepMedia = [
  <Img key="1" k="2024/03/fb6cc581-605d-44d2-99c1-56a5de3fa6a0" alt="Hosté tančí na Partyspinu" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-[center_30%]" />,
  <Img key="2" k="2024/08/1685434261459" alt="Kiosek s iPadem u Partyspinu" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-[center_35%]" />,
  <Img key="3" k="2024/08/3M0A0664-scaled" alt="Natáčení telefonem v kruhovém světle" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />,
  <Img key="4" k="2026/10/DM-Summit-2026" alt="Videa z Partyspinu na výšku s grafikou akce" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />,
];

const included: GridItem[] = [
  { title: "Kiosek s iPadem", text: "Videa jsou hned k nahlédnutí a v plné kvalitě k odeslání." },
  { title: "Velký ringlight", text: "Kruhové světlo, se kterým je každé video skvěle nasvícené." },
  { title: "Příjemná obsluha", text: "Postará se o chod, rekvizity i nejlepší kvalitu videí." },
  { title: "Kvalitní 4K kamera", text: "Ostrá, stabilizovaná videa z iPhonu 15 Pro Max." },
  { title: "Grafika na míru", text: "Nápis s logem, ať každý ví, z jaké akce si video odnesl." },
  { title: "Tematické rekvizity", text: "Balíček rekvizit na míru akce, včetně bublinkovače." },
];

const extras: GridItem[] = [
  { title: "LED stěna", image: "2024/08/438171128_955837823214615_1465992763588465385_n-1" },
  { title: "LED meče", image: "2024/08/led-mece", position: "object-top" },
  { title: "Polep do brandu", image: "2024/08/IMG_3017-2" },
  { title: "Pozadí ke spinu", image: "2024/08/448827280_18427826845064219_7866522868334987225_n" },
];

export default function PartyspinPage() {
  return (
    <>
      <ServiceHero
        seed={71}
        title="360° fotokoutek Partyspin"
        lead="Kamera hosty obtočí a za pár vteřin mají video s hudbou v mobilu."
        price="od 9 900 Kč"
        cta={<WantButton service="360° Partyspin">Chci Partyspin</WantButton>}
        facts={facts}
        visual={
          <HeroSlides
            aspect="aspect-[4/5] max-h-[60svh] mx-auto"
            slides={[
              { k: "2024/08/3M0A0668-scaled", alt: "Host na Partyspinu v kruhovém světle", position: "object-[70%_center]" },
              { k: "2024/08/200ee3dd-0c9d-4fc0-a642-70fa5e6e4469", alt: "Hosté s rekvizitami na Partyspinu" },
              { k: "2024/08/IMG_3005", alt: "Dvojice na Partyspinu na venkovní akci" },
            ]}
          />
        }
      />

      <section className="relative isolate overflow-hidden bg-white py-16 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <SectionTitle
              align="left"
              title="360° videokoutek na firemní akce i svatby"
              subtitle="Takové video si hosté odnesou: natočené ze všech úhlů, sestříhané, s hudbou a grafikou vaší akce."
            />
            <div className="mt-8">
              <Button href="https://eu.zonerama.com/Partypack/Album/9358348" external>
                Další ukázková videa
              </Button>
            </div>
          </div>
          <div className="relative isolate flex justify-center gap-5 overflow-hidden rounded-2xl bg-ink px-6 py-10 sm:gap-8 sm:py-14">
            <Glow seed={77} />
            <PhoneVideo name="svc-spin-a-v1" className="w-[46%] max-w-[240px]" />
            <PhoneVideo name="svc-spin-b-v1" className="mt-12 w-[46%] max-w-[240px]" />
          </div>
        </Container>
      </section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionTitle title="Jak funguje 360° fotokoutek" />
          <div className="mt-12">
            <StepsShowcase steps={steps} media={stepMedia} mediaAspect="aspect-[4/5]" />
          </div>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionTitle title="Co je v ceně Partyspinu 360°" />
          <CardGrid items={included} cols={3} />
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <SectionTitle
            title="Doplňky k 360° fotokoutku"
            subtitle="Kromě vlastního textu do e-mailu, tisku fotek nebo GIFů umíme i rekvizity na míru a tyhle doplňky."
          />
          <CardGrid items={extras} cols={4} headingAs="h2" aspect="aspect-[4/5]" />
        </Container>
      </Section>

      <ServiceEvents seed={83} service="partyspin" title="Fotky z akcí s Partyspinem 360°" />

      <PriceFaq
        seed={89}
        heading="Kolik stojí pronájem Partyspinu 360°?"
        price="od 9 900 Kč"
        included={["Kiosek s iPadem", "Ringlight", "Obsluha", "4K kamera", "Grafika na míru", "Rekvizity"]}
        note="Objednáte víc služeb najednou? Získáte slevu 10–30 % podle velikosti objednávky."
        service="360° Partyspin"
        serviceLabel="Partyspin 360°"
        faq={[
          { q: "Jak rychle je video hotové?", a: "Za pár vteřin po natáčení. Hosté si ho hned prohlédnou na našem kiosku." },
          { q: "Jak se video dostane k hostům?", a: "E-mailem, přes AirDrop nebo QR kód, vždy v plné kvalitě." },
          { q: "V jakém formátu video je?", a: "Na výšku, takže je připravené pro Instagram Stories, Reels i TikTok." },
          { q: "Může Partyspin stát venku?", a: "Ano, jen musí být pod přístřeškem nebo stanem. Když ho nemáte, přivezeme vlastní." },
        ]}
      />

      <CrossSell current="/partyspin360" />

      <ContactSection lead="Napište nám datum a představu o akci a my se postaráme o zbytek." />

      <PackageBar />
    </>
  );
}
