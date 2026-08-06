import { drinks, formatPrice } from "@/data/drinks";
import type { Faq } from "@/data/content";
import type { TezzyEvent } from "@/data/events";
import { site } from "@/lib/site";

/** Renders one or more schema.org graphs into the page head. */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Values come from local data files, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    image: `${site.url}/images/og.png`,
    logo: `${site.url}/images/logo.png`,
    servesCuisine: ["Coffee", "Milkshakes", "Italian sodas"],
    priceRange: "$$",
    areaServed: { "@type": "City", name: site.city },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    sameAs: Object.values(site.socials),
    hasMenu: `${site.url}/menu`,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en-CA",
    publisher: { "@id": `${site.url}/#business` },
  };
}

export function menuSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `${site.name} menu`,
    url: `${site.url}/menu`,
    hasMenuItem: drinks.map((drink) => ({
      "@type": "MenuItem",
      name: drink.name,
      description: drink.description,
      offers: {
        "@type": "Offer",
        price: drink.price.toFixed(2),
        priceCurrency: "CAD",
        // Human-readable duplicate for crawlers that show the raw string.
        description: formatPrice(drink.price),
      },
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function eventsSchema(events: TezzyEvent[]) {
  return events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.date,
    endDate: event.endDate ?? event.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: event.blurb,
    url: event.url,
    location: {
      "@type": "Place",
      name: event.venue,
      address: { "@type": "PostalAddress", addressLocality: event.city },
    },
    organizer: { "@id": `${site.url}/#business` },
  }));
}
