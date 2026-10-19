import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Section, SectionTitle } from "@/components/ui";
import { DarkBand, SplitRows, Steps } from "@/components/sections";

export const metadata: Metadata = {
  title: "AI Draw bot - nech se nakreslit robotickou rukou!",
  description: "Revoluční bot, který pomocí AI vytváří portréty v reálném čase. Jedinečné zážitky na každé vaší akci!",
  alternates: { canonical: "/ai-draw-bot" },
};

const steps = [
  { title: "Přivítání hostesky", text: "Naše hosteska vysvětlí celý proces a připraví vás na rychlou fotku." },
  { title: "Fotka & Přenos", text: "Během chvilky vám přes tablet uděláme fotku a pošleme jí do robota." },
  { title: "Kreslení v akci", text: "Robotické rameno začne pracovat a do 40 vteřin vám vytvoří portrét." },
  { title: "Hotovo", text: "Váš jedinečný portrét je připraven a to navíc na kvalitním fotopapíře s možným brandingem." },
];

const rows = [
  {
    title: "AI portrét na míru",
    image: "2026/10/IMG_2577-scaled",
    children: <p>Rádi Vám připravíme vlastní design (grafiku, logo) na fotopapír, aby AI portrét perfektně ladil s vaší značkou či tématem akce.</p>,
  },
  {
    title: "3x rychlost = 3x zážitek",
    image: "2025/03/Partypack-13",
    children: <p>S třemi AI boty dokážeme obsloužit až 3 hosty současně. Každý host si odnáší unikátní portrét vytvořený do 40 vteřin a s dokonalou přesností.</p>,
  },
  {
    title: "Jedinečná podívaná",
    image: "2025/03/Partypack-19-1",
    children: (
      <>
        <p>Ohromte své hosty našim jedinečným AI Draw Botem, která je nejen zabaví, ale doslova jim vyrazí dech svou přesností a kreativitou!</p>
        <p>Karikatura, klasický portrét nebo třeba pirát? Vše lze vyzkoušet v rámci jedné akce!</p>
        <p>Navíc jako bonus ... zvládneme nakreslit i vašeho čtyřnohého mazlíčka.</p>
      </>
    ),
  },
  {
    title: "Cena od 19 000 Kč",
    image: "2026/09/WhatsApp-Image-2026-09-18-at-09.23.50",
    children: (
      <>
        <p>
          V ceně je zahrnuto vše, co bude potřeba pro hladký chod Vaší akce. AI Draw bot, 2 hodiny provozu,
          obsluha, doprava a 100 ks papírků s vlastním nápisem / grafikou. Pro více informací nás neváhejte
          kontaktovat na <a href="tel:+420720448660">720 448 660</a>.
        </p>
        <p>
          <Button href="/kontakt">Napište nám</Button>
        </p>
      </>
    ),
  },
];

export default function AiDrawBotPage() {
  return (
    <>
      <PageHero
        image="2026/04/IMG_1340-1-scaled"
        title="AI Draw Bot"
        lead="Revoluční bot, který pomocí AI vytváří portréty v reálném čase. Jedinečné zážitky na každé vaší akci!"
      >
        <Button href="/kontakt" variant="light">Napište nám</Button>
        <Button href="/cena" variant="outline">Cena</Button>
      </PageHero>

      <Section>
        <Container>
          <SectionTitle
            title="AI kreslí jako mistr!"
            subtitle="Náš AI Draw Bot využívá pokročilou umělou inteligenci a robotické rameno k vytváření skicových portrétů do půl minuty! Stačí se vyfotit a sledovat, jak s precizností umělce, přenáší vaše rysy na papír."
          />
        </Container>
      </Section>

      <DarkBand image="2025/02/8b7b1641fbb11e2d70c2eaf6156e0db9">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">AI &amp; Umění</h2>
          <dl className="grid gap-8 sm:grid-cols-2">
            <div>
              <dd className="text-5xl font-semibold tracking-tight">3</dd>
              <dt className="mt-3 leading-relaxed text-white/80">
                Máte velkou akci? Není problém! AI Draw Botů máme celkem 3, takže se dostane opravdu na každého.
              </dt>
            </div>
            <div>
              <dd className="text-5xl font-semibold tracking-tight">40s</dd>
              <dt className="mt-3 leading-relaxed text-white/80">
                Náš AI Draw Bot zachytí vaše rysy a bleskově je promění v jedinečný portrét. Rychlé, přesné a
                fascinující!
              </dt>
            </div>
          </dl>
        </div>
        <div className="mt-14 border-t border-white/20 pt-12">
          <Steps items={steps} light />
        </div>
      </DarkBand>

      <SplitRows rows={rows} />
    </>
  );
}
