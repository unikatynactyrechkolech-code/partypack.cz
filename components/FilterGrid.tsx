import { Img } from "@/components/Img";
import type { Filter } from "@/lib/data";

export function FilterGrid({ items }: { items: Filter[] }) {
  return (
    <ol className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((f) => (
        <li key={`${f.n}-${f.img}`}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-paper-soft">
            <Img
              k={f.img}
              alt={f.name}
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-cover"
            />
          </div>
          <p className="mt-3 flex items-baseline gap-2 text-sm">
            <span className="tabular-nums text-ink">{f.n}.</span>
            <span className="font-medium text-ink">{f.name}</span>
          </p>
        </li>
      ))}
    </ol>
  );
}
