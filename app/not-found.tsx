import Image from "next/image";

import { Button } from "@/components/Button";
import { HeartMark } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="container-tezzy flex flex-col items-center gap-6 py-20 text-center sm:py-28">
      {/* Soft blush disc behind the plush so its crop edge doesn't show on cream. */}
      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-petal/70 blur-2xl sm:h-72 sm:w-72"
        />
        <Image
          src="/images/bunny.png"
          alt=""
          aria-hidden="true"
          width={508}
          height={672}
          sizes="220px"
          className="w-44 motion-safe:animate-float sm:w-56"
        />
      </div>

      <p className="font-display text-xs font-extrabold uppercase tracking-[0.24em] text-berry">
        404
      </p>

      <h1 className="flex flex-wrap items-center justify-center gap-3 text-4xl sm:text-5xl">
        This page went for a walk
        <HeartMark className="h-7 w-7 shrink-0 text-candy" />
      </h1>

      <p className="max-w-md text-lg text-mocha">
        We couldn&rsquo;t find that one. The menu is still where you left it, though.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/" size="lg">
          Back home
        </Button>
        <Button href="/menu" variant="outline" size="lg">
          See the menu
        </Button>
      </div>
    </section>
  );
}
