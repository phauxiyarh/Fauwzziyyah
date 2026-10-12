"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { readSettings, saveSettings, type PublicSettings } from "@/lib/firebase/settings";

export function SettingsPanel() {
  const [s, setS] = useState<PublicSettings | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    readSettings().then(setS).catch(() => setMsg("Settings failed to load."));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!s) return;
    setBusy(true);
    setMsg("");
    try {
      await saveSettings(s);
      setMsg("Saved. The site shows the change on the next page load.");
    } catch {
      setMsg("Save failed. Check your admin record and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <p className="eyebrow text-brass-deep">Public site</p>
      <h1 className="font-serif-display mt-2 text-4xl text-ink md:text-5xl">Site settings</h1>
      <p className="mt-2 text-stone">Controls the availability badge at the top of the home page.</p>

      {!s ? (
        <p className="mt-10 flex items-center gap-3 text-stone" role="status">
          <LoaderCircle aria-hidden className="size-4 animate-spin" /> {msg || "Loading"}
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-10 space-y-8 rounded-3xl border border-line bg-paper p-6 md:p-8">
          <label className="flex min-h-11 cursor-pointer items-center justify-between gap-6">
            <span>
              <span className="block font-medium">Available for new work</span>
              <span className="block text-sm text-stone">Shows a green or grey dot beside the status line.</span>
            </span>
            <input
              type="checkbox"
              checked={s.available}
              onChange={(e) => setS({ ...s, available: e.target.checked })}
              className="size-6 shrink-0 accent-ink"
            />
          </label>
          <div>
            <label htmlFor="status-line" className="block font-medium">
              Status line
            </label>
            <input
              id="status-line"
              maxLength={120}
              value={s.statusLine}
              onChange={(e) => setS({ ...s, statusLine: e.target.value })}
              className="mt-3 w-full rounded-xl border border-line bg-paper px-4 py-3 text-base outline-none focus:border-ink"
            />
            <p className="mt-2 text-xs text-stone">{s.statusLine.length} / 120</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm text-ivory transition-colors hover:bg-navy-2 disabled:opacity-60"
            >
              {busy && <LoaderCircle aria-hidden className="size-4 animate-spin" />}
              Save settings
            </button>
            <p className="text-sm text-stone" role="status">
              {msg}
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
