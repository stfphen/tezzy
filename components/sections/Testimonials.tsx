import { Star } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { testimonials } from "@/data/content";

export function Testimonials() {
  return (
    <Section tone="blush">
      <SectionHeading
        eyebrow="Kind words"
        title="What people say"
        subtitle="Mostly about the bears, honestly."
      />

      <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
        {testimonials.map((testimonial, index) => (
          <Reveal
            as="li"
            key={testimonial.name}
            delay={index * 0.1}
            className="flex h-full flex-col rounded-card border border-white/70 bg-cream/90 p-6 shadow-soft sm:p-7"
          >
            {/* role="img" so the label is permitted and read as one unit. */}
            <div role="img" aria-label="Rated 5 out of 5" className="flex gap-1 text-candy">
              {Array.from({ length: 5 }).map((_, star) => (
                <Star key={star} aria-hidden="true" className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              ))}
            </div>

            <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-mocha">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <footer className="mt-5 border-t border-white/80 pt-4">
              <p className="font-display text-sm font-extrabold text-cocoa">{testimonial.name}</p>
              <p className="text-xs text-mocha">{testimonial.context}</p>
            </footer>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
