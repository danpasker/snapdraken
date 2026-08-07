import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <main className="admin-preview admin-project-page admin-project-page--missing" id="main-content">
      <p className="admin-preview__eyebrow">Field note missing</p>
      <h1>That project is not in the archive.</h1>
      <Link className="admin-preview__text-link" href="/admin/site#work">
        Return to the project gallery <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
