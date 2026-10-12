import { Award, BadgeCheck, Compass } from "lucide-react";
import { awards, certifications, learningFocus } from "@/content/profile";
import { SectionHeader } from "./SectionHeader";

export function Growth() {
  return (
    <section id="growth" className="border-t border-line bg-paper py-24 md:py-36">
      <div className="container-site">
        <SectionHeader
          index="06"
          eyebrow="Growth"
          title={
            <>
              Credentials earned, <span className="text-brass-deep italic">and the next ones</span> in view.
            </>
          }
          lede="Formal study, industry certification, and competition results. The last column lists where my learning goes next."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="reveal rounded-3xl border border-line bg-ivory p-8">
            <h3 className="flex items-center gap-3 text-ink">
              <BadgeCheck aria-hidden className="size-5 text-brass-deep" />
              <span className="eyebrow">Certifications</span>
            </h3>
            <ul className="mt-6 divide-y divide-line">
              {certifications.map((c) => (
                <li key={c.title} className="py-5 first:pt-0 last:pb-0">
                  <p className="font-serif-display text-xl text-ink">{c.title}</p>
                  <p className="mt-1 text-sm text-stone">{c.issuer}</p>
                  <p className="eyebrow mt-2 text-brass-deep">{c.year}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal rounded-3xl border border-line bg-ivory p-8">
            <h3 className="flex items-center gap-3 text-ink">
              <Award aria-hidden className="size-5 text-brass-deep" />
              <span className="eyebrow">Awards and honours</span>
            </h3>
            <ul className="mt-6 divide-y divide-line">
              {awards.map((a) => (
                <li key={a.title} className="py-5 first:pt-0 last:pb-0">
                  <p className="font-serif-display text-xl text-ink">{a.title}</p>
                  <p className="mt-1 text-sm text-stone">{a.issuer}</p>
                  <p className="eyebrow mt-2 text-brass-deep">{a.year}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="on-dark reveal relative overflow-hidden rounded-3xl bg-ink p-8 text-ivory">
            <div aria-hidden className="absolute -top-24 -right-24 size-64 rounded-full bg-brass/15 blur-3xl" />
            <h3 className="relative flex items-center gap-3">
              <Compass aria-hidden className="size-5 text-brass" />
              <span className="eyebrow text-brass">Current learning focus</span>
            </h3>
            <ul className="relative mt-6 space-y-6">
              {learningFocus.map((f, i) => (
                <li key={f.title} className="flex gap-4">
                  <span className="font-mono text-xs text-brass">0{i + 1}</span>
                  <div>
                    <p className="font-serif-display text-xl">{f.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-mist">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
