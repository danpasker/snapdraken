import { About } from "@/components/About";
import { Capabilities } from "@/components/Capabilities";
import { ClientRoster } from "@/components/ClientRoster";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Press } from "@/components/Press";
import { SectionDivider } from "@/components/SectionDivider";
import { WorkGrid } from "@/components/WorkGrid";

export default function HomePage() {
  return (
    <div className="home-page" id="main-content">
      <Hero />
      <SectionDivider variant="scorch" />
      <ClientRoster />
      <SectionDivider variant="torn" flip />
      <About portraitSrc="/media/about/travis-in-shop.webp" />
      <SectionDivider variant="scorch" />
      <WorkGrid />
      <SectionDivider variant="torn" />
      <Capabilities />
      <SectionDivider variant="scorch" flip />
      <Press />
      <SectionDivider variant="torn" flip />
      <Contact />
    </div>
  );
}
