import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import {
  awards,
  certifications,
  education,
  experience,
  languages,
  researchInterests,
  person,
  profile,
  toolkit,
  work,
} from "@/content/profile";
import { PrintButton } from "@/components/cv/PrintButton";
import { LinkedInIcon } from "@/components/site/BrandIcons";
import { Footer } from "@/components/site/Footer";
import { Nav } from "@/components/site/Nav";

export const metadata: Metadata = {
  title: "CV",
  description: `Curriculum vitae of ${person.name}: roles, education, credentials, and skills.`,
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-4 border-t border-line py-10 md:grid-cols-[11rem_1fr] md:gap-10 print:break-inside-avoid-page print:py-6">
      <h2 className="eyebrow pt-1 text-brass-deep">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((p) => (
        <li key={p} className="flex gap-3 leading-relaxed text-stone">
          <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-brass" />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CvPage() {
  return (
    <>
      <Nav active="/cv/" />
      <div id="top" aria-hidden className="no-print h-16 bg-ink md:h-20" />
      <main className="bg-ivory pt-10 pb-24 print:bg-white print:p-0">
        <article className="mx-auto w-[min(100%-2rem,64rem)] rounded-[2rem] border border-line bg-paper px-6 py-10 shadow-[0_30px_80px_-40px_rgb(10_16_32/0.25)] sm:px-10 md:px-14 md:py-14 print:w-full print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <header className="flex flex-col gap-8 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-brass-deep">Curriculum vitae</p>
              <h1 className="font-serif-display mt-3 text-[clamp(2.5rem,6vw,4.25rem)] leading-none font-medium text-ink">
                {person.name}
              </h1>
              <p className="mt-3 text-lg text-stone">{person.role}</p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone">
                <li>
                  <a href={`mailto:${person.email}`} className="inline-flex min-h-11 items-center gap-2 hover:text-ink">
                    <Mail aria-hidden className="size-4 text-brass-deep" />
                    {person.email}
                  </a>
                </li>
                <li>
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-ink">
                    <LinkedInIcon className="size-4 text-brass-deep" />
                    linkedin.com/in/fauwzziyyah-umar
                  </a>
                </li>
                <li className="inline-flex min-h-11 items-center gap-2">
                  <MapPin aria-hidden className="size-4 text-brass-deep" />
                  {person.location}
                </li>
              </ul>
            </div>
            <PrintButton />
          </header>

          <Section title="Profile">
            <div className="space-y-4 leading-relaxed text-stone">
              {profile.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Section>

          <Section title="Research interests">
            <ul className="space-y-3">
              {researchInterests.map((f) => (
                <li key={f.title} className="leading-relaxed text-stone">
                  <span className="text-ink">{f.title}.</span> {f.body}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Experience">
            <div className="space-y-10">
              {[...experience].sort((x, y) => (x.key === "education" ? -1 : y.key === "education" ? 1 : 0)).map((track) => (
                <div key={track.key}>
                  <h3 className="text-xs font-semibold tracking-[0.18em] text-ink uppercase">{track.label}</h3>
                  <div className="mt-5 space-y-8">
                    {track.roles.map((r) => (
                      <div key={r.org} className="print:break-inside-avoid">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                          <p className="font-serif-display text-[1.45rem] leading-tight text-ink">{r.org}</p>
                          <p className="shrink-0 font-mono text-xs text-stone">{r.period}</p>
                        </div>
                        <p className="mt-1 text-sm text-stone">
                          {r.title} · {r.place}
                        </p>
                        <Bullets items={r.points} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Selected projects">
            <div className="space-y-6">
              {work.map((w) => (
                <div key={w.title}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <p className="font-serif-display text-xl text-ink">{w.title}</p>
                    <p className="shrink-0 font-mono text-xs text-stone">{w.year}</p>
                  </div>
                  <p className="mt-1 leading-relaxed text-stone">{w.contribution}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Education">
            <div className="space-y-8">
              {education.map((e) => (
                <div key={e.degree}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <p className="font-serif-display text-[1.45rem] leading-tight text-ink">{e.school}</p>
                    <p className="shrink-0 font-mono text-xs text-stone">{e.year}</p>
                  </div>
                  <p className="mt-1 text-sm text-stone">
                    {e.degree}
                    {e.focus ? ` · ${e.focus}` : ""}
                  </p>
                  <Bullets items={e.points} />
                </div>
              ))}
            </div>
          </Section>

          <Section title="Certifications">
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c.title} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="text-ink">
                    {c.title} <span className="text-stone">· {c.issuer}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-stone">{c.year}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Awards">
            <ul className="space-y-3">
              {awards.map((a) => (
                <li key={a.title} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="text-ink">
                    {a.title} <span className="text-stone">· {a.issuer}</span>
                  </span>
                  <span className="shrink-0 font-mono text-xs text-stone">{a.year}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Skills">
            <dl className="space-y-4">
              {toolkit.map((g) => (
                <div key={g.group} className="grid grid-cols-1 gap-1 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="text-sm font-medium text-ink">{g.group}</dt>
                  <dd className="text-stone">{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Languages">
            <ul className="space-y-2">
              {languages.map((l) => (
                <li key={l.name} className="text-stone">
                  <span className="text-ink">{l.name}</span> · {l.level}
                </li>
              ))}
            </ul>
          </Section>


        </article>
      </main>
      <div className="no-print">
        <Footer />
      </div>
    </>
  );
}
