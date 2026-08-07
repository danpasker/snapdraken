import Link from "next/link";

import { ConstructionInquiryForm } from "./ConstructionInquiryForm";

export function ConstructionHero() {
  return (
    <main className="holding-page" id="main-content">
      <iframe
        className="holding-page__burn"
        src="/snapdraken-hero.html"
        title="Animated Snapdraken mark burning into paper"
        tabIndex={-1}
      />

      <div className="holding-page__shade" aria-hidden="true" />

      <div className="holding-page__content">
        <div className="holding-page__message">
          <h1>
            One more world is taking shape.
            <span>This one lives online.</span>
          </h1>

          <div className="holding-page__aside">
            <p>
              The new Snapdraken site is under construction. The shop isn’t—we’re
              still designing, fabricating, and installing impossible places.
            </p>
            <ConstructionInquiryForm />
          </div>
        </div>

        <div className="holding-page__utility">
          <p className="holding-page__replay">Tap the mark to replay the burn</p>
          <Link className="holding-page__admin" href="/admin">
            Private preview
          </Link>
        </div>
      </div>
    </main>
  );
}
