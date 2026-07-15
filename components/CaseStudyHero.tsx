"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export interface CaseStudyHeroProps {
  slug: string;
  src: string;
  alt: string;
}

export function CaseStudyHero({ slug, src, alt }: CaseStudyHeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className="media-matte media-matte--hero case-study-hero"
      layoutId={reduceMotion ? undefined : `case-study-image-${slug}`}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="media-matte__frame case-study-hero__frame">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1500px) calc(100vw - 6rem), 1380px"
          className="media-matte__image"
        />
      </div>
    </motion.figure>
  );
}
