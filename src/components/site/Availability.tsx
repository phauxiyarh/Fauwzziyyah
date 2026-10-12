"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { defaultSettings, readSettings, type PublicSettings } from "@/lib/firebase/settings";

export function Availability() {
  const [s, setS] = useState<PublicSettings>(defaultSettings);

  useEffect(() => {
    let live = true;
    readSettings()
      .then((v) => live && setS(v))
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, []);

  return (
    <p
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-line-dark bg-navy/60 py-2 pr-4 pl-3 text-[0.8125rem] text-mist backdrop-blur"
      aria-live="polite"
    >
      <span
        aria-hidden
        className={clsx(
          "size-2 shrink-0 rounded-full",
          s.available ? "animate-pulse-ring bg-green-400" : "bg-mist",
        )}
      />
      <span className="truncate">
        <span className="sr-only">{s.available ? "Available. " : "Not taking new work. "}</span>
        {s.statusLine}
      </span>
    </p>
  );
}
