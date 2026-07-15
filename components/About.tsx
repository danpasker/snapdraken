import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { MotionReveal } from "./MotionReveal";

export interface MakerStat {
  value: string;
  label: string;
}

export const MAKER_STATS: readonly MakerStat[] = [
  { value: "25+", label: "Years" },
  { value: "400+", label: "Projects" },
  { value: "3", label: "Continents" },
  { value: "Disney to MrBeast", label: "Range" },
] as const;

export interface AboutProps {
  body?: ReactNode;
  portraitSrc?: string;
  stats?: readonly MakerStat[];
  showMoreLink?: boolean;
}

export function About({
  body,
  portraitSrc = "/media/about/travis-in-shop.webp",
  stats = MAKER_STATS,
  showMoreLink = true,
}: AboutProps) {
  return (
    <section className="about-section" id="about" aria-labelledby="about-title">
      <div className="about-section__inner">
        <MotionReveal className="about-section__portrait-wrap">
          <figure className="about-section__portrait">
            <Image
              src={portraitSrc}
              alt="Travis Crumbaker in the Snapdraken fabrication shop"
              fill
              sizes="(max-width: 800px) 92vw, 44vw"
            />
          </figure>
        </MotionReveal>

        <MotionReveal className="about-section__copy" delay={0.08}>
          <p className="section-eyebrow">About the Maker</p>
          <h2 id="about-title">
            Twenty-five years turning storyboards into places you can walk through.
          </h2>
          <div className="about-section__body">
            {body ?? (
              <>
                <p>
                  Travis Crumbaker takes a build from the first pencil line to the
                  last overnight install. His work crosses scenic paint, carved
                  foam, welded steel, resin, murals, and the crews that make those
                  materials hold together under a deadline.
                </p>
                <p>
                  He founded Snapdraken in La Grange, North Carolina, and works
                  wherever the project needs a shop lead who can draw the object,
                  estimate it, build it, and stand beside it on opening day.
                </p>
              </>
            )}
          </div>

          <dl className="about-section__stats">
            {stats.map((stat) => (
              <div key={`${stat.value}-${stat.label}`}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>

          <div className="about-section__signoff">
            <span className="about-section__signature" aria-label="Signed, Travis">
              Travis
            </span>
            {showMoreLink && (
              <Link className="scorch-link" href="/about">
                Read the shop story
              </Link>
            )}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
