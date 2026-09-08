export const animationSections = [
  {
    label: "观测站",
    englishLabel: "Observatory",
    href: "/life/animation",
    description: "动画档案首页与当期精选",
  },
  {
    label: "年度推荐",
    englishLabel: "Editors’ Picks",
    href: "/life/animation/recommendations",
    description: "按年份完整保留的推荐片单",
  },
  {
    label: "影评档案",
    englishLabel: "Review Archive",
    href: "/life/animation/reviews",
    description: "长短影评与重看记录",
  },
  {
    label: "番剧总表",
    englishLabel: "Anime Index",
    href: "/life/animation/archive",
    description: "原始总表的完整时间索引",
  },
  {
    label: "观看时间线",
    englishLabel: "Timeline",
    href: "/life/animation/timeline",
    description: "按年份整理的推荐与写作轨迹",
  },
] as const;

// 注意：本文件会被客户端组件（animation-subnav）引用，
// 不能引入 source-content.json 等数据模块；推荐年份列表请从
// recommendations.ts 的 animationRecommendationYears 派生（参考 animation-year-rail.tsx）。
