"use client";

import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./client";

// Google accounts allowed into the admin panel. Keep in step with ADMIN_EMAILS in firestore.rules,
// which is the real gate. This list only decides which screen to show.
export const ADMIN_EMAILS = ["phauzee97@gmail.com"];

export async function isAdmin(user: User) {
  const google = user.providerData.some((p) => p.providerId === "google.com");
  if (google && user.emailVerified && user.email && ADMIN_EMAILS.includes(user.email.toLowerCase())) return true;
  try {
    return (await getDoc(doc(db(), "admins", user.uid))).exists();
  } catch {
    return false;
  }
}

export const watchUser = (cb: (u: User | null) => void) => onAuthStateChanged(auth(), cb);

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return signInWithPopup(auth(), provider);
}

export const signOutAdmin = () => signOut(auth());
