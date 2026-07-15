"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { WORK_CATEGORIES, WORK_ITEMS, type WorkCategory } from "@/lib/work";
import { WorkTile } from "./WorkTile";

type WorkFilter = "All work" | WorkCategory;

const FILTERS: readonly WorkFilter[] = ["All work", ...WORK_CATEGORIES];

export function WorkArchive() {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("All work");
  const visibleItems =
    activeFilter === "All work"
      ? WORK_ITEMS
      : WORK_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section className="work-archive shell shell--wide" aria-labelledby="work-archive-title">
      <div className="work-archive__controls">
        <h2 className="visually-hidden" id="work-archive-title">
          Work archive
        </h2>
        <div className="work-filters" role="group" aria-label="Filter work by craft">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className="work-filter"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className="work-archive__count" aria-live="polite">
          {visibleItems.length} field {visibleItems.length === 1 ? "image" : "images"}
        </p>
      </div>

      <motion.div className="work-archive-grid" layout>
        <AnimatePresence initial={false}>
          {visibleItems.map((item, index) => (
            <WorkTile key={item.id} item={item} index={index} priority={index < 3} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
