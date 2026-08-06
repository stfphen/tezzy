#!/usr/bin/env python3
"""Derive the site's image assets from the design references in /reference.

The mockups in /reference are the source of truth for Tezzy's visual identity, so
every placeholder image the site ships with is cut from them rather than invented.
Re-run this after replacing a reference file:

    pip install pillow
    python3 tools/extract_assets.py

Outputs land in public/images/ and app/ (icons). Everything is deterministic, so
committing the results is safe.
"""

from __future__ import annotations

import math
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
REF = ROOT / "reference"
OUT = ROOT / "public" / "images"
APP = ROOT / "app"

# Sampled straight out of original-mockup.png; see lib/brand.ts for the same values.
ROSE = (249, 168, 176)
ROSE_DEEP = (232, 109, 117)
CREAM = (252, 241, 238)

# The mockup is a 1402x1122 render of the full-width desktop page.
HERO_BOX = (520, 114, 1388, 650)
BUNNY_BOX = (1098, 676, 1352, 1012)
DRINK_CIRCLES = [
    ("iced-latte", (104, 757, 219, 873)),
    ("strawberry-milkshake", (249, 757, 364, 873)),
    ("chocolate-milkshake", (393, 757, 509, 874)),
    ("peach-italian-soda", (538, 757, 653, 873)),
]
GALLERY_CROPS = [
    ("01-tezzy-duo", (640, 240, 1140, 650)),
    ("02-bear-hug", (760, 125, 1100, 460)),
    ("03-strawberry-cup", (655, 280, 925, 650)),
    ("04-bunny-friend", (548, 285, 715, 570)),
    ("05-good-drinks", (1105, 160, 1390, 545)),
    ("06-bear-keychain", (1060, 355, 1245, 600)),
]


def load(name: str) -> Image.Image:
    return Image.open(REF / name).convert("RGB")


def feather(img: Image.Image, left=0, right=0, top=0, bottom=0) -> Image.Image:
    """Fade the given edges to transparent so a crop melts into the page."""
    img = img.convert("RGBA")
    w, h = img.size
    mask = Image.new("L", (w, h), 255)
    px = mask.load()
    for x in range(w):
        for y in range(h):
            a = 255
            if left and x < left:
                a = min(a, int(255 * x / left))
            if right and x > w - right:
                a = min(a, int(255 * (w - x) / right))
            if top and y < top:
                a = min(a, int(255 * y / top))
            if bottom and y > h - bottom:
                a = min(a, int(255 * (h - y) / bottom))
            px[x, y] = a
    img.putalpha(mask)
    return img


def vignette(img: Image.Image, solid: float = 0.72) -> Image.Image:
    """Fade a crop out elliptically so no rectangular edge shows on any surface.

    Edge feathering is enough when a crop sits on a matching background, but the
    plush bunny is placed on cream as well as blush — a straight-sided fade
    still leaves a faint rectangle. Alpha is full inside `solid` of the way to
    the edge and ramps to zero at the boundary.
    """
    img = img.convert("RGBA")
    w, h = img.size
    mask = Image.new("L", (w, h))
    px = mask.load()
    cx, cy = w / 2, h / 2
    for x in range(w):
        nx = (x - cx) / cx
        for y in range(h):
            ny = (y - cy) / cy
            d = math.hypot(nx, ny)
            if d <= solid:
                px[x, y] = 255
            elif d >= 1.0:
                px[x, y] = 0
            else:
                px[x, y] = int(255 * (1 - (d - solid) / (1 - solid)))
    img.putalpha(mask.filter(ImageFilter.GaussianBlur(2)))
    return img


def circle_crop(img: Image.Image, size: int = 512) -> Image.Image:
    """Mask a square crop into a circle with a soft, anti-aliased edge."""
    img = img.convert("RGBA").resize((size, size), Image.LANCZOS)
    ss = 4
    mask = Image.new("L", (size * ss, size * ss), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size * ss - 1, size * ss - 1), fill=255)
    mask = mask.resize((size, size), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.6))
    img.putalpha(mask)
    return img


def cut_logo(src: Image.Image, tolerance: int = 26) -> Image.Image:
    """Knock the white studio background out of the wordmark.

    A flood fill from the border keeps the white *inside* the letterforms intact
    (it is bounded by the pink outline); enclosed white islands smaller than a
    letter are counters, so those are cleared too.
    """
    src = src.convert("RGB")
    w, h = src.size
    px = src.load()
    white = [[False] * h for _ in range(w)]
    for x in range(w):
        for y in range(h):
            r, g, b = px[x, y]
            white[x][y] = min(r, g, b) >= 255 - tolerance

    alpha = Image.new("L", (w, h), 255)
    ap = alpha.load()
    seen = [[False] * h for _ in range(w)]

    def flood(seeds):
        q = deque(seeds)
        cells = []
        while q:
            x, y = q.popleft()
            if not (0 <= x < w and 0 <= y < h) or seen[x][y] or not white[x][y]:
                continue
            seen[x][y] = True
            cells.append((x, y))
            q.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))
        return cells

    border = [(x, 0) for x in range(w)] + [(x, h - 1) for x in range(w)]
    border += [(0, y) for y in range(h)] + [(w - 1, y) for y in range(h)]
    for x, y in flood(border):
        ap[x, y] = 0

    # Counters (the hole in the "e") are small enclosed white regions.
    for x in range(w):
        for y in range(h):
            if white[x][y] and not seen[x][y]:
                cells = flood([(x, y)])
                if len(cells) < 4000:
                    for cx, cy in cells:
                        ap[cx, cy] = 0

    alpha = alpha.filter(ImageFilter.GaussianBlur(0.5))
    out = src.convert("RGBA")
    out.putalpha(alpha)
    return out.crop(out.getbbox())


def heart_mask(size: int) -> Image.Image:
    """A plump heart the same proportions as the one in the wordmark."""
    m = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(m)
    # Two overlapping lobes (the overlap makes the cleft); their widest points
    # become the shoulders of the triangle that tapers to the point.
    r, off, cy = size * 0.25, size * 0.21, size * 0.35
    for cx in (size * 0.5 - off, size * 0.5 + off):
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=255)
    d.polygon(
        [
            (size * 0.5 - off - r, cy),
            (size * 0.5 + off + r, cy),
            (size * 0.5, size * 0.92),
        ],
        fill=255,
    )
    return m


def make_icon(size: int, radius_ratio: float = 0.24) -> Image.Image:
    """A rounded rose tile with the logo's heart — legible down to 16px."""
    ss = 8
    s = size * ss
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((0, 0, s - 1, s - 1), radius=int(s * radius_ratio), fill=ROSE + (255,))
    heart = int(s * 0.62)
    white = Image.new("RGBA", (heart, heart), (255, 255, 255, 255))
    white.putalpha(heart_mask(heart))
    img.alpha_composite(white, (int((s - heart) / 2), int(s * 0.20)))
    return img.resize((size, size), Image.LANCZOS)


def font(instance: str, size: int):
    """Nunito (the site's display face) if cached, otherwise a system fallback.

    Cache it once with:
      curl -sSL -o tools/.fonts/Nunito.ttf \\
        https://raw.githubusercontent.com/google/fonts/main/ofl/nunito/Nunito%5Bwght%5D.ttf
    """
    cached = Path(__file__).resolve().parent / ".fonts" / "Nunito.ttf"
    if cached.exists():
        f = ImageFont.truetype(str(cached), size)
        f.set_variation_by_name(instance)
        return f
    fallback = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
    if fallback.exists():
        return ImageFont.truetype(str(fallback), size)
    return ImageFont.load_default(size)


def make_og(mock: Image.Image, logo: Image.Image) -> Image.Image:
    """1200x630 share card: brand gradient, wordmark, and the hero photograph."""
    w, h = 1200, 630
    card = Image.new("RGB", (w, h), CREAM)
    gp = card.load()
    for y in range(h):
        for x in range(w):
            t = (x / w) * 0.6 + (y / h) * 0.4
            gp[x, y] = (
                int(253 + (250 - 253) * t),
                int(241 + (223 - 241) * t),
                int(239 + (225 - 239) * t),
            )

    photo = mock.crop((690, 125, 1388, 650))
    ph = 660
    pw = int(photo.width * ph / photo.height)
    photo = photo.resize((pw, ph), Image.LANCZOS)
    photo = feather(photo, left=210, bottom=60, top=40)
    card.paste(photo, (w - pw + 30, -10), photo)

    lw = 330
    mark = logo.resize((lw, int(logo.height * lw / logo.width)), Image.LANCZOS)
    card.paste(mark, (72, 132), mark)

    d = ImageDraw.Draw(card)
    d.text((84, 330), "Cute drinks,", font=font("ExtraBold", 62), fill=(123, 59, 47))
    d.text((84, 400), "sweet hugs.", font=font("ExtraBold", 62), fill=(123, 59, 47))
    d.text(
        (86, 492),
        "Every drink comes with a little friend.",
        font=font("SemiBold", 27),
        fill=(150, 87, 77),
    )

    pill = font("ExtraBold", 24)
    label = "tezzy.ca"
    tw = d.textlength(label, font=pill)
    d.rounded_rectangle((84, 538, 84 + tw + 56, 538 + 52), radius=26, fill=ROSE)
    d.text((84 + 28, 550), label, font=pill, fill=(255, 255, 255))
    return card


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "drinks").mkdir(exist_ok=True)
    (OUT / "gallery").mkdir(exist_ok=True)

    mock = load("original-mockup.png")

    logo = cut_logo(load("logo-reference.jpeg"))
    logo.resize((logo.width * 2 // 3, logo.height * 2 // 3), Image.LANCZOS).save(OUT / "logo.png")
    print("logo.png", logo.size)

    hero = mock.crop(HERO_BOX)
    hero = hero.resize((hero.width * 3 // 2, hero.height * 3 // 2), Image.LANCZOS)
    feather(hero, left=150, bottom=70, top=24).save(OUT / "hero.png")
    print("hero.png", hero.size)

    bunny = mock.crop(BUNNY_BOX)
    bunny = bunny.resize((bunny.width * 2, bunny.height * 2), Image.LANCZOS)
    vignette(bunny).save(OUT / "bunny.png")
    print("bunny.png", bunny.size)

    for name, box in DRINK_CIRCLES:
        circle_crop(mock.crop(box)).save(OUT / "drinks" / f"{name}.png")
        print(f"drinks/{name}.png")

    for name, box in GALLERY_CROPS:
        tile = mock.crop(box)
        tile = tile.resize((tile.width * 2, tile.height * 2), Image.LANCZOS)
        tile.save(OUT / "gallery" / f"{name}.jpg", quality=88, optimize=True)
        print(f"gallery/{name}.jpg", tile.size)

    make_icon(64).save(APP / "icon.png")
    make_icon(180, radius_ratio=0.22).save(APP / "apple-icon.png")
    print("app/icon.png, app/apple-icon.png")

    make_og(mock, logo).save(OUT / "og.png", quality=90, optimize=True)
    print("og.png")


if __name__ == "__main__":
    main()
