import type { Enquiry, Status } from "@/lib/firebase/enquiries";

export type View = "overview" | "inbox" | "settings";

export const statusStyle: Record<Status, string> = {
  new: "bg-brass text-ink",
  reviewing: "bg-sky/20 text-navy-2",
  replied: "bg-green-100 text-green-800",
  closed: "bg-line text-stone",
  archived: "border border-line text-stone",
};

export const isOpen = (e: Enquiry) => e.status !== "closed" && e.status !== "archived";

export function when(e: Enquiry) {
  const d = e.createdAt?.toDate();
  if (!d) return "Moments ago";
  return d.toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function relative(e: Enquiry) {
  const d = e.createdAt?.toDate();
  if (!d) return "now";
  const mins = Math.round((Date.now() - d.getTime()) / 60000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}
