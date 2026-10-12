import { ArrowUpRight } from "lucide-react";
import { engagements, process } from "@/content/profile";
import { SectionHeader } from "./SectionHeader";

export function Engage() {
  return (
    <section id="engage" className="border-t border-line bg-paper py-24 md:py-36">
      <div className="container-site">
        <SectionHeader
          index="08"
          eyebrow="Ways to engage"
          title={
            <>
              Hire, commission, <span className="text-brass-deep italic">or collaborate.</span>
            </>
          }
          lede="Pick the route closest to your need. The contact form uses the same five options."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {engagements.map((e, i) => (
            <li key={e.type} className="reveal">
              <a
                href="#contact"
                data-enquiry-type={e.type}
                className="group flex h-full min-h-56 flex-col rounded-3xl border border-line bg-ivory p-7 transition-colors duration-500 hover:border-ink hover:bg-ink"
              >
                <span className="eyebrow text-brass-deep transition-colors duration-500 group-hover:text-brass">
                  Route 0{i + 1}
                </span>
                <span className="font-serif-display mt-5 text-2xl leading-tight text-ink transition-colors duration-500 group-hover:text-ivory">
                  {e.title}
                </span>
                <span className="mt-3 text-sm leading-relaxed text-stone transition-colors duration-500 group-hover:text-mist">
                  {e.body}
                </span>
                <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-ink transition-colors duration-500 group-hover:text-brass">
                  Start here
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="reveal mt-20 rounded-3xl border border-line bg-ivory p-8 md:p-12">
          <h3 className="eyebrow text-stone">How we work together</h3>
          <ol className="mt-8 grid gap-10 md:grid-cols-4 md:gap-8">
            {process.map((p, i) => (
              <li key={p.title} className="relative">
                <div className="flex items-center gap-4">
                  <span className="font-serif-display grid size-11 shrink-0 place-items-center rounded-full border border-ink text-lg text-ink">
                    {i + 1}
                  </span>
                  {i < process.length - 1 && <span aria-hidden className="hidden h-px flex-1 bg-line md:block" />}
                </div>
                <p className="font-serif-display mt-5 text-2xl text-ink">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
