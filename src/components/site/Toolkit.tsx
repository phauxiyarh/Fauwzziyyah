import { toolkit } from "@/content/profile";
import { SectionHeader } from "./SectionHeader";

export function Toolkit() {
  return (
    <section id="toolkit" className="bg-ivory py-24 md:py-32">
      <div className="container-site">
        <SectionHeader
          index="07"
          eyebrow="Toolkit"
          title="The stack behind the work."
          lede="Grouped by the job each tool does. I pick tools to fit the team and the problem, not the reverse."
        />
        <dl className="mt-14 divide-y divide-line border-y border-line">
          {toolkit.map((g) => (
            <div key={g.group} className="reveal grid gap-4 py-7 md:grid-cols-[16rem_1fr] md:items-center md:gap-10">
              <dt className="eyebrow text-brass-deep">{g.group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-7 gap-y-3">
                  {g.items.map((t) => (
                    <li key={t} className="font-serif-display text-xl text-ink md:text-2xl">
                      {t}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
