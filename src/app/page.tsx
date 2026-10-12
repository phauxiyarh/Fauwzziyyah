import { person, siteUrl } from "@/content/profile";
import { Contact } from "@/components/site/Contact";
import { CvTeaser } from "@/components/site/CvTeaser";
import { Expertise } from "@/components/site/Expertise";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Nav } from "@/components/site/Nav";
import { Profile } from "@/components/site/Profile";
import { Research } from "@/components/site/Research";
import { RevealObserver } from "@/components/site/RevealObserver";
import { Work } from "@/components/site/Work";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  url: siteUrl,
  worksFor: [
    { "@type": "EducationalOrganization", name: "The Marti School", url: "https://themartischool.web.app" },
    { "@type": "Organization", name: "EduvateKids" },
  ],
  email: `mailto:${person.email}`,
  sameAs: [person.linkedin, person.github],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Western Governors University" },
    { "@type": "CollegeOrUniversity", name: "Nile University of Nigeria" },
  ],
  knowsAbout: ["School leadership", "Learning analytics", "AI in education", "Teacher development", "STEM education", "Data analytics"],
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
        <Profile />
        <Research />
        <Expertise />
        <Work />
        <CvTeaser />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
