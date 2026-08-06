import { CalendarDays, Clock, ExternalLink, MapPin } from "lucide-react";

import { formatEventDate, type TezzyEvent } from "@/data/events";
import { cn } from "@/lib/cn";

export function EventCard({ event, past = false }: { event: TezzyEvent; past?: boolean }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-card border border-white/70 p-6 shadow-soft transition-all duration-500 sm:p-7",
        past ? "bg-cream/70" : "bg-shell/90 motion-safe:hover:-translate-y-1 hover:shadow-lift",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="inline-flex items-center gap-2 rounded-pill bg-petal/80 px-3 py-1 font-display text-xs font-extrabold text-cocoa">
          <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
          <time dateTime={event.date}>{formatEventDate(event)}</time>
        </p>
        {event.soldOut ? (
          <p className="rounded-pill bg-cocoa/10 px-3 py-1 font-display text-xs font-extrabold text-cocoa">
            Sold out
          </p>
        ) : null}
      </div>

      <h3 className="mt-4 text-xl font-extrabold leading-snug text-cocoa">{event.name}</h3>
      <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-mocha">{event.blurb}</p>

      <dl className="mt-5 flex flex-col gap-2 border-t border-white/80 pt-4 text-sm text-mocha">
        <div className="flex items-start gap-2.5">
          <dt className="sr-only">Location</dt>
          <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-candy" />
          <dd>
            {event.venue}, {event.city}
          </dd>
        </div>
        <div className="flex items-start gap-2.5">
          <dt className="sr-only">Time</dt>
          <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-candy" />
          <dd>{event.time}</dd>
        </div>
      </dl>

      {event.url && !past ? (
        <a
          href={event.url}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-5 inline-flex items-center gap-2 font-display text-sm font-extrabold text-berry underline-offset-4 hover:underline"
        >
          Event details
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : null}
    </article>
  );
}
