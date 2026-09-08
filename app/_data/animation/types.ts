import type { ContentStatusLabel } from "../content";

export type AnimationPoster = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sourceUrl?: string;
  sourceLabel?: string;
  rightsNote?: string;
};

export type AnimationFact = {
  label: string;
  value: string;
};

export type AnimationReviewSection = {
  title: string;
  paragraphs: string[];
};

export type AnimationReview = {
  slug: string;
  code: string;
  title: string;
  workTitle: string;
  englishTitle: string;
  year: string;
  lens: string;
  summary: string;
  poster?: AnimationPoster;
  posters?: AnimationPoster[];
  facts: AnimationFact[];
  sections: AnimationReviewSection[];
  tags: string[];
  sourceNote: string;
  status: ContentStatusLabel;
  featured?: boolean;
  placeholder?: boolean;
};

export type AnimationRecommendation = {
  title: string;
  rank?: number;
  slug?: string;
  originalTitle?: string;
  aliases?: string[];
  category?: string;
  note: string[];
  poster?: AnimationPoster;
  tags?: string[];
  placeholder?: boolean;
  sourceNote?: string;
};

export type AnimationRecommendationYear = {
  year: string;
  label: string;
  title: string;
  summary: string;
  intro: string[];
  sourceNote: string;
  entries: AnimationRecommendation[];
};

export type AnimationArchiveEntry = {
  id: string;
  title: string;
  year: string;
  season?: string;
  format?: string;
  note?: string;
  status?: string;
  rewatch?: boolean;
  reviewSlug?: string;
  poster?: AnimationPoster;
  sourceNote?: string;
};

export type AnimationArchiveYear = {
  year: string;
  label: string;
  summary: string;
  entries: AnimationArchiveEntry[];
};
