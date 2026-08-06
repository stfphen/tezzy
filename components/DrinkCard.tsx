import Image from "next/image";

import { DrinkGlass } from "@/components/DrinkGlass";
import { HeartMark } from "@/components/icons";
import { type Drink, formatPrice } from "@/data/drinks";
import { cn } from "@/lib/cn";

/**
 * The circular drink medallion from the mockup: photo when the drink has one,
 * illustrated cup when it doesn't.
 *
 * Always decorative — both callers render the drink's name right next to it, so
 * announcing the picture as well would just repeat that name.
 */
export function DrinkMedallion({ drink, className }: { drink: Drink; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-square overflow-hidden rounded-full bg-gradient-to-b from-petal to-blush shadow-soft",
        className,
      )}
    >
      {drink.image ? (
        <Image
          src={drink.image}
          alt=""
          fill
          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 22vw, 180px"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-[6%] flex items-center justify-center">
          <DrinkGlass drink={drink} />
        </div>
      )}
    </div>
  );
}

/** Compact card used in the home page's featured row. */
export function FeaturedDrinkCard({ drink }: { drink: Drink }) {
  return (
    <div className="group flex flex-col items-center gap-3 text-center">
      <div className="w-full max-w-[170px] transition-transform duration-500 motion-safe:group-hover:-translate-y-2">
        <DrinkMedallion drink={drink} />
      </div>
      {/* Two lines' worth of room so the hearts line up across the row. */}
      <h3 className="flex min-h-[2.7em] items-start justify-center text-base font-bold leading-snug text-cocoa sm:text-lg">
        {drink.name}
      </h3>
      <HeartMark className="h-4 w-4 text-candy transition-transform duration-500 motion-safe:group-hover:scale-125" />
    </div>
  );
}

/** Full card used on the menu page. */
export function DrinkCard({ drink }: { drink: Drink }) {
  return (
    <article className="group flex h-full flex-col rounded-card border border-white/70 bg-shell/90 p-5 shadow-soft transition-all duration-500 motion-safe:hover:-translate-y-1.5 hover:shadow-lift sm:p-6">
      <div className="mx-auto w-full max-w-[168px]">
        <DrinkMedallion
          drink={drink}
          className="transition-transform duration-500 motion-safe:group-hover:scale-105"
        />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-bold leading-tight text-cocoa">{drink.name}</h3>
        <p className="shrink-0 font-display text-base font-extrabold text-berry">
          {formatPrice(drink.price)}
        </p>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-mocha">{drink.description}</p>

      <ul className="mt-4 flex flex-wrap items-center gap-2">
        {drink.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-pill bg-petal/80 px-3 py-1 text-xs font-semibold text-cocoa"
          >
            {tag}
          </li>
        ))}
      </ul>

      <p className="mt-4 flex items-center gap-2 border-t border-white/80 pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-mocha">
        <HeartMark className="h-3.5 w-3.5 text-candy" />
        Comes with a {drink.friend.toLowerCase()}
      </p>
    </article>
  );
}
