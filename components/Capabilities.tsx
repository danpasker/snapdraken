import { MotionReveal } from "./MotionReveal";

export interface CapabilityGroup {
  ordinal: string;
  title: string;
  items: readonly string[];
}

export const CAPABILITY_GROUPS: readonly CapabilityGroup[] = [
  {
    ordinal: "01",
    title: "Design and Creative",
    items: [
      "Concept development and art direction",
      "Themed environment design",
      "Production design for film, TV, and streaming",
      "Scenic design and set decoration",
      "Mural design and large-format artwork",
    ],
  },
  {
    ordinal: "02",
    title: "Specialty Fabrication",
    items: [
      "Custom props, sets, and show pieces",
      "Foam sculpting, carving, and hard-coat",
      "CNC routing and large-format machining",
      "Fiberglass, resin, and composite builds",
      "Scenic paint and faux finishes",
    ],
  },
  {
    ordinal: "03",
    title: "Themed Environments",
    items: [
      "Theme park attractions and queue theming",
      "Immersive retail and flagship stores",
      "Restaurant, bar, and hospitality theming",
      "Brand activations and pop-ups",
      "Museum and exhibit environments",
    ],
  },
  {
    ordinal: "04",
    title: "Project Delivery",
    items: [
      "Prime contractor project leadership",
      "Estimating, scheduling, and budget control",
      "Shop management and crew leadership",
      "On-site supervision and install",
      "GC, designer, and subcontractor coordination",
    ],
  },
] as const;

export interface CapabilitiesProps {
  groups?: readonly CapabilityGroup[];
}

export function Capabilities({ groups = CAPABILITY_GROUPS }: CapabilitiesProps) {
  return (
    <section
      className="capabilities-section"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="capabilities-section__inner">
        <MotionReveal className="capabilities-section__heading">
          <p className="section-eyebrow">What I Build</p>
          <h2 id="capabilities-title">From concept to install day.</h2>
        </MotionReveal>

        <div className="capabilities-grid">
          {groups.map((group, index) => (
            <MotionReveal
              className="capability-card"
              delay={index * 0.06}
              key={group.ordinal}
            >
              <span className="capability-card__ordinal" aria-hidden="true">
                {group.ordinal}
              </span>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

