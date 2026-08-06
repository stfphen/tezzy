import type { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/Button";
import { featureIcons, HeartMark } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { Testimonials } from "@/components/sections/Testimonials";
import { story, whyTezzy } from "@/data/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Tezzy is a small mobile drinks bar from Toronto built on one idea: a good drink is better when it comes with something to hug.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Us — ${site.name}`,
    description: "A small mobile drinks bar built on one idea: every drink comes with a little friend.",
    url: `${site.url}/about`,
  },
};

const values = [
  {
    title: "Small batch, every time",
    body: "Nothing is pre-mixed and left sitting. Every drink is built when you order it, which is why the queue moves at the pace it does — sorry, and thank you for waiting.",
  },
  {
    title: "The friends are the point",
    body: "We buy our plush friends from a small supplier who makes them to the same spec every run, so the bear you get today is the bear you got last summer.",
  },
  {
    title: "We leave it cleaner",
    body: "Self-contained bar, our own water, and everything we bring in goes back out with us. Venues book us twice for this more than for the drinks.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Hello, we're Tezzy"
        subtitle="We make cute drinks and send them out into the world with a plush friend attached. That's the whole business plan, and it's been working since 2023."
        crumbs={[{ href: "/about", label: "About Us" }]}
      />

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="From one folding table to a full mobile bar"
            />

            <ol className="mt-8 flex flex-col gap-7">
              {story.map((step, index) => (
                <Reveal as="li" key={step.year} delay={index * 0.08} className="flex gap-5">
                  <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-candy/30 font-display text-xs font-extrabold text-cocoa">
                    {step.year}
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-cocoa">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-mocha">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal direction="right" className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-card shadow-lift">
              <Image
                src="/images/gallery/01-tezzy-duo.jpg"
                alt="Two Tezzy drinks side by side, each with a plush friend clipped to the cup"
                width={1000}
                height={820}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-card shadow-soft">
                <Image
                  src="/images/gallery/04-bunny-friend.jpg"
                  alt="A cream plush bunny with a pink bow"
                  width={334}
                  height={570}
                  sizes="(max-width: 1024px) 50vw, 22vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-card shadow-soft">
                <Image
                  src="/images/gallery/05-good-drinks.jpg"
                  alt="A pink sign reading Good Drinks Good Mood"
                  width={570}
                  height={770}
                  sizes="(max-width: 1024px) 50vw, 22vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="blush">
        <SectionHeading
          eyebrow="What we care about"
          title="Three things we won't cut corners on"
        />

        <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {values.map((value, index) => (
            <Reveal
              as="li"
              key={value.title}
              delay={index * 0.09}
              className="h-full rounded-card border border-white/70 bg-cream/90 p-6 shadow-soft sm:p-7"
            >
              <HeartMark className="h-6 w-6 text-candy" />
              <h3 className="mt-4 text-lg font-extrabold text-cocoa">{value.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-mocha">{value.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section space="sm">
        <ul className="grid gap-7 rounded-card bg-petal/70 px-6 py-9 sm:grid-cols-2 sm:px-9 lg:grid-cols-4">
          {whyTezzy.map((point) => {
            const Icon = featureIcons[point.icon];
            return (
              <li key={point.title} className="flex items-start gap-4">
                <Icon className="h-11 w-11 shrink-0 text-candy" />
                <div>
                  <h3 className="text-base font-extrabold text-cocoa">{point.title}</h3>
                  <p className="mt-1 text-sm leading-snug text-mocha">{point.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Testimonials />

      <Section space="sm">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-2xl sm:text-3xl">Come find us, or have us come to you</h2>
          <p className="max-w-xl text-mocha">
            We&rsquo;re out most weekends across {site.serviceArea}, and we take private bookings all
            year round.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/events">See where we&rsquo;ll be</Button>
            <Button href="/events#book" variant="outline">
              Book us for an event
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
