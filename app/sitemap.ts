import type { MetadataRoute } from "next";
import { animationArchiveYears } from "./_data/animation/archive";
import { animationRecommendationYears } from "./_data/animation/recommendations";
import { animationReviews } from "./_data/animation/reviews";
import { educationRecords, experienceRecords, honorRecords, isNonPublicStatus, knowledge, lifeCategories, projects, publicationRecords, reflections, skills } from "./_data/content";
import { SITE_ORIGIN } from "./_data/metadata";
import { journalYears } from "./_data/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixedRoutes = [
    "", "/about", "/about/profile", "/contact", "/research", "/projects", "/outputs",
    "/outputs/project-results", "/publications",
    "/skills", "/journey", "/education", "/experience", "/honors", "/insights",
    "/notes", "/thoughts", "/life", "/life/journal", "/life/gaming", "/life/animation",
    "/life/animation/recommendations", "/life/animation/reviews",
    "/life/animation/archive", "/life/animation/timeline",
  ];
  const detailRoutes = [
    ...journalYears.map(year => `/life/journal/${year}`),
    ...projects.map((item) => `/projects/${item.slug}`),
    ...publicationRecords.filter((item) => !isNonPublicStatus(item.status)).map((item) => `/publications/${item.slug}`),
    ...skills.map((item) => `/skills/${item.slug}`),
    ...educationRecords.filter((item) => !isNonPublicStatus(item.status)).map((item) => `/education/${item.slug}`),
    ...experienceRecords.filter((item) => !isNonPublicStatus(item.status)).map((item) => `/experience/${item.slug}`),
    ...honorRecords.filter((item) => !isNonPublicStatus(item.status)).map((item) => `/honors/${item.slug}`),
    ...knowledge.map((item) => `/notes/${item.slug}`),
    ...reflections.filter((item) => !isNonPublicStatus(item.status)).map((item) => `/thoughts/${item.slug}`),
    ...lifeCategories.filter((item) => !isNonPublicStatus(item.status)).map((item) => `/life/${item.slug}`),
    ...animationRecommendationYears.map((item) => `/life/animation/recommendations/${item.year}`),
    ...animationArchiveYears.map((item) => `/life/animation/archive/${item.year}`),
    ...animationReviews.filter((item) => !isNonPublicStatus(item.status)).map((item) => `/life/animation/${item.slug}`),
  ];

  return [...fixedRoutes, ...detailRoutes].map((path) => ({
    url: `${SITE_ORIGIN}${path}`,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.7 : 1,
  }));
}
