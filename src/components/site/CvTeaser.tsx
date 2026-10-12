import { ArrowRight } from "lucide-react";

export function CvTeaser() {
  return (
    <section className="bg-ivory py-16 md:py-20">
      <div className="container-site">
        <a
          href="/cv/"
          className="reveal group flex flex-col gap-6 rounded-3xl border border-line bg-paper p-8 transition-colors duration-500 hover:border-ink md:flex-row md:items-center md:justify-between md:p-12"
        >
          <div>
            <p className="eyebrow text-brass-deep">Curriculum vitae</p>
            <p className="font-serif-display mt-3 text-3xl leading-tight text-ink md:text-4xl">
              The full record: roles, education, credentials, and skills.
            </p>
          </div>
          <span className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-full bg-ink px-7 font-medium text-ivory transition-colors duration-300 group-hover:bg-brass group-hover:text-ink md:self-auto">
            Open the CV
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </a>
      </div>
    </section>
  );
}
