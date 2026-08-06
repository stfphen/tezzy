import { Plus } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { type Faq, faqs as defaultFaqs } from "@/data/content";

/**
 * Native <details> accordion — keyboard accessible and works without JS.
 * The FAQPage structured data is emitted by whichever page renders this.
 */
export function FaqSection({ faqs = defaultFaqs }: { faqs?: Faq[] }) {
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Things people ask us"
        subtitle="Still wondering something? Send us a note — we answer everything."
      />

      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
        {faqs.map((faq, index) => (
          <Reveal key={faq.question} delay={index * 0.05}>
            <details className="group rounded-card border border-white/70 bg-shell/90 px-5 py-4 shadow-soft transition-colors open:bg-white/95 sm:px-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-extrabold text-cocoa marker:content-none sm:text-lg">
                {faq.question}
                <Plus
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0 text-candy transition-transform duration-300 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-mocha">{faq.answer}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
