
import { ArrowUpRight } from "lucide-react";
import { AnimationModuleLinks } from "../../../_components/animation-module-links";
import { AnimationSectionHero } from "../../../_components/animation-section-hero";
import { animationArchiveCount, animationArchiveYears } from "../../../_data/animation/archive";
import { animationArchivePeriod } from "../../../_data/animation/overview";
import { createFixedPageMetadata } from "../../../_data/metadata";

export const metadata = createFixedPageMetadata({
  path: "/life/animation/archive",
  title: "番剧总表｜动画观测站｜小闫",
  description: "按年份进入小闫保存的番剧总表，浏览动画、关联作品、排期与重看备注。",
});

export default function AnimationArchivePage() {
  return (
    <main id="main-content" className="animation-section-page" tabIndex={-1}>
      <AnimationSectionHero
        code="03 / ANIME INDEX"
        title="番剧总表"
        description="按年份浏览观看片单，回顾当季作品、系列补完与二刷记录。"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "生活", href: "/life" }, { label: "动画观测站", href: "/life/animation" }, { label: "番剧总表" }]}
        stats={[{ label: "时间范围", value: animationArchivePeriod }, { label: "收录条目", value: `${animationArchiveCount.toLocaleString("zh-CN")} 条` }]}
      />

      <section className="animation-archive-index" aria-label="番剧总表年份索引">
        {animationArchiveYears.map((record) => (
          <article key={record.year}>
            <span>{record.year === "undated" ? "—" : record.year}</span>
            <div><small>{record.label}</small><h2>{record.summary}</h2></div>
            <ul aria-label={`${record.year === "undated" ? "未标注时间" : `${record.year} 年`}部分总表条目`}>
              {record.entries.slice(0, 5).map((entry) => <li key={entry.id}>{entry.title}</li>)}
            </ul>
            <strong>{record.entries.length}<small> 条总表条目</small></strong>
            <a href={`/life/animation/archive/${record.year}`} data-navigation="document" aria-label={`打开${record.year === "undated" ? "未标注时间" : ` ${record.year} 年`}完整番剧总表`}><span>打开年度总表</span><ArrowUpRight aria-hidden="true" /></a>
          </article>
        ))}
      </section>

      <AnimationModuleLinks />
    </main>
  );
}
