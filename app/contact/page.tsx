import { Clock, Instagram, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { BookingSection } from "@/components/sections/BookingSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — email, phone, socials, and the booking form for events across ${site.serviceArea}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${site.name}`,
    description: `Email, phone and bookings for ${site.name}.`,
    url: `${site.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Say hello"
        subtitle="Questions about the menu, a date you want to hold, or just want to know which bear is in stock — we answer everything within one business day."
        crumbs={[{ href: "/contact", label: "Contact" }]}
      />

      <Section space="sm">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <Reveal className="h-full rounded-card border border-white/70 bg-shell/90 p-6 shadow-soft">
            <Mail aria-hidden="true" className="h-8 w-8 text-candy" />
            <h2 className="mt-4 font-display text-base font-extrabold text-cocoa">Email</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 block break-words text-sm text-mocha transition-colors hover:text-berry"
            >
              {site.email}
            </a>
            <a
              href={`mailto:${site.bookingEmail}`}
              className="mt-1 block break-words text-sm text-mocha transition-colors hover:text-berry"
            >
              {site.bookingEmail}
            </a>
          </Reveal>

          <Reveal delay={0.06} className="h-full rounded-card border border-white/70 bg-shell/90 p-6 shadow-soft">
            <Phone aria-hidden="true" className="h-8 w-8 text-candy" />
            <h2 className="mt-4 font-display text-base font-extrabold text-cocoa">Phone</h2>
            <a
              href={`tel:${site.phoneHref}`}
              className="mt-1 block text-sm text-mocha transition-colors hover:text-berry"
            >
              {site.phone}
            </a>
            <p className="mt-1 text-xs text-mocha">Texts are fine, and usually faster.</p>
          </Reveal>

          <Reveal delay={0.12} className="h-full rounded-card border border-white/70 bg-shell/90 p-6 shadow-soft">
            <MapPin aria-hidden="true" className="h-8 w-8 text-candy" />
            <h2 className="mt-4 font-display text-base font-extrabold text-cocoa">Where we are</h2>
            <p className="mt-1 text-sm text-mocha">
              {site.serviceArea}. We&rsquo;re mobile — there&rsquo;s no shop to visit, we come to you.
            </p>
          </Reveal>

          <Reveal delay={0.18} className="h-full rounded-card border border-white/70 bg-shell/90 p-6 shadow-soft">
            <Instagram aria-hidden="true" className="h-8 w-8 text-candy" />
            <h2 className="mt-4 font-display text-base font-extrabold text-cocoa">Socials</h2>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 block text-sm text-mocha transition-colors hover:text-berry"
            >
              Instagram
            </a>
            <a
              href={site.socials.tiktok}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 block text-sm text-mocha transition-colors hover:text-berry"
            >
              TikTok
            </a>
          </Reveal>
        </div>

        <Reveal className="mt-6 rounded-card bg-petal/70 px-6 py-7 shadow-soft sm:px-9">
          <h2 className="flex items-center gap-3 font-display text-base font-extrabold text-cocoa">
            <Clock aria-hidden="true" className="h-5 w-5 text-candy" />
            When we reply
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {site.hours.map((slot) => (
              <li key={slot.days} className="text-sm text-mocha">
                <span className="block font-semibold text-cocoa">{slot.days}</span>
                {slot.time}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <BookingSection heading="Or send us the details" />
    </>
  );
}
