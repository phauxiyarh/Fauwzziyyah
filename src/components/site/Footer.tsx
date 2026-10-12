import Link from "next/link";
import { ArrowUp, Mail, Settings } from "lucide-react";
import { nav, person } from "@/content/profile";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark border-t border-line-dark bg-ink text-ivory">
      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif-display text-4xl leading-none md:text-5xl">
              {person.firstName} <span className="text-brass italic">{person.lastName}</span>
            </p>
            <p className="mt-4 max-w-sm text-mist">{person.role}. Data and AI in service of students, teachers, and families.</p>
          </div>
          <nav aria-label="Footer">
            <p className="eyebrow text-brass">Sections</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-flex min-h-11 items-center text-mist transition-colors hover:text-ivory">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow text-brass">Elsewhere</p>
            <ul className="mt-4 flex gap-3">
              <li>
                <a href={`mailto:${person.email}`} aria-label="Email" className="grid size-11 place-items-center rounded-full border border-line-dark text-mist transition-colors hover:border-brass hover:text-brass">
                  <Mail aria-hidden className="size-4" />
                </a>
              </li>
              <li>
                <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="grid size-11 place-items-center rounded-full border border-line-dark text-mist transition-colors hover:border-brass hover:text-brass">
                  <LinkedInIcon className="size-4" />
                </a>
              </li>
              <li>
                <a href={person.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="grid size-11 place-items-center rounded-full border border-line-dark text-mist transition-colors hover:border-brass hover:text-brass">
                  <GitHubIcon className="size-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-4 border-t border-line-dark pt-8 text-sm text-mist sm:grid-cols-[1fr_auto_1fr]">
          <p className="order-3 text-center sm:order-1 sm:text-left">
            © {year} {person.name}. {person.location}.
          </p>
          <div className="order-1 flex justify-center sm:order-2">
            <Link
              href="/admin/"
              aria-label="Admin sign-in"
              title="Admin"
              className="group grid size-11 place-items-center rounded-full bg-ivory/[0.04] text-ivory/45 transition-colors duration-500 hover:bg-ivory/10 hover:text-brass"
            >
              <Settings aria-hidden className="size-4 transition-transform duration-700 ease-out group-hover:rotate-90" />
            </Link>
          </div>
          <a
            href="#top"
            className="order-2 inline-flex min-h-11 items-center justify-center gap-2 transition-colors hover:text-ivory sm:order-3 sm:justify-self-end"
          >
            Back to top
            <ArrowUp aria-hidden className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
