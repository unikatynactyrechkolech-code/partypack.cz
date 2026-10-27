import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { Img } from "@/components/Img";
import { Container, Section, SectionTitle } from "@/components/ui";
import { ContactSection, Glow } from "@/components/sections";
import { PackageBar } from "@/components/home/PackagePicker";
import { ServiceHero, type Fact } from "@/components/service/ServiceHero";
import { WantButton } from "@/components/service/WantButton";
import { LoopVideo } from "@/components/service/LoopVideo";
import { StepsShowcase } from "@/components/service/StepsShowcase";
import { TimerRing } from "@/components/service/TimerRing";
import { CardGrid, type GridItem } from "@/components/service/CardGrid";
import { ServiceEvents } from "@/components/service/ServiceEvents";
import { PriceFaq } from "@/components/service/PriceFaq";
import { CrossSell } from "@/components/service/CrossSell";
import { Reveal } from "@/components/Reveal";

export const revalidate = 600;

export const metadata: Metadata = pageMetadata(seo.aiDrawBot);

const facts: Fact[] = [
  { value: "40 s", label: "trvá jeden portrét", count: true },
  { value: "3", label: "roboti, 3 hosté najednou", count: true },
  { value: "200", label: "papírků ve 2 hodinách v ceně", count: true },
  { value: "+1 500 Kč", label: "každá další hodina a 100 papírků" },
];

const steps = [
  { title: "Přivítání hostesky", text: "Hosteska vysvětlí celý proces a připraví vás na fotku." },
  { title: "Fotka a přenos", text: "Přes tablet vás vyfotíme a fotku pošleme do robota." },
  { title: "Kreslení v akci", text: "Robotické rameno nakreslí portrét do 40 vteřin." },
  { title: "Hotovo", text: "Portrét na kvalitním papíře, klidně s vaší grafikou." },
];

const stepMedia = [
  <Img key="1" k="2025/02/8b7b1641fbb11e2d70c2eaf6156e0db9" alt="Hosteska u AI Draw Bota" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-[35%_center]" />,
  <Img key="2" k="2025/03/Partypack-19-1" alt="Fotka hosta na tabletu u robotů" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-[30%_center]" />,
  <Img key="3" k="2026/04/IMG_1340-1-scaled" alt="Robotické rameno kreslí portrét" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />,
  <Img key="4" k="2026/10/IMG_2577-scaled" alt="Hotové portréty v ruce" fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover object-[center_40%]" />,
];

// Fotky na šířku v původním poměru 4 : 3, první velká. Tři různé značky ukazují papír s logem klienta.
const portraits = [
  { k: "2026/08/WhatsApp-Image-2026-08-20-at-10.21.02", alt: "Fotka hostek a jejich portrét na papíře s logem Popeyes" },
  { k: "2026/09/WhatsApp-Image-2026-09-07-at-12.22.16", alt: "Portrét na papíře s logem OEZ, v pozadí hosté u robotů" },
  { k: "2026/09/WhatsApp-Image-2026-09-04-at-14.06.18", alt: "Portrét na papíře s grafikou firmy Henkel" },
];

const features: GridItem[] = [
  {
    title: "Tři kreslící roboty pro velké akce",
    text: "S třemi roboty obsloužíme až 3 hosty najednou, každého do 40 vteřin.",
    image: "2025/03/Partypack-13",
  },
  {
    title: "Karikatury, portréty i kresby mazlíčků",
    text: "Karikatura, klasický portrét nebo pirát. Nakreslíme i vašeho čtyřnohého mazlíčka.",
    image: "2026/09/WhatsApp-Image-2026-09-01-at-13.46.23",
  },
];

export default function AiDrawBotPage() {
  return (
    <>
      <ServiceHero
        seed={97}
        title="AI Draw Bot – robot, který kreslí portréty"
        lead="Robotická ramena nakreslí portrét hosta přímo na akci do 40 vteřin."
        price="od 19 000 Kč"
        cta={<WantButton service="AI Draw Bot">Chci AI Draw Bota</WantButton>}
        facts={facts}
        visual={
          <div className="relative mx-auto aspect-square max-h-[60svh] overflow-hidden rounded-2xl bg-white/5">
            <LoopVideo name="svc-drawbot-v1" eager className="absolute inset-0 h-full w-full object-cover" />
          </div>
        }
      />

      <Section>
        <Container>
          <SectionTitle
            title="Kreslící robot s umělou inteligencí"
            subtitle="Stačí se vyfotit a sledovat, jak robot s přesností umělce přenáší vaše rysy na papír."
          />
          <div className="mt-12">
            <StepsShowcase steps={steps} media={stepMedia} mediaAspect="aspect-[4/5]" reverse />
          </div>
        </Container>
      </Section>

      <section className="relative isolate overflow-hidden bg-ink py-16 text-white sm:py-24">
        <Glow seed={103} />
        <Container className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-16">
          <TimerRing seconds={40} label="Portrét do 40 vteřin" />
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold uppercase tracking-[0.005em] text-balance sm:text-4xl">AI portrét do 40 vteřin</h2>
            <p className="mt-5 text-lg leading-relaxed text-white text-pretty">
              Robot zachytí vaše rysy a bleskově je promění v jedinečný portrét. Rychlé, přesné a fascinující.
            </p>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionTitle
            title="AI portrét na míru s vaším logem"
            subtitle="Na papír připravíme vaši grafiku nebo logo, aby portrét ladil se značkou i tématem akce."
          />
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {portraits.map((p, i) => (
              <li key={p.k} className={i === 0 ? "col-span-2 lg:row-span-2" : ""}>
                <Reveal from="up" delay={i * 90} className="h-full">
                  <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-soft ${i === 0 ? "lg:aspect-auto lg:h-full" : ""}`}>
                    <Img
                      k={p.k}
                      alt={p.alt}
                      fill
                      sizes={i === 0 ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 380px, 50vw"}
                      className="object-cover"
                    />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <CardGrid items={features} cols={2} variant="card" headingAs="h2" aspect="aspect-[16/10]" />
        </Container>
      </Section>

      <ServiceEvents seed={107} service="ai-draw-bot" title="Fotky z akcí s AI Draw Botem" />

      <PriceFaq
        seed={113}
        heading="Kolik stojí AI Draw Bot?"
        price="od 19 000 Kč"
        included={["AI Draw Bot", "2 hodiny provozu", "Obsluha", "Doprava", "200 papírků s vaší grafikou"]}
        extras={[{ label: "Každá další hodina a 100 papírků", price: "+ 1 500 Kč" }]}
        note="Objednáte víc služeb najednou? Získáte slevu 10–30 % podle velikosti objednávky."
        service="AI Draw Bot"
        serviceLabel="AI Draw Bot"
        faq={[
          { q: "Kolik hostů robot zvládne?", a: "Máme 3 roboty, takže kreslí až 3 hosty najednou. Každý portrét je hotový do 40 vteřin." },
          { q: "Kolik portrétů robot stihne?", a: "100 papírků za hodinu. Ve dvou hodinách v ceně je to 200 portrétů a každá další hodina přidá dalších 100." },
          { q: "Může být na portrétu naše logo?", a: "Ano. Na papír připravíme vlastní design s vaší grafikou nebo logem." },
          { q: "Jaký styl portrétu si můžeme vybrat?", a: "Karikaturu, klasický portrét nebo třeba piráta. V rámci jedné akce jde vyzkoušet víc stylů." },
          { q: "Nakreslí i zvíře?", a: "Ano, zvládneme nakreslit i vašeho čtyřnohého mazlíčka." },
        ]}
      />

      <CrossSell current="/ai-draw-bot" />

      <ContactSection lead="Napište nám datum a představu o akci a my se postaráme o zbytek." />

      <PackageBar />
    </>
  );
}
