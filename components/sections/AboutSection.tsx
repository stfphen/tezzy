import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { story } from "@/data/content";

/** The longer "about" block used on the home page, above Why Tezzy. */
export function AboutSection() {
  return (
    <Section id="about" tone="blush">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal direction="left" className="relative">
          <div className="relative overflow-hidden rounded-card shadow-lift">
            <Image
              src="/images/gallery/02-bear-hug.jpg"
              alt="The large pink Tezzy bear that travels to every pop-up"
              width={680}
              height={670}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-card bg-white/95 px-6 py-4 shadow-soft sm:block">
            <p className="font-display text-3xl font-extrabold text-cocoa">2,000+</p>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mocha">
              friends adopted
            </p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Our story"
            title="It started with one blender and a box of bears"
            subtitle="Tezzy is a small, mobile drinks bar built around a simple idea: a good drink is better when it comes with something to hug."
          />

          <ol className="mt-8 flex flex-col gap-6">
            {story.map((step, index) => (
              <Reveal as="li" key={step.year} delay={index * 0.08} className="flex gap-5">
                <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-candy/30 font-display text-xs font-extrabold text-cocoa">
                  {step.year}
                </span>
                <div>
                  <h3 className="text-lg font-extrabold text-cocoa">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-mocha sm:text-base">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Button href="/about" variant="outline" className="mt-8">
            More about us
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Button>
        </div>
      </div>
    </Section>
  );
}
