import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/Button";
import { HeartMark } from "@/components/icons";
import { site } from "@/lib/site";

/**
 * The hero from the mockup: copy on the left, the photograph bleeding off the
 * right edge, soft cloud silhouettes along the bottom.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-blush via-blush/70 to-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-petal/60 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="clouds pointer-events-none absolute bottom-0 left-0 -z-10 h-20 w-full opacity-70 lg:w-1/2"
      />

      <div className="container-tezzy relative grid items-center gap-8 pb-12 pt-10 lg:grid-cols-[46%_54%] lg:gap-4 lg:pb-14 lg:pt-12">
        <div className="relative z-10 flex flex-col items-start gap-6">
          <p className="flex items-center gap-2 font-display text-xs font-extrabold uppercase tracking-[0.24em] text-berry sm:text-sm">
            Welcome to {site.name}
            <HeartMark className="h-4 w-4 text-candy" />
          </p>

          <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.2rem]">
            Cute drinks,
            <br />
            <span className="inline-flex flex-wrap items-center gap-4">
              sweet hugs.
              <HeartMark className="h-9 w-9 shrink-0 text-candy motion-safe:animate-bob sm:h-12 sm:w-12" />
            </span>
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-mocha">
            Every drink comes with a little friend.
            <br />
            Made with love, for your cozy moments.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button href="/menu" size="lg">
              See Our Menu
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
            <Button href="/events#book" variant="ghost" size="lg">
              Book us for an event
            </Button>
          </div>
        </div>

        <div className="relative lg:-mr-[9vw] xl:-mr-[11vw]">
          <Image
            src="/images/hero.png"
            alt="A strawberry milkshake and an iced latte from Tezzy, each with a plush bear or bunny clipped to the cup, in front of a large pink teddy bear"
            width={1302}
            height={804}
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="h-auto w-full drop-shadow-[0_30px_60px_rgba(123,59,47,0.12)]"
          />
        </div>
      </div>

    </section>
  );
}
