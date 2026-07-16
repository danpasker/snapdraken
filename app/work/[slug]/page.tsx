import type { ComponentPropsWithoutRef } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { CaseStudyHero } from "@/components/CaseStudyHero";
import { SectionDivider } from "@/components/SectionDivider";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getNextCaseStudy,
} from "@/lib/content";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="case-study-prose__heading" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="case-study-prose__subheading" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="case-study-prose__paragraph" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="case-study-prose__list" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="case-study-prose__list case-study-prose__list--ordered" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="case-study-prose__quote" {...props} />
  ),
};

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies();

  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  }

  const socialTitle = `${caseStudy.title} | Snapdraken`;
  const canonical = `/work/${caseStudy.slug}`;

  return {
    title: caseStudy.title,
    description: caseStudy.excerpt,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: socialTitle,
      description: caseStudy.excerpt,
      url: canonical,
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: "Snapdraken dragon mark and workshop photograph",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: caseStudy.excerpt,
      images: ["/og.jpg"],
    },
  };
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const [caseStudy, nextProject] = await Promise.all([
    getCaseStudyBySlug(slug),
    getNextCaseStudy(slug),
  ]);

  if (!caseStudy) {
    notFound();
  }

  const projectMeta = [
    { label: "Client", value: caseStudy.client },
    { label: "Year", value: caseStudy.year },
    { label: "Role", value: caseStudy.role },
    { label: "Scope", value: caseStudy.scope.join(", ") },
  ];

  return (
    <main className="case-study-page" id="main-content">
      <article>
        <header className="case-study-header shell shell--wide">
          <p className="section-eyebrow">Selected work / {caseStudy.year}</p>
          <h1 className="case-study-title">{caseStudy.title}</h1>
          <p className="case-study-excerpt">{caseStudy.excerpt}</p>

          <CaseStudyHero
            slug={caseStudy.slug}
            src={caseStudy.hero_image}
            alt={`${caseStudy.title} project field image`}
          />

          <dl className="case-study-meta" aria-label="Project details">
            {projectMeta.map((item, index) => (
              <div className="case-study-meta__item" key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
                {index < projectMeta.length - 1 ? (
                  <span className="case-study-meta__divider" aria-hidden="true">
                    ◆
                  </span>
                ) : null}
              </div>
            ))}
          </dl>
        </header>

        <SectionDivider variant="scorch" />

        <div className="case-study-body shell">
          <div className="case-study-prose">
            <MDXRemote source={caseStudy.content} components={mdxComponents} />
          </div>

          <section className="case-study-gallery" aria-label={`${caseStudy.title} project gallery`}>
            {caseStudy.gallery.map((image, index) => {
              const isFullBleed = index % 3 === 0;
              const rotation = index % 2 === 0 ? "counterclockwise" : "clockwise";

              return (
                <figure
                  className={[
                    "media-matte",
                    "case-study-gallery__item",
                    isFullBleed ? "case-study-gallery__item--full" : "case-study-gallery__item--split",
                    `media-matte--${rotation}`,
                  ].join(" ")}
                  key={image.src}
                >
                  <div className="media-matte__frame case-study-gallery__frame">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      sizes={
                        isFullBleed
                          ? "(max-width: 768px) calc(100vw - 2rem), (max-width: 1200px) calc(100vw - 6rem), 1120px"
                          : "(max-width: 900px) calc(100vw - 2rem), 52vw"
                      }
                      className="media-matte__image"
                    />
                  </div>
                  {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                </figure>
              );
            })}
          </section>

          {caseStudy.video ? (
            <figure className="media-matte media-matte--video case-study-video">
              <div className="case-study-video__frame">
                <video
                  controls
                  muted
                  playsInline
                  preload="none"
                  poster={caseStudy.hero_image}
                  aria-label={`${caseStudy.title} project reel`}
                >
                  <source src={caseStudy.video} type="video/webm" />
                  Your browser does not support embedded video.
                </video>
              </div>
              <figcaption>Project reel</figcaption>
            </figure>
          ) : null}
        </div>
      </article>

      <SectionDivider variant="torn" flip />

      <nav className="case-study-navigation shell" aria-label="Case study navigation">
        <Link className="back-to-work scorch-link" href="/#work">
          <span aria-hidden="true">‹</span> Back to work
        </Link>

        {nextProject ? (
          <Link className="next-project scorch-link" href={`/work/${nextProject.slug}`}>
            <span className="next-project__label">Next project</span>
            <span className="next-project__title">{nextProject.title}</span>
            <span aria-hidden="true">›</span>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
