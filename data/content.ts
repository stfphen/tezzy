/**
 * Editorial content: the bits of copy that repeat across pages.
 * Placeholder CMS data — safe to replace wholesale.
 */

export type Testimonial = {
  quote: string;
  name: string;
  context: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We booked Tezzy for my sister's bachelorette and the plush friends ended up in every single photo. Nobody talked about anything else all night.",
    name: "Amara O.",
    context: "Bachelorette, Toronto",
  },
  {
    quote:
      "The strawberry milkshake is genuinely the best I've had in the city, and my daughter has not let go of her bunny since June.",
    name: "Priya S.",
    context: "Queen West Night Market",
  },
  {
    quote:
      "They ran our office launch for 120 people and were set up, serving and delightful within twenty minutes. Zero mess left behind.",
    name: "Daniel R.",
    context: "Corporate event, Mississauga",
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "Does every drink really come with a plush friend?",
    answer:
      "Yes. Every drink is served with a little bear or bunny clipped to the cup, and it's yours to take home. At events we bring enough friends for every guest, plus spares — someone always wants a second one.",
  },
  {
    question: "Where can I find you?",
    answer:
      "Tezzy is a mobile drinks bar. We pop up at markets, festivals and conventions around Toronto and the GTA, and we're booked privately for events. Our upcoming dates are on the Pop-ups & Events page.",
  },
  {
    question: "Can you cater my event?",
    answer:
      "We do birthdays, bachelorettes, weddings, baby showers, markets, corporate events and festivals. Tell us the date, the headcount and roughly where you are, and we'll come back with a quote within one business day.",
  },
  {
    question: "Do you have dairy-free options?",
    answer:
      "Oat milk is available on any coffee drink for $0.75, and all four Italian sodas are dairy-free as they come. Frappés and milkshakes are dairy-based — ask us and we'll suggest the closest thing.",
  },
  {
    question: "How much space do you need at a venue?",
    answer:
      "A 10ft by 10ft footprint and one standard outlet is plenty. We're fully self-contained otherwise: our own water, our own power bank for outdoor sites, and we pack out everything we bring in.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "Four to six weeks is comfortable for a weekend date, and summer weekends go early. If your date is sooner than that, ask anyway — we keep a couple of slots open for short notice.",
  },
  {
    question: "Do you travel outside Toronto?",
    answer:
      "We serve Toronto and the GTA as standard. Anywhere past that we're happy to talk about it; there's a travel fee past 50km and we'll always quote it up front.",
  },
];

export type WhyPoint = {
  title: string;
  body: string;
  icon: "cup" | "bear" | "heart" | "pin";
};

export const whyTezzy: WhyPoint[] = [
  {
    title: "Cute Drinks",
    body: "Made with quality ingredients",
    icon: "cup",
  },
  {
    title: "Little Friends",
    body: "Each drink comes with a plush friend",
    icon: "bear",
  },
  {
    title: "Made with Love",
    body: "We care about every little detail",
    icon: "heart",
  },
  {
    title: "Find Us",
    body: "Join us at events and pop-ups!",
    icon: "pin",
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
  /**
   * Tile span inside the 6-column grid on sm+ (everything is 1×1 on mobile).
   * The spans below tile exactly into two rows — 4 + 2 + 2 + 2 + 1 + 1 = 12 —
   * so the grid never leaves a hole. Adjust them together.
   */
  span?: string;
};

export const gallery: GalleryImage[] = [
  {
    src: "/images/gallery/01-tezzy-duo.jpg",
    alt: "A strawberry milkshake and an iced latte side by side, each with a plush friend clipped to the cup",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/images/gallery/02-bear-hug.jpg",
    alt: "A large pink teddy bear watching over the drinks counter",
    span: "sm:col-span-2",
  },
  {
    src: "/images/gallery/05-good-drinks.jpg",
    alt: "A pink sign reading Good Drinks Good Mood beside the counter",
    span: "sm:col-span-2",
  },
  {
    src: "/images/gallery/03-strawberry-cup.jpg",
    alt: "Close-up of the strawberry milkshake in a Tezzy cup with real strawberry pieces",
    span: "sm:col-span-2",
  },
  {
    src: "/images/gallery/04-bunny-friend.jpg",
    alt: "A cream plush bunny with a pink bow leaning against a drink",
  },
  {
    src: "/images/gallery/06-bear-keychain.jpg",
    alt: "A small tan teddy bear keychain clipped to a cup of iced coffee",
  },
];

export type StoryStep = {
  year: string;
  title: string;
  body: string;
};

export const story: StoryStep[] = [
  {
    year: "2023",
    title: "One blender, one folding table",
    body: "Tezzy started as a single stall at a spring market in Toronto with a hand-written menu and a box of plush bears a friend had spare. We sold out by two in the afternoon.",
  },
  {
    year: "2024",
    title: "The friends came first",
    body: "People kept coming back for the bears more than the drinks, so we made it the whole point: every cup leaves with a friend attached. That's when the queues started.",
  },
  {
    year: "2025",
    title: "A proper little bar",
    body: "We built a mobile bar we could take anywhere — markets, conventions, back gardens — and started taking private bookings for birthdays and weddings.",
  },
  {
    year: "Now",
    title: "Wherever you need us",
    body: "Twelve drinks, two plush friends, and a calendar that fills up fast. We're across Toronto and the GTA most weekends, and yours if you ask nicely.",
  },
];

export type BookingStep = {
  title: string;
  body: string;
};

export const bookingSteps: BookingStep[] = [
  {
    title: "Tell us about it",
    body: "Fill in the form with your date, headcount and city. Thirty seconds, no phone call required.",
  },
  {
    title: "We send a quote",
    body: "Within one business day you'll get a plain-English quote — drinks, plush friends, staffing and travel, all itemised.",
  },
  {
    title: "We show up early",
    body: "We arrive ahead of your guests, set up in under an hour, serve, and leave the space exactly as we found it.",
  },
];
