import { featureIcons } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { whyTezzy } from "@/data/content";

/** The four-up feature strip that closes the mockup's first screen. */
export function WhyTezzy() {
  return (
    <section className="container-tezzy py-6 lg:py-8">
      <Reveal className="rounded-card bg-petal/70 px-6 py-8 shadow-soft sm:px-9 sm:py-9">
        <h2 className="sr-only">Why Tezzy</h2>
        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {whyTezzy.map((point) => {
            const Icon = featureIcons[point.icon];
            return (
              <li key={point.title} className="group flex items-start gap-4">
                <Icon className="h-11 w-11 shrink-0 text-candy transition-transform duration-500 motion-safe:group-hover:scale-110" />
                <div>
                  <h3 className="text-base font-extrabold text-cocoa">{point.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-mocha">{point.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
