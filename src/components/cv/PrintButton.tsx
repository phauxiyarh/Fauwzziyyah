"use client";

import { Download } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-ivory transition-colors duration-300 hover:bg-brass hover:text-ink"
    >
      <Download aria-hidden className="size-4" />
      Save as PDF
    </button>
  );
}
