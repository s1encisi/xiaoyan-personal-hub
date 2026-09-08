/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimationPoster } from "../../../../_components/animation-poster";
import { AnimationSectionHero } from "../../../../_components/animation-section-hero";
import { AnimationYearRail } from "../../../../_components/animation-year-rail";
import { animationRecommendationYears, getAnimationRecommendationYear } from "../../../../_data/animation/recommendations";

type RecommendationYearPageProps = { params: Promise<{ year: string }> };

export function generateStaticParams() {
  return animationRecommendationYears.map(({ year }) => ({ year }));
}

export async function generateMetadata({ params }: RecommendationYearPageProps): Promise<Metadata> {
  const { year } = await params;
  const record = getAnimationRecommendationYear(year);
  if (!record) return { title: "年度推荐未找到｜动画观测站｜小闫" };
  return {
    title: `${year} 年动画推荐｜动画观测站｜小闫`,
    description: record.summary,
    alternates: { canonical: `/life/animation/recommendations/${year}` },
    openGraph: { title: `${year} 年动画推荐｜动画观测站`, description: record.summary, url: `/life/animation/recommendations/${year}`, images: [] },
    twitter: { card: "summary", title: `${year} 年动画推荐｜动画观测站`, description: record.summary, images: [] },
  };
}

export default async function AnimationRecommendationYearPage({ params }: RecommendationYearPageProps) {
  const { year } = await params;
  const record = getAnimationRecommendationYear(year);
  if (!record) notFound();
  const index = animationRecommendationYears.findIndex((item) => item.year === year);
  const newer = animationRecommendationYears[index - 1];
  const older = animationRecommendationYears[index + 1];

  return (
    <main id="main-content" className="animation-year-page" tabIndex={-1}>
      <div className="animation-year-page-grid">
        <AnimationYearRail activeYear={year} />
        <div>
          <AnimationSectionHero
            code={`${year} / ${record.label}`}
            title={`${year} 年动画推荐`}
            description={record.summary}
            breadcrumbs={[{ label: "首页", href: "/" }, { label: "生活", href: "/life" }, { label: "动画观测站", href: "/life/animation" }, { label: "年度推荐", href: "/life/animation/recommendations" }, { label: year }]}
            stats={[{ label: "收录条目", value: `${record.entries.length} 部` }, { label: "编排原则", value: "保留已有原稿" }, { label: "资料状态", value: "持续校订" }]}
          />

          {record.intro.length > 0 && (
            <section className="animation-year-intro" aria-label={`${year} 年推荐导语`}>
              {record.intro.map((paragraph, paragraphIndex) => (
                <p key={`${year}-intro-${paragraphIndex}`}>{paragraph}</p>
              ))}
            </section>
          )}

          <p className="animation-source-note">{record.sourceNote}</p>

          <section className="animation-year-entries" aria-label={`${year} 年推荐作品`}>
            {record.entries.map((item, itemIndex) => (
              <article key={`${year}-${item.title}-${itemIndex}`} id={`work-${itemIndex + 1}`} data-recommendation-entry>
                <AnimationPoster poster={item.poster} title={item.title} showCredit />
                <div className="animation-year-entry-copy">
                  <div className="animation-year-entry-index">
                    <span>{item.rank ? String(item.rank).padStart(2, "0") : String(itemIndex + 1).padStart(2, "0")}</span>
                    <small>{item.rank ? "ANNUAL RANK" : "WATCH NOTE"}</small>
                  </div>
                  <h2>{item.title}</h2>
                  {item.originalTitle && <p className="animation-original-title">{item.originalTitle}</p>}
                  <div className="animation-year-entry-prose">
                    {item.note.map((paragraph, paragraphIndex) => <p key={`${item.title}-${paragraphIndex}`}>{paragraph}</p>)}
                  </div>
                  {item.placeholder && <p className="animation-entry-placeholder">原始资料只有作品标题。完善条目需要提供推荐理由、观看感受，以及需要公开的评分或版本信息。</p>}
                  {item.slug && (
                    <a href={`/life/animation/${item.slug}`} data-navigation="document">
                      阅读对应长评 <ArrowUpRight aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </section>

          <nav className="animation-year-adjacent" aria-label="相邻年度推荐">
            {older ? <a href={`/life/animation/recommendations/${older.year}`} data-navigation="document"><ArrowLeft aria-hidden="true" /><span><small>上一站</small>{older.year} 年</span></a> : <span />}
            {newer ? <a href={`/life/animation/recommendations/${newer.year}`} data-navigation="document"><span><small>下一站</small>{newer.year} 年</span><ArrowRight aria-hidden="true" /></a> : <a href="/life/animation/recommendations" data-navigation="document"><span><small>返回</small>年度索引</span><ArrowRight aria-hidden="true" /></a>}
          </nav>
        </div>
      </div>
    </main>
  );
}
