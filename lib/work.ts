export const WORK_CATEGORIES = [
  "Sets & Environments",
  "Scenic Surfaces",
  "Sculpture & Props",
  "Exhibits & Activations",
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export type WorkItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: WorkCategory;
  layout: "wide" | "standard" | "tall";
  objectPosition?: string;
};

/**
 * A visual field archive, deliberately organized by observable craft rather
 * than by an assumed client or project association.
 */
export const WORK_ITEMS: readonly WorkItem[] = [
  {
    id: "industrial-scenic-room",
    src: "/media/case-studies/universal-studios-attraction-theming-gallery-01.webp",
    alt: "A symmetrical industrial scenic room with weathered walls and vent fans",
    title: "Weathered industrial room",
    caption: "Dimensional pipework, repeating wall units, and layered scenic aging.",
    category: "Sets & Environments",
    layout: "wide",
  },
  {
    id: "dragon-vessel-sculpt",
    src: "/media/case-studies/disney-parks-scenic-work-gallery-01.webp",
    alt: "A large pink dragon vessel in the fabrication shop before final dressing",
    title: "Character vessel in progress",
    caption: "A hand-shaped show piece moving through sculpt, coating, and finish.",
    category: "Sculpture & Props",
    layout: "wide",
  },
  {
    id: "mountain-exhibit",
    src: "/media/case-studies/fortune-500-brand-activation-gallery-02.webp",
    alt: "A finished mountain-themed trade-show exhibit with branded towers",
    title: "Mountain exhibit build",
    caption: "Dimensional scenery turns a compact floor plan into a recognizable place.",
    category: "Exhibits & Activations",
    layout: "standard",
  },
  {
    id: "neighborhood-streetscape",
    src: "/media/case-studies/mrbeast-games-gallery-01.webp",
    alt: "A camera-scale neighborhood set beneath a painted pink sky cyclorama",
    title: "Camera-scale streetscape",
    caption: "A complete neighborhood environment staged beneath a continuous painted sky.",
    category: "Sets & Environments",
    layout: "wide",
  },
  {
    id: "jungle-rockwork",
    src: "/media/case-studies/seaworld-environment-refresh-gallery-02.webp",
    alt: "A dense jungle environment with rockwork, sand, timber, and planting",
    title: "Jungle rockwork",
    caption: "Hardscape, scenic surfaces, timber, and planting brought into one view.",
    category: "Scenic Surfaces",
    layout: "tall",
  },
  {
    id: "fire-room",
    src: "/media/case-studies/netflix-production-design-gallery-02.webp",
    alt: "A metal-clad fire room set illuminated with warm practical lighting",
    title: "Metal-clad fire room",
    caption: "Layered metal finishes and concealed practical light establish the room.",
    category: "Sets & Environments",
    layout: "standard",
  },
  {
    id: "temple-wall",
    src: "/media/case-studies/fortune-500-brand-activation-gallery-01.webp",
    alt: "A modular stone-temple exhibit wall shown on the shop floor",
    title: "Modular temple wall",
    caption: "Sculpted wall units dry-fit in the shop before packing and installation.",
    category: "Exhibits & Activations",
    layout: "tall",
    objectPosition: "50% 52%",
  },
  {
    id: "carved-jungle-relief",
    src: "/media/case-studies/universal-studios-attraction-theming-gallery-02.webp",
    alt: "A sculpted jungle ruin wall with a large carved stone face",
    title: "Carved jungle relief",
    caption: "Relief carving, vines, and scenic paint joined into a continuous ruin surface.",
    category: "Scenic Surfaces",
    layout: "standard",
  },
  {
    id: "lion-sculpture",
    src: "/media/case-studies/disney-parks-scenic-work-gallery-02.webp",
    alt: "A large finished lion sculpture loaded for transport",
    title: "Large-scale creature sculpt",
    caption: "Built in sections for finishing, safe handling, and field placement.",
    category: "Sculpture & Props",
    layout: "wide",
  },
  {
    id: "practical-interior",
    src: "/media/case-studies/netflix-production-design-gallery-03.webp",
    alt: "A finished blue living-room set with furniture and practical fixtures",
    title: "Practical interior set",
    caption: "A finished room arranged around camera access, practical light, and reset space.",
    category: "Sets & Environments",
    layout: "tall",
  },
  {
    id: "tropical-timber-build",
    src: "/media/case-studies/seaworld-environment-refresh-gallery-01.webp",
    alt: "A tropical timber environment under construction beside the water",
    title: "Tropical timber build",
    caption: "Scenic posts, overhead structure, and the timber frame taking shape on site.",
    category: "Sets & Environments",
    layout: "standard",
  },
  {
    id: "graphic-game-room",
    src: "/media/case-studies/mrbeast-games-gallery-02.webp",
    alt: "A neon-lit Split or Steal game environment with two podiums",
    title: "Graphic game environment",
    caption: "Bold surfaces, practical lighting, and reset-ready play positions.",
    category: "Sets & Environments",
    layout: "standard",
  },
  {
    id: "gothic-facade",
    src: "/media/case-studies/universal-studios-attraction-theming-gallery-03.webp",
    alt: "A freestanding gothic facade with faux stone, arches, and scenic details",
    title: "Gothic scenic facade",
    caption: "A shop-built facade prepared for placement and final field blending.",
    category: "Sets & Environments",
    layout: "wide",
  },
  {
    id: "flamingo-show-piece",
    src: "/media/case-studies/disney-parks-scenic-work-gallery-03.webp",
    alt: "A whimsical flamingo vehicle and oversized acorn scenic sculpture",
    title: "Whimsical show pieces",
    caption: "Large sculptural forms shaped for clear silhouettes and durable finishes.",
    category: "Sculpture & Props",
    layout: "tall",
  },
  {
    id: "competition-rigs",
    src: "/media/case-studies/mrbeast-games-gallery-03.webp",
    alt: "Rows of large red competition rigs installed across an outdoor field",
    title: "Field-scale competition rigs",
    caption: "Large-format scenic hardware laid out for repeated action and reset.",
    category: "Sets & Environments",
    layout: "standard",
  },
  {
    id: "show-floor-installation",
    src: "/media/case-studies/fortune-500-brand-activation-gallery-03.webp",
    alt: "A second view of the mountain-themed exhibit across the convention floor",
    title: "Show-floor installation",
    caption: "Readable silhouettes and dimensional graphics across a busy exhibition aisle.",
    category: "Exhibits & Activations",
    layout: "wide",
  },
  {
    id: "finished-jungle-environment",
    src: "/media/case-studies/seaworld-environment-refresh-gallery-03.webp",
    alt: "A completed jungle set with layered rockwork and tropical foliage",
    title: "Layered jungle environment",
    caption: "Rockwork and foliage brought together under final show lighting.",
    category: "Sets & Environments",
    layout: "standard",
  },
  {
    id: "studio-streetscape",
    src: "/media/case-studies/netflix-production-design-gallery-01.webp",
    alt: "A wide angle across a complete neighborhood production set",
    title: "Studio streetscape",
    caption: "Practical rooms and camera lanes organized beneath a continuous sky.",
    category: "Sets & Environments",
    layout: "wide",
  },
];
