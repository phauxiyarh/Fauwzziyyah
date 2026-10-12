import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="on-dark grid min-h-dvh place-items-center bg-ink px-5 text-center text-ivory">
      <div>
        <p className="eyebrow text-brass">Error 404</p>
        <h1 className="font-serif-display mt-5 text-6xl md:text-8xl">Page not found.</h1>
        <p className="mt-5 text-mist">The address does not match any page on this site.</p>
        <Link
          href="/"
          className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-brass px-7 font-medium text-ink transition-colors hover:bg-ivory"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
