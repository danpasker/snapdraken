import { promises as fs } from "node:fs";
import path from "node:path";

import { load as parseYaml } from "js-yaml";

const CONTENT_DIRECTORY = path.join(process.cwd(), "content");
const CASE_STUDIES_DIRECTORY = path.join(CONTENT_DIRECTORY, "case-studies");
const CASE_STUDY_EXTENSION = ".mdx";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudyFrontmatter = {
  published: boolean;
  order: number;
  title: string;
  client: string;
  year: string;
  role: string;
  scope: string[];
  hero_image: string;
  poster_image: string;
  gallery: GalleryImage[];
  excerpt: string;
  video?: string;
};

export type CaseStudySummary = CaseStudyFrontmatter & {
  slug: string;
};

export type CaseStudy = CaseStudySummary & {
  content: string;
};

export type AboutFrontmatter = {
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  portrait: string;
  portrait_alt: string;
  workshop_image?: string;
  workshop_image_alt?: string;
};

export type AboutContent = AboutFrontmatter & {
  content: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(
  data: Record<string, unknown>,
  key: string,
  source: string,
): string {
  const value = data[key];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${source}: frontmatter field "${key}" must be a non-empty string.`);
  }

  return value.trim();
}

function optionalString(data: Record<string, unknown>, key: string): string | undefined {
  const value = data[key];

  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new Error(`Frontmatter field "${key}" must be a string when provided.`);
  }

  return value.trim();
}

function parseOrder(data: Record<string, unknown>, source: string): number {
  const value = data.order;

  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw new Error(`${source}: frontmatter field "order" must be a positive integer.`);
  }

  return value;
}

function parsePublished(data: Record<string, unknown>, source: string): boolean {
  const value = data.published;

  if (value === undefined) {
    return true;
  }

  if (typeof value !== "boolean") {
    throw new Error(`${source}: frontmatter field "published" must be a boolean.`);
  }

  return value;
}

function parseScope(data: Record<string, unknown>, source: string): string[] {
  const value = data.scope;

  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${source}: frontmatter field "scope" must be a non-empty list.`);
  }

  const scope = value.map((item) => {
    if (typeof item !== "string" || item.trim().length === 0) {
      throw new Error(`${source}: every "scope" item must be a non-empty string.`);
    }

    return item.trim();
  });

  return scope;
}

function parseGallery(data: Record<string, unknown>, source: string): GalleryImage[] {
  const value = data.gallery;

  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${source}: frontmatter field "gallery" must be a non-empty list.`);
  }

  return value.map((item, index) => {
    if (!isRecord(item)) {
      throw new Error(`${source}: gallery item ${index + 1} must be an object.`);
    }

    const image: GalleryImage = {
      src: requiredString(item, "src", `${source}, gallery item ${index + 1}`),
      alt: requiredString(item, "alt", `${source}, gallery item ${index + 1}`),
    };
    const caption = optionalString(item, "caption");

    if (caption) {
      image.caption = caption;
    }

    return image;
  });
}

function parseCaseStudyFrontmatter(
  data: Record<string, unknown>,
  source: string,
): CaseStudyFrontmatter {
  const frontmatter: CaseStudyFrontmatter = {
    published: parsePublished(data, source),
    order: parseOrder(data, source),
    title: requiredString(data, "title", source),
    client: requiredString(data, "client", source),
    year: requiredString(data, "year", source),
    role: requiredString(data, "role", source),
    scope: parseScope(data, source),
    hero_image: requiredString(data, "hero_image", source),
    poster_image: requiredString(data, "poster_image", source),
    gallery: parseGallery(data, source),
    excerpt: requiredString(data, "excerpt", source),
  };
  const video = optionalString(data, "video");

  if (video) {
    frontmatter.video = video;
  }

  return frontmatter;
}

function parseAboutFrontmatter(
  data: Record<string, unknown>,
  source: string,
): AboutFrontmatter {
  const frontmatter: AboutFrontmatter = {
    title: requiredString(data, "title", source),
    eyebrow: requiredString(data, "eyebrow", source),
    headline: requiredString(data, "headline", source),
    description: requiredString(data, "description", source),
    portrait: requiredString(data, "portrait", source),
    portrait_alt: requiredString(data, "portrait_alt", source),
  };
  const workshopImage = optionalString(data, "workshop_image");
  const workshopImageAlt = optionalString(data, "workshop_image_alt");

  if (workshopImage) {
    frontmatter.workshop_image = workshopImage;
  }

  if (workshopImageAlt) {
    frontmatter.workshop_image_alt = workshopImageAlt;
  }

  return frontmatter;
}

function isMissingFile(error: unknown): boolean {
  return isRecord(error) && error.code === "ENOENT";
}

function parseFrontmatter(source: string): { data: unknown; content: string } {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!match) {
    return { data: {}, content: source };
  }

  return { data: parseYaml(match[1]) ?? {}, content: match[2] };
}

function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function toCaseStudySummary(caseStudy: CaseStudy): CaseStudySummary {
  return {
    slug: caseStudy.slug,
    published: caseStudy.published,
    order: caseStudy.order,
    title: caseStudy.title,
    client: caseStudy.client,
    year: caseStudy.year,
    role: caseStudy.role,
    scope: caseStudy.scope,
    hero_image: caseStudy.hero_image,
    poster_image: caseStudy.poster_image,
    gallery: caseStudy.gallery,
    excerpt: caseStudy.excerpt,
    ...(caseStudy.video ? { video: caseStudy.video } : {}),
  };
}

export async function getCaseStudySlugs(): Promise<string[]> {
  const entries = await fs.readdir(CASE_STUDIES_DIRECTORY, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(CASE_STUDY_EXTENSION))
    .map((entry) => entry.name.slice(0, -CASE_STUDY_EXTENSION.length))
    .sort();
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!isValidSlug(slug)) {
    return null;
  }

  const filePath = path.join(CASE_STUDIES_DIRECTORY, `${slug}${CASE_STUDY_EXTENSION}`);

  try {
    const file = await fs.readFile(filePath, "utf8");
    const parsed = parseFrontmatter(file);
    const data = isRecord(parsed.data) ? parsed.data : {};
    const frontmatter = parseCaseStudyFrontmatter(data, filePath);

    if (!frontmatter.published) {
      return null;
    }

    return {
      slug,
      ...frontmatter,
      content: parsed.content.trim(),
    };
  } catch (error) {
    if (isMissingFile(error)) {
      return null;
    }

    throw error;
  }
}

export async function getAllCaseStudies(): Promise<CaseStudySummary[]> {
  const slugs = await getCaseStudySlugs();
  const caseStudies = await Promise.all(slugs.map((slug) => getCaseStudyBySlug(slug)));

  return caseStudies
    .filter((caseStudy): caseStudy is CaseStudy => caseStudy !== null)
    .map(toCaseStudySummary)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export async function getNextCaseStudy(slug: string): Promise<CaseStudySummary | null> {
  const caseStudies = await getAllCaseStudies();
  const currentIndex = caseStudies.findIndex((caseStudy) => caseStudy.slug === slug);

  if (currentIndex === -1 || caseStudies.length < 2) {
    return null;
  }

  return caseStudies[(currentIndex + 1) % caseStudies.length];
}

export async function getAboutContent(): Promise<AboutContent> {
  const filePath = path.join(CONTENT_DIRECTORY, "about.mdx");
  const file = await fs.readFile(filePath, "utf8");
  const parsed = parseFrontmatter(file);
  const data = isRecord(parsed.data) ? parsed.data : {};

  return {
    ...parseAboutFrontmatter(data, filePath),
    content: parsed.content.trim(),
  };
}

// Short alias for homepage and component consumers.
export const getCaseStudies = getAllCaseStudies;
