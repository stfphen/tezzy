import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * public/images/logo.png is 406×233 — an aspect ratio with no whole-pixel
 * rendering at these sizes. So next/image gets the true intrinsic dimensions
 * and CSS does the scaling (`w-*` plus `h-auto`), which is the pattern
 * next/image expects; passing rounded width/height instead makes it warn that
 * one dimension was modified without the other.
 */
const INTRINSIC = { width: 406, height: 233 } as const;

const sizes = {
  sm: { css: "w-[104px]", hint: 104 },
  md: { css: "w-[148px]", hint: 148 },
  lg: { css: "w-[208px]", hint: 208 },
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
  const { css, hint } = sizes[size];

  const mark = (
    <Image
      src="/images/logo.png"
      alt={`${site.name} — ${site.tagline}`}
      width={INTRINSIC.width}
      height={INTRINSIC.height}
      priority={priority}
      className={cn(css, "h-auto", className)}
      sizes={`${hint}px`}
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
