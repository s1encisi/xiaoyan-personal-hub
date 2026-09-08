import sourceContent from "./public-content.json";
import type { AnimationArchiveEntry, AnimationArchiveYear } from "./types";
import { animationReviews } from "./reviews";

const masterEntries = sourceContent.masterArchive.entries;

function archiveYear(period: string | null) {
  return period?.match(/^20\d{2}/)?.[0] ?? "undated";
}

function normalizeTitle(value: string) {
  return value
    .toLocaleLowerCase("zh-CN")
    .replace(/[《》〈〉「」『』【】[\]()（）·・:：!！?？,，.。\s]/g, "");
}

const reviewSlugByTitle = new Map(
  animationReviews.map((review) => [normalizeTitle(review.workTitle), review.slug]),
);

function toArchiveEntry(entry: (typeof masterEntries)[number]): AnimationArchiveEntry {
  const year = archiveYear(entry.period);
  return {
    id: entry.id,
    title: entry.text,
    year,
    season: entry.period ?? undefined,
    status: entry.section ?? undefined,
    sourceNote: "番剧总表原始条目",
    reviewSlug: reviewSlugByTitle.get(normalizeTitle(entry.text)),
  };
}

const grouped = new Map<string, AnimationArchiveEntry[]>();
for (const sourceEntry of masterEntries) {
  const item = toArchiveEntry(sourceEntry);
  const bucket = grouped.get(item.year);
  if (bucket) bucket.push(item);
  else grouped.set(item.year, [item]);
}

export const animationArchiveYears: AnimationArchiveYear[] = [...grouped.entries()]
  .map(([year, entries]) => ({
    year,
    label: year === "undated" ? "未标注时间的主表条目" : `${year} 年总表条目`,
    summary: year === "undated"
      ? "原始总表中未附季度或年份标签的条目，仍按原始顺序完整保留。"
      : `原始总表中标记为 ${year} 年的动画、关联作品与排期条目。`,
    entries,
  }))
  .sort((left, right) => {
    if (left.year === "undated") return 1;
    if (right.year === "undated") return -1;
    return Number(right.year) - Number(left.year);
  });

export function getAnimationArchiveYear(year: string) {
  return animationArchiveYears.find((record) => record.year === year);
}

export const animationArchiveCount = masterEntries.length;
export const animationSupplementalCount = sourceContent.supplementalWatchRecordCount;
export const animationArchivePeriods = sourceContent.masterArchive.periods;
