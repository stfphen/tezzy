/**
 * The Tezzy palette in TypeScript.
 *
 * These are the same values declared as Tailwind tokens in app/globals.css —
 * duplicated here only for the handful of places that cannot read CSS custom
 * properties (theme-color metadata, generated images, inline SVG gradients).
 * Change both together.
 */
export const brand = {
  cream: "#fdf4f2",
  blush: "#fce9e7",
  shell: "#fdf1ef",
  petal: "#fde1e1",
  candy: "#f9a8b0",
  candySoft: "#fbc7cc",
  berry: "#e4646e",
  cocoa: "#7b3b2f",
  mocha: "#96574d",
} as const;

export type BrandColor = keyof typeof brand;
