import type { Metadata } from "next";

import { SectionDivider } from "@/components/SectionDivider";
import { WorkArchive } from "@/components/WorkArchive";

export const metadata: Metadata = {
  title: "My Work",
  description:
    "A field archive of themed environments, scenic surfaces, sculpture, props, and exhibit fabrication by Travis Crumbaker.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main className="work-page" id="main-content">
      <header className="work-page__header shell shell--wide">
        <p className="section-eyebrow">Field archive / selected builds</p>
        <h1>My work.</h1>
        <div className="work-page__intro">
          <p>
            Sets, environments, sculpture, scenic surfaces, and exhibit builds—organized
            by what was made, not who commissioned it.
          </p>
          <span>Design ◆ Fabrication ◆ Finish ◆ Installation</span>
        </div>
      </header>

      <SectionDivider variant="scorch" />
      <WorkArchive />
    </main>
  );
}
