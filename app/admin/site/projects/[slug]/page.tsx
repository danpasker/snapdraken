import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FEATURED_PROJECTS, getFeaturedProject } from "@/lib/featured-projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getFeaturedProject(slug);

  if (!project) {
    return { title: "Project not found", robots: { index: false, follow: false } };
  }

  return {
    title: project.title,
    description: project.caption,
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getFeaturedProject(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = FEATURED_PROJECTS.findIndex((entry) => entry.slug === project.slug);
  const nextProject = FEATURED_PROJECTS[(projectIndex + 1) % FEATURED_PROJECTS.length];

  return (
    <main className="admin-preview admin-project-page" id="main-content">
      <div className="admin-project-page__bar">
        <Link href="/admin/site#work">← Back to project gallery</Link>
        <span>Private field journal / {project.number}</span>
      </div>

      <article>
        <header className="admin-project-page__hero">
          <div className="admin-project-page__copy">
            <p className="admin-preview__eyebrow">{project.category} / Project {project.number}</p>
            <h1>{project.title}</h1>
            <p className="admin-project-page__caption">{project.caption}</p>
          </div>

          <div
            className={`admin-project-plate admin-project-plate--detail admin-project-plate--${project.tone}`}
            aria-hidden="true"
          >
            <span className="admin-project-plate__number">{project.number}</span>
            <span className="admin-project-plate__ring" />
            <p>{project.plate}</p>
          </div>
        </header>

        <section className="admin-project-page__scope" aria-labelledby="project-scope-title">
          <div>
            <p className="admin-preview__eyebrow">The short version</p>
            <h2 id="project-scope-title">What Snapdraken did</h2>
          </div>
          <ul>
            {project.services.map((service) => <li key={service}>{service}</li>)}
          </ul>
        </section>

        <footer className="admin-project-page__next">
          <span>Next field note</span>
          <Link href={`/admin/site/projects/${nextProject.slug}`}>
            {nextProject.title} <i aria-hidden="true">→</i>
          </Link>
        </footer>
      </article>
    </main>
  );
}
