"use client";

import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./client";

export async function isAdmin(user: User) {
  const snap = await getDoc(doc(db(), "admins", user.uid));
  return snap.exists();
}

export const watchUser = (cb: (u: User | null) => void) => onAuthStateChanged(auth(), cb);
export const signIn = (email: string, password: string) => signInWithEmailAndPassword(auth(), email, password);
export const signOutAdmin = () => signOut(auth());
