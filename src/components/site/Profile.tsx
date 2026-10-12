import { profile } from "@/content/profile";
import { SectionHeader } from "./SectionHeader";

export function Profile() {
  return (
    <section id="profile" className="bg-ivory py-24 md:py-36">
      <div className="container-site grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <SectionHeader
          index="01"
          eyebrow="Profile"
          title={
            <>
              Technologist by training. <span className="text-brass-deep italic">Educator and builder</span> by practice.
            </>
          }
        />
        <div className="reveal space-y-6 text-[1.0625rem] leading-[1.8] text-stone lg:pt-14">
          {profile.paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[4.2rem] first-letter:leading-[0.85] first-letter:text-ink"
                  : ""
              }
            >
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="container-site mt-20 md:mt-28">
        <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {profile.principles.map((pr, i) => (
            <li key={pr.title} className="reveal bg-paper p-8 md:p-10">
              <span className="eyebrow text-brass-deep">Principle 0{i + 1}</span>
              <h3 className="font-serif-display mt-6 text-2xl text-ink md:text-3xl">{pr.title}</h3>
              <p className="mt-3 leading-relaxed text-stone">{pr.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
