import type { Metadata } from "next";

import { JsonLd, faqSchema } from "@/components/JsonLd";
import { AboutSection } from "@/components/sections/AboutSection";
import { BookingSection } from "@/components/sections/BookingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedDrinks } from "@/components/sections/FeaturedDrinks";
import { GallerySection } from "@/components/sections/GallerySection";
import { Hero } from "@/components/sections/Hero";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyTezzy } from "@/components/sections/WhyTezzy";
import { faqs } from "@/data/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDrinks />
      <WhyTezzy />
      <AboutSection />
      <GallerySection />
      <Testimonials />
      <BookingSection />
      <FaqSection />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
