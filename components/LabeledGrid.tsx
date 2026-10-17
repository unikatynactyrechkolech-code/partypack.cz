import { Img } from "@/components/Img";
import type { Labeled } from "@/lib/data";

export function LabeledGrid({ items, aspect = "aspect-[3/2]" }: { items: Labeled[]; aspect?: string }) {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((it) => (
        <li key={`${it.label}-${it.img}`}>
          <div className={`relative ${aspect} overflow-hidden rounded-xl bg-paper-soft`}>
            <Img
              k={it.img}
              alt={it.label}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-sm font-medium text-ink">{it.label}</p>
        </li>
      ))}
    </ul>
  );
}
