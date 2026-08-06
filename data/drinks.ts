/**
 * The Tezzy menu.
 *
 * This is the placeholder CMS: edit this file (or swap `drinks` for a fetch from
 * a real CMS that returns the same shape) and every menu surface updates.
 *
 * `image` is optional — a drink without a photograph renders the illustrated
 * cup in components/DrinkGlass.tsx, tinted with `liquid`. Drop a square photo in
 * public/images/drinks/ and point `image` at it to swap the illustration out.
 */

export type DrinkCategoryId = "coffee" | "frappes" | "milkshakes" | "sodas";

export type Drink = {
  slug: string;
  name: string;
  category: DrinkCategoryId;
  description: string;
  /** CAD, before tax. */
  price: number;
  tags: string[];
  /** The plush friend that comes clipped to the cup. */
  friend: "Bear" | "Bunny";
  /** Gradient stops for the illustrated cup, top to bottom. */
  liquid: [string, string];
  /** Whipped cream on top? */
  whip?: boolean;
  garnish?: "sauce" | "sprinkles" | "mint";
  image?: string;
  featured?: boolean;
};

export const drinkCategories: { id: DrinkCategoryId; name: string; blurb: string }[] = [
  { id: "coffee", name: "Iced Coffee", blurb: "Slow-pulled espresso over a lot of ice." },
  { id: "frappes", name: "Frappés", blurb: "Blended, whipped, and unapologetically sweet." },
  { id: "milkshakes", name: "Milkshakes", blurb: "Thick, cold, and made to share (you won't)." },
  { id: "sodas", name: "Italian Sodas", blurb: "Fizzy, fruity, and the prettiest thing you'll hold." },
];

export const drinks: Drink[] = [
  {
    slug: "iced-americano",
    name: "Iced Americano",
    category: "coffee",
    description: "Double espresso, cold water, a mountain of ice. The quiet one.",
    price: 4.5,
    tags: ["Dairy-free", "Low sugar"],
    friend: "Bear",
    liquid: ["#a9714f", "#6f4127"],
  },
  {
    slug: "iced-latte",
    name: "Iced Latte",
    category: "coffee",
    description: "Espresso poured over cold milk so it swirls before you stir it.",
    price: 5.25,
    tags: ["Classic", "Oat milk +$0.75"],
    friend: "Bear",
    liquid: ["#e2b48c", "#b47f52"],
    image: "/images/drinks/iced-latte.png",
    featured: true,
  },
  {
    slug: "vanilla-latte",
    name: "Vanilla Latte",
    category: "coffee",
    description: "Our iced latte with real vanilla bean syrup. Warm-hearted, cold-served.",
    price: 5.75,
    tags: ["Sweet", "Bestseller"],
    friend: "Bear",
    liquid: ["#eccfae", "#c69a6b"],
  },
  {
    slug: "vanilla-frappe",
    name: "Vanilla Frappé",
    category: "frappes",
    description: "Blended vanilla cream, whipped top, and a little happy sigh.",
    price: 6.5,
    tags: ["Blended", "Whipped cream"],
    friend: "Bunny",
    liquid: ["#fbf1e2", "#eddcc0"],
    whip: true,
  },
  {
    slug: "chocolate-frappe",
    name: "Chocolate Frappé",
    category: "frappes",
    description: "Cocoa, milk and ice, blended until it's basically a dessert.",
    price: 6.5,
    tags: ["Blended", "Cocoa"],
    friend: "Bear",
    liquid: ["#a3714f", "#6b4028"],
    whip: true,
    garnish: "sauce",
  },
  {
    slug: "caramel-frappe",
    name: "Caramel Frappé",
    category: "frappes",
    description: "Salted caramel swirled through the cup and drizzled over the top.",
    price: 6.5,
    tags: ["Blended", "Salted caramel"],
    friend: "Bear",
    liquid: ["#e0b078", "#b57c40"],
    whip: true,
    garnish: "sauce",
  },
  {
    slug: "vanilla-milkshake",
    name: "Vanilla Milkshake",
    category: "milkshakes",
    description: "Real vanilla ice cream, spun thick enough to stand a straw in.",
    price: 6.95,
    tags: ["Thick", "Ice cream"],
    friend: "Bunny",
    liquid: ["#fdf6e9", "#f0e0c4"],
    whip: true,
    garnish: "sprinkles",
  },
  {
    slug: "chocolate-milkshake",
    name: "Chocolate Milkshake",
    category: "milkshakes",
    description: "Chocolate ice cream, chocolate sauce, chocolate on the chocolate.",
    price: 6.95,
    tags: ["Thick", "Ice cream"],
    friend: "Bear",
    liquid: ["#9c6746", "#5f3721"],
    whip: true,
    garnish: "sauce",
    image: "/images/drinks/chocolate-milkshake.png",
    featured: true,
  },
  {
    slug: "strawberry-milkshake",
    name: "Strawberry Milkshake",
    category: "milkshakes",
    description: "Fresh strawberries blended into vanilla ice cream. Pink all the way down.",
    price: 6.95,
    tags: ["Thick", "Real fruit"],
    friend: "Bunny",
    liquid: ["#fbc9cf", "#ef8d9d"],
    whip: true,
    garnish: "sauce",
    image: "/images/drinks/strawberry-milkshake.png",
    featured: true,
  },
  {
    slug: "strawberry-italian-soda",
    name: "Strawberry Italian Soda",
    category: "sodas",
    description: "Strawberry syrup, soda water, cream float on request.",
    price: 5.5,
    tags: ["Fizzy", "Dairy-free"],
    friend: "Bunny",
    liquid: ["#ffb4bd", "#f2647a"],
    garnish: "mint",
  },
  {
    slug: "blue-raspberry-italian-soda",
    name: "Blue Raspberry Italian Soda",
    category: "sodas",
    description: "The loud one. Electric blue, sharp and sweet, gone in a minute.",
    price: 5.5,
    tags: ["Fizzy", "Dairy-free"],
    friend: "Bunny",
    liquid: ["#a8d8f0", "#4aa3d9"],
    garnish: "mint",
  },
  {
    slug: "peach-italian-soda",
    name: "Peach Italian Soda",
    category: "sodas",
    description: "Peach syrup over ice with a sprig of mint. Summer in a cup.",
    price: 5.5,
    tags: ["Fizzy", "Dairy-free"],
    friend: "Bunny",
    liquid: ["#ffd0b8", "#f79a7c"],
    garnish: "mint",
    image: "/images/drinks/peach-italian-soda.png",
    featured: true,
  },
];

/** Order matches the featured row in the design mockup. */
const FEATURED_ORDER = [
  "iced-latte",
  "strawberry-milkshake",
  "chocolate-milkshake",
  "peach-italian-soda",
];

export const featuredDrinks = drinks
  .filter((drink) => drink.featured)
  .sort((a, b) => FEATURED_ORDER.indexOf(a.slug) - FEATURED_ORDER.indexOf(b.slug));

export function drinksByCategory(category: DrinkCategoryId): Drink[] {
  return drinks.filter((drink) => drink.category === category);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
  }).format(price);
}
