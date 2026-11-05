import { Effects } from "@/components/effects";
import { Nav } from "@/components/nav";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Footer } from "@/components/sections/footer";
import { Growth } from "@/components/sections/growth";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Technologies } from "@/components/sections/technologies";
import { profile } from "@/content/portfolio";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.titles[0],
  description: profile.tagline,
  sameAs: [profile.github.url, profile.linkedin.url],
};

// Each section stands alone. To reorder the page, move a line here, renumber its
// `index`, and match the order of `navigation` in content/portfolio.ts.
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About index="01" />
        <Technologies index="02" />
        <Projects index="03" />
        <Growth index="04" />
        <Education index="05" />
        <Contact index="06" />
      </main>
      <Footer />
      <Effects />
    </>
  );
}
