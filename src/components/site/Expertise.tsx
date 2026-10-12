import { BrainCircuit, ChartLine, School, Users } from "lucide-react";
import { expertise, type Expertise as E } from "@/content/profile";
import { SectionHeader } from "./SectionHeader";

const icons: Record<E["icon"], typeof ChartLine> = {
  chart: ChartLine,
  brain: BrainCircuit,
  school: School,
  users: Users,
};

export function Expertise() {
  return (
    <section id="expertise" className="border-t border-line bg-paper py-20 md:py-28">
      <div className="container-site">
        <SectionHeader index="03" eyebrow="Expertise" title="Four areas of practice." />

        <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {expertise.map((x) => {
            const Icon = icons[x.icon];
            return (
              <li key={x.title} className="reveal group bg-paper p-7 transition-colors duration-500 hover:bg-ivory md:p-8">
                <span className="grid size-11 place-items-center rounded-xl bg-ink text-brass transition-transform duration-500 group-hover:-translate-y-0.5">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="font-serif-display mt-6 text-[1.4rem] leading-tight text-ink">{x.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{x.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
