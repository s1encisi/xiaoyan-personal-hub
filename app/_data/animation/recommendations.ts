import sourceContent from "./public-content.json";
import type { AnimationRecommendation, AnimationRecommendationYear } from "./types";
import { getAnimationPoster } from "./works";

const yearPresentation: Record<string, { title: string; summary: string }> = {
  "2017": { title: "动画成为长期兴趣", summary: "从入坑第一年留下的个人 TV 代表作开始。" },
  "2018": { title: "建立自己的观看坐标", summary: "从当季热门走向旧作与不同类型。" },
  "2019": { title: "沿着山路继续看", summary: "日常、成长与风景逐渐成为长期偏好。" },
  "2020": { title: "新番评价开始成形", summary: "开始系统留下演出、人物关系与完成度判断。" },
  "2021": { title: "重新理解熟悉的作品", summary: "二刷让观看从记住剧情转向重新理解人物与演出。" },
  "2022": { title: "2022 年动画个人推荐", summary: "" },
  "2023": { title: "继续补完长期企划", summary: "这一年的代表记录围绕系列、旧作与个人观看史展开。" },
  "2024": { title: "重看占据很大比重的一年", summary: "" },
  "2025": { title: "在旧作二刷与新番之间", summary: "" },
};

type AnnualEntries = (typeof sourceContent.annualRecommendations)[keyof typeof sourceContent.annualRecommendations]["entries"];

function summarizeAnnualEntries(entries: AnnualEntries) {
  const categoryCounts = new Map<string, number>();
  let writtenCount = 0;

  for (const entry of entries) {
    categoryCounts.set(entry.category, (categoryCounts.get(entry.category) ?? 0) + 1);
    if (!entry.placeholder) writtenCount += 1;
  }

  return {
    total: entries.length,
    writtenCount,
    titleOnlyCount: entries.length - writtenCount,
    categoryCount: (category: string) => categoryCounts.get(category) ?? 0,
  };
}

// 摘要中的作品数量一律按当前条目计算，避免与 public-content.json 脱节。
function yearSummary(year: string, entries: AnnualEntries): string {
  const { total, writtenCount, titleOnlyCount, categoryCount } = summarizeAnnualEntries(entries);
  switch (year) {
    case "2022":
      return `年度 Top ${categoryCount("ranked-top-10")}、${categoryCount("honorable-mention")} 部提名与 ${categoryCount("back-catalog-recommendation")} 部当年补完旧作，共 ${total} 条；其中 ${writtenCount} 条保留了评价文字，${titleOnlyCount} 条目前仅有作品名。`;
    case "2024":
      return `${total} 条年度片单记录，重看、系列补完与当年新作并行；原始资料仅列出作品名称。`;
    case "2025":
      return `${total} 条年度推荐记录中，${writtenCount} 条保留了推荐文字，${titleOnlyCount} 条目前仅有作品名。`;
    default:
      return yearPresentation[year]?.summary ?? "";
  }
}

const detailSlugByTitle: Record<string, string> = {
  "吹响吧！上低音号（二刷）": "hibike-euphonium-rewatch",
  "机动战士高达：闪光的哈萨维（二刷）": "mobile-suit-gundam-hathaway-rewatch",
  "向山进发 第四季": "anime-picks-2022",
};

function splitIntro(value: string) {
  return value.split(/\n\s*\n/g).map((paragraph) => paragraph.trim()).filter(Boolean);
}

function findPoster(title: string, aliases: string[]) {
  return getAnimationPoster(title) ?? aliases.map((alias) => getAnimationPoster(alias)).find(Boolean);
}

function publicSourceNote(value: string) {
  return value.replace(
    /，已显式标记 [^。]+。/,
    "；该条目当前只展示作品名称。",
  );
}

function toRecommendation(entry: (typeof sourceContent.annualRecommendations)[keyof typeof sourceContent.annualRecommendations]["entries"][number]): AnimationRecommendation {
  const note = entry.reviewParagraphs.length > 0
    ? entry.reviewParagraphs.map((paragraph) => typeof paragraph === "string" ? paragraph : paragraph.text)
    : entry.reviewText.trim()
      ? [entry.reviewText.trim()]
      : [];

  return {
    title: entry.title,
    aliases: entry.aliases,
    rank: entry.rank ?? undefined,
    category: entry.category,
    slug: detailSlugByTitle[entry.title],
    note,
    poster: findPoster(entry.title, entry.aliases),
    placeholder: entry.placeholder,
    sourceNote: entry.provenance === "user-original" ? "原稿全文" : "原始片单仅列出标题；需要提供推荐理由与观看感受",
  };
}

export const animationRecommendationYears: AnimationRecommendationYear[] = Object.entries(sourceContent.annualRecommendations)
  .map(([year, record]) => ({
    year,
    label: record.label,
    title: yearPresentation[year]?.title ?? record.label,
    summary: yearSummary(year, record.entries) || record.label,
    intro: splitIntro(record.intro),
    sourceNote: "sourceNote" in record && record.sourceNote
      ? publicSourceNote(record.sourceNote)
      : `来源：${year} 年动画记录。`,
    entries: record.entries.map(toRecommendation),
  }))
  .sort((left, right) => Number(right.year) - Number(left.year));

export function getAnimationRecommendationYear(year: string) {
  return animationRecommendationYears.find((record) => record.year === year);
}
