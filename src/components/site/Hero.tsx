import { ArrowDown, ArrowRight, BriefcaseBusiness, GraduationCap, MapPin, Store } from "lucide-react";
import { person, stats } from "@/content/profile";
import { Availability } from "./Availability";

function SignalChart() {
  // Decorative trend lines. No data is implied.
  return (
    <svg viewBox="0 0 320 120" className="h-28 w-full" aria-hidden>
      <defs>
        <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#c9a55c" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#c9a55c" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 50, 80, 110].map((y) => (
        <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="#24304a" strokeWidth="1" />
      ))}
      <path d="M0 96 C 40 92, 60 70, 96 74 S 150 52, 180 50 S 236 28, 262 30 S 300 14, 320 10 L 320 120 L 0 120 Z" fill="url(#area)" />
      <path
        className="animate-draw"
        style={{ ["--len" as string]: 420 }}
        d="M0 96 C 40 92, 60 70, 96 74 S 150 52, 180 50 S 236 28, 262 30 S 300 14, 320 10"
        fill="none"
        stroke="#c9a55c"
        strokeWidth="2"
      />
      <path
        className="animate-draw"
        style={{ ["--len" as string]: 420 }}
        d="M0 104 C 50 100, 80 92, 120 90 S 180 80, 210 72 S 270 62, 320 48"
        fill="none"
        stroke="#7aadcc"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        opacity="0.8"
      />
      <circle cx="320" cy="10" r="3.5" fill="#c9a55c" />
    </svg>
  );
}

export function Hero() {
  return (
    <section id="top" className="on-dark relative isolate overflow-hidden bg-ink text-ivory">
      <div aria-hidden className="hairline-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_30%,black,transparent)]" />
      <div aria-hidden className="absolute -top-40 right-[-10%] -z-10 size-[42rem] rounded-full bg-navy-2/50 blur-[120px]" />
      <div aria-hidden className="absolute bottom-[-30%] left-[-15%] -z-10 size-[34rem] rounded-full bg-brass/10 blur-[120px]" />
      <div aria-hidden className="grain absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay" />

      <div className="container-site grid grid-cols-1 gap-14 pt-32 pb-16 md:pt-40 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16 lg:pb-24">
        <div className="reveal min-w-0">
          <Availability />
          <p className="eyebrow mt-10 text-brass">{person.disciplines.join("  ·  ")}</p>
          <h1 className="font-serif-display mt-5 text-[clamp(3.25rem,10vw,8.25rem)] leading-[0.92] font-medium">
            {person.firstName}
            <br />
            <span className="text-brass italic">{person.lastName}</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist md:text-xl">{person.statement}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brass px-7 font-medium text-ink transition-colors duration-300 hover:bg-ivory"
            >
              Start a conversation
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ivory/25 px-7 font-medium text-ivory transition-colors duration-300 hover:border-ivory hover:bg-ivory/5"
            >
              See the work
            </a>
          </div>
        </div>

        <aside
          aria-label="At a glance"
          className="reveal relative rounded-3xl border border-line-dark bg-navy/50 p-6 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)] backdrop-blur-md md:p-7"
        >
          <div className="flex items-center justify-between">
            <p className="eyebrow text-mist">At a glance</p>
            <span className="font-serif-display grid size-12 place-items-center rounded-full bg-brass text-lg text-ink">
              {person.initials}
            </span>
          </div>
          <SignalChart />
          <dl className="mt-2 space-y-4 text-sm">
            <div className="flex gap-3">
              <GraduationCap aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
              <div>
                <dt className="sr-only">Education</dt>
                <dd className="text-ivory">MSc Data Analytics, WGU, 2025</dd>
                <dd className="text-mist">BSc Computer Science, top 2% of class</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <BriefcaseBusiness aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
              <div>
                <dt className="sr-only">Current roles</dt>
                <dd className="text-ivory">Principal, The Marti School</dd>
                <dd className="text-mist">ML Engineer (volunteer), Omdena, since 2021</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Store aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
              <div>
                <dt className="sr-only">Ventures</dt>
                <dd className="text-ivory">Co-Founder and CEO, EduvateKids</dd>
                <dd className="text-mist">Programme Coordinator, Haleyouth Foundation (volunteer)</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brass" />
              <div>
                <dt className="sr-only">Location</dt>
                <dd className="text-ivory">{person.location}</dd>
                <dd className="text-mist">{person.languages}</dd>
              </div>
            </div>
          </dl>
        </aside>
      </div>

      <div className="container-site pb-14">
        <dl className="reveal grid grid-cols-2 border-t border-line-dark md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col py-7 md:py-9 ${i % 2 === 1 ? "pl-5" : "pr-3"} ${i > 0 ? "md:border-l md:border-line-dark md:pl-8" : ""} ${i < 2 ? "border-b border-line-dark md:border-b-0" : ""}`}
            >
              <dt className="order-2 mt-3 text-sm leading-snug text-mist">
                {s.label}
                <span className="eyebrow mt-1 block text-[0.65rem] text-brass">{s.source}</span>
              </dt>
              <dd className="font-serif-display text-[2.6rem] leading-none text-ivory md:text-6xl">
                {s.value}
                <span className="text-brass">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
        <a href="#profile" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-mist transition-colors hover:text-ivory">
          <ArrowDown aria-hidden className="size-4" />
          Scroll to profile
        </a>
      </div>
    </section>
  );
}
