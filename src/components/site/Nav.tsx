"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, person } from "@/content/profile";

type Pill = { x: number; w: number; visible: boolean };

export function Nav({ active }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState<Pill>({ x: 0, w: 0, visible: false });
  const listRef = useRef<HTMLUListElement>(null);

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

  // Place the pill under a link, measured relative to the list.
  const moveTo = useCallback((el: HTMLElement | null) => {
    const list = listRef.current;
    if (!el || !list) return;
    const a = el.getBoundingClientRect();
    const b = list.getBoundingClientRect();
    setPill({ x: a.left - b.left, w: a.width, visible: true });
  }, []);

  const resetPill = useCallback(() => {
    const current = listRef.current?.querySelector<HTMLElement>("[aria-current='page']");
    if (current) moveTo(current);
    else setPill((p) => ({ ...p, visible: false }));
  }, [moveTo]);

  useEffect(() => {
    resetPill();
    window.addEventListener("resize", resetPill);
    return () => window.removeEventListener("resize", resetPill);
  }, [active, resetPill]);

  const solid = scrolled || open;

  return (
    <header
      className={clsx(
        "no-print fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        solid ? "border-b border-line-dark/70 bg-ink/95 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-site on-dark flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="group flex min-h-11 items-center gap-3" aria-label={`${person.name}, home`}>
          <span className="font-serif-display grid size-9 place-items-center rounded-full border border-brass/60 text-[0.95rem] text-brass transition-colors duration-300 group-hover:bg-brass group-hover:text-ink">
            {person.initials}
          </span>
          <span className="hidden text-[0.95rem] font-medium tracking-tight text-ivory sm:inline">{person.name}</span>
        </Link>

        <ul ref={listRef} className="relative hidden items-center lg:flex" onMouseLeave={resetPill}>
          <span
            aria-hidden
            className="nav-pill pointer-events-none absolute top-1/2 left-0 h-10 rounded-xl border border-ivory/10 bg-ivory/[0.08]"
            style={{ width: pill.w, transform: `translate(${pill.x}px, -50%)`, opacity: pill.visible ? 1 : 0 }}
          />
          {nav.map((item) => (
            <li key={item.href} className="relative">
              <Link
                href={item.href}
                aria-current={active === item.href ? "page" : undefined}
                onMouseEnter={(e) => moveTo(e.currentTarget)}
                onFocus={(e) => moveTo(e.currentTarget)}
                onBlur={resetPill}
                className={clsx(
                  "inline-flex min-h-11 items-center rounded-xl px-4 text-sm transition-colors duration-300 hover:text-ivory",
                  active === item.href ? "text-ivory" : "text-mist",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-brass px-5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-ivory sm:inline-flex"
          >
            Get in touch
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
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
          {[...nav, { href: "/#contact", label: "Contact" }].map((item, i) => (
            <li key={item.href} className="border-b border-line-dark">
              <Link href={item.href} onClick={() => setOpen(false)} className="flex min-h-16 items-center justify-between text-ivory">
                <span className="font-serif-display text-3xl">{item.label}</span>
                <span className="eyebrow text-brass">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
