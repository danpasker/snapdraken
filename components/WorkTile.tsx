"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import type { WorkItem } from "@/lib/work";

export interface WorkTileProps {
  item: WorkItem;
  index: number;
  priority?: boolean;
}

export function WorkTile({ item, index, priority = false }: WorkTileProps) {
  const reduceMotion = useReducedMotion();
  const archiveNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.figure
      className={`work-tile work-tile--${item.layout}`}
      layout={!reduceMotion}
      initial={reduceMotion ? false : { opacity: 0, y: 24, rotate: index % 2 ? 0.25 : -0.25 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="work-tile__matte">
        <div className="work-tile__frame" style={{ position: "relative" }}>
          <Image
            className="work-tile__image"
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 720px) calc(100vw - 3rem), (max-width: 1080px) 46vw, 52vw"
            priority={priority}
            style={{ objectPosition: item.objectPosition ?? "center" }}
          />
          <span className="work-tile__heat" aria-hidden="true" />
        </div>
      </div>

      <figcaption className="work-tile__caption">
        <div className="work-tile__meta">
          <span>{item.category}</span>
          <span aria-hidden="true">◆</span>
          <span>Field image {archiveNumber}</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.caption}</p>
      </figcaption>
    </motion.figure>
  );
}
