import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { person, siteUrl } from "@/content/profile";
import "./globals.css";

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], axes: ["opsz", "SOFT"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500"] });

const description =
  "Fauwzziyyah Umar is a school principal, educator, and data analyst with an MSc in Data Analytics from Western Governors University. Her work joins school leadership, learning data, and AI tools for teachers and students.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${person.name} · Education, Data, and AI`,
    template: `%s · ${person.name}`,
  },
  description,
  authors: [{ name: person.name }],
  openGraph: {
    type: "profile",
    title: `${person.name} · Education, Data, and AI`,
    description,
    url: siteUrl,
    siteName: person.name,
  },
  twitter: { card: "summary_large_image", title: person.name, description },
};

export const viewport: Viewport = {
  themeColor: "#0a1020",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js-ready')" }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
