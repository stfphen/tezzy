import type { Metadata, Viewport } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/JsonLd";
import { brand } from "@/lib/brand";
import { site } from "@/lib/site";

import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Tezzy",
    "cute drinks Toronto",
    "iced latte",
    "milkshakes",
    "Italian soda",
    "frappé",
    "drinks bar hire",
    "event catering Toronto",
    "pop-up drinks",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.shortDescription,
    images: ["/images/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "food and drink",
};

export const viewport: Viewport = {
  themeColor: brand.cream,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-CA" className={`${nunito.variable} ${nunitoSans.variable}`}>
      <body className="flex min-h-dvh flex-col overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-candy focus:px-5 focus:py-3 focus:font-display focus:font-bold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
