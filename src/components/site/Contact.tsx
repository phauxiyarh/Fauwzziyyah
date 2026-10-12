"use client";

import { useEffect, useId, useState } from "react";
import clsx from "clsx";
import { ArrowRight, Check, LoaderCircle, Mail, MapPin } from "lucide-react";
import { enquiryLabels, person, type EnquiryType } from "@/content/profile";
import { firebaseConfigured } from "@/lib/firebase/client";
import { submitEnquiry } from "@/lib/firebase/enquiries";
import { LinkedInIcon } from "./BrandIcons";

type Fields = { name: string; email: string; organisation: string; type: EnquiryType | ""; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", organisation: "", type: "", message: "" };
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.type) e.type = "Please choose the closest option.";
  if (f.message.trim().length < 20) e.message = "Please write at least 20 characters so I understand the request.";
  return e;
}

const field =
  "w-full rounded-xl border bg-paper px-4 py-3 text-base text-ink placeholder:text-stone/60 transition-colors duration-300 outline-none focus:border-ink focus:ring-2 focus:ring-ink/10";

export function Contact() {
  const id = useId();
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [honey, setHoney] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  useEffect(() => {
    const onClick = (ev: MouseEvent) => {
      const el = (ev.target as HTMLElement).closest<HTMLElement>("[data-enquiry-type]");
      const t = el?.dataset.enquiryType as EnquiryType | undefined;
      if (t) setF((prev) => ({ ...prev, type: t }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const set = (k: keyof Fields) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((prev) => ({ ...prev, [k]: ev.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate(f);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`${id}-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    // Bots fill hidden fields. Pretend success and store nothing.
    if (honey) {
      setState("sent");
      return;
    }
    setState("sending");
    try {
      await submitEnquiry({ ...f, type: f.type as EnquiryType });
      setState("sent");
      setF(empty);
    } catch {
      setState("failed");
    }
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="mt-2 text-sm text-red-700">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="contact" className="on-dark relative overflow-hidden bg-ink py-20 text-ivory md:py-28">
      <div aria-hidden className="absolute -bottom-40 -left-40 size-[36rem] rounded-full bg-navy-2/60 blur-[120px]" />
      <div className="container-site relative grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="reveal">
          <p className="eyebrow flex items-center gap-3 text-brass">
            <span>05</span>
            <span aria-hidden className="h-px w-8 bg-brass/60" />
            <span>Contact</span>
          </p>
          <h2 className="font-serif-display mt-5 text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-medium">
            Tell me about the <span className="text-brass italic">problem.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mist">
            Roles, research, collaborations, or a first conversation. I reply to every message within two business days.
          </p>

          <ul className="mt-12 space-y-5">
            <li>
              <a href={`mailto:${person.email}`} className="group flex min-h-11 items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full border border-line-dark text-brass transition-colors duration-300 group-hover:border-brass">
                  <Mail aria-hidden className="size-4" />
                </span>
                <span className="text-ivory transition-colors group-hover:text-brass">{person.email}</span>
              </a>
            </li>
            <li>
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="group flex min-h-11 items-center gap-4">
                <span className="grid size-11 place-items-center rounded-full border border-line-dark text-brass transition-colors duration-300 group-hover:border-brass">
                  <LinkedInIcon className="size-4" />
                </span>
                <span className="text-ivory transition-colors group-hover:text-brass">
                  LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
            <li className="flex min-h-11 items-center gap-4">
              <span className="grid size-11 place-items-center rounded-full border border-line-dark text-brass">
                <MapPin aria-hidden className="size-4" />
              </span>
              <span className="text-mist">
                {person.location} · {person.workMode}
              </span>
            </li>
          </ul>
        </div>

        <div className="on-light reveal rounded-3xl bg-ivory p-6 text-ink shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)] sm:p-8 md:p-10">
          {state === "sent" ? (
            <div className="flex min-h-[28rem] flex-col items-center justify-center text-center" role="status">
              <span className="grid size-16 place-items-center rounded-full bg-ink text-brass">
                <Check aria-hidden className="size-7" />
              </span>
              <h3 className="font-serif-display mt-6 text-3xl">Message received.</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-stone">
                Thank you. I will read your message and reply within two business days.
              </p>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="mt-8 inline-flex min-h-11 items-center rounded-full border border-ink px-6 text-sm font-medium transition-colors hover:bg-ink hover:text-ivory"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="relative space-y-6" aria-describedby={`${id}-note`}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id={`${id}-name`}
                    autoComplete="name"
                    maxLength={100}
                    value={f.name}
                    onChange={set("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? `${id}-name-err` : undefined}
                    className={clsx(field, errors.name ? "border-red-700" : "border-line")}
                  />
                  {err("name")}
                </div>
                <div>
                  <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id={`${id}-email`}
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={200}
                    value={f.email}
                    onChange={set("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${id}-email-err` : undefined}
                    className={clsx(field, errors.email ? "border-red-700" : "border-line")}
                  />
                  {err("email")}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-organisation`} className="mb-2 block text-sm font-medium">
                    Organisation <span className="font-normal text-stone">(optional)</span>
                  </label>
                  <input
                    id={`${id}-organisation`}
                    autoComplete="organization"
                    maxLength={120}
                    value={f.organisation}
                    onChange={set("organisation")}
                    className={clsx(field, "border-line")}
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-type`} className="mb-2 block text-sm font-medium">
                    Reason for contact
                  </label>
                  <select
                    id={`${id}-type`}
                    value={f.type}
                    onChange={set("type")}
                    aria-invalid={!!errors.type}
                    aria-describedby={errors.type ? `${id}-type-err` : undefined}
                    className={clsx(field, "appearance-none", errors.type ? "border-red-700" : "border-line")}
                  >
                    <option value="" disabled>
                      Choose one
                    </option>
                    {(Object.keys(enquiryLabels) as EnquiryType[]).map((k) => (
                      <option key={k} value={k}>
                        {enquiryLabels[k]}
                      </option>
                    ))}
                  </select>
                  {err("type")}
                </div>
              </div>

              <div>
                <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id={`${id}-message`}
                  rows={6}
                  maxLength={2000}
                  value={f.message}
                  onChange={set("message")}
                  aria-invalid={!!errors.message}
                  aria-describedby={`${id}-count${errors.message ? ` ${id}-message-err` : ""}`}
                  placeholder="The goal, the timeline, and anything I should know."
                  className={clsx(field, "resize-y", errors.message ? "border-red-700" : "border-line")}
                />
                <div className="mt-2 flex justify-between gap-4">
                  <div>{err("message")}</div>
                  <p id={`${id}-count`} className="shrink-0 text-xs text-stone">
                    {f.message.length} / 2000
                  </p>
                </div>
              </div>

              <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
                <label htmlFor={`${id}-website`}>Website</label>
                <input id={`${id}-website`} tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
              </div>

              {state === "failed" && (
                <p role="alert" className="rounded-xl border border-red-700/30 bg-red-50 p-4 text-sm text-red-800">
                  The message did not send. Please try again, or email{" "}
                  <a className="underline" href={`mailto:${person.email}`}>
                    {person.email}
                  </a>
                  .
                </p>
              )}
              {!firebaseConfigured && (
                <p className="rounded-xl bg-brass-pale p-4 text-sm text-brass-deep">
                  The form is in preview mode. Add the Firebase settings to enable sending.
                </p>
              )}

              <button
                type="submit"
                disabled={state === "sending"}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-7 font-medium text-ivory transition-colors duration-300 hover:bg-navy-2 disabled:cursor-wait disabled:opacity-70"
              >
                {state === "sending" ? (
                  <>
                    <LoaderCircle aria-hidden className="size-4 animate-spin" /> Sending
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
              <p id={`${id}-note`} className="text-center text-xs text-stone">
                Your details go to a private inbox and nowhere else.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
