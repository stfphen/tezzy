"use client";

import { Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/cn";
import { navLinks } from "@/lib/site";

/**
 * Sticky navigation. Gains a stronger backdrop once the page scrolls so the
 * links stay readable over the hero photograph.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // A drawer that scrolls the page behind it feels broken on mobile.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-cream/90 shadow-soft backdrop-blur-md" : "bg-cream/70 backdrop-blur-sm",
      )}
    >
      <div className="container-tezzy flex items-center justify-between gap-4 py-3">
        <Logo size="sm" priority />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex flex-col items-center rounded-pill px-4 py-2 font-display text-[0.95rem] font-bold transition-colors duration-200",
                      active ? "text-berry" : "text-cocoa hover:text-berry",
                    )}
                  >
                    {link.label}
                    <Heart
                      aria-hidden="true"
                      className={cn(
                        "absolute -bottom-0.5 h-3 w-3 transition-all duration-300",
                        active ? "scale-100 opacity-100" : "scale-50 opacity-0",
                      )}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/menu" size="sm" className="hidden sm:inline-flex">
            Order Now
            <Heart aria-hidden="true" className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          </Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-cocoa shadow-soft transition-colors hover:bg-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-white/70 bg-cream/95 backdrop-blur-md lg:hidden"
      >
        <nav aria-label="Primary mobile" className="container-tezzy py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3 font-display text-lg font-bold transition-colors",
                    isActive(link.href) ? "bg-white text-berry" : "text-cocoa hover:bg-petal/60",
                  )}
                >
                  {link.label}
                  <Heart
                    aria-hidden="true"
                    className={cn("h-4 w-4 text-candy", !isActive(link.href) && "opacity-0")}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <Button href="/menu" size="md" className="mt-4 w-full">
            Order Now
            <Heart aria-hidden="true" className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          </Button>
        </nav>
      </div>
    </header>
  );
}
