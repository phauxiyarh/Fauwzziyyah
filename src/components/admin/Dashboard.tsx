"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import type { User } from "firebase/auth";
import { ExternalLink, FileText, Inbox, LayoutDashboard, LogOut, Menu, Settings, X } from "lucide-react";
import { person } from "@/content/profile";
import { signOutAdmin } from "@/lib/firebase/admin-auth";
import { watchEnquiries, type Enquiry } from "@/lib/firebase/enquiries";
import { InboxView } from "./InboxView";
import { Overview } from "./Overview";
import { SettingsPanel } from "./SettingsPanel";
import { initials, type View } from "./shared";

const items: { key: View; label: string; Icon: typeof Inbox }[] = [
  { key: "overview", label: "Overview", Icon: LayoutDashboard },
  { key: "inbox", label: "Inbox", Icon: Inbox },
  { key: "settings", label: "Settings", Icon: Settings },
];

export function Dashboard({ user }: { user: User }) {
  const [view, setView] = useState<View>("overview");
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);

  useEffect(
    () =>
      watchEnquiries(setRows, () => {
        setError("Enquiries failed to load. Check the Firestore rules and the admin allow-list.");
      }),
    [],
  );

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawer(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer]);

  const fresh = useMemo(() => (rows ?? []).filter((r) => r.status === "new").length, [rows]);
  const name = user.displayName || user.email || "Admin";
  const firstName = name.split(/[\s@]/)[0];

  const go = (v: View) => {
    setView(v);
    setDrawer(false);
    window.scrollTo({ top: 0 });
  };
  const openEnquiry = (id: string) => {
    setSelected(id);
    go("inbox");
  };

  const sidebar = (
    <div className="on-dark flex h-full flex-col bg-ink text-ivory">
      <div className="flex items-center gap-3 px-6 pt-7 pb-8">
        <span className="font-serif-display grid size-10 place-items-center rounded-full bg-brass text-ink">{person.initials}</span>
        <div className="leading-tight">
          <p className="font-serif-display text-lg">{person.firstName}</p>
          <p className="eyebrow text-[0.6rem] text-mist">Admin console</p>
        </div>
      </div>

      <nav aria-label="Admin sections" className="px-3">
        <p className="eyebrow px-3 pb-2 text-[0.6rem] text-mist">Workspace</p>
        <ul className="space-y-1">
          {items.map(({ key, label, Icon }) => {
            const active = view === key;
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => go(key)}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "group relative flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm transition-colors duration-300",
                    active ? "bg-ivory/[0.08] text-ivory" : "text-mist hover:bg-ivory/[0.04] hover:text-ivory",
                  )}
                >
                  <span
                    aria-hidden
                    className={clsx(
                      "absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-full bg-brass transition-opacity duration-300",
                      active ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <Icon aria-hidden className={clsx("size-[18px]", active ? "text-brass" : "")} />
                  <span className="flex-1 text-left">{label}</span>
                  {key === "inbox" && fresh > 0 && (
                    <span className="rounded-full bg-brass px-2 py-0.5 text-xs font-medium text-ink tabular-nums">{fresh}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="eyebrow mt-8 px-3 pb-2 text-[0.6rem] text-mist">Public site</p>
        <ul className="space-y-1">
          {[
            { href: "/", label: "View website", Icon: ExternalLink },
            { href: "/cv/", label: "View CV", Icon: FileText },
          ].map(({ href, label, Icon }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-mist transition-colors hover:bg-ivory/[0.04] hover:text-ivory"
              >
                <Icon aria-hidden className="size-[18px]" />
                {label}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto border-t border-line-dark p-4">
        <div className="flex items-center gap-3 rounded-xl p-2">
          {user.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote Google avatar, not part of the static export
            <img src={user.photoURL} alt="" referrerPolicy="no-referrer" className="size-9 rounded-full object-cover" />
          ) : (
            <span className="grid size-9 place-items-center rounded-full bg-navy-2 text-xs font-medium">{initials(name)}</span>
          )}
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm text-ivory">{name}</p>
            <p className="truncate text-xs text-mist">{user.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => signOutAdmin()}
          className="mt-2 flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm text-mist transition-colors hover:bg-ivory/[0.04] hover:text-ivory"
        >
          <LogOut aria-hidden className="size-[18px]" />
          Sign out
        </button>
      </div>
    </div>
  );

  const title = items.find((i) => i.key === view)?.label;

  return (
    <div className="min-h-dvh bg-ivory text-ink lg:grid lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:bg-[linear-gradient(to_right,var(--color-ink)_16.5rem,var(--color-ivory)_16.5rem)]">
      {/* Desktop: fixed left panel. */}
      <aside className="sticky top-0 hidden h-dvh self-start lg:block">{sidebar}</aside>

      {/* Phone and tablet: top bar and slide-in panel. */}
      <header className="on-dark sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line-dark bg-ink px-4 text-ivory lg:hidden">
        <button
          type="button"
          onClick={() => setDrawer(true)}
          aria-label="Open navigation"
          aria-expanded={drawer}
          aria-controls="admin-drawer"
          className="grid size-11 place-items-center rounded-xl"
        >
          <Menu aria-hidden className="size-5" />
        </button>
        <p className="font-serif-display text-lg">{title}</p>
        <span className="font-serif-display grid size-9 place-items-center rounded-full bg-brass text-sm text-ink">{person.initials}</span>
      </header>
      <div className={clsx("fixed inset-0 z-40 lg:hidden", drawer ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!drawer}>
        <div
          className={clsx("absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300", drawer ? "opacity-100" : "opacity-0")}
          onClick={() => setDrawer(false)}
        />
        <div
          id="admin-drawer"
          className={clsx(
            "absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            drawer ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <button
            type="button"
            onClick={() => setDrawer(false)}
            aria-label="Close navigation"
            className="absolute top-5 right-3 z-10 grid size-11 place-items-center rounded-xl text-mist hover:text-ivory"
          >
            <X aria-hidden className="size-5" />
          </button>
          {sidebar}
        </div>
      </div>

      <main className="min-w-0 px-4 py-8 md:px-8 md:py-10 xl:px-12">
        <div className="mx-auto max-w-6xl">
          {error && view !== "settings" && (
            <p role="alert" className="mb-6 rounded-xl border border-red-700/30 bg-red-50 p-4 text-sm text-red-800">
              {error}
            </p>
          )}
          {view === "overview" &&
            (rows === null ? (
              <Skeleton />
            ) : (
              <Overview rows={rows} firstName={firstName} onOpen={openEnquiry} onGo={go} />
            ))}
          {view === "inbox" && <InboxView rows={rows} error="" selected={selected} onSelect={setSelected} />}
          {view === "settings" && <SettingsPanel />}
        </div>
      </main>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-6" role="status" aria-label="Loading">
      <div className="h-12 w-72 rounded-xl bg-line" />
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-line/70" />
        ))}
      </div>
      <div className="h-72 rounded-2xl bg-line/60" />
    </div>
  );
}
