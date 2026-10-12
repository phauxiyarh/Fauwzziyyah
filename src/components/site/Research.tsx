import { researchInterests } from "@/content/profile";
import { SectionHeader } from "./SectionHeader";

export function Research() {
  return (
    <section id="research" className="on-dark relative overflow-hidden bg-ink py-20 text-ivory md:py-28">
      <div aria-hidden className="absolute -top-40 -right-40 size-[32rem] rounded-full bg-navy-2/60 blur-[120px]" />
      <div className="container-site relative">
        <SectionHeader
          dark
          index="02"
          eyebrow="Research interests"
          title={
            <>
              Questions I bring from the <span className="text-brass italic">classroom</span> and the dataset.
            </>
          }
        />
        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line-dark bg-line-dark md:grid-cols-3">
          {researchInterests.map((r, i) => (
            <li key={r.title} className="reveal flex flex-col bg-ink p-7 md:p-8">
              <span className="font-mono text-xs text-brass">0{i + 1}</span>
              <h3 className="font-serif-display mt-5 text-2xl leading-tight">{r.title}</h3>
              <p className="mt-3 leading-relaxed text-mist">{r.body}</p>
              <p className="mt-6 border-t border-line-dark pt-4 text-sm text-sky">{r.evidence}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
