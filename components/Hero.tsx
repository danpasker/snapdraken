import { MotionReveal } from "./MotionReveal";
import { ScorchLogo } from "./ScorchLogo";

export interface HeroProps {
  tagline?: string;
  location?: string;
}

export function Hero({
  tagline = "Building worlds for the world’s biggest storytellers.",
  location = "Est. La Grange, NC",
}: HeroProps) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__inner">
        <p className="hero__kicker">
          Themed Environment Design and Fabrication
        </p>

        <ScorchLogo />

        <MotionReveal className="hero__copy" delay={0.45}>
          <h1 className="hero__title" id="hero-title">
            {tagline}
          </h1>
          <p className="hero__location">{location}</p>
        </MotionReveal>
      </div>

      <a className="hero__scroll" href="#clients" aria-label="Scroll to selected clients">
        <span className="hero__scroll-dot" aria-hidden="true" />
        <span>Scroll</span>
      </a>
    </section>
  );
}
