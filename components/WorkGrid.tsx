import Link from "next/link";

import { WORK_ITEMS } from "@/lib/work";
import { MotionReveal } from "./MotionReveal";
import { WorkTile } from "./WorkTile";

const HOME_WORK_ITEMS = WORK_ITEMS.slice(0, 8);

export function WorkGrid() {
  return (
    <section className="work-section" id="work" aria-labelledby="work-title">
      <div className="work-section__inner">
        <MotionReveal className="work-section__heading">
          <div>
            <p className="section-eyebrow">Selected work / field archive</p>
            <h2 id="work-title">Built by hand. Made to transport you.</h2>
          </div>
          <p>
            A cross-section of sets, themed environments, sculpture, scenic surfaces,
            and exhibit fabrication—without forcing the photographs into project stories
            they cannot verify.
          </p>
        </MotionReveal>

        <div className="work-archive-grid work-archive-grid--preview">
          {HOME_WORK_ITEMS.map((item, index) => (
            <WorkTile key={item.id} item={item} index={index} priority={index < 3} />
          ))}
        </div>

        <div className="work-section__footer">
          <p>More field images, grouped by craft.</p>
          <Link className="scorch-link" href="/work">
            Explore my work <span aria-hidden="true">›</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
