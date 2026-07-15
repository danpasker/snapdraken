import type { MetadataRoute } from "next";

import { getAllCaseStudies } from "@/lib/content";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://snapdraken.com").replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await getAllCaseStudies();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/work`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
  const workRoutes: MetadataRoute.Sitemap = caseStudies.map((caseStudy) => ({
    url: `${siteUrl}/work/${caseStudy.slug}`,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...workRoutes];
}
