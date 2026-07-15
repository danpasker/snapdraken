import Image from "next/image";
import { MotionReveal } from "./MotionReveal";

export interface PressMark {
  name: string;
  expansion?: string;
  logoSrc?: string;
}

export const PRESS_MARKS: readonly PressMark[] = [
  {
    name: "TEA",
    expansion: "Themed Entertainment Association",
    logoSrc: "/brands/press/tea.png",
  },
  { name: "IAAPA", logoSrc: "/brands/press/iaapa.png" },
  { name: "Blooloop", logoSrc: "/brands/press/blooloop.svg" },
  {
    name: "Attractions Magazine",
    logoSrc: "/brands/press/attractions-magazine.png",
  },
  { name: "InPark", logoSrc: "/brands/press/inpark-magazine.png" },
] as const;

export interface PressProps {
  marks?: readonly PressMark[];
  teaMemberSince?: string;
}

export function Press({ marks = PRESS_MARKS, teaMemberSince }: PressProps) {
  return (
    <section className="press-section" aria-labelledby="press-title">
      <MotionReveal className="press-section__inner">
        <p className="section-eyebrow">Press &amp; Recognition</p>
        <h2 className="visually-hidden" id="press-title">
          Industry affiliations and press
        </h2>
        <ul className="press-section__marks">
          {marks.map((mark) => (
            <li key={mark.name} title={mark.expansion}>
              {mark.logoSrc ? (
                <span className="press-mark__logo-surface" aria-hidden="true">
                  <Image
                    className="press-mark__logo"
                    src={mark.logoSrc}
                    alt=""
                    width={260}
                    height={90}
                    sizes="(max-width: 720px) 40vw, 12rem"
                    unoptimized
                  />
                </span>
              ) : null}
              <span className="press-mark__name">{mark.name}</span>
            </li>
          ))}
        </ul>
        <p className="press-section__membership">
          Member, Themed Entertainment Association
          {teaMemberSince ? ` since ${teaMemberSince}` : ""}
        </p>
      </MotionReveal>
    </section>
  );
}
