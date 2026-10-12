"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, person } from "@/content/profile";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        solid ? "border-b border-line-dark/70 bg-ink/95 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-site on-dark flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="group flex min-h-11 items-center gap-3" aria-label={`${person.name}, back to top`}>
          <span className="font-serif-display grid size-9 place-items-center rounded-full border border-brass/60 text-[0.95rem] text-brass transition-colors duration-300 group-hover:bg-brass group-hover:text-ink">
            {person.initials}
          </span>
          <span className="hidden text-[0.95rem] font-medium tracking-tight text-ivory sm:inline">{person.name}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-flex min-h-11 items-center px-3.5 text-sm text-mist transition-colors duration-300 hover:text-ivory"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-brass px-5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-ivory sm:inline-flex"
          >
            Get in touch
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full text-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="on-dark h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line-dark bg-ink lg:hidden"
      >
        <ul className="container-site flex flex-col py-6">
          {[...nav, { href: "#contact", label: "Contact" }].map((item, i) => (
            <li key={item.href} className="border-b border-line-dark">
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-16 items-center justify-between text-ivory"
              >
                <span className="font-serif-display text-3xl">{item.label}</span>
                <span className="eyebrow text-brass">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
