import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="not-found-page shell" id="main-content">
      <div className="not-found-mark not-found-mark--half-burnt" aria-hidden="true">
        <Image
          src="/logo/snapdraken-dragon.svg"
          alt=""
          width={520}
          height={260}
          priority
          className="not-found-mark__dragon"
        />
        <span className="not-found-mark__burn-line" />
        <span className="not-found-mark__ember" />
        <span className="not-found-mark__smoke" />
      </div>

      <p className="section-eyebrow">404 / BUILD NOT FOUND</p>
      <h1>This page hasn&apos;t been built. Yet.</h1>
      <Link className="scorch-link not-found-page__link" href="/">
        Return to the workshop <span aria-hidden="true">›</span>
      </Link>
    </main>
  );
}
