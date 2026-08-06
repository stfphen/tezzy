import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { HeartMark } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { footerLinks, site } from "@/lib/site";

const socials = [
  { href: site.socials.instagram, label: "Instagram", Icon: Instagram },
  { href: site.socials.tiktok, label: "TikTok", Icon: TikTokIcon },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.6 5.8a4.9 4.9 0 0 1-1.2-3.2h-3v13a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12v-3.1a5.7 5.7 0 1 0 4.82 5.62V9.2a7.9 7.9 0 0 0 4.6 1.47V7.6a4.9 4.9 0 0 1-3.4-1.8Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-8 bg-petal/70">
      <div className="container-tezzy grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] lg:gap-12">
        <div className="flex flex-col items-start gap-4">
          <Logo size="md" />
          <p className="max-w-xs text-sm leading-relaxed text-mocha">
            {site.description}
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${site.name} on ${label}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-berry shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="font-display text-base font-extrabold text-cocoa">{group.title}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-mocha transition-colors hover:text-berry"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="font-display text-base font-extrabold text-cocoa">Find us</h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-mocha">
            <li className="flex items-start gap-2.5">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-candy" />
              <span>{site.serviceArea} — we come to you</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-candy" />
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-berry">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-candy" />
              <a href={`tel:${site.phoneHref}`} className="transition-colors hover:text-berry">
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/70">
        <div className="container-tezzy flex flex-col items-center justify-between gap-3 py-6 text-xs text-mocha sm:flex-row">
          <p className="flex items-center gap-2">
            <HeartMark className="h-3.5 w-3.5 text-candy" />
            © {new Date().getFullYear()} {site.legalName}. Made with love.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-berry">
              Privacy
            </Link>
            <Link href="/contact" className="transition-colors hover:text-berry">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
