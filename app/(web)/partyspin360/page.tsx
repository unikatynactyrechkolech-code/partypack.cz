import type { Metadata } from "next";
import { pageMetadata, seo } from "@/lib/seo";
import { Img } from "@/components/Img";
import { PageHero } from "@/components/PageHero";
import { Button, Container, Heading, Section, SectionTitle } from "@/components/ui";
import { CardLink, DarkBand, SplitRows, Steps } from "@/components/sections";

export const metadata: Metadata = pageMetadata(seo.partyspin);

const statements = [
  "Nejvíce spokojených zákazníků si nás objednává na firemní večírky či konference, svatby, narozeniny nebo též na dětské akce.",
  "Videokoutek, který vás i vaše hosty natočí ze všech úhlů, následně během pár vteřin sestříhá cool video, přidá hudbu a na míru vytvořenou grafiku.",
  "Vysoká kvalita výsledného videa, krásné vzpomínky a vše během chviličky připraveno:)",
];

const steps = [
  { title: "Natáčení", text: "Stoupnete si na Partyspin a užijete si 360° párty ve formě kamery, která vás několikrát obtočí!" },
  { title: "Výsledné video", text: "Po pár vteřinách se Partyspin dotočí a vy se můžete mrknout na výsledné video na našem kiosku!" },
  { title: "Sdílení", text: "Pokud se vám video líbí, pošlete si ho na email, přes AirDrop či QR kód rovnou do mobilu!" },
  { title: "Formát na výšku", text: "Jelikož je video na výšku, je ideální pro sdílení na IG Stories, Reels nebo TikTok." },
];

const included = [
  { title: "Kiosek s iPadem", image: "2024/08/1685434261459", children: <p>Na našem iPad kiosku jsou výsledná videa ihned k nahlédnutí. Ty si následně můžete zaslat přes Email, QR kód či Airdrop v plné kvalitě rovnou do svých zařízení:)</p> },
  { title: "Velký ringlight", image: "2024/08/3M0A0668-scaled", children: <p>Pro nejkvalitnější osvětlení využíváme velké kruhové světlo. Žádné vrásky, perfektní pleťovka, skvěle nasvícené video!</p> },
  { title: "Příjemná obsluha", image: "2024/08/IMG_3005", children: <p>U našeho 360° Partyspina je přítomná vždy příjemná obsluha, která se postará o veškerý chod a zábavu u natáčení. Poradí, pomůže, vybere správné rekvizity a zajistí nejlepší kvalitu výsledných videí.</p> },
  { title: "Kvalitní 4K kamera", image: "2024/08/3M0A0664-scaled", children: <p>Ostrá, stabilizovaná videa díky nejnovější technologii a navíc ve 4K kvalitě. Náš iPhone 15 PRO Max zvládne i slunce, špatné světelné podmínky a případné otřesy.</p> },
  { title: "Grafika na míru", image: "2024/08/Nova-uvodkaaa", children: <p>Do každého videa, fotky či GIFu Vám na míru připravíme grafiku. Tzv. nápis s logem, ať každý ví z jaké akce si video odnesl:)</p> },
  { title: "Tematické rekvizity", image: "2024/08/200ee3dd-0c9d-4fc0-a642-70fa5e6e4469", children: <p>Na každou akci vybíráme ideální balíček rekvizit na míru. Největší zábava je i s naším bublinkovačem, který je součástí každého balíčku.</p> },
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
      <PageHero image="2024/08/3M0A0668-scaled" position="object-[70%_center]" title="360° fotokoutek Partyspin" lead="…alias jiný level videokoutku!">
        <Button href="/kontakt" variant="light">Objednat</Button>
      </PageHero>

      <Section className="pb-0 sm:pb-0">
        <Container>
          <SectionTitle title="360° videokoutek na firemní akce i svatby" subtitle="Nová vlna zábavy!" />
        </Container>
      </Section>

      <DarkBand image="2024/08/3M0A0664-scaled" className="mt-12">
        <ul className="grid gap-8 text-center md:grid-cols-3 md:text-left">
          {statements.map((s) => (
            <li key={s} className="leading-relaxed text-white text-pretty md:border-l md:border-white/20 md:pl-6">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-12 text-center">
          <Button href="/kontakt" variant="outline">Chci si objednat Partyspin</Button>
        </div>
      </DarkBand>

      <section className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-16 sm:px-12 lg:px-16 lg:py-24">
          <Heading>Jak funguje 360° fotokoutek</Heading>
          <div className="mt-10">
            <Steps items={steps} />
          </div>
          <div className="mt-10">
            <Button href="https://eu.zonerama.com/Partypack/Album/9358348" external variant="secondary">
              Chci se podívat na ukázková videa!
            </Button>
          </div>
        </div>
        <div className="relative min-h-[360px] lg:min-h-[720px]">
          <Img k="2024/03/fb6cc581-605d-44d2-99c1-56a5de3fa6a0" alt="Partyspin 360° na akci" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <Section className="border-t border-line pb-0 sm:pb-0">
        <Container>
          <SectionTitle title="Co je v ceně Partyspinu 360°" />
        </Container>
      </Section>
      <div className="mt-12">
        <SplitRows rows={included} />
      </div>

      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Img k="2024/08/455199354_18437708977064219_8281298651533021347_n" alt="" fill sizes="100vw" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-ink/50" />
        <Container className="relative flex flex-col items-center py-20 text-center sm:py-24">
          <h2 className="text-3xl font-extrabold uppercase tracking-[0.005em] sm:text-4xl">Pronájem Partyspinu 360° od 9 900 Kč</h2>
          <div className="mt-8">
            <Button href="/kontakt" variant="outline">Chci si objednat Partyspin</Button>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
            <div>
              <Heading>Doplňky k 360° fotokoutku</Heading>
            </div>
            <p className="text-lg leading-relaxed text-ink text-pretty">
              Kromě vlastního textu do emailu, tisku fotek nebo tvorbě GIFů, umíme i rekvizity na míru a nebo
              třeba tyhle další super služby! Naše služby neustále vylepšujeme a brzy se těšíme na to, až vám
              budeme moci nabízet i animované grafiky:)
            </p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {extras.map((e) => (
              <li key={e.title}>
                <CardLink href="/kontakt" image={e.image} title={e.title} sizes="(min-width: 1024px) 25vw, 50vw" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
