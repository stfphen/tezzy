import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/Button";
import { FeaturedDrinkCard } from "@/components/DrinkCard";
import { HeartMark } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { featuredDrinks } from "@/data/drinks";

/**
 * The two-panel row from the mockup: featured drinks on the left, the About
 * teaser with the plush bunny on the right.
 */
export function FeaturedDrinks() {
  return (
    <section className="container-tezzy grid gap-6 pb-4 pt-8 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-10">
      <Reveal className="rounded-card border border-white/70 bg-shell/90 p-6 shadow-soft sm:p-9">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="flex items-center gap-3 text-3xl sm:text-[2.1rem]">
            Our Drinks
            <HeartMark className="h-5 w-5 text-candy" />
          </h2>
          <p className="text-sm font-semibold text-mocha sm:text-base">
            Made fresh. Made cute. Made for you.
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-3">
          {featuredDrinks.map((drink) => (
            <li key={drink.slug}>
              <FeaturedDrinkCard drink={drink} />
            </li>
          ))}
        </ul>

        <div className="mt-9 flex justify-center">
          <Button href="/menu" variant="ghost">
            View Full Menu
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
        </div>
      </Reveal>

      <Reveal
        delay={0.1}
        className="relative overflow-hidden rounded-card border border-white/70 bg-gradient-to-br from-blush to-petal/70 p-6 shadow-soft sm:p-9"
      >
        {/* Two columns so the bunny can never crowd the copy. */}
        <div className="grid h-full grid-cols-[minmax(0,1fr)_auto] items-end gap-2">
          <div className="self-start pb-2">
            <h2 className="flex items-center gap-3 text-3xl sm:text-[2.1rem]">
              About Tezzy
              <HeartMark className="h-5 w-5 shrink-0 text-candy" />
            </h2>
            <p className="mt-4 max-w-sm text-lg leading-relaxed text-mocha">
              We&rsquo;re here to make your day a little sweeter. With cute drinks, soft friends, and
              lots of love in every cup.
            </p>
            <Button href="/about" variant="ghost" className="mt-6">
              Read Our Story
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
          </div>

          <div className="relative -mb-6 -mr-2 w-24 self-end sm:-mb-9 sm:-mr-5 sm:w-40 lg:w-44">
            <HeartMark
              aria-hidden="true"
              className="absolute -left-4 top-6 hidden h-6 w-6 text-candy/70 sm:block motion-safe:animate-bob"
            />
            <Image
              src="/images/bunny.png"
              alt=""
              aria-hidden="true"
              width={508}
              height={672}
              sizes="(max-width: 640px) 25vw, 180px"
              className="pointer-events-none h-auto w-full motion-safe:animate-float"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
