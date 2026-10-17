import type { Metadata } from "next";
import { Img } from "@/components/Img";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Heading, Lead, Prose, Section } from "@/components/ui";
import { Steps } from "@/components/sections";

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
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col justify-center">
              <Heading>AI kreslí jako mistr!</Heading>
              <Lead className="mt-6">
                Náš AI Draw Bot využívá pokročilou umělou inteligenci a robotické rameno k vytváření skicových
                portrétů do půl minuty! Stačí se vyfotit a sledovat, jak s precizností umělce, přenáší vaše
                rysy na papír.
              </Lead>
              <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-8">
                <div>
                  <dd className="text-4xl font-semibold tracking-tight text-ink">3</dd>
                  <dt className="mt-2 text-sm leading-relaxed text-ink-soft">
                    Máte velkou akci? Není problém! AI Draw Botů máme celkem 3, takže se dostane opravdu na
                    každého.
                  </dt>
                </div>
                <div>
                  <dd className="text-4xl font-semibold tracking-tight text-ink">40s</dd>
                  <dt className="mt-2 text-sm leading-relaxed text-ink-soft">
                    Náš AI Draw Bot zachytí vaše rysy a bleskově je promění v jedinečný portrét. Rychlé, přesné
                    a fascinující!
                  </dt>
                </div>
              </dl>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-soft lg:aspect-auto">
              <Img k="2025/02/8b7b1641fbb11e2d70c2eaf6156e0db9" alt="AI & Umění" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-paper-soft">
        <Container>
          <Heading>Jak to probíhá</Heading>
          <div className="mt-10">
            <Steps items={steps} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper-soft">
                <Img k="2026/10/IMG_2577-scaled" alt="AI portrét na fotopapíře" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper-soft">
                <Img k="2025/03/Partypack-13" alt="AI Draw Bot na akci" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-10">
              <div>
                <Heading as="h3">AI portrét na míru</Heading>
                <p className="mt-4 leading-relaxed text-ink-soft text-pretty">
                  Rádi Vám připravíme vlastní design (grafiku, logo) na fotopapír, aby AI portrét perfektně
                  ladil s vaší značkou či tématem akce.
                </p>
              </div>
              <div>
                <Heading as="h3">3x rychlost = 3x zážitek</Heading>
                <p className="mt-4 leading-relaxed text-ink-soft text-pretty">
                  S třemi AI boty dokážeme obsloužit až 3 hosty současně. Každý host si odnáší unikátní portrét
                  vytvořený do 40 vteřin a s dokonalou přesností.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line bg-paper-soft">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="flex flex-col justify-center">
              <Heading as="h3">Jedinečná podívaná</Heading>
              <Prose className="mt-4">
                <p>
                  Ohromte své hosty našim jedinečným AI Draw Botem, která je nejen zabaví, ale doslova jim vyrazí
                  dech svou přesností a kreativitou!
                </p>
                <p>Karikatura, klasický portrét nebo třeba pirát? Vše lze vyzkoušet v rámci jedné akce!</p>
                <p>Navíc jako bonus ... zvládneme nakreslit i vašeho čtyřnohého mazlíčka.</p>
              </Prose>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
                <Img k="2025/03/Partypack-19-1" alt="Portrét z AI Draw Botu" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-white">
                <Img k="2026/09/WhatsApp-Image-2026-09-18-at-09.23.50" alt="Portrét z AI Draw Botu" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-2xl border border-line p-8 sm:p-12">
            <Heading>Cena od 19 000 Kč</Heading>
            <p className="mt-5 max-w-3xl leading-relaxed text-ink-soft text-pretty">
              V ceně je zahrnuto vše, co bude potřeba pro hladký chod Vaší akce. AI Draw bot, 2 hodiny provozu,
              obsluha, doprava a 100 ks papírků s vlastním nápisem / grafikou. Pro více informací nás neváhejte
              kontaktovat na <a href="tel:+420720448660" className="font-medium text-ink underline underline-offset-4">720 448 660</a>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/kontakt">Napište nám</Button>
              <Button href="/cena" variant="secondary">Cena</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
