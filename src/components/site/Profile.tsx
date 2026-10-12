import { profile } from "@/content/profile";
import { SectionHeader } from "./SectionHeader";

export function Profile() {
  return (
    <section id="profile" className="bg-ivory py-20 md:py-28">
      <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <SectionHeader
          index="01"
          eyebrow="Profile"
          title={
            <>
              Technologist by training. <span className="text-brass-deep italic">Educator and builder</span> by practice.
            </>
          }
        />
        <div className="reveal lg:pt-12">
          <p className="text-lg leading-relaxed text-stone md:text-xl">{profile.summary}</p>
          <ol className="mt-10 space-y-5 border-t border-line pt-8">
            {profile.principles.map((pr, i) => (
              <li key={pr.title} className="grid grid-cols-[2.5rem_1fr] gap-2">
                <span className="font-mono text-xs leading-7 text-brass-deep">0{i + 1}</span>
                <p className="leading-relaxed text-stone">
                  <span className="font-serif-display text-xl text-ink">{pr.title}.</span> {pr.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
