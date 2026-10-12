import { BrainCircuit, ChartLine, School, Store, Users, Workflow } from "lucide-react";
import { expertise, type Expertise as E } from "@/content/profile";
import { SectionHeader } from "./SectionHeader";

const icons: Record<E["icon"], typeof ChartLine> = {
  chart: ChartLine,
  brain: BrainCircuit,
  workflow: Workflow,
  school: School,
  users: Users,
  store: Store,
};

export function Expertise() {
  return (
    <section id="expertise" className="border-t border-line bg-paper py-24 md:py-36">
      <div className="container-site">
        <SectionHeader
          index="02"
          eyebrow="Expertise"
          title="Six areas of practice, one thread of evidence."
          lede="Most projects draw on more than one area. A forecasting model needs a pipeline, and a dashboard needs someone to teach the team to read the result."
        />

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((x, i) => {
            const Icon = icons[x.icon];
            return (
              <li
                key={x.title}
                className={`reveal group relative flex flex-col rounded-3xl border border-line bg-ivory p-8 transition-colors duration-500 hover:border-brass/70 hover:bg-paper`}
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-ink text-brass">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="eyebrow text-stone">0{i + 1}</span>
                </div>
                <h3 className="font-serif-display mt-8 text-2xl leading-tight text-ink md:text-[1.75rem]">{x.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{x.body}</p>
                <ul className="mt-7 flex flex-wrap gap-2 pt-1">
                  {x.skills.map((s) => (
                    <li key={s} className="rounded-full border border-line bg-paper px-3 py-1.5 text-[0.8125rem] text-stone">
                      {s}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
