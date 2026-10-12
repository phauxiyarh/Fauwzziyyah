"use client";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./client";
import type { EnquiryType } from "@/content/profile";

export const STATUSES = ["new", "reviewing", "replied", "closed", "archived"] as const;
export type Status = (typeof STATUSES)[number];

export type EnquiryInput = {
  name: string;
  email: string;
  organisation: string;
  type: EnquiryType;
  message: string;
};

export type Enquiry = EnquiryInput & {
  id: string;
  status: Status;
  note: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
};

export async function submitEnquiry(input: EnquiryInput) {
  await addDoc(collection(db(), "enquiries"), {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    organisation: input.organisation.trim(),
    type: input.type,
    message: input.message.trim(),
    status: "new",
    note: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export function watchEnquiries(onData: (rows: Enquiry[]) => void, onError: (e: Error) => void) {
  const q = query(collection(db(), "enquiries"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Enquiry, "id">) }))),
    onError,
  );
}

export async function updateEnquiry(id: string, patch: { status?: Status; note?: string }, current: Enquiry) {
  await updateDoc(doc(db(), "enquiries", id), {
    status: patch.status ?? current.status,
    note: patch.note ?? current.note ?? "",
    updatedAt: serverTimestamp(),
  });
}

export async function removeEnquiry(id: string) {
  await deleteDoc(doc(db(), "enquiries", id));
}
