"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import type { User } from "firebase/auth";
import { ArrowLeft, Inbox, LoaderCircle, LogOut, Mail, Search, Settings, Trash2 } from "lucide-react";
import { enquiryLabels, person, type EnquiryType } from "@/content/profile";
import { signOutAdmin } from "@/lib/firebase/admin-auth";
import { removeEnquiry, STATUSES, updateEnquiry, watchEnquiries, type Enquiry, type Status } from "@/lib/firebase/enquiries";
import { SettingsPanel } from "./SettingsPanel";

const statusStyle: Record<Status, string> = {
  new: "bg-brass text-ink",
  reviewing: "bg-sky/20 text-navy-2",
  replied: "bg-green-100 text-green-800",
  closed: "bg-line text-stone",
  archived: "bg-transparent text-stone border border-line",
};

function when(e: Enquiry) {
  const d = e.createdAt?.toDate();
  if (!d) return "Moments ago";
  return d.toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function Dashboard({ user }: { user: User }) {
  const [tab, setTab] = useState<"inbox" | "settings">("inbox");
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status | "all" | "open">("open");
  const [type, setType] = useState<EnquiryType | "all">("all");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(
    () =>
      watchEnquiries(setRows, () => {
        setError("Enquiries failed to load. Check the Firestore rules and your admin record.");
      }),
    [],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows?.length ?? 0, open: 0 };
    for (const s of STATUSES) c[s] = 0;
    for (const r of rows ?? []) {
      c[r.status] = (c[r.status] ?? 0) + 1;
      if (r.status !== "closed" && r.status !== "archived") c.open += 1;
    }
    return c;
  }, [rows]);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (rows ?? []).filter((r) => {
      if (status === "open" && (r.status === "closed" || r.status === "archived")) return false;
      if (status !== "open" && status !== "all" && r.status !== status) return false;
      if (type !== "all" && r.type !== type) return false;
      if (term && ![r.name, r.email, r.organisation].join(" ").toLowerCase().includes(term)) return false;
      return true;
    });
  }, [rows, status, type, q]);

  const current = rows?.find((r) => r.id === selected) ?? null;
  const filters: (Status | "all" | "open")[] = ["open", ...STATUSES, "all"];

  return (
    <div className="min-h-dvh bg-ivory text-ink">
      <header className="on-dark sticky top-0 z-30 border-b border-line-dark bg-ink text-ivory">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="font-serif-display grid size-9 place-items-center rounded-full bg-brass text-ink">{person.initials}</span>
            <span className="hidden text-sm sm:inline">Admin</span>
          </div>
          <nav className="flex items-center gap-1" aria-label="Admin sections">
            {(
              [
                ["inbox", "Inbox", Inbox],
                ["settings", "Settings", Settings],
              ] as const
            ).map(([k, label, Icon]) => (
              <button
                key={k}
                type="button"
                onClick={() => setTab(k)}
                aria-current={tab === k ? "page" : undefined}
                className={clsx(
                  "inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm transition-colors",
                  tab === k ? "bg-ivory/10 text-ivory" : "text-mist hover:text-ivory",
                )}
              >
                <Icon aria-hidden className="size-4" />
                {label}
                {k === "inbox" && counts.new > 0 && (
                  <span className="rounded-full bg-brass px-2 py-0.5 text-xs font-medium text-ink">{counts.new}</span>
                )}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => signOutAdmin()}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-mist transition-colors hover:text-ivory"
            title={user.email ?? undefined}
          >
            <LogOut aria-hidden className="size-4" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      {tab === "settings" ? (
        <SettingsPanel />
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-serif-display text-4xl md:text-5xl">Enquiries</h1>
              <p className="mt-2 text-sm text-stone">
                {counts.open} open · {counts.all} total
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <label className="relative block">
                <span className="sr-only">Search by name, email, or organisation</span>
                <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search"
                  className="min-h-11 w-full rounded-full border border-line bg-paper pr-4 pl-10 text-base outline-none focus:border-ink sm:w-56"
                />
              </label>
              <label className="block">
                <span className="sr-only">Filter by type</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as EnquiryType | "all")}
                  className="min-h-11 w-full rounded-full border border-line bg-paper px-4 text-base outline-none focus:border-ink"
                >
                  <option value="all">All types</option>
                  {(Object.keys(enquiryLabels) as EnquiryType[]).map((k) => (
                    <option key={k} value={k}>
                      {enquiryLabels[k]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter by status">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={status === f}
                onClick={() => setStatus(f)}
                className={clsx(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-sm capitalize transition-colors",
                  status === f ? "border-ink bg-ink text-ivory" : "border-line bg-paper text-stone hover:border-ink",
                )}
              >
                {f}
                <span className={clsx("text-xs", status === f ? "text-brass" : "text-stone")}>{counts[f] ?? 0}</span>
              </button>
            ))}
          </div>

          {error && (
            <p role="alert" className="mt-6 rounded-xl border border-red-700/30 bg-red-50 p-4 text-sm text-red-800">
              {error}
            </p>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <section aria-label="Enquiry list" className={clsx(current && "hidden lg:block")}>
              {rows === null ? (
                <p className="flex items-center gap-3 p-6 text-stone" role="status">
                  <LoaderCircle aria-hidden className="size-4 animate-spin" /> Loading
                </p>
              ) : visible.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-line p-10 text-center text-stone">No enquiries match this view.</div>
              ) : (
                <ul className="overflow-hidden rounded-3xl border border-line bg-paper">
                  {visible.map((r) => (
                    <li key={r.id} className="border-b border-line last:border-b-0">
                      <button
                        type="button"
                        onClick={() => setSelected(r.id)}
                        aria-current={selected === r.id}
                        className={clsx(
                          "block w-full p-5 text-left transition-colors",
                          selected === r.id ? "bg-brass-pale" : "hover:bg-ivory",
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className={clsx("truncate", r.status === "new" ? "font-semibold" : "font-medium")}>{r.name}</p>
                          <span className={clsx("shrink-0 rounded-full px-2.5 py-0.5 text-xs capitalize", statusStyle[r.status])}>{r.status}</span>
                        </div>
                        <p className="mt-1 truncate text-sm text-stone">
                          {enquiryLabels[r.type]}
                          {r.organisation ? ` · ${r.organisation}` : ""}
                        </p>
                        <p className="mt-2 line-clamp-2 text-sm text-stone">{r.message}</p>
                        <p className="mt-3 font-mono text-xs text-stone">{when(r)}</p>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section aria-label="Enquiry detail" className={clsx(!current && "hidden lg:block")}>
              {current ? (
                <Detail key={current.id} e={current} onBack={() => setSelected(null)} onDeleted={() => setSelected(null)} />
              ) : (
                <div className="grid h-full min-h-64 place-items-center rounded-3xl border border-dashed border-line p-10 text-center text-stone">
                  Select an enquiry to read the message.
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ e, onBack, onDeleted }: { e: Enquiry; onBack: () => void; onDeleted: () => void }) {
  const [note, setNote] = useState(e.note ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function save(patch: { status?: Status; note?: string }) {
    setSaving(true);
    setMsg("");
    try {
      await updateEnquiry(e.id, patch, e);
      setMsg("Saved.");
    } catch {
      setMsg("Save failed. Try again.");
    } finally {
      setSaving(false);
    }
  }

  const subject = encodeURIComponent(`Re: your message to ${person.name}`);
  const body = encodeURIComponent(`Hello ${e.name.split(" ")[0]},\n\nThank you for getting in touch.\n\n`);

  return (
    <article className="rounded-3xl border border-line bg-paper p-6 md:p-8">
      <button type="button" onClick={onBack} className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm text-stone hover:text-ink lg:hidden">
        <ArrowLeft aria-hidden className="size-4" /> All enquiries
      </button>
      <p className="eyebrow text-brass-deep">{enquiryLabels[e.type]}</p>
      <h2 className="font-serif-display mt-3 text-3xl">{e.name}</h2>
      <p className="mt-1 text-sm break-all text-stone">
        <a className="underline-offset-4 hover:underline" href={`mailto:${e.email}`}>
          {e.email}
        </a>
        {e.organisation ? ` · ${e.organisation}` : ""}
      </p>
      <p className="mt-1 font-mono text-xs text-stone">{when(e)}</p>

      <div className="mt-6 rounded-2xl bg-ivory p-5 leading-relaxed whitespace-pre-wrap">{e.message}</div>

      <fieldset className="mt-8">
        <legend className="text-sm font-medium">Status</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              disabled={saving}
              aria-pressed={e.status === s}
              onClick={() => save({ status: s })}
              className={clsx(
                "inline-flex min-h-11 items-center rounded-full border px-4 text-sm capitalize transition-colors",
                e.status === s ? "border-ink bg-ink text-ivory" : "border-line text-stone hover:border-ink",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <label htmlFor="note" className="text-sm font-medium">
          Private note
        </label>
        <textarea
          id="note"
          rows={4}
          maxLength={4000}
          value={note}
          onChange={(ev) => setNote(ev.target.value)}
          className="mt-3 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base outline-none focus:border-ink"
        />
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            disabled={saving || note === (e.note ?? "")}
            onClick={() => save({ note })}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm text-ivory transition-colors hover:bg-navy-2 disabled:opacity-50"
          >
            {saving && <LoaderCircle aria-hidden className="size-4 animate-spin" />}
            Save note
          </button>
          <p className="text-sm text-stone" role="status">
            {msg}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
        <a
          href={`mailto:${e.email}?subject=${subject}&body=${body}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-brass px-5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-ivory"
        >
          <Mail aria-hidden className="size-4" /> Reply by email
        </a>
        {confirmDelete ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-stone">Delete permanently?</span>
            <button
              type="button"
              onClick={async () => {
                await removeEnquiry(e.id);
                onDeleted();
              }}
              className="inline-flex min-h-11 items-center rounded-full bg-red-700 px-4 text-sm text-white"
            >
              Delete
            </button>
            <button type="button" onClick={() => setConfirmDelete(false)} className="inline-flex min-h-11 items-center rounded-full px-4 text-sm text-stone">
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm text-stone transition-colors hover:text-red-700"
          >
            <Trash2 aria-hidden className="size-4" /> Delete
          </button>
        )}
      </div>
    </article>
  );
}
