import { person, siteUrl } from "@/content/profile";
import { Contact } from "@/components/site/Contact";
import { CredentialStrip } from "@/components/site/CredentialStrip";
import { Engage } from "@/components/site/Engage";
import { Experience } from "@/components/site/Experience";
import { Expertise } from "@/components/site/Expertise";
import { Footer } from "@/components/site/Footer";
import { Growth } from "@/components/site/Growth";
import { Hero } from "@/components/site/Hero";
import { Journey } from "@/components/site/Journey";
import { Nav } from "@/components/site/Nav";
import { Profile } from "@/components/site/Profile";
import { RevealObserver } from "@/components/site/RevealObserver";
import { Toolkit } from "@/components/site/Toolkit";
import { Work } from "@/components/site/Work";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  url: siteUrl,
  worksFor: { "@type": "Organization", name: "Nabafat AI" },
  email: `mailto:${person.email}`,
  sameAs: [person.linkedin, person.github],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Western Governors University" },
    { "@type": "CollegeOrUniversity", name: "Nile University of Nigeria" },
  ],
  knowsAbout: ["Data analytics", "Machine learning", "Computer vision", "STEM education", "Programme coordination"],
};

export default function Home() {
  return (
    <>
      <a
        href="#profile"
        className="sr-only z-[60] rounded-full bg-brass px-5 py-3 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <CredentialStrip />
        <Profile />
        <Expertise />
        <Experience />
        <Work />
        <Journey />
        <Growth />
        <Toolkit />
        <Engage />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
