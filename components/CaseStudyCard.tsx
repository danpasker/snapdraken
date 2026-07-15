"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CaseStudySummary } from "@/lib/content";

export type { CaseStudySummary } from "@/lib/content";

export interface CaseStudyCardProps {
  project: CaseStudySummary;
  priority?: boolean;
}

export function CaseStudyCard({ project, priority = false }: CaseStudyCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  const playPreview = () => {
    if (reduceMotion || !videoRef.current) return;
    void videoRef.current.play().catch(() => {
      // A poster is always present, so a blocked preview remains a complete card.
    });
  };

  const stopPreview = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <motion.article
      className="case-study-card"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
      onFocus={playPreview}
      onBlur={stopPreview}
    >
      <Link
        className="case-study-card__link"
        href={`/work/${project.slug}`}
        aria-label={`View ${project.title}`}
      >
        <motion.div
          className="case-study-card__matte"
          layoutId={`case-study-image-${project.slug}`}
        >
          <div className="case-study-card__media">
            <Image
              className="case-study-card__poster"
              src={project.poster_image || project.hero_image}
              alt=""
              fill
              sizes="(max-width: 700px) 92vw, (max-width: 1080px) 46vw, 30vw"
              priority={priority}
            />
            {project.video && (
              <video
                ref={videoRef}
                className="case-study-card__video"
                src={project.video}
                poster={project.poster_image || project.hero_image}
                preload="none"
                muted
                loop
                playsInline
                aria-hidden="true"
              />
            )}
          </div>
        </motion.div>

        <div className="case-study-card__copy">
          <h3>{project.title}</h3>
          <p>
            <span>{project.client}</span>
            <span aria-hidden="true">◆</span>
            <span>{project.year}</span>
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
