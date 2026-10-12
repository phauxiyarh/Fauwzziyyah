"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { LoaderCircle, LogOut, ShieldAlert } from "lucide-react";
import { person } from "@/content/profile";
import { firebaseConfigured } from "@/lib/firebase/client";
import { isAdmin, signInWithGoogle, signOutAdmin, watchUser } from "@/lib/firebase/admin-auth";
import { Dashboard } from "./Dashboard";
import Link from "next/link";

type Phase = "loading" | "signed-out" | "denied" | "admin";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="on-dark relative grid min-h-dvh place-items-center overflow-hidden bg-ink px-5 py-16 text-ivory">
      <div aria-hidden className="hairline-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
      <div className="relative w-full max-w-md">{children}</div>
    </main>
  );
}

export function AdminApp() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!firebaseConfigured) return;
    return watchUser(async (u) => {
      setUser(u);
      if (!u) return setPhase("signed-out");
      try {
        setPhase((await isAdmin(u)) ? "admin" : "denied");
      } catch {
        setPhase("denied");
      }
    });
  }, []);

  if (!firebaseConfigured) {
    return (
      <Shell>
        <h1 className="font-serif-display text-4xl">Admin is not configured</h1>
        <p className="mt-4 text-mist">
          Copy <code className="font-mono text-brass">.env.example</code> to <code className="font-mono text-brass">.env.local</code>, add the
          Firebase web app values, and rebuild.
        </p>
      </Shell>
    );
  }

  if (phase === "loading") {
    return (
      <Shell>
        <p className="flex items-center justify-center gap-3 text-mist" role="status">
          <LoaderCircle aria-hidden className="size-5 animate-spin" /> Checking your session
        </p>
      </Shell>
    );
  }

  if (phase === "signed-out") return <Login />;

  if (phase === "denied") {
    return (
      <Shell>
        <ShieldAlert aria-hidden className="size-8 text-brass" />
        <h1 className="font-serif-display mt-5 text-4xl">No admin access</h1>
        <p className="mt-4 text-mist">
          {user?.email} is signed in but does not have admin access. Sign out and continue with the admin Google account.
        </p>
        <button
          type="button"
          onClick={() => signOutAdmin()}
          className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-line-dark px-6 text-sm transition-colors hover:border-brass hover:text-brass"
        >
          <LogOut aria-hidden className="size-4" /> Sign out
        </button>
      </Shell>
    );
  }

  return <Dashboard user={user!} />;
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="size-5">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function errorMessage(code: string) {
  switch (code) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "The Google window closed before sign-in finished. Please try again.";
    case "auth/popup-blocked":
      return "The browser blocked the Google window. Allow pop-ups for this site and try again.";
    case "auth/operation-not-allowed":
      return "Google sign-in is not switched on for this project yet.";
    case "auth/unauthorized-domain":
      return "This web address is not on the authorised domain list for sign-in.";
    default:
      return "Sign-in failed. Please try again.";
  }
}

function Login() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onGoogle() {
    setBusy(true);
    setError("");
    try {
      await signInWithGoogle();
    } catch (e) {
      setError(errorMessage((e as { code?: string }).code ?? ""));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <div className="rounded-3xl border border-line-dark bg-navy/50 p-8 backdrop-blur-md">
        <span className="font-serif-display grid size-12 place-items-center rounded-full bg-brass text-lg text-ink">{person.initials}</span>
        <h1 className="font-serif-display mt-6 text-4xl">Admin sign-in</h1>
        <p className="mt-2 text-sm text-mist">Enquiries and site settings. Access is limited to the site owner&apos;s Google account.</p>
        <button
          type="button"
          onClick={onGoogle}
          disabled={busy}
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-ivory font-medium text-ink transition-colors hover:bg-paper disabled:opacity-70"
        >
          {busy ? <LoaderCircle aria-hidden className="size-5 animate-spin" /> : <GoogleMark />}
          Continue with Google
        </button>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}
      </div>
      <Link href="/" className="mt-6 inline-flex min-h-11 items-center text-sm text-mist hover:text-ivory">
        Back to the site
      </Link>
    </Shell>
  );
}
