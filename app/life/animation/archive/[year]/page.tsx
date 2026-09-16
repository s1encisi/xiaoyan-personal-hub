
/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimationSectionHero } from "../../../../_components/animation-section-hero";
import { AnimationYearRail } from "../../../../_components/animation-year-rail";
import { animationArchiveYears, getAnimationArchiveYear } from "../../../../_data/animation/archive";

type ArchiveYearPageProps = { params: Promise<{ year: string }> };

export function generateStaticParams() {
  return animationArchiveYears.map(({ year }) => ({ year }));
}

export async function generateMetadata({ params }: ArchiveYearPageProps): Promise<Metadata> {
  const { year } = await params;
  const record = getAnimationArchiveYear(year);
  if (!record) return { title: "年度总表未找到｜动画观测站｜小闫" };
  const displayYear = year === "undated" ? "未标注时间" : `${year} 年`;
  const pageTitle = year === "undated" ? "未标注时间的番剧总表" : `${displayYear}番剧总表`;
  const socialTitle = `${pageTitle}｜动画观测站`;
  const description = `${record.summary}，共 ${record.entries.length} 条记录。`;
  const path = `/life/animation/archive/${year}`;
  return {
    title: `${pageTitle}｜动画观测站｜小闫`,
    description,
    alternates: { canonical: path },
    openGraph: { title: socialTitle, description, url: path, images: [] },
    twitter: { card: "summary", title: socialTitle, description, images: [] },
  };
}

export default async function AnimationArchiveYearPage({ params }: ArchiveYearPageProps) {
  const { year } = await params;
  const record = getAnimationArchiveYear(year);
  if (!record) notFound();
  const index = animationArchiveYears.findIndex((item) => item.year === year);
  const newer = animationArchiveYears[index - 1];
  const older = animationArchiveYears[index + 1];
  const displayYear = year === "undated" ? "未标注时间" : `${year} 年`;
  const pageTitle = year === "undated" ? "未标注时间的番剧总表" : `${displayYear}番剧总表`;

  return (
    <main id="main-content" className="animation-year-page animation-archive-year-page" data-density="compact" tabIndex={-1}>
      <div className="animation-year-page-grid">
        <AnimationYearRail
          activeYear={year}
          destination="archive"
          label="番剧总表年份"
          years={animationArchiveYears.map((item) => item.year)}
        />
        <div>
          <AnimationSectionHero
            code={`${year === "undated" ? "UNDATED" : year} / WATCH ARCHIVE`}
            title={pageTitle}
            description={record.summary}
            breadcrumbs={[{ label: "首页", href: "/" }, { label: "生活", href: "/life" }, { label: "动画观测站", href: "/life/animation" }, { label: "番剧总表", href: "/life/animation/archive" }, { label: displayYear }]}
            stats={[{ label: "总表条目", value: `${record.entries.length} 条` }, { label: "包含内容", value: "作品 · 排期 · 重看备注" }, { label: "排序", value: "遵循原始总表" }]}
          />

          <ol className="animation-archive-list" id="archive-records">
            {record.entries.map((entry, index) => (
              <li key={entry.id} data-archive-entry>
                <span>{String(index + 1).padStart(3, "0")}</span>
                <div>
                  <h2>{entry.title}</h2>
                  <p>{[entry.season, entry.format, entry.rewatch ? "二刷" : undefined, entry.status].filter(Boolean).join(" / ") || "总表条目"}</p>
                  {entry.note && <p>{entry.note}</p>}
                </div>
                {entry.reviewSlug ? <a href={`/life/animation/${entry.reviewSlug}`} data-navigation="document">查看影评 <ArrowUpRight aria-hidden="true" /></a> : <small>{displayYear}</small>}
              </li>
            ))}
          </ol>
          <a className="archive-back-top" href="#main-content">回到本年目录 <span aria-hidden="true">↑</span></a>

          <nav className="animation-year-adjacent" aria-label="相邻年份总表">
            {older ? <a href={`/life/animation/archive/${older.year}`} data-navigation="document"><ArrowLeft aria-hidden="true" /><span><small>较早</small>{older.year === "undated" ? "未标注时间" : `${older.year} 年`}</span></a> : <span />}
            {newer ? <a href={`/life/animation/archive/${newer.year}`} data-navigation="document"><span><small>较新</small>{newer.year === "undated" ? "未标注时间" : `${newer.year} 年`}</span><ArrowRight aria-hidden="true" /></a> : <a href="/life/animation/archive" data-navigation="document"><span><small>返回</small>番剧总表</span><ArrowRight aria-hidden="true" /></a>}
          </nav>
        </div>
      </div>
    </main>
  );
}
