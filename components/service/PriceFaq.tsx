import type { ReactNode } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { Glow } from "@/components/sections";
import { PackageToggle } from "@/components/home/PackagePicker";
import { Faq, type FaqItem } from "@/components/Faq";
import type { InquiryService } from "@/lib/package";

/**
 * Cena na jednom místě (černá karta: cena od, co je v ceně, příplatky, tlačítko do poptávky)
 * a vedle ní časté dotazy.
 */
export function PriceFaq({
  heading,
  price,
  includedLabel = "V ceně",
  included,
  extras = [],
  note,
  service,
  serviceLabel,
  faq,
  seed,
}: {
  heading: string;
  price: string;
  includedLabel?: string;
  included: string[];
  extras?: { label: string; price: string }[];
  note?: ReactNode;
  service: InquiryService;
  serviceLabel: string;
  faq: FaqItem[];
  seed: number;
}) {
  return (
    <Section id="cena">
      <Container className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="@container relative isolate overflow-hidden rounded-2xl bg-ink p-7 text-white sm:p-10">
          <Glow seed={seed} />
          <h2 className="text-3xl leading-tight font-light tracking-[-0.02em] text-balance sm:text-4xl">{heading}</h2>
          <p className="mt-6 text-5xl leading-none font-light tracking-[-0.02em] tabular-nums sm:text-6xl">{price}</p>
          <p className="mt-9 text-[15px] font-semibold">{includedLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {included.map((x) => (
              <li key={x} className="rounded-full border border-white/25 px-3.5 py-1.5 text-sm">
                {x}
              </li>
            ))}
          </ul>
          {extras.length ? (
            <dl className="mt-8 divide-y divide-white/15 border-y border-white/15">
              {extras.map((e) => (
                <div key={e.label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-[15px]">{e.label}</dt>
                  <dd className="shrink-0 text-[15px] font-semibold tabular-nums">{e.price}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {note ? <p className="mt-6 text-[15px] leading-relaxed text-pretty">{note}</p> : null}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PackageToggle service={service} label={serviceLabel} tone="dark" className="px-6! py-3! text-[16px]!" />
            <Link href="/cena" className="text-[15px] font-semibold text-white underline decoration-white/50 underline-offset-[6px] hover:decoration-white">
              Celý ceník
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-light tracking-[-0.02em] text-ink sm:text-4xl">Časté dotazy</h2>
          <div className="mt-6">
            <Faq items={faq} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
