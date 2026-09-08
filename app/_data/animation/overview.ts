import { animationArchiveYears } from "./archive";
import { animationRecommendationYears } from "./recommendations";

function getYearBounds(records: ReadonlyArray<{ year: string }>, label: string) {
  let earliest: number | undefined;
  let latest: number | undefined;

  for (const record of records) {
    const year = Number(record.year);
    if (!Number.isFinite(year)) continue;
    earliest = earliest === undefined ? year : Math.min(earliest, year);
    latest = latest === undefined ? year : Math.max(latest, year);
  }

  if (earliest === undefined || latest === undefined) {
    throw new Error(`${label}缺少有效年份，无法生成公开时间范围。`);
  }

  return { earliest, latest };
}

const recommendationBounds = getYearBounds(animationRecommendationYears, "动画推荐数据");
const archiveBounds = getYearBounds(animationArchiveYears, "番剧总表数据");

export const animationEarliestRecommendationYear = recommendationBounds.earliest;
export const animationLatestRecommendationYear = recommendationBounds.latest;
export const animationEarliestArchiveYear = archiveBounds.earliest;
export const animationLatestArchiveYear = archiveBounds.latest;
export const animationRecommendationPeriod = `${animationEarliestRecommendationYear}—${animationLatestRecommendationYear}`;
export const animationArchivePeriod = `${animationEarliestArchiveYear}—${animationLatestArchiveYear}`;

export const animationOverview = {
  title: "看动画，也在理解故事。",
  description: [
    "这里整理我的观影与思考，按时间线记录。",
    `年度推荐记录到 ${animationLatestRecommendationYear} 年，番剧总表的时间标签已延伸到 ${animationLatestArchiveYear} 年，`,
    "把喜欢，写成可以回看的文字与时间索引。",
  ],
  period: `${Math.min(animationEarliestRecommendationYear, animationEarliestArchiveYear)}—${Math.max(animationLatestRecommendationYear, animationLatestArchiveYear)}`,
  archiveNote: "年度推荐、影评文章与番剧总表均来自保存的资料；每篇文章标明原稿、定稿或编辑整理方式，公开页面只做必要的断句、错字与结构整理。",
} as const;

export const animationTimeline = [
  {
    year: "2017",
    title: "从《寻找失去的未来》开始",
    description: "4 月 12 日注册 B 站账号，也从这一年开始把动画当作一项会持续很久的兴趣。",
    href: "/life/animation/anime-journey-since-2017",
    works: ["寻找失去的未来", "末日时在做什么？有没有空？可以来拯救吗？", "月色真美"],
  },
  {
    year: "2018",
    title: "补番与建立自己的坐标",
    description: "观看数量开始增长，也逐渐知道自己更在意人物、氛围和作品留下的长期感受。",
    href: "/life/animation/recommendations/2018",
    works: ["GOSICK"],
  },
  {
    year: "2019",
    title: "把日常与成长放进片单",
    description: "从观看当季作品走向持续补完，也开始反复回看真正喜欢的作品。",
    href: "/life/animation/archive/2019",
    works: ["向山进发"],
  },
  {
    year: "2020",
    title: "新番评价开始成形",
    description: "不再只记录看过什么，也尝试写下演出、人物关系与完成度。",
    href: "/life/animation/reviews",
    works: ["高校舰队", "BanG Dream! 第三季"],
  },
  {
    year: "2021",
    title: "重看成为另一种观看",
    description: "二刷不是重复结论，而是观察经历变化以后，自己如何重新理解作品。",
    href: "/life/animation/hibike-euphonium-rewatch",
    works: ["吹响吧！上低音号", "EVA 新剧场版"],
  },
  {
    year: "2022",
    title: "年度十选与长评并行",
    description: "开始系统整理年度推荐，也留下《水星领航员》等作品的完整观看感受。",
    href: "/life/animation/recommendations/2022",
    works: ["向山进发 Next Summit", "赛博朋克：边缘行者", "水星领航员"],
  },
  {
    year: "2023",
    title: "继续补完长期企划",
    description: "片单不只围绕新番，也保留与旧作、系列和个人记忆重新相遇的过程。",
    href: "/life/animation/archive/2023",
    works: ["偶像大师", "Kanon"],
  },
  {
    year: "2024",
    title: "重看、补完与新的日常",
    description: "这一年的片单条目里，重看、系列补完与当年新作共同构成观看重心；原始资料未附逐条评价。",
    href: "/life/animation/recommendations/2024",
    works: ["葬送的芙莉莲", "攻壳机动队 S.A.C.", "败犬女主太多了！"],
  },
  {
    year: "2025",
    title: "科研、青春与群像叙事",
    description: "在旧作二刷和新番之间，继续写下动画与当下生活发生联系的方式。",
    href: "/life/animation/recommendations/2025",
    works: ["闪光的哈撒韦", "琉璃的宝石", "金牌得主"],
  },
] as const;
