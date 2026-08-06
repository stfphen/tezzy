/**
 * Pop-ups, markets and festivals.
 *
 * Placeholder CMS data — replace with a real feed that returns the same shape.
 * `date` is an ISO date (and optional time) in local Toronto time; the helpers
 * below decide what counts as upcoming so the page never shows a stale line-up.
 */

export type TezzyEvent = {
  slug: string;
  name: string;
  /** ISO 8601, e.g. "2026-08-22" or "2026-08-22T11:00". */
  date: string;
  endDate?: string;
  time: string;
  venue: string;
  city: string;
  blurb: string;
  /** Ticket or host page, if there is one. */
  url?: string;
  soldOut?: boolean;
};

export const events: TezzyEvent[] = [
  {
    slug: "queen-west-night-market",
    name: "Queen West Night Market",
    date: "2026-08-22",
    time: "5:00 pm – 11:00 pm",
    venue: "Trinity Bellwoods Park",
    city: "Toronto, ON",
    blurb: "Our full frappé line-up plus a limited peach soda made for the night market.",
    url: "https://example.com/queen-west-night-market",
  },
  {
    slug: "cutie-con",
    name: "Cutie Con",
    date: "2026-09-05",
    endDate: "2026-09-06",
    time: "10:00 am – 6:00 pm",
    venue: "Metro Toronto Convention Centre",
    city: "Toronto, ON",
    blurb: "Two days, two thousand plush friends, and a very tired blender. Booth 214.",
    url: "https://example.com/cutie-con",
  },
  {
    slug: "harbourfront-sweet-social",
    name: "Harbourfront Sweet Social",
    date: "2026-09-19",
    time: "12:00 pm – 8:00 pm",
    venue: "Harbourfront Centre",
    city: "Toronto, ON",
    blurb: "Milkshakes by the water with a bear for every cup. Free entry.",
  },
  {
    slug: "mississauga-makers-market",
    name: "Mississauga Makers Market",
    date: "2026-10-03",
    time: "11:00 am – 5:00 pm",
    venue: "Celebration Square",
    city: "Mississauga, ON",
    blurb: "Our first market west of the city — come say hi and steal a bunny.",
    soldOut: true,
  },
  {
    slug: "holiday-plush-popup",
    name: "Holiday Plush Pop-Up",
    date: "2026-12-06",
    endDate: "2026-12-07",
    time: "11:00 am – 7:00 pm",
    venue: "Distillery District",
    city: "Toronto, ON",
    blurb: "Winter drinks, tiny scarves on every bear, and a lot of fairy lights.",
  },
  {
    slug: "spring-bloom-market",
    name: "Spring Bloom Market",
    date: "2026-05-16",
    time: "10:00 am – 4:00 pm",
    venue: "Evergreen Brick Works",
    city: "Toronto, ON",
    blurb: "Where the strawberry milkshake first sold out in ninety minutes.",
  },
];

/** Event types offered in the booking form — kept here so form and copy agree. */
export const eventTypes = [
  "Birthday",
  "Bachelorette",
  "Wedding",
  "Baby Shower",
  "Market",
  "Corporate",
  "Festival",
  "Other",
] as const;

export type EventType = (typeof eventTypes)[number];

export const budgetRanges = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000+",
  "Not sure yet",
] as const;

export type BudgetRange = (typeof budgetRanges)[number];

export const venueTypes = ["Indoor", "Outdoor", "Both"] as const;

export type VenueType = (typeof venueTypes)[number];

function endOf(event: TezzyEvent): number {
  return new Date(`${event.endDate ?? event.date}T23:59:59`).getTime();
}

export function upcomingEvents(now: Date = new Date()): TezzyEvent[] {
  return events
    .filter((event) => endOf(event) >= now.getTime())
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function pastEvents(now: Date = new Date()): TezzyEvent[] {
  return events
    .filter((event) => endOf(event) < now.getTime())
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatEventDate(event: TezzyEvent): string {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" };
  const start = new Date(`${event.date}T12:00:00`);
  if (!event.endDate) return start.toLocaleDateString("en-CA", opts);

  const end = new Date(`${event.endDate}T12:00:00`);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    const month = start.toLocaleDateString("en-CA", { month: "short" });
    return `${month} ${start.getDate()}–${end.getDate()}, ${end.getFullYear()}`;
  }
  return `${start.toLocaleDateString("en-CA", opts)} – ${end.toLocaleDateString("en-CA", opts)}`;
}
