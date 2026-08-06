import type { SVGProps } from "react";

/**
 * The four line icons from the mockup's feature strip, plus the small heart
 * that sits under headings. Drawn here rather than imported so they share one
 * stroke weight and rounded cap style; everything else uses lucide-react.
 */

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** A to-go cup with a lid, a straw, and a heart on the front. */
export function CupIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <path d="M6.4 8.4h11.2l-1.3 11.1a2 2 0 0 1-2 1.8H9.7a2 2 0 0 1-2-1.8L6.4 8.4Z" />
        <rect x="5.4" y="6.1" width="13.2" height="2.4" rx="1.2" />
        <path d="M13.4 6.1 14.6 2" />
        <path d="M12 17.4c-1.7-1.3-2.6-2.2-2.6-3.2a1.5 1.5 0 0 1 2.6-1 1.5 1.5 0 0 1 2.6 1c0 1-.9 1.9-2.6 3.2Z" />
      </g>
    </svg>
  );
}

/** A bear's head — ears overlapping the crown, muzzle low and wide. */
export function BearIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <path d="M7.4 6.6a2.5 2.5 0 1 0-2.2 3.2" />
        <path d="M16.6 6.6a2.5 2.5 0 1 1 2.2 3.2" />
        <path d="M12 20.8c4.1 0 6.9-2.9 6.9-6.6S16.1 6.5 12 6.5 5.1 10.5 5.1 14.2 7.9 20.8 12 20.8Z" />
        <ellipse cx="12" cy="16" rx="3.4" ry="2.7" />
        <path d="M12 14.6a1 1 0 1 0 0 .01" strokeWidth="2.2" />
        <path d="M9.6 12.2h.01M14.4 12.2h.01" strokeWidth="2.2" />
      </g>
    </svg>
  );
}

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <path d="M12 20.2 4.6 13a4.6 4.6 0 0 1 0-6.6 4.7 4.7 0 0 1 6.7 0l.7.7.7-.7a4.7 4.7 0 0 1 6.7 0 4.6 4.6 0 0 1 0 6.6L12 20.2Z" />
      </g>
    </svg>
  );
}

export function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <g {...strokeProps}>
        <path d="M12 21.5s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
        <path d="M12 13.6c1.5-1.1 2.4-2 2.4-3.1a2.4 2.4 0 0 0-2.4-2.3 2.4 2.4 0 0 0-2.4 2.3c0 1.1.9 2 2.4 3.1Z" />
      </g>
    </svg>
  );
}

export const featureIcons = {
  cup: CupIcon,
  bear: BearIcon,
  heart: HeartIcon,
  pin: PinIcon,
} as const;

/** The solid outline heart used as a divider under section headings. */
export function HeartMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 22" aria-hidden="true" className={className}>
      <path
        d="M12 20.4 3.7 12.4a5.2 5.2 0 0 1 0-7.5 5.4 5.4 0 0 1 7.6 0l.7.7.7-.7a5.4 5.4 0 0 1 7.6 0 5.2 5.2 0 0 1 0 7.5L12 20.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
