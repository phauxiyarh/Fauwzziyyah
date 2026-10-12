/* eslint-disable @next/next/no-img-element -- the static export serves pre-sized WebP files, so next/image adds nothing here */
import { ArrowRight, FileText } from "lucide-react";
import { person, stats } from "@/content/profile";
import { Availability } from "./Availability";

export function Hero() {
  return (
    <section id="top" className="on-dark relative isolate overflow-hidden bg-ink text-ivory">
      {/* Portrait: full bleed on the right, fading into the page on its top, left, and bottom edges. */}
      <div aria-hidden className="hero-photo absolute inset-y-0 right-0 -z-10 hidden w-[56%] lg:block">
        <picture>
          <source media="(min-width: 1024px)" srcSet="/images/ziyyah-working-1100.webp" />
          <img
            src="/images/ziyyah-working-640.webp"
            alt=""
            className="h-full w-full object-cover object-[60%_30%]"
            fetchPriority="high"
          />
        </picture>
      </div>
      <div
        aria-hidden
        className="hairline-grid absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_70%_70%_at_20%_40%,black,transparent)]"
      />
      <div aria-hidden className="absolute bottom-[-30%] left-[-15%] -z-20 size-[34rem] rounded-full bg-brass/10 blur-[120px]" />

      {/* Phone and tablet: the image sits above the text and fades into the page. */}
      <div aria-hidden className="hero-photo-mobile relative -z-10 h-[46svh] min-h-72 w-full lg:hidden">
        <img
          src="/images/ziyyah-working-640.webp"
          alt=""
          className="h-full w-full object-cover object-[65%_25%]"
          fetchPriority="high"
        />
      </div>

      <div className="container-site -mt-10 pb-10 lg:mt-0 lg:flex lg:min-h-[44rem] lg:items-center lg:pt-28 lg:pb-12">
        <div className="reveal min-w-0 max-w-xl">
          <Availability />
          <p className="eyebrow mt-8 text-brass">{person.disciplines.join("  ·  ")}</p>
          <h1 className="font-serif-display mt-4 text-[clamp(3rem,8vw,6.25rem)] leading-[0.95] font-medium">
            {person.firstName}
            <br />
            <span className="text-brass italic">{person.lastName}</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-mist">{person.statement}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brass px-7 font-medium text-ink transition-colors duration-300 hover:bg-ivory"
            >
              Start a conversation
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/cv/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ivory/25 px-7 font-medium text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory/5"
            >
              <FileText aria-hidden className="size-4" />
              View CV
            </a>
          </div>
        </div>
      </div>

      <div className="container-site pb-10">
        <dl className="reveal grid grid-cols-2 border-t border-line-dark md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col py-6 ${i % 2 === 1 ? "pl-5" : "pr-3"} ${i > 0 ? "md:border-l md:border-line-dark md:pl-7" : ""} ${i < 2 ? "border-b border-line-dark md:border-b-0" : ""}`}
            >
              <dt className="order-2 mt-2 text-sm leading-snug text-mist">
                {s.label}
                <span className="eyebrow mt-1 block text-[0.65rem] text-brass">{s.source}</span>
              </dt>
              <dd className="font-serif-display text-4xl leading-none text-ivory md:text-5xl">
                {s.value}
                <span className="text-brass">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
