import type { ComponentPropsWithoutRef } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

import { SectionDivider } from "@/components/SectionDivider";
import { getAboutContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Travis Crumbaker",
  description:
    "Meet Travis Crumbaker, a themed environment designer and fabrication lead with more than twenty-five years of experience.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Travis Crumbaker | Snapdraken",
    description:
      "Themed environment design and fabrication, from the first sketch through install day.",
    url: "/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Travis Crumbaker | Snapdraken",
    description:
      "Themed environment design and fabrication, from the first sketch through install day.",
  },
};

const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="about-prose__heading" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="about-prose__subheading" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="about-prose__paragraph" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="about-prose__quote" {...props} />
  ),
};

const facts = [
  { value: "25+", label: "Years" },
  { value: "400+", label: "Projects" },
  { value: "3", label: "Continents" },
  { value: "Disney → MrBeast", label: "Range" },
];

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <main className="about-page" id="main-content">
      <header className="about-page__header shell">
        <p className="section-eyebrow">{about.eyebrow}</p>
        <h1 className="about-page__title">{about.headline}</h1>
        <p className="about-page__lede">{about.description}</p>
      </header>

      <SectionDivider variant="scorch" />

      <section className="about-page__story shell" aria-label="About Travis Crumbaker">
        <figure className="media-matte media-matte--portrait about-page__portrait">
          <div className="media-matte__frame about-page__portrait-frame">
            <Image
              src={about.portrait}
              alt={about.portrait_alt}
              fill
              priority
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1200px) 42vw, 480px"
              className="media-matte__image"
            />
          </div>
          <figcaption>Travis Crumbaker / La Grange, North Carolina</figcaption>
        </figure>

        <article className="about-prose">
          <MDXRemote source={about.content} components={mdxComponents} />
        </article>
      </section>

      <dl className="about-facts shell" aria-label="Experience at a glance">
        {facts.map((fact, index) => (
          <div className="about-facts__item" key={fact.label}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
            {index < facts.length - 1 ? (
              <span className="about-facts__divider" aria-hidden="true">
                ◆
              </span>
            ) : null}
          </div>
        ))}
      </dl>

      {about.workshop_image && about.workshop_image_alt ? (
        <section className="about-page__workshop shell" aria-labelledby="workshop-heading">
          <div className="about-page__workshop-copy">
            <p className="section-eyebrow">THE SHOP</p>
            <h2 id="workshop-heading">Built in North Carolina. Installed wherever the work goes.</h2>
            <p>
              Snapdraken scales the crew to the build, then keeps one line of responsibility from
              the drawing table through the final field touch-up.
            </p>
            <Link className="scorch-link" href="/#contact">
              Start a project <span aria-hidden="true">›</span>
            </Link>
          </div>

          <figure className="media-matte media-matte--clockwise about-page__workshop-image">
            <div className="media-matte__frame about-page__workshop-frame">
              <Image
                src={about.workshop_image}
                alt={about.workshop_image_alt}
                fill
                loading="lazy"
                sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1200px) 52vw, 660px"
                className="media-matte__image"
              />
            </div>
          </figure>
        </section>
      ) : null}
    </main>
  );
}
