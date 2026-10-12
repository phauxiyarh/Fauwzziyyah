import { ArrowUp, Mail } from "lucide-react";
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
            <p className="mt-4 max-w-sm text-mist">{person.role}. Analysis, machine learning, and automation in service of real decisions.</p>
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

        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-line-dark pt-8 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {person.name}. {person.location}.
          </p>
          <a href="#top" className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-ivory">
            Back to top
            <ArrowUp aria-hidden className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
