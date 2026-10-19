export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it) => (
        <details key={it.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-medium text-ink [&::-webkit-details-marker]:hidden">
            {it.q}
            <span className="relative h-4 w-4 shrink-0" aria-hidden>
              <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
              <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-transform group-open:rotate-90" />
            </span>
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink text-pretty">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
