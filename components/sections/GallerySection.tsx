"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Section, SectionHeading } from "@/components/Section";
import { gallery } from "@/data/content";
import { cn } from "@/lib/cn";

/** Photo grid with a lightweight, keyboard-navigable lightbox. */
export function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;

    lastFocused.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % gallery.length));
      if (event.key === "ArrowLeft") {
        setOpenIndex((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length));
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lastFocused.current?.focus();
    };
  }, [openIndex, close]);

  const active = openIndex === null ? null : gallery[openIndex];

  return (
    <Section id="gallery">
      <SectionHeading
        eyebrow="Gallery"
        title="Cups, bears and very good days"
        subtitle="A few moments from markets, pop-ups and private events around the city."
      />

      <ul className="mt-10 grid auto-rows-[168px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-6 sm:gap-4">
        {gallery.map((image, index) => (
          <li key={image.src} className={cn("relative", image.span)}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative h-full w-full overflow-hidden rounded-[1.4rem] shadow-soft transition-shadow duration-500 hover:shadow-lift"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-cocoa/0 transition-colors duration-500 group-hover:bg-cocoa/10" />
              <span className="sr-only">Open larger image</span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-cocoa/70 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative max-h-[85dvh] w-full max-w-3xl overflow-hidden rounded-card bg-cream shadow-lift"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={1000}
              height={820}
              sizes="(max-width: 768px) 92vw, 768px"
              className="max-h-[70dvh] w-full object-contain"
            />
            <p className="px-6 py-4 text-sm text-mocha">{active.alt}</p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close image"
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-cocoa shadow-soft transition-colors hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : null}
    </Section>
  );
}
