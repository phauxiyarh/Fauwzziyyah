"use client";

import { useState } from "react";
import clsx from "clsx";
import { experience } from "@/content/profile";
import { SectionHeader } from "./SectionHeader";

export function Experience() {
  const [active, setActive] = useState(experience[0].key);
  const track = experience.find((t) => t.key === active) ?? experience[0];

  return (
    <section id="experience" className="bg-ivory py-24 md:py-36">
      <div className="container-site">
        <SectionHeader
          index="03"
          eyebrow="Experience"
          title={
            <>
              Three strands, <span className="text-brass-deep italic">one practice.</span>
            </>
          }
          lede="Data and AI roles, school leadership and teaching, and the ventures and programmes I lead. Figures come from each role's own reporting."
        />

        <div role="tablist" aria-label="Experience by strand" className="reveal mt-12 flex flex-wrap gap-2">
          {experience.map((t) => (
            <button
              key={t.key}
              id={`tab-${t.key}`}
              role="tab"
              type="button"
              aria-selected={active === t.key}
              aria-controls={`panel-${t.key}`}
              onClick={() => setActive(t.key)}
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                const i = experience.findIndex((x) => x.key === active);
                const next = experience[(i + (e.key === "ArrowRight" ? 1 : experience.length - 1)) % experience.length];
                setActive(next.key);
                document.getElementById(`tab-${next.key}`)?.focus();
              }}
              tabIndex={active === t.key ? 0 : -1}
              className={clsx(
                "inline-flex min-h-12 shrink-0 items-center gap-3 rounded-full border px-6 text-[0.95rem] transition-colors duration-300",
                active === t.key ? "border-ink bg-ink text-ivory" : "border-line bg-paper text-stone hover:border-ink hover:text-ink",
              )}
            >
              {t.label}
              <span className={clsx("font-mono text-xs", active === t.key ? "text-brass" : "text-stone")}>{t.roles.length}</span>
            </button>
          ))}
        </div>

        <div id={`panel-${track.key}`} role="tabpanel" aria-labelledby={`tab-${track.key}`} className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {track.roles.map((r, i) => (
            <article
              key={r.org}
              className={clsx(
                "flex flex-col rounded-3xl border border-line bg-paper p-7 md:p-9",
                track.roles.length === 3 && i === 0 && "lg:row-span-2",
              )}
            >
              <p className="eyebrow text-brass-deep">{r.period}</p>
              <h3 className="font-serif-display mt-4 text-[1.75rem] leading-tight text-ink md:text-3xl">{r.org}</h3>
              <p className="mt-1 text-stone">
                {r.title} · {r.place}
              </p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6">
                {r.points.map((p) => (
                  <li key={p} className="flex gap-3 leading-relaxed text-stone">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-brass" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
