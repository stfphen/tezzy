import Link from "next/link";
import type { ReactNode } from "react";

import { HeartMark } from "@/components/icons";

type Crumb = { href: string; label: string };

/** The compact header band every page below the home page opens with. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-blush to-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-16 -z-10 h-64 w-64 rounded-full bg-petal/70 blur-3xl"
      />

      <div className="container-tezzy flex flex-col items-center gap-5 py-14 text-center sm:py-20">
        {crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs font-semibold text-mocha">
              <li>
                <Link href="/" className="transition-colors hover:text-berry">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  <Link href={crumb.href} className="transition-colors hover:text-berry">
                    {crumb.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? (
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.24em] text-berry">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="text-4xl leading-tight sm:text-5xl lg:text-[3.4rem]">
          {title}
          <HeartMark className="ml-3 inline-block h-6 w-6 align-[0.05em] text-candy sm:h-8 sm:w-8" />
        </h1>

        {subtitle ? (
          <p className="max-w-2xl text-base leading-relaxed text-mocha sm:text-lg">{subtitle}</p>
        ) : null}

        {children}
      </div>
    </section>
  );
}
