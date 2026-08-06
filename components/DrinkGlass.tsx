import type { Drink } from "@/data/drinks";
import { cn } from "@/lib/cn";

const CUP = "M34 76 H166 L153 200 a17 17 0 0 1 -17 15 H64 a17 17 0 0 1 -17 -15 Z";

const STRAW = "#f7a8b2";
const CREAM = "#fffaf2";
const SPRINKLE_COLORS = ["#f9a8b0", "#f6d67a", "#a8d8f0", "#c9a7e8"];

/**
 * The illustrated cup used for menu items that don't have a photograph yet.
 * Tinted from the drink's own `liquid` gradient so a new drink needs no artwork
 * to look finished — add `image` to the data and the photo takes over.
 */
export function DrinkGlass({ drink, className }: { drink: Drink; className?: string }) {
  const uid = drink.slug;
  const [top, bottom] = drink.liquid;
  const liquidId = `liquid-${uid}`;
  const clipId = `cup-${uid}`;
  const fillTop = drink.whip ? 76 : 98;

  return (
    <svg
      viewBox="0 0 200 230"
      role="img"
      aria-label={`Illustration of a ${drink.name}`}
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={liquidId} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="100%" stopColor={bottom} />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={CUP} />
        </clipPath>
      </defs>

      {/* Straw, leaning the way they always do in the cup. */}
      <g transform="rotate(9 100 60)">
        <rect x="93" y="2" width="14" height="86" rx="7" fill={STRAW} />
        <rect x="96" y="6" width="4" height="78" rx="2" fill="#ffffff" fillOpacity="0.5" />
      </g>

      <path d={CUP} fill="#ffffff" fillOpacity="0.75" />

      <g clipPath={`url(#${clipId})`}>
        <rect x="24" y={fillTop} width="152" height="160" fill={`url(#${liquidId})`} />
        <ellipse cx="100" cy={fillTop + 4} rx="68" ry="10" fill="#ffffff" fillOpacity="0.35" />

        {/* Ice for the drinks built over ice; the blended ones get none. */}
        {!drink.whip ? (
          <g fill="#ffffff" fillOpacity="0.42">
            <rect x="60" y="114" width="30" height="30" rx="8" transform="rotate(-12 75 129)" />
            <rect x="105" y="134" width="27" height="27" rx="7" transform="rotate(16 118 147)" />
            <rect x="72" y="162" width="25" height="25" rx="7" transform="rotate(8 84 174)" />
          </g>
        ) : null}

        {/* Highlight down the left of the cup. */}
        <path d="M44 76 h18 l-10 145 h-16 Z" fill="#ffffff" fillOpacity="0.3" />
      </g>

      {/* Whipped cream sits above the rim; everything else gets a flat lid. */}
      {drink.whip ? (
        <g fill={CREAM}>
          <rect x="50" y="64" width="100" height="20" rx="10" />
          <circle cx="72" cy="66" r="19" />
          <circle cx="100" cy="54" r="23" />
          <circle cx="128" cy="66" r="19" />
          <circle cx="86" cy="46" r="14" />
          <circle cx="114" cy="44" r="13" />
          <circle cx="100" cy="32" r="11" />
        </g>
      ) : (
        <>
          <rect x="30" y="58" width="140" height="22" rx="11" fill="#ffffff" fillOpacity="0.92" />
          <rect x="40" y="48" width="120" height="15" rx="7.5" fill="#ffffff" fillOpacity="0.8" />
        </>
      )}

      {drink.garnish === "sauce" ? (
        <path
          d="M68 48 q11 13 24 4 q13 -9 24 4 q10 10 19 0"
          fill="none"
          stroke={bottom}
          strokeWidth="7"
          strokeLinecap="round"
        />
      ) : null}

      {drink.garnish === "sprinkles" ? (
        <g>
          {[
            [72, 42, -22],
            [95, 28, 14],
            [119, 42, 28],
            [107, 52, -8],
            [83, 54, 36],
          ].map(([x, y, angle], index) => (
            <rect
              key={`${uid}-sprinkle-${index}`}
              x={x}
              y={y}
              width="12"
              height="5"
              rx="2.5"
              fill={SPRINKLE_COLORS[index % SPRINKLE_COLORS.length]}
              transform={`rotate(${angle} ${x + 6} ${y + 2.5})`}
            />
          ))}
        </g>
      ) : null}

      {drink.garnish === "mint" ? (
        <g fill="#8fce9b">
          <path d="M124 52 q19 -22 35 -13 q-5 20 -24 22 Z" />
          <path d="M124 52 q4 -26 -9 -33 q-15 13 -4 31 Z" fillOpacity="0.85" />
        </g>
      ) : null}

      {/* The little white label on the front of every Tezzy cup. */}
      <g>
        <rect x="61" y="142" width="78" height="33" rx="16.5" fill="#ffffff" fillOpacity="0.94" />
        <text
          x="100"
          y="165"
          textAnchor="middle"
          fontSize="19"
          fontWeight="800"
          fontStyle="italic"
          fill="#f4949f"
          fontFamily="var(--font-display), system-ui, sans-serif"
        >
          Tezzy
        </text>
      </g>

      <path d={CUP} fill="none" stroke="#ffffff" strokeOpacity="0.95" strokeWidth="3" />
    </svg>
  );
}
