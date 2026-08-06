import type { ReactNode } from "react";

import { HeartMark } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
  /** Heading level — pages should still have exactly one h1. */
  as?: "h1" | "h2";
};

/** Eyebrow, title, little heart, subtitle — the heading rhythm from the mockup. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-berry">
          {eyebrow}
        </p>
      ) : null}

      {/* The heart trails the last word rather than sitting on its own line. */}
      <Tag className="text-3xl leading-tight sm:text-4xl md:text-[2.75rem]">
        {title}
        <HeartMark className="ml-3 inline-block h-5 w-5 align-[0.02em] text-candy sm:h-6 sm:w-6" />
      </Tag>

      {subtitle ? (
        <p className={cn("max-w-2xl text-base text-mocha sm:text-lg", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Background treatment. `plain` inherits the page cream. */
  tone?: "plain" | "blush";
  /** Vertical rhythm. */
  space?: "sm" | "md" | "lg";
};

export function Section({ id, children, className, tone = "plain", space = "md" }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        tone === "blush" && "bg-blush",
        space === "sm" && "py-12 sm:py-16",
        space === "md" && "py-16 sm:py-20 lg:py-24",
        space === "lg" && "py-20 sm:py-28 lg:py-32",
        className,
      )}
    >
      <div className="container-tezzy">{children}</div>
    </section>
  );
}

/** A rounded cream panel — the card surface used throughout the mockup. */
export function Panel({
  children,
  className,
  reveal = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  reveal?: boolean;
  delay?: number;
}) {
  const panel = (
    <div
      className={cn(
        "rounded-card border border-white/70 bg-shell/90 p-6 shadow-soft backdrop-blur-sm sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );

  return reveal ? <Reveal delay={delay}>{panel}</Reveal> : panel;
}
