"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait before this element animates in. */
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

const offsets = {
  up: { x: 0, y: 26 },
  left: { x: -26, y: 0 },
  right: { x: 26, y: 0 },
  none: { x: 0, y: 0 },
} as const;

/**
 * Fade-and-lift a block the first time it scrolls into view.
 * Collapses to a plain fade-free render when the visitor prefers reduced motion.
 */
export function Reveal({ children, delay = 0, direction = "up", className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  const offset = reduced ? offsets.none : offsets[direction];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -80px 0px" }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
