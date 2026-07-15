"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#contact", label: "Contact" },
] as const;

export interface NavProps {
  className?: string;
}

export function Nav({ className }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandSource, setBrandSource] = useState(
    "/logo/snapdraken-dragon.svg",
  );

  useEffect(() => {
    const updateScrolledState = () => setScrolled(window.scrollY > 48);
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`site-nav${scrolled ? " site-nav--scrolled" : ""}${
        menuOpen ? " site-nav--open" : ""
      }${className ? ` ${className}` : ""}`}
    >
      <nav className="site-nav__inner" aria-label="Primary navigation">
        <Link className="site-nav__brand" href="/" onClick={closeMenu}>
          <Image
            src={brandSource}
            alt="Snapdraken home"
            width={650}
            height={305}
            priority
            onError={() =>
              setBrandSource("/media/source/snapdraken-dragon-mark.webp")
            }
          />
        </Link>

        <button
          className="site-nav__toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-nav-links"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="site-nav__links" id="site-nav-links">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
          <Link
            className="site-nav__cta"
            href="/#contact"
            onClick={closeMenu}
          >
            Start a Project
          </Link>
        </div>
      </nav>
    </header>
  );
}
