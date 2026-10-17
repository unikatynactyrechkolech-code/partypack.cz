import type { Metadata } from "next";
import { Img } from "@/components/Img";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Heading, Lead, Section } from "@/components/ui";
import { CardLink, FeatureList, Steps } from "@/components/sections";

export const metadata: Metadata = {
  title: "Partyspin - 360° zábavy!",
  description: "Videokoutek, který vás i vaše hosty natočí ze všech úhlů, během pár vteřin sestříhá video, přidá hudbu a grafiku na míru. Ceny od 9900 Kč.",
  alternates: { canonical: "/partyspin360" },
};

const steps = [
  { title: "Natáčení", text: "Stoupnete si na Partyspin a užijete si 360° párty ve formě kamery, která vás několikrát obtočí!" },
  { title: "Výsledné video", text: "Po pár vteřinách se Partyspin dotočí a vy se můžete mrknout na výsledné video na našem kiosku!" },
  { title: "Sdílení", text: "Pokud se vám video líbí, pošlete si ho na email, přes AirDrop či QR kód rovnou do mobilu!" },
  { title: "Formát na výšku", text: "Jelikož je video na výšku, je ideální pro sdílení na IG Stories, Reels nebo TikTok." },
];

const included = [
  { title: "Kiosek s iPadem", text: "Na našem iPad kiosku jsou výsledná videa ihned k nahlédnutí. Ty si následně můžete zaslat přes Email, QR kód či Airdrop v plné kvalitě rovnou do svých zařízení:)", image: "2024/08/1685434261459" },
  { title: "Velký ringlight", text: "Pro nejkvalitnější osvětlení využíváme velké kruhové světlo. Žádné vrásky, perfektní pleťovka, skvěle nasvícené video!", image: "2024/08/3M0A0668-scaled" },
  { title: "Příjemná obsluha", text: "U našeho 360° Partyspina je přítomná vždy příjemná obsluha, která se postará o veškerý chod a zábavu u natáčení. Poradí, pomůže, vybere správné rekvizity a zajistí nejlepší kvalitu výsledných videí.", image: "2024/08/IMG_3005" },
  { title: "Kvalitní 4K kamera", text: "Ostrá, stabilizovaná videa díky nejnovější technologii a navíc ve 4K kvalitě. Náš iPhone 15 PRO Max zvládne i slunce, špatné světelné podmínky a případné otřesy.", image: "2024/08/3M0A0664-scaled" },
  { title: "Grafika na míru", text: "Do každého videa, fotky či GIFu Vám na míru připravíme grafiku. Tzv. nápis s logem, ať každý ví z jaké akce si video odnesl:)", image: "2024/08/Nova-uvodkaaa" },
  { title: "Tematické rekvizity", text: "Na každou akci vybíráme ideální balíček rekvizit na míru. Největší zábava je i s naším bublinkovačem, který je součástí každého balíčku.", image: "2024/08/200ee3dd-0c9d-4fc0-a642-70fa5e6e4469" },
];

const extras = [
  { title: "LED stěna", image: "2024/08/438171128_955837823214615_1465992763588465385_n-1" },
  { title: "LED meče", image: "2024/08/led-mece" },
  { title: "Polep do brandu", image: "2024/08/IMG_3017-2" },
  { title: "Pozadí ke spinu", image: "2024/08/448827280_18427826845064219_7866522868334987225_n" },
];

export default function PartyspinPage() {
  return (
    <>
      <PageHero
        image="2024/08/partyspin-uvodka-velikost-2kopie"
        title="Nová vlna zábavy!"
        lead="Videokoutek, který vás i vaše hosty natočí ze všech úhlů, následně během pár vteřin sestříhá cool video, přidá hudbu a na míru vytvořenou grafiku."
      >
        <Button href="/kontakt" variant="light">Chci si objednat Partyspin</Button>
      </PageHero>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-soft lg:aspect-auto">
              <Img k="2024/08/3M0A0668-scaled" alt="Partyspin 360°" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <ul className="space-y-6 text-lg leading-relaxed text-ink-soft text-pretty">
                <li className="border-l-2 border-ink pl-5">
                  Nejvíce spokojených zákazníků si nás objednává na firemní večírky či konference, svatby,
                  narozeniny nebo též na dětské akce.
                </li>
                <li className="border-l-2 border-ink pl-5">
                  Vysoká kvalita výsledného videa, krásné vzpomínky a vše během chviličky připraveno:)
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-paper-soft">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              <Heading>Jak to funguje?</Heading>
              <div className="mt-10">
                <Steps items={steps} />
              </div>
              <div className="mt-8">
                <Button href="https://eu.zonerama.com/Partypack/Album/9358348" external variant="secondary">
                  Chci se podívat na ukázková videa!
                </Button>
              </div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-white">
              <Img k="2024/03/fb6cc581-605d-44d2-99c1-56a5de3fa6a0" alt="Partyspin 360° na akci" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Heading>Co vše je obsaženo?</Heading>
          <div className="mt-10">
            <FeatureList items={included} />
          </div>
        </Container>
      </Section>

      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Img k="2024/08/455199354_18437708977064219_8281298651533021347_n" alt="" fill sizes="100vw" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-ink/30" />
        <Container className="relative py-20 sm:py-28">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Ceny od 9900 Kč!</h2>
          <div className="mt-8">
            <Button href="/kontakt" variant="light">Chci si objednat Partyspin</Button>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="max-w-3xl">
            <Heading>Co umíme navíc?</Heading>
            <Lead className="mt-4">
              Kromě vlastního textu do emailu, tisku fotek nebo tvorbě GIFů, umíme i rekvizity na míru a nebo
              třeba tyhle další super služby! Naše služby neustále vylepšujeme a brzy se těšíme na to, až vám
              budeme moci nabízet i animované grafiky:)
            </Lead>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {extras.map((e) => (
              <li key={e.title}>
                <CardLink href="/kontakt" image={e.image} title={e.title} aspect="aspect-[3/4]" sizes="(min-width: 1024px) 25vw, 50vw" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
