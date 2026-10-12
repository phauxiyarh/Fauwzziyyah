import { journey } from "@/content/profile";
import { SectionHeader } from "./SectionHeader";

export function Journey() {
  return (
    <section id="journey" className="bg-ivory py-24 md:py-36">
      <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            index="05"
            eyebrow="Journey"
            title="Each year adds a layer."
            lede="A dated record from the first venture to the present. Each year adds a role, a credential, or a new responsibility."
          />
        </div>

        <ol className="relative border-l border-line pl-8 md:pl-12">
          {journey.map((m, i) => {
            const last = i === journey.length - 1;
            return (
              <li key={m.year + m.title} className="reveal relative pb-12 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute top-1.5 -left-[2.4rem] size-3 rounded-full ring-4 ring-ivory md:-left-[3.4rem] ${
                    last ? "bg-brass" : "bg-ink"
                  }`}
                />
                <p className={`eyebrow ${last ? "text-brass-deep" : "text-stone"}`}>{m.year}</p>
                <h3 className="font-serif-display mt-2 text-2xl leading-snug text-ink md:text-[1.75rem]">{m.title}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-stone">{m.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
