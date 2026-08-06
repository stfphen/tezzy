import type { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/components/Button";
import { EventCard } from "@/components/EventCard";
import { JsonLd, eventsSchema } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { BookingSection } from "@/components/sections/BookingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { pastEvents, upcomingEvents } from "@/data/events";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pop-ups & Events",
  description:
    "Where to find Tezzy next — markets, festivals and conventions across Toronto and the GTA — plus how to book our mobile drinks bar for your own event.",
  alternates: { canonical: "/events" },
  openGraph: {
    title: `Pop-ups & Events — ${site.name}`,
    description: "Find us at markets and festivals, or book the bar for your own event.",
    url: `${site.url}/events`,
  },
};

// Dates are compared against "now", so this page is rendered per request.
export const revalidate = 3600;

const friends = [
  {
    name: "The bear",
    image: "/images/gallery/06-bear-keychain.jpg",
    body: "Tan, slightly serious, comes with every coffee and every chocolate drink. Has been to more weddings than most of us.",
  },
  {
    name: "The bunny",
    image: "/images/gallery/04-bunny-friend.jpg",
    body: "Cream with a pink bow, rides along with the sodas, shakes and anything strawberry. The one people queue twice for.",
  },
];

export default function EventsPage() {
  const upcoming = upcomingEvents();
  const past = pastEvents().slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Pop-ups & events"
        title="Come find us"
        subtitle={`We're out across ${site.serviceArea} most weekends — and the rest of the time we're parked at somebody's birthday. Here's what's next.`}
        crumbs={[{ href: "/events", label: "Pop-ups & Events" }]}
      >
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button href="#book" size="lg">
            Book Tezzy for your event
          </Button>
          <Button href={site.socials.instagram} variant="ghost" size="lg">
            Follow for new dates
          </Button>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          align="left"
          eyebrow="Coming up"
          title={upcoming.length > 0 ? "Where we'll be next" : "Between dates right now"}
          subtitle={
            upcoming.length > 0
              ? "Free entry unless the venue says otherwise. Drinks are made to order, and every cup leaves with a friend."
              : "Nothing on the calendar this minute — follow along on Instagram, or book us privately and we'll come to you."
          }
        />

        {upcoming.length > 0 ? (
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {upcoming.map((event, index) => (
              <Reveal as="li" key={event.slug} delay={index * 0.07} className="h-full">
                <EventCard event={event} />
              </Reveal>
            ))}
          </ul>
        ) : null}
      </Section>

      {past.length > 0 ? (
        <Section tone="blush" space="sm">
          <SectionHeading align="left" eyebrow="Recently" title="Where we've been" />
          <ul className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6">
            {past.map((event, index) => (
              <Reveal as="li" key={event.slug} delay={index * 0.07} className="h-full">
                <EventCard event={event} past />
              </Reveal>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section space="sm">
        <SectionHeading
          eyebrow="Our friends"
          title="Meet the two who come with you"
          subtitle="Every drink is served with one of them clipped to the cup. Which one you get depends on what you order — and yes, you can ask to swap."
        />

        <ul className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2 sm:gap-6">
          {friends.map((friend, index) => (
            <Reveal
              as="li"
              key={friend.name}
              delay={index * 0.1}
              className="flex h-full flex-col overflow-hidden rounded-card border border-white/70 bg-shell/90 shadow-soft"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={friend.image}
                  alt={friend.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 340px"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-extrabold text-cocoa">{friend.name}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mocha">{friend.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <BookingSection heading="Tell us about your event" />

      <FaqSection />

      <JsonLd data={eventsSchema(upcoming)} />
    </>
  );
}
