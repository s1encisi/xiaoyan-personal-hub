import { animationReviews as legacyReviews } from "../content";
import sourceContent from "./public-content.json";
import type { AnimationReview, AnimationReviewSection } from "./types";
import { getAnimationPoster } from "./works";

const slugBySourceId: Record<string, string> = {
  magi: "magi-personal-review",
  "high-school-fleet": "high-school-fleet-personal-review",
  "bang-dream-season-3": "bang-dream-season-3",
  "her-blue-sky": "her-blue-sky",
  "re-stage-dream-days": "re-stage-dream-days",
  "sound-euphonium-rewatch": "hibike-euphonium-rewatch",
  "uma-musume-season-2": "uma-musume-season-2",
  "evangelion-rebuild-four-films": "evangelion-thrice-upon-a-time",
  "poppin-dream": "poppin-dream-five-years",
  "strawberry-panic": "strawberry-panic",
  "honkai-graduation-trip": "honkai-graduation-trip",
  "idol-franchises": "idol-franchises",
  "annual-2022": "anime-picks-2022",
};

const yearBySourceId: Record<string, string> = {
  "bang-dream-season-3": "2020",
  "her-blue-sky": "2020",
  "re-stage-dream-days": "2020",
  "sound-euphonium-rewatch": "2021",
  "uma-musume-season-2": "2021",
  "evangelion-rebuild-four-films": "2025",
  "poppin-dream": "2022",
  "strawberry-panic": "2022",
  "honkai-graduation-trip": "2023",
  "annual-2022": "2022",
};

const lensBySourceId: Record<string, string> = {
  magi: "人物偏好与世界观",
  "high-school-fleet": "军武日常与临场感",
  "bang-dream-season-3": "企划陪伴与舞台",
  "her-blue-sky": "青春选择与人生价值",
  "re-stage-dream-days": "偶像、人设与舞台",
  "sound-euphonium-rewatch": "人物、音乐与镜头语言",
  "uma-musume-season-2": "体育叙事与人物塑造",
  "evangelion-rebuild-four-films": "成长、和解与告别",
  "poppin-dream": "作品陪伴与个人记忆",
  "strawberry-panic": "人物立场与剧情逻辑",
  "honkai-graduation-trip": "六年陪伴与告别",
  "idol-franchises": "偶像企划横向观察",
  "annual-2022": "年度片单与观看语境",
};

const titleBySourceId: Record<string, string> = {
  "sound-euphonium-rewatch": "《吹响吧！上低音号》：一首青春交响曲",
  "evangelion-rebuild-four-films": "《EVA：终》：在不满与告别之间",
  "poppin-dream": "Poppin’ Dream!：终于理解“心动与闪耀”",
  "honkai-graduation-trip": "《毕业旅行》：一路顺风，琪亚娜",
  "annual-2022": "2022 年动画个人推荐榜",
};

function firstSubstantiveParagraph(paragraphs: string[]) {
  const paragraph = paragraphs.find((item) => item.replace(/[—\-：:]/g, "").trim().length > 42) ?? paragraphs[0] ?? "动画观看原稿。";
  return paragraph.length > 118 ? `${paragraph.slice(0, 118)}……` : paragraph;
}

function findPoster(title: string, aliases: string[]) {
  return getAnimationPoster(title) ?? aliases.map((alias) => getAnimationPoster(alias)).find(Boolean);
}

function findReviewPosters(sourceId: string, title: string, aliases: string[]) {
  const collectionTitles = sourceId === "idol-franchises"
    ? ["BanG Dream!", "Love Live! 学园偶像计划", "偶像大师"]
    : sourceId === "annual-2022"
      ? ["向山进发 Next Summit", "孤独摇滚！", "赛博朋克：边缘行者"]
      : [];
  if (collectionTitles.length > 0) {
    return collectionTitles.map((item) => getAnimationPoster(item)).filter((item) => item !== undefined);
  }
  const workTitle = sourceId === "evangelion-rebuild-four-films" ? sourceContent.evaFinal.title : title;
  const poster = findPoster(workTitle, aliases);
  return poster ? [poster] : [];
}

function sourceReviewSections(sourceId: string, paragraphs: string[]): AnimationReviewSection[] {
  if (sourceId === "evangelion-rebuild-four-films") {
    return [
      { title: "新剧场版四部：最初的完整评价", paragraphs },
      ...sourceContent.evaFinal.timepoints.map((timepoint) => ({
        title: timepoint.label,
        paragraphs: timepoint.paragraphs,
      })),
    ];
  }
  return [{ title: "原文影评", paragraphs }];
}

const extractedReviews: AnimationReview[] = sourceContent.reviews.map((review, index) => {
  const slug = slugBySourceId[review.id] ?? review.id;
  const title = titleBySourceId[review.id] ?? `《${review.title}》：原文影评`;
  const posters = findReviewPosters(review.id, review.title, review.aliases);
  return {
    slug,
    code: `AR${String(index + 1).padStart(2, "0")}`,
    title,
    workTitle: review.id === "evangelion-rebuild-four-films" ? sourceContent.evaFinal.title : review.title,
    englishTitle: review.aliases[0]?.toUpperCase() ?? review.id.toUpperCase(),
    year: yearBySourceId[review.id] ?? "原稿未标注",
    lens: lensBySourceId[review.id] ?? "原稿观看记录",
    summary: firstSubstantiveParagraph(review.paragraphs),
    poster: posters[0],
    posters: posters.length > 1 ? posters : undefined,
    facts: [
      { label: "内容类型", value: "原稿影评" },
      { label: "原始来源", value: "《番剧评价》" },
      { label: "公开整理", value: "保留原文，仅调整页面分段" },
    ],
    sections: sourceReviewSections(review.id, review.paragraphs),
    tags: [lensBySourceId[review.id] ?? "个人影评", "原稿全文", "观看记录"],
    sourceNote: review.id === "evangelion-rebuild-four-films"
      ? "合并呈现《番剧评价》中对 EVA 新剧场版四部的原文，以及《EVA终》文档中两个观看时点的原文；其中 2021 年首段在源文件中本就未写完，页面保持原状。"
      : "来自《番剧评价》原稿。页面保留原文措辞与观点，只按阅读需要恢复段落结构。",
    status: "已确认",
    featured: review.id === "evangelion-rebuild-four-films",
  };
});

const hathawayReview: AnimationReview = {
  slug: "mobile-suit-gundam-hathaway-rewatch",
  code: "AR14",
  title: "《闪光的哈萨维》：理想主义者的安魂曲",
  workTitle: sourceContent.hathaway.title,
  englishTitle: "MOBILE SUIT GUNDAM HATHAWAY — REWATCH",
  year: "2025",
  lens: "政治结构、战场景观与理想主义",
  summary: firstSubstantiveParagraph(sourceContent.hathaway.paragraphs),
  poster: findPoster(sourceContent.hathaway.title, sourceContent.hathaway.aliases),
  facts: [
    { label: "内容类型", value: "二刷影评定稿" },
    { label: "原始来源", value: "《2025推荐动画》" },
    { label: "公开边界", value: "排除候选与 AI 辅助草稿" },
  ],
  sections: [{ title: "公开定稿", paragraphs: sourceContent.hathaway.paragraphs }],
  tags: ["高达", "政治结构", "理想主义"],
  sourceNote: "公开文本只采用《2025推荐动画》中的定稿。另一份《闪光的哈撒韦影评》包含多份候选稿与 AI 辅助草稿，无法确定最终采用版本，因此未公开。",
  status: "已确认",
};

const retainedLegacySlugs = new Set(["anime-journey-since-2017", "aria-the-animation-farewell"]);
// 保留的 legacy 影评沿用原编号；aria 原编号 AR05 与按索引生成的提取影评冲突，
// 因此改排到哈萨维（AR14）之后，保证全站编号唯一。
const legacyCodeBySlug: Record<string, string> = {
  "aria-the-animation-farewell": "AR15",
};
const retainedLegacyReviews: AnimationReview[] = legacyReviews
  .filter((review) => retainedLegacySlugs.has(review.slug))
  .map((review) => {
    const workTitle = review.slug === "anime-journey-since-2017" ? "寻找失去的未来" : "水星领航员";
    return {
      ...review,
      code: legacyCodeBySlug[review.slug] ?? review.code,
      workTitle,
      year: review.slug === "anime-journey-since-2017" ? "2017" : "2022",
      poster: getAnimationPoster(workTitle),
    };
  });

const bySlug = new Map<string, AnimationReview>();
for (const review of [...extractedReviews, hathawayReview, ...retainedLegacyReviews]) bySlug.set(review.slug, review);

export const animationReviews = [...bySlug.values()].sort((left, right) => {
  const leftFeatured = Boolean(left.featured);
  const rightFeatured = Boolean(right.featured);
  if (leftFeatured !== rightFeatured) return leftFeatured ? -1 : 1;

  const leftYear = Number.parseInt(left.year, 10);
  const rightYear = Number.parseInt(right.year, 10);
  const leftHasYear = Number.isFinite(leftYear);
  const rightHasYear = Number.isFinite(rightYear);

  if (leftHasYear && rightHasYear && leftYear !== rightYear) return rightYear - leftYear;
  if (leftHasYear !== rightHasYear) return leftHasYear ? -1 : 1;
  return left.code.localeCompare(right.code, "en");
});

export function getAnimationReview(slug: string) {
  return animationReviews.find((review) => review.slug === slug);
}

export function getAdjacentAnimationReviews(slug: string) {
  const index = animationReviews.findIndex((review) => review.slug === slug);
  return {
    previous: index > 0 ? animationReviews[index - 1] : undefined,
    next: index >= 0 && index < animationReviews.length - 1 ? animationReviews[index + 1] : undefined,
  };
}
