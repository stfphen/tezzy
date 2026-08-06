import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles the information you send through the booking form.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const updated = "6 August 2026";

const sections = [
  {
    heading: "What we collect",
    body: [
      `When you send an enquiry through the booking form we collect the details you type into it: your name, email address, phone number, event type, date, guest count, city, whether the event is indoor or outdoor, your budget range, and any notes you add.`,
      `We don't run analytics, advertising pixels, or third-party trackers on this site, and we don't set any cookies of our own.`,
    ],
  },
  {
    heading: "Why we collect it",
    body: [
      `Only to reply to you and to quote for your event. We don't add you to a mailing list, and we don't sell, rent or share your details with anyone for marketing.`,
    ],
  },
  {
    heading: "Where it goes",
    body: [
      `Enquiries are delivered to our own inbox, and — depending on how the site is configured — may pass through our email provider and our hosting provider on the way. Those providers process the message on our behalf and don't use it for anything else.`,
      `Our site is hosted on Vercel, whose servers keep short-lived request logs (including IP addresses) for security and abuse prevention.`,
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      `We keep enquiry emails for two years so we can pick up a conversation about a repeat booking, then delete them. Ask us to delete yours sooner and we will.`,
    ],
  },
  {
    heading: "Your choices",
    body: [
      `You can ask us for a copy of what we hold about you, ask us to correct it, or ask us to delete it. Email ${site.email} and we'll action it within 30 days.`,
      `If you're in Canada and you're not happy with how we've handled a request, you can raise it with the Office of the Privacy Commissioner of Canada.`,
    ],
  },
  {
    heading: "Children",
    body: [
      `This site isn't aimed at children, and we don't knowingly collect information from anyone under 13. If a booking is being arranged for a child's party, we only need the details of the adult organising it.`,
    ],
  },
  {
    heading: "Changes",
    body: [
      `If we change this notice we'll update the date at the top. Material changes will be flagged on the booking form itself.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy notice"
        subtitle="The short version: we use your details to reply to you about your event, and nothing else."
        crumbs={[{ href: "/privacy", label: "Privacy" }]}
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mocha">
            Last updated {updated}
          </p>

          <div className="mt-8 flex flex-col gap-9">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-relaxed text-mocha">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <section>
              <h2 className="text-2xl">Contact us</h2>
              <p className="mt-3 leading-relaxed text-mocha">
                Questions about any of this go to{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-berry underline underline-offset-2"
                >
                  {site.email}
                </a>
                , or through the{" "}
                <Link href="/contact" className="font-semibold text-berry underline underline-offset-2">
                  contact page
                </Link>
                .
              </p>
            </section>
          </div>

          <p className="mt-12 rounded-card bg-petal/60 px-6 py-5 text-sm leading-relaxed text-mocha">
            This notice is a starting point written for a small Canadian business and is not legal
            advice. Have it reviewed before launch, and update the provider names above to match what
            you actually deploy.
          </p>
        </div>
      </Section>
    </>
  );
}
