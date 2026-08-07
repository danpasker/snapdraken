export type FeaturedProjectTone =
  | "ember"
  | "moss"
  | "ochre"
  | "rose"
  | "slate"
  | "river";

export type FeaturedProject = {
  slug: string;
  number: string;
  title: string;
  category: string;
  plate: string;
  caption: string;
  services: readonly string[];
  tone: FeaturedProjectTone;
  layout: "wide" | "standard" | "tall";
};

/**
 * Photo-free project entries for the private portfolio preview. These concise
 * records are intentionally easy to replace with approved project titles,
 * captions, and imagery later without changing the gallery routes.
 */
export const FEATURED_PROJECTS: readonly FeaturedProject[] = [
  {
    slug: "camera-scale-streetscape",
    number: "01",
    title: "Camera-scale streetscape",
    category: "Sets & production",
    plate: "A street built for the lens",
    caption:
      "A complete neighborhood environment planned around wide camera lanes, practical interiors, hidden access, and fast resets between takes.",
    services: ["Design development", "Set fabrication", "Scenic finish"],
    tone: "ember",
    layout: "wide",
  },
  {
    slug: "layered-jungle-environment",
    number: "02",
    title: "Layered jungle environment",
    category: "Themed environments",
    plate: "Rock, timber, and story in one view",
    caption:
      "Rockwork, timber, sand, and planting were composed as one durable environment, with every transition finished to hold the illusion up close.",
    services: ["Rockwork", "Scenic surfaces", "Field installation"],
    tone: "moss",
    layout: "tall",
  },
  {
    slug: "touring-mountain-exhibit",
    number: "03",
    title: "Touring mountain exhibit",
    category: "Exhibits & activations",
    plate: "A landmark made to travel",
    caption:
      "A compact show-floor footprint became a dimensional landmark, engineered as repeatable assemblies for packing, touring, and clean installation.",
    services: ["Exhibit design", "Modular fabrication", "Show-floor install"],
    tone: "ochre",
    layout: "standard",
  },
  {
    slug: "large-scale-creature-sculpt",
    number: "04",
    title: "Large-scale creature sculpt",
    category: "Sculpture & props",
    plate: "Character at architectural scale",
    caption:
      "The figure was shaped for a clear silhouette, divided for safe handling, and carried through coating, scenic paint, transport, and placement.",
    services: ["Sculpting", "Hard coating", "Finish & placement"],
    tone: "rose",
    layout: "standard",
  },
  {
    slug: "gothic-scenic-facade",
    number: "05",
    title: "Gothic scenic facade",
    category: "Scenic fabrication",
    plate: "Old stone, new structure",
    caption:
      "A freestanding architectural skin combined repeatable shop-built sections with carved detail, layered aging, and final field blending.",
    services: ["Shop drawings", "Carved surfaces", "Scenic aging"],
    tone: "slate",
    layout: "tall",
  },
  {
    slug: "practical-interior-set",
    number: "06",
    title: "Practical interior set",
    category: "Sets & production",
    plate: "A finished room with room to work",
    caption:
      "A camera-ready interior balanced believable finish with wild walls, practical lighting positions, concealed access, and reset space.",
    services: ["Production design", "Set build", "Practical integration"],
    tone: "river",
    layout: "wide",
  },
] as const;

export function getFeaturedProject(slug: string) {
  return FEATURED_PROJECTS.find((project) => project.slug === slug);
}
