import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ClientRoster } from "@/components/ClientRoster";
import { ConstructionInquiryForm } from "@/components/ConstructionInquiryForm";
import { Press } from "@/components/Press";
import { FEATURED_PROJECTS } from "@/lib/featured-projects";

export const metadata: Metadata = {
  title: "Private Portfolio Preview",
  description: "Private working preview of the Snapdraken portfolio.",
  robots: { index: false, follow: false, nocache: true },
};

const disciplines = [
  {
    number: "01",
    title: "Themed environments",
    text: "Guest-facing worlds designed for sightlines, traffic, weather, and the realities of daily operation.",
  },
  {
    number: "02",
    title: "Sets & production",
    text: "Camera-ready rooms, streetscapes, and show pieces planned around lenses, lighting, access, and resets.",
  },
  {
    number: "03",
    title: "Scenic fabrication",
    text: "Carved, coated, molded, painted, and engineered surfaces that hold their illusion at full scale.",
  },
  {
    number: "04",
    title: "Exhibits & activations",
    text: "Travel-ready environments that install cleanly, read across a crowded floor, and pack down with a plan.",
  },
];

const process = [
  ["Listen", "Find the story, the audience, the constraints, and the date that will not move."],
  ["Draw", "Turn the idea into dimensions, materials, samples, crew needs, and a build sequence."],
  ["Make", "Keep design intent and shop reality in the same room while the work takes shape."],
  ["Land", "Pack, install, blend, document, and leave the finished world ready to work."],
];

export default function AdminSitePage() {
  return (
    <main className="admin-preview" id="main-content">
      <div className="admin-preview__bar">
        <p><span aria-hidden="true" /> Private working preview</p>
        <form action="/api/admin/logout" method="post">
          <button type="submit">Lock the shop</button>
        </form>
      </div>

      <header className="admin-preview__nav">
        <Link className="admin-preview__wordmark" href="#top" aria-label="Snapdraken, back to top">
          Snapdraken
        </Link>
        <nav aria-label="Private site navigation">
          <a href="#work">Work</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#about">About</a>
          <a href="#contact">Start a project</a>
        </nav>
      </header>

      <section className="admin-preview__hero" id="top" aria-labelledby="private-hero-title">
        <div className="admin-preview__hero-copy">
          <p className="admin-preview__eyebrow">Design ◆ Fabrication ◆ Finish ◆ Installation</p>
          <h1 id="private-hero-title">
            We build the part <span>the audience believes.</span>
          </h1>
          <p className="admin-preview__intro">
            Snapdraken turns drawings into physical worlds—sets, attractions, exhibits,
            sculpture, scenic surfaces, and the practical plan that gets them installed.
          </p>
          <a className="admin-preview__text-link" href="#work">
            Enter the field archive <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="admin-preview__hero-mark" aria-hidden="true">
          <span className="admin-preview__orbit">One shop / every scale / wherever the work goes</span>
          <Image
            src="/logo/snapdraken-hero-exact.png"
            width={416}
            height={450}
            alt=""
            priority
          />
        </div>
      </section>

      <section className="admin-preview__work" id="work" aria-labelledby="work-title">
        <div className="admin-preview__section-head">
          <p className="admin-preview__eyebrow">Selected projects / field journal</p>
          <h2 id="work-title">A closer look, without the long read.</h2>
          <p>
            Open a project for one concise caption and the scope of what Snapdraken
            made. Approved photography can drop into the same structure later.
          </p>
        </div>

        <div className="admin-project-grid">
          {FEATURED_PROJECTS.map((project) => (
            <article
              className={`admin-project-card admin-project-card--${project.layout}`}
              key={project.slug}
            >
              <Link href={`/admin/site/projects/${project.slug}`}>
                <div
                  className={`admin-project-plate admin-project-plate--${project.tone}`}
                  aria-hidden="true"
                >
                  <span className="admin-project-plate__number">{project.number}</span>
                  <span className="admin-project-plate__ring" />
                  <p>{project.plate}</p>
                </div>
                <div className="admin-project-card__copy">
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                  <span>{project.caption}</span>
                  <strong>Open project <i aria-hidden="true">↗</i></strong>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-preview__capabilities" id="capabilities" aria-labelledby="capabilities-title">
        <div className="admin-preview__section-head admin-preview__section-head--dark">
          <p className="admin-preview__eyebrow">What the shop does</p>
          <h2 id="capabilities-title">One line of responsibility, from sketch to site.</h2>
        </div>
        <div className="admin-preview__discipline-grid">
          {disciplines.map((discipline) => (
            <article key={discipline.number}>
              <span>{discipline.number}</span>
              <h3>{discipline.title}</h3>
              <p>{discipline.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-preview__about" id="about" aria-labelledby="about-title">
        <div className="admin-preview__about-lead">
          <p className="admin-preview__eyebrow">About Travis Crumbaker</p>
          <h2 id="about-title">Twenty-five years turning storyboards into places you can walk through.</h2>
        </div>
        <div className="admin-preview__about-copy">
          <p>
            Travis designs the places around the story. That has meant theme-park
            environments, film and streaming sets, exhibits, murals, custom props,
            and public installations—from the first loose sketch through final field touch-up.
          </p>
          <p>
            Snapdraken is deliberately small at the center and expandable at the edges.
            The right fabricators, scenic artists, engineers, and installers are assembled
            around each build, with one clear line of responsibility throughout.
          </p>
          <dl>
            <div><dt>25+</dt><dd>Years making</dd></div>
            <div><dt>400+</dt><dd>Projects shaped</dd></div>
            <div><dt>3</dt><dd>Continents reached</dd></div>
          </dl>
        </div>
      </section>

      <section className="admin-preview__process" aria-labelledby="process-title">
        <div className="admin-preview__section-head">
          <p className="admin-preview__eyebrow">How a world gets made</p>
          <h2 id="process-title">A straight line through a complicated build.</h2>
        </div>
        <ol>
          {process.map(([title, text], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <ClientRoster />
      <Press />

      <section className="admin-preview__contact" id="contact" aria-labelledby="contact-title">
        <p className="admin-preview__eyebrow">The next impossible place</p>
        <h2 id="contact-title">Bring us a world to build.</h2>
        <p>
          Tell us where it lives, who steps inside, and when the doors have to open.
          Your message goes to the shop without publishing the recipient’s address.
        </p>
        <ConstructionInquiryForm label="Start the conversation" />
      </section>

      <footer className="admin-preview__footer">
        <span>Snapdraken LLC / La Grange, North Carolina</span>
        <a href="#top">Back to the burn ↑</a>
      </footer>
    </main>
  );
}
