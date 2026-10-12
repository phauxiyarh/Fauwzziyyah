"use client";

import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, firebaseConfigured } from "./client";

export type PublicSettings = { available: boolean; statusLine: string };

export const defaultSettings: PublicSettings = {
  available: true,
  statusLine: "Open to data, AI, and education roles, projects, and partnerships",
};

export async function readSettings(): Promise<PublicSettings> {
  if (!firebaseConfigured) return defaultSettings;
  const snap = await getDoc(doc(db(), "settings", "public"));
  if (!snap.exists()) return defaultSettings;
  const d = snap.data();
  return {
    available: typeof d.available === "boolean" ? d.available : defaultSettings.available,
    statusLine: typeof d.statusLine === "string" && d.statusLine ? d.statusLine : defaultSettings.statusLine,
  };
}

export async function saveSettings(s: PublicSettings) {
  await setDoc(doc(db(), "settings", "public"), {
    available: s.available,
    statusLine: s.statusLine.trim().slice(0, 120),
    updatedAt: serverTimestamp(),
  });
}
