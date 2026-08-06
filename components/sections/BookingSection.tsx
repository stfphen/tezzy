import { CalendarHeart, Clock, MapPin, Users } from "lucide-react";

import { BookingForm } from "@/components/BookingForm";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { bookingSteps } from "@/data/content";
import { site } from "@/lib/site";

const highlights = [
  { Icon: Users, label: "10 to 500 guests" },
  { Icon: MapPin, label: site.serviceArea },
  { Icon: Clock, label: "Set up in under an hour" },
  { Icon: CalendarHeart, label: "Quote within one business day" },
];

/**
 * The lead-capture section. Rendered on the home page and again on
 * /events#book — both anchor to the same `#book` id.
 */
export function BookingSection({ heading = "Book Tezzy for your event" }: { heading?: string }) {
  return (
    <Section id="book" tone="blush">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Events & pop-ups"
            title={heading}
            subtitle="Birthdays, bachelorettes, weddings, baby showers, markets, corporate days and festivals. We bring the bar, the drinks and a plush friend for every guest."
          />

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 rounded-2xl bg-cream/80 px-4 py-3 text-sm font-semibold text-cocoa shadow-soft"
              >
                <Icon aria-hidden="true" className="h-4.5 w-4.5 shrink-0 text-candy" />
                {label}
              </li>
            ))}
          </ul>

          <ol className="mt-9 flex flex-col gap-5">
            {bookingSteps.map((step, index) => (
              <Reveal as="li" key={step.title} delay={index * 0.08} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-candy font-display text-sm font-extrabold text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-extrabold text-cocoa">{step.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-mocha">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <p className="mt-8 text-sm text-mocha">
            Prefer email? Write to{" "}
            <a
              href={`mailto:${site.bookingEmail}`}
              className="font-semibold text-berry underline underline-offset-2"
            >
              {site.bookingEmail}
            </a>
            .
          </p>
        </div>

        <Reveal direction="right">
          <BookingForm />
        </Reveal>
      </div>
    </Section>
  );
}
