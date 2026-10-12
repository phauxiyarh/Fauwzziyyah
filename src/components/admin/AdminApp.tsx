"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { Eye, EyeOff, LoaderCircle, Lock, LogOut, ShieldAlert } from "lucide-react";
import { person } from "@/content/profile";
import { firebaseConfigured } from "@/lib/firebase/client";
import { isAdmin, signIn, signOutAdmin, watchUser } from "@/lib/firebase/admin-auth";
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
          {user?.email} is signed in but is not on the admin list. Add the account under <code className="font-mono text-brass">admins/{"{uid}"}</code> in
          Firestore, then sign in again.
        </p>
        <p className="mt-3 font-mono text-xs break-all text-mist">uid: {user?.uid}</p>
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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signIn(email.trim(), password);
    } catch {
      setError("Sign-in failed. Check the email and password and try again.");
    } finally {
      setBusy(false);
    }
  }

  const input =
    "w-full rounded-xl border border-line-dark bg-navy/60 px-4 py-3 text-base text-ivory placeholder:text-mist/60 outline-none transition-colors focus:border-brass";

  return (
    <Shell>
      <div className="rounded-3xl border border-line-dark bg-navy/50 p-8 backdrop-blur-md">
        <span className="font-serif-display grid size-12 place-items-center rounded-full bg-brass text-lg text-ink">{person.initials}</span>
        <h1 className="font-serif-display mt-6 text-4xl">Admin sign-in</h1>
        <p className="mt-2 text-sm text-mist">Enquiries and site settings.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="admin-email" className="mb-2 block text-sm">
              Email
            </label>
            <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm">
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${input} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 grid w-12 place-items-center text-mist hover:text-ivory"
              >
                {show ? <EyeOff aria-hidden className="size-4" /> : <Eye aria-hidden className="size-4" />}
              </button>
            </div>
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brass font-medium text-ink transition-colors hover:bg-ivory disabled:opacity-70"
          >
            {busy ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : <Lock aria-hidden className="size-4" />}
            Sign in
          </button>
        </form>
      </div>
      <Link href="/" className="mt-6 inline-flex min-h-11 items-center text-sm text-mist hover:text-ivory">
        Back to the site
      </Link>
    </Shell>
  );
}
