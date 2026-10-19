import Link from "next/link";
import { Img } from "@/components/Img";
import type { EventItem } from "@/lib/events";

export function EventCard({ event, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" }: { event: EventItem; sizes?: string }) {
  return (
    <Link href={`/portfolio/${event.slug}`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-ink">
        {event.coverKey ? (
          <Img
            k={event.coverKey}
            alt={event.title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
        <h3 className="absolute inset-x-0 bottom-0 p-5 text-center text-base font-medium text-white sm:text-lg">
          {event.title}
        </h3>
      </div>
    </Link>
  );
}
