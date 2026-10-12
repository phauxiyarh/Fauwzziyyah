import { ArrowUpRight } from "lucide-react";
import { work } from "@/content/profile";
import { SectionHeader } from "./SectionHeader";

export function Work() {
  return (
    <section id="work" className="on-dark relative overflow-hidden bg-ink py-20 text-ivory md:py-28">
      <div
        aria-hidden
        className="hairline-grid absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />
      <div className="container-site relative">
        <SectionHeader
          dark
          index="04"
          eyebrow="Selected work"
          title={
            <>
              Projects with a <span className="text-brass italic">question</span> at the centre.
            </>
          }
          lede="Four projects from classrooms, study, and practice. Each names the context, my contribution, and the tools."
        />

        <ol className="mt-12 divide-y divide-line-dark border-y border-line-dark">
          {work.map((w, i) => (
            <li key={w.title} className="reveal group grid gap-6 py-8 md:grid-cols-[5rem_1fr_1.2fr] md:gap-10 md:py-10">
              <span className="font-serif-display text-4xl text-brass/80 transition-colors duration-500 group-hover:text-brass md:text-5xl">
                0{i + 1}
              </span>
              <div>
                <p className="eyebrow text-sky">
                  {w.tag} · {w.year}
                </p>
                <h3 className="font-serif-display mt-3 text-3xl leading-tight md:text-4xl">{w.title}</h3>
                <p className="mt-3 text-mist">{w.context}</p>
                {w.url && (
                  <a
                    href={w.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm text-brass transition-colors hover:text-ivory"
                  >
                    {w.url.replace(/^https?:\/\//, "")}
                    <ArrowUpRight aria-hidden className="size-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
              <div>
                <p className="text-[1.0625rem] leading-relaxed text-ivory/90">{w.contribution}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tools">
                  {w.tools.map((t) => (
                    <li key={t} className="rounded-full border border-line-dark px-3 py-1.5 font-mono text-xs text-mist">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
