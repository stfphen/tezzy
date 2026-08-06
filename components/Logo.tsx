import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";

const sizes = {
  sm: { width: 104, height: 60 },
  md: { width: 148, height: 85 },
  lg: { width: 208, height: 119 },
} as const;

type LogoProps = {
  size?: keyof typeof sizes;
  /** Render as a plain image (e.g. inside the footer heading) instead of a home link. */
  asLink?: boolean;
  className?: string;
  priority?: boolean;
};

/**
 * The script wordmark, cut from reference/logo-reference.jpeg by
 * tools/extract_assets.py so it keeps its pink outline over any pink surface.
 */
export function Logo({ size = "md", asLink = true, className, priority }: LogoProps) {
  const { width, height } = sizes[size];

  const mark = (
    <Image
      src="/images/logo.png"
      alt={`${site.name} — ${site.tagline}`}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={`${width}px`}
    />
  );

  if (!asLink) return mark;

  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className="inline-flex shrink-0 transition-transform duration-300 hover:-rotate-2 hover:scale-105"
    >
      {mark}
    </Link>
  );
}
