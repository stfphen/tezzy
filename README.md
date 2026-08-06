# Tezzy — tezzy.ca

Marketing site for Tezzy, a mobile drinks bar where every drink comes with a plush friend.
Built from the mockups in [`reference/`](./reference), which are the source of truth for the
visual design.

**Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · React Hook Form + Zod · Lucide**

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — the site runs fine without it
npm run dev                  # http://localhost:3000
```

```bash
npm run build       # production build
npm run start       # serve the production build
npm run lint        # eslint (next/core-web-vitals + next/typescript)
npm run typecheck   # tsc --noEmit
```

Node 20.9+ required.

---

## Pages

| Route      | What's on it                                                                          |
| ---------- | ------------------------------------------------------------------------------------- |
| `/`        | Hero → featured drinks → why Tezzy → about → gallery → testimonials → booking → FAQ    |
| `/menu`    | All 12 drinks, grouped into Iced Coffee, Frappés, Milkshakes, Italian Sodas            |
| `/about`   | Story timeline, values, the feature strip, testimonials                                |
| `/events`  | Upcoming pop-ups, past events, "meet the friends", booking form, FAQ                   |
| `/contact` | Contact cards, reply hours, booking form                                               |
| `/privacy` | Privacy notice for the booking form                                                    |

Plus `not-found.tsx`, a route-level `loading.tsx` skeleton, `sitemap.xml`, `robots.txt`, and
`POST /api/booking`.

---

## Editing content

Everything a non-developer would want to change lives in two folders. No component edits needed.

### `lib/site.ts`

Business name, tagline, email addresses, phone, service area, opening hours, social links,
and the navigation/footer link lists.

### `data/` — the placeholder CMS

| File               | Contains                                                                    |
| ------------------ | --------------------------------------------------------------------------- |
| `data/drinks.ts`   | The menu: name, category, description, price, tags, plush friend, artwork    |
| `data/events.ts`   | Pop-up dates, plus the event-type / budget / venue options used by the form  |
| `data/content.ts`  | Testimonials, FAQ, the four feature points, gallery captions, story timeline |

Each file exports plain typed arrays. To move to a real CMS, replace the export with a fetch
that returns the same shape — nothing else has to change.

**Adding a drink:** append to `drinks` in `data/drinks.ts`. If you don't give it an `image`,
it renders the illustrated cup in `components/DrinkGlass.tsx`, tinted with the `liquid`
gradient you specify — so a new drink looks finished without any artwork. Drop a square photo
in `public/images/drinks/` and set `image` to swap the illustration for the photo.

**Featuring a drink on the home page:** set `featured: true` and add its slug to
`FEATURED_ORDER` in the same file.

**Events:** `upcomingEvents()` and `pastEvents()` split the list by date at request time, so
the page never shows a stale line-up. `/events` revalidates hourly.

---

## Images

The mockups are the only photography that exists, so every placeholder image is cut from them
by [`tools/extract_assets.py`](./tools/extract_assets.py) — the wordmark with its white
background flood-filled away, the hero with feathered edges, the four drink medallions masked
into circles, the gallery tiles, the favicon, and the 1200×630 OG card.

Re-run it after replacing anything in `reference/`:

```bash
pip install pillow
python3 tools/extract_assets.py
```

It's deterministic, so the generated files are committed. To use the site's real display face
in the OG card, cache Nunito first (otherwise it falls back to a system font):

```bash
mkdir -p tools/.fonts && curl -sSL -o tools/.fonts/Nunito.ttf \
  "https://raw.githubusercontent.com/google/fonts/main/ofl/nunito/Nunito%5Bwght%5D.ttf"
```

When real photography arrives, drop it into `public/images/` and point the data files at it.

---

## The booking form

`components/BookingForm.tsx` posts to `POST /api/booking`. One Zod schema
(`lib/booking.ts`) validates on both sides, so the client and the server can never disagree
about what's valid.

The route:

- rate-limits to **5 enquiries per IP per 10 minutes** (in-memory — see below)
- validates the payload and returns `422` with per-field messages, which the form maps back
  onto the offending inputs
- silently absorbs submissions that fill the hidden honeypot field, answering exactly like a
  success so bots stop retrying
- hands the enquiry to `lib/notify.ts`

### Delivery

Two interchangeable transports, both configured entirely with environment variables:

| Variable                                     | Effect                                                      |
| -------------------------------------------- | ----------------------------------------------------------- |
| `RESEND_API_KEY` + `BOOKING_TO_EMAIL`        | Emails the enquiry via Resend's REST API                     |
| `BOOKING_WEBHOOK_URL`                        | POSTs the JSON payload anywhere (Zapier, Make, Slack, a CRM) |

Set either, both, or neither. **With neither set the form still works end to end** — the
enquiry is logged to the server console and the visitor gets a normal success message, so you
can test the whole flow before any account exists. If both are configured, either one
succeeding is enough; a partial failure is logged and the visitor is not bothered.

See [`.env.example`](./.env.example) for the full list.

### Before launch

The rate limiter (`lib/rate-limit.ts`) is in-memory: it resets on deploy and is per-instance,
which is fine for one small site and useless across many. If traffic grows, swap its internals
for Upstash or Vercel KV — the route only depends on the `check()` signature.

---

## Deploying to Vercel

1. Push the repo and import it at [vercel.com/new](https://vercel.com/new). The framework
   preset, build command and output are all detected.
2. Set `NEXT_PUBLIC_SITE_URL` to the production origin (no trailing slash). It drives
   `metadataBase`, canonical URLs, `sitemap.xml`, `robots.txt` and the JSON-LD graph — without
   it those all point at `https://tezzy.ca`.
3. Add `RESEND_API_KEY` / `BOOKING_TO_EMAIL` and/or `BOOKING_WEBHOOK_URL` if you want
   enquiries delivered rather than logged.
4. Deploy.

Everything except `/api/booking` and `/events` prerenders as static content.

---

## SEO

- Per-page `title`, `description` and canonical URL; a title template in the root layout
- OpenGraph and Twitter card metadata pointing at `public/images/og.png`
- `app/icon.png` and `app/apple-icon.png` (generated by the asset script)
- `sitemap.ts` and `robots.ts`
- JSON-LD in `components/JsonLd.tsx`: `FoodEstablishment` and `WebSite` sitewide, plus `Menu`
  on `/menu`, `FAQPage` on `/` and `/events`, and `Event` for each upcoming pop-up

---

## Accessibility

Audited with axe-core (WCAG 2.0/2.1 A + AA, plus best-practice rules) across all seven routes
at 1440px and 390px: **no violations**. Also covered:

- Skip-to-content link as the first tab stop
- Every form field has a `<label>`, `aria-invalid` and an error announced via `role="alert"`
- Native `<details>` accordion for the FAQ, so it works without JavaScript
- The gallery lightbox traps nothing it shouldn't: Escape closes, arrows navigate, focus
  returns to the tile that opened it
- Every animation is wrapped in `motion-safe:` or gated on `useReducedMotion()`, and
  `prefers-reduced-motion` also disables smooth scrolling

### One deliberate change to the mockup's palette

The mockup uses white text on the soft pink `#f9a8b0`. That measures **1.87:1** — far below
the 4.5:1 WCAG AA floor for body-size text — and `#e4646e` accent text on cream measures
3.06:1, also failing. Since "accessible" is an explicit requirement, buttons, links and accent
text use a deeper rose, `#c0395a`:

| Pair                        | Ratio | Result |
| --------------------------- | ----- | ------ |
| white on `#c0395a`          | 5.28  | AA     |
| `#c0395a` on cream          | 4.88  | AA     |
| `#c0395a` on shell          | 4.78  | AA     |
| `#c0395a` on blush          | 4.52  | AA     |

**Every non-text use of the rose is unchanged** — hearts, icons, drink medallions, borders,
gradients and chips all still use the mockup's `#f9a8b0`, so the page keeps its pastel
character. If the client would rather have the mockup's exact button pink and accept the
contrast, change `--color-berry` in `app/globals.css` back to `#f9a8b0` — that one token
controls it.

---

## Two other places this differs from the mockup

- **Nav label.** The mockup's fourth nav item reads "Our Friends"; the handoff calls that page
  "Pop-ups & Events", which is what it actually contains, so the nav says that. The plush
  friends still get their own section on `/events`. Change it in `lib/site.ts` if you prefer
  the original wording.
- **Featured drink name.** The mockup's featured row labels the pink drink "Strawberry
  Frappé", but the handoff's drink list has a Strawberry Milkshake and no strawberry frappé.
  The written menu wins; the photograph is reused for the milkshake.

---

## Project structure

```
app/                    routes, API, metadata, icons, sitemap, robots
  api/booking/route.ts  booking endpoint
components/             UI — sections/ holds the page-level blocks
data/                   placeholder CMS (drinks, events, editorial copy)
lib/                    site config, brand tokens, booking schema, delivery, rate limit
public/images/          generated placeholder imagery
reference/              the supplied mockups and the original handoff brief
tools/extract_assets.py regenerates public/images from reference/
```
