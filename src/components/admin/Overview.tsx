"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { enquiryLabels, type EnquiryType } from "@/content/profile";
import type { Enquiry } from "@/lib/firebase/enquiries";
import { initials, isOpen, relative, statusStyle, type View } from "./shared";

const WEEKS = 12;
const DAY = 86_400_000;

function greeting(now: number) {
  const h = new Date(now).getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function startOfWeek(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); // Monday
  return x;
}

type Props = {
  rows: Enquiry[];
  firstName: string;
  onOpen: (id: string) => void;
  onGo: (v: View) => void;
};

export function Overview({ rows, firstName, onOpen, onGo }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  // Fixed when the dashboard opens, so renders stay pure.
  const [now] = useState(() => Date.now());

  const stats = useMemo(() => {
    const t = (e: Enquiry) => e.createdAt?.toMillis() ?? now;
    const thisWeek = rows.filter((e) => now - t(e) < 7 * DAY).length;
    const lastWeek = rows.filter((e) => now - t(e) >= 7 * DAY && now - t(e) < 14 * DAY).length;
    return {
      fresh: rows.filter((e) => e.status === "new").length,
      open: rows.filter(isOpen).length,
      replied: rows.filter((e) => e.status === "replied").length,
      total: rows.length,
      thisWeek,
      lastWeek,
    };
  }, [rows, now]);

  const weeks = useMemo(() => {
    const first = startOfWeek(new Date(now - (WEEKS - 1) * 7 * DAY)).getTime();
    const buckets = Array.from({ length: WEEKS }, (_, i) => ({ start: new Date(first + i * 7 * DAY), count: 0 }));
    for (const e of rows) {
      const ms = e.createdAt?.toMillis() ?? now;
      const i = Math.floor((ms - first) / (7 * DAY));
      if (i >= 0 && i < WEEKS) buckets[i].count += 1;
    }
    return buckets;
  }, [rows, now]);
  const peak = Math.max(1, ...weeks.map((w) => w.count));

  const byType = useMemo(() => {
    const c = Object.fromEntries((Object.keys(enquiryLabels) as EnquiryType[]).map((k) => [k, 0])) as Record<EnquiryType, number>;
    for (const e of rows) c[e.type] = (c[e.type] ?? 0) + 1;
    return (Object.keys(c) as EnquiryType[]).map((k) => ({ k, n: c[k] })).sort((a, b) => b.n - a.n);
  }, [rows]);
  const typeMax = Math.max(1, ...byType.map((t) => t.n));

  const delta = stats.thisWeek - stats.lastWeek;
  const kpis = [
    { label: "New", value: stats.fresh, note: "Awaiting first review", accent: true },
    { label: "Open", value: stats.open, note: "New, reviewing, or replied" },
    { label: "This week", value: stats.thisWeek, note: delta === 0 ? "Same as last week" : `${delta > 0 ? "+" : ""}${delta} on last week` },
    { label: "All time", value: stats.total, note: `${stats.replied} marked replied` },
  ];

  const fmt = (d: Date) => d.toLocaleDateString(undefined, { day: "numeric", month: "short" });

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-brass-deep">{new Date(now).toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}</p>
          <h1 className="font-serif-display mt-2 text-4xl text-ink md:text-5xl">
            {greeting(now)}, {firstName}.
          </h1>
        </div>
        <button
          type="button"
          onClick={() => onGo("inbox")}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-ivory transition-colors hover:bg-navy-2"
        >
          Open inbox
          <ArrowUpRight aria-hidden className="size-4" />
        </button>
      </header>

      <dl className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className={clsx(
              "rounded-2xl border p-5 md:p-6",
              k.accent ? "border-ink bg-ink text-ivory" : "border-line bg-paper text-ink",
            )}
          >
            <dt className={clsx("text-sm", k.accent ? "text-mist" : "text-stone")}>{k.label}</dt>
            <dd className="font-serif-display mt-3 text-5xl leading-none">{k.value}</dd>
            <dd className={clsx("mt-3 text-xs", k.accent ? "text-brass" : "text-stone")}>{k.note}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="rounded-2xl border border-line bg-paper p-5 md:p-6" aria-labelledby="weekly-title">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="weekly-title" className="font-medium text-ink">
              Enquiries per week
            </h2>
            <p className="text-xs text-stone">Last {WEEKS} weeks</p>
          </div>

          <div className="relative mt-8 h-60" onMouseLeave={() => setHover(null)}>
            {/* Recessive gridlines at the peak and its midpoint. */}
            {[1, 0.5].map((f) => (
              <div key={f} aria-hidden className="absolute inset-x-0 border-t border-dashed border-line" style={{ bottom: `${f * 100}%` }}>
                <span className="absolute -top-2.5 right-0 bg-paper pl-1 text-[0.65rem] text-stone tabular-nums">{Math.round(peak * f)}</span>
              </div>
            ))}
            <div aria-hidden className="absolute inset-x-0 bottom-0 border-t border-line" />
            <div className="absolute inset-0 flex items-end gap-[2px] pr-6">
              {weeks.map((w, i) => (
                <div
                  key={i}
                  className="relative flex h-full flex-1 items-end"
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  tabIndex={0}
                  aria-label={`Week of ${fmt(w.start)}: ${w.count} enquiries`}
                >
                  <div
                    className={clsx(
                      "w-full rounded-t-[4px] transition-colors duration-300",
                      hover === i ? "bg-brass-deep" : "bg-navy-2",
                      w.count === 0 && "bg-line",
                    )}
                    style={{ height: w.count ? `${(w.count / peak) * 100}%` : "2px" }}
                  />
                  {hover === i && (
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-lg bg-ink px-3 py-2 text-xs whitespace-nowrap text-ivory shadow-lg">
                      <span className="text-mist">Week of {fmt(w.start)}</span>
                      <span className="ml-2 font-medium tabular-nums">{w.count}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div aria-hidden className="mt-2 flex justify-between pr-6 text-[0.65rem] text-stone">
            <span>{fmt(weeks[0].start)}</span>
            <span>This week</span>
          </div>

          <table className="sr-only">
            <caption>Enquiries per week</caption>
            <thead>
              <tr>
                <th scope="col">Week starting</th>
                <th scope="col">Enquiries</th>
              </tr>
            </thead>
            <tbody>
              {weeks.map((w) => (
                <tr key={w.start.toISOString()}>
                  <td>{fmt(w.start)}</td>
                  <td>{w.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-2xl border border-line bg-paper p-5 md:p-6" aria-labelledby="type-title">
          <h2 id="type-title" className="font-medium text-ink">
            By reason
          </h2>
          <ul className="mt-5 space-y-4">
            {byType.map(({ k, n }) => (
              <li key={k}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-ink">{enquiryLabels[k]}</span>
                  <span className="text-stone tabular-nums">{n}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-ivory">
                  <div className="h-full rounded-full bg-navy-2 transition-[width] duration-700" style={{ width: `${(n / typeMax) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-2xl border border-line bg-paper" aria-labelledby="recent-title">
        <div className="flex items-center justify-between px-5 pt-5 md:px-6">
          <h2 id="recent-title" className="font-medium text-ink">
            Recent enquiries
          </h2>
          <button type="button" onClick={() => onGo("inbox")} className="inline-flex min-h-11 items-center gap-1 text-sm text-stone hover:text-ink">
            View all <ChevronRight aria-hidden className="size-4" />
          </button>
        </div>
        {rows.length === 0 ? (
          <p className="px-6 pt-2 pb-8 text-stone">No enquiries yet. New messages from the contact form appear here.</p>
        ) : (
          <ul className="mt-2 divide-y divide-line">
            {rows.slice(0, 5).map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => onOpen(e.id)}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-ivory md:px-6"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ivory text-sm font-medium text-ink">{initials(e.name)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-ink">{e.name}</span>
                    <span className="block truncate text-sm text-stone">{e.message}</span>
                  </span>
                  <span className="hidden shrink-0 text-xs text-stone sm:block">{relative(e)}</span>
                  <span className={clsx("shrink-0 rounded-full px-2.5 py-0.5 text-xs capitalize", statusStyle[e.status])}>{e.status}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
