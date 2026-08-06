/**
 * Single source of truth for everything the client will want to edit without
 * touching a component: name, contact details, socials, and navigation.
 */
export const site = {
  name: "Tezzy",
  legalName: "Tezzy Drinks Co.",
  domain: "tezzy.ca",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://tezzy.ca",
  tagline: "Cute drinks, sweet hugs.",
  description:
    "Tezzy serves cute drinks with a plush friend on the side — iced lattes, frappes, milkshakes and Italian sodas, made fresh for cozy moments, pop-ups and events.",
  shortDescription: "Every drink comes with a little friend.",
  email: "hello@tezzy.ca",
  bookingEmail: "events@tezzy.ca",
  phone: "+1 (416) 555-0134",
  phoneHref: "+14165550134",
  city: "Toronto",
  region: "ON",
  regionName: "Ontario",
  country: "CA",
  serviceArea: "Toronto & the GTA",
  hours: [
    { days: "Monday – Thursday", time: "11:00 – 20:00" },
    { days: "Friday – Saturday", time: "11:00 – 22:00" },
    { days: "Sunday", time: "12:00 – 18:00" },
  ],
  socials: {
    instagram: "https://instagram.com/tezzy.ca",
    tiktok: "https://tiktok.com/@tezzy.ca",
    facebook: "https://facebook.com/tezzy.ca",
  },
} as const;

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About Us" },
  // The mockup labels this slot "Our Friends"; the handoff calls the page
  // "Pop-ups & Events", which is what it actually contains — so the nav says so.
  { href: "/events", label: "Pop-ups & Events" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { href: "/menu", label: "Full menu" },
      { href: "/about", label: "Our story" },
      { href: "/events", label: "Pop-ups & events" },
      { href: "/#gallery", label: "Gallery" },
    ],
  },
  {
    title: "Say hello",
    links: [
      { href: "/contact", label: "Contact us" },
      { href: "/events#book", label: "Book Tezzy" },
      { href: "/#faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];
