
import { animationRecommendationYears } from "../_data/animation/recommendations";

const recommendationYearList = animationRecommendationYears.map((record) => record.year);

type AnimationYearRailProps = {
  activeYear?: string;
  destination?: "recommendations" | "archive";
  label?: string;
  years?: readonly string[];
};

export function AnimationYearRail({
  activeYear = recommendationYearList[0] ?? "2025",
  destination = "recommendations",
  label = "动画档案年份",
  years = recommendationYearList,
}: AnimationYearRailProps) {
  const rangeLabel = destination === "archive" ? "全部年份" : `${years.at(-1)}—${years[0]}`;

  return (
    <nav className="animation-year-rail" aria-label={label}>
      <span className="animation-year-rail-line" aria-hidden="true" />
      {years.map((year) => (
        <a
          key={year}
          href={`/life/animation/${destination}/${year}`}
          data-navigation="document"
          aria-current={year === activeYear ? "page" : undefined}
        >
          <i aria-hidden="true" />
          <span>{year === "undated" ? "未标注" : year}</span>
        </a>
      ))}
      <a
        className="animation-year-rail-more"
        href={`/life/animation/${destination}`}
        data-navigation="document"
      >
        <strong>{destination === "archive" ? "查看总表" : "年度索引"}</strong>
        <small>{rangeLabel}</small>
      </a>
    </nav>
  );
}
