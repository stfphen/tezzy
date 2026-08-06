import type { Metadata } from "next";

import { Button } from "@/components/Button";
import { DrinkCard } from "@/components/DrinkCard";
import { JsonLd, menuSchema } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { drinkCategories, drinks, drinksByCategory } from "@/data/drinks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "The full Tezzy menu: iced coffee, frappés, milkshakes and Italian sodas — twelve drinks, every one served with a plush friend.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: `Menu — ${site.name}`,
    description: "Twelve drinks, every one served with a plush friend.",
    url: `${site.url}/menu`,
  },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="The menu"
        title="Made fresh. Made cute."
        subtitle={`Twelve drinks, four ways to have them cold. Every cup leaves with a bear or a bunny — that part isn't optional.`}
        crumbs={[{ href: "/menu", label: "Menu" }]}
      >
        <nav aria-label="Menu categories" className="mt-2">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {drinkCategories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="inline-flex rounded-pill bg-white/80 px-4 py-2 font-display text-sm font-bold text-berry shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {drinkCategories.map((category, index) => (
        <Section
          key={category.id}
          id={category.id}
          tone={index % 2 === 1 ? "blush" : "plain"}
          space="md"
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl sm:text-[2.15rem]">{category.name}</h2>
            <p className="text-base text-mocha">{category.blurb}</p>
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {drinksByCategory(category.id).map((drink, drinkIndex) => (
              <Reveal as="li" key={drink.slug} delay={drinkIndex * 0.07} className="h-full">
                <DrinkCard drink={drink} />
              </Reveal>
            ))}
          </ul>
        </Section>
      ))}

      <Section space="sm">
        <div className="flex flex-col items-center gap-5 rounded-card bg-petal/70 px-6 py-10 text-center shadow-soft sm:px-10">
          <h2 className="text-2xl sm:text-3xl">Want all {drinks.length} at your event?</h2>
          <p className="max-w-xl text-mocha">
            We bring the whole menu, the bar and a plush friend for every guest. Tell us the date and
            we&rsquo;ll send a quote within one business day.
          </p>
          <Button href="/events#book" size="lg">
            Book Tezzy
          </Button>
        </div>
      </Section>

      <JsonLd data={menuSchema()} />
    </>
  );
}
