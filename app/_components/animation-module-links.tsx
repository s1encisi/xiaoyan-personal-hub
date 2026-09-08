
import { Clock3, FolderOpen, ListTree, Star, type LucideIcon } from "lucide-react";
import { animationRecommendationPeriod } from "../_data/animation/overview";

const moduleLinks: { label: string; english: string; description: string; href: string; icon: LucideIcon }[] = [
  { label: "年度推荐", english: "Editors’ Picks", description: `${animationRecommendationPeriod} 年度推荐与片单`, href: "/life/animation/recommendations", icon: Star },
  { label: "影评档案", english: "Review Archive", description: "按年份浏览全部影评", href: "/life/animation/reviews", icon: FolderOpen },
  { label: "番剧总表", english: "Anime Index", description: "原始总表的完整时间索引", href: "/life/animation/archive", icon: ListTree },
  { label: "观看时间线", english: "Timeline", description: "我的观看历程与轨迹", href: "/life/animation/timeline", icon: Clock3 },
];

export function AnimationModuleLinks() {
  return (
    <nav className="animation-module-links" aria-label="动画档案分区">
      {moduleLinks.map(({ label, english, description, href, icon: Icon }) => (
        <a key={href} href={href} data-navigation="document">
          <Icon aria-hidden="true" strokeWidth={1.5} />
          <span>
            <strong>{label}</strong>
            <small>{english}</small>
            <em>{description}</em>
          </span>
        </a>
      ))}
    </nav>
  );
}
