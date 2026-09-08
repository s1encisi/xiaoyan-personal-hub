import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { DetailNavigation } from "../../_components/detail-navigation";
import { RequirementNotice } from "../../_components/requirement-notice";
import { StatusBadge } from "../../_components/status-badge";
import { getPublication, isNonPublicStatus, publicationRecords } from "../../_data/content";
import { globalContentRequirements } from "../../_data/editorial";

type DetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publicationRecords.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getPublication(slug);
  if (!record) return { title: "成果记录未找到｜小闫" };
  const canonicalPath = `/publications/${slug}`;
  return {
    title: `${record.title}｜论文与报告｜小闫`,
    description: record.summary,
    alternates: { canonical: canonicalPath },
    robots: isNonPublicStatus(record.status) ? { index: false, follow: true } : undefined,
    openGraph: {
      title: record.title,
      description: record.summary,
      url: canonicalPath,
      images: [],
    },
    twitter: { card: "summary", title: record.title, description: record.summary, images: [] },
  };
}

export default async function PublicationDetailPage({ params }: DetailProps) {
  const { slug } = await params;
  const record = getPublication(slug);
  if (!record) notFound();
  const index = publicationRecords.findIndex((item) => item.slug === slug);
  const previous = publicationRecords[index - 1];
  const next = publicationRecords[index + 1];

  return (
    <main id="main-content" tabIndex={-1}>
      <article className="detail-shell detail-publication">
        <header className="detail-shell-hero">
          <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "成果中心", href: "/outputs" }, { label: "论文与报告", href: "/publications" }, { label: record.title }]} />
          <div className="detail-shell-heading">
            <div><p className="micro-label">{record.code} / {record.type}</p><h1>{record.title}</h1><p>{record.summary}</p></div>
            <StatusBadge status={record.status} />
          </div>
        </header>

        <div className="detail-shell-body section-shell">
          <section className="record-context" aria-labelledby="publication-context-title">
            <div className="section-kicker"><p className="micro-label">00 / DISCLOSURE</p><h2 id="publication-context-title">建立公开记录前，先完成事实核验</h2></div>
            <p className="detail-prose">当前页面不代表已经存在论文或报告，也不会被搜索引擎收录。正式记录需要先核实题录，再说明研究内容与个人贡献，最后连接可公开证据。</p>
          </section>

          <section aria-labelledby="publication-facts-title">
            <div className="section-kicker"><p className="micro-label">01 / BIBLIOGRAPHY</p><h2 id="publication-facts-title">题录信息</h2></div>
            <dl className="fact-list">
              <div><dt>作者</dt><dd>{record.authors}</dd></div>
              <div><dt>年份</dt><dd>{record.year}</dd></div>
              <div><dt>刊物 / 会议</dt><dd>{record.venue}</dd></div>
              <div><dt>DOI</dt><dd>{record.doi ?? "需要提供 DOI（如有）"}</dd></div>
            </dl>
          </section>

          <section aria-labelledby="publication-abstract-title">
            <div className="section-kicker"><p className="micro-label">02 / ABSTRACT</p><h2 id="publication-abstract-title">摘要</h2></div>
            <p className="detail-prose">{record.abstract}</p>
          </section>

          <section aria-labelledby="publication-contribution-title">
            <div className="section-kicker"><p className="micro-label">03 / CONTRIBUTION</p><h2 id="publication-contribution-title">主要贡献</h2></div>
            <p className="detail-prose">{record.contribution}</p>
          </section>

          <section className="record-story-map" aria-labelledby="publication-story-title">
            <div className="section-kicker"><p className="micro-label">04 / READING LOGIC</p><h2 id="publication-story-title">完整成果页的阅读逻辑</h2></div>
            <ol><li><span>01</span><h3>为什么研究</h3><p>问题背景、已有方法缺口与研究目标。</p></li><li><span>02</span><h3>怎样回答</h3><p>数据、方法、基线、实验设计与评价方式。</p></li><li><span>03</span><h3>得到什么</h3><p>关键数值结果、稳定性、失败案例与限制。</p></li><li><span>04</span><h3>我做了什么</h3><p>个人负责部分及与团队贡献的边界。</p></li></ol>
          </section>

          <section aria-labelledby="publication-links-title">
            <div className="section-kicker"><p className="micro-label">05 / LINKS</p><h2 id="publication-links-title">公开链接</h2></div>
            {record.links.length > 0 ? (
              <div className="section-actions">{record.links.map((link) => <a key={link.href} href={link.href}>{link.label} <span>↗</span></a>)}</div>
            ) : (
              <p className="content-placeholder-note">需要提供 DOI、出版社或会议页面、预印本、数据集、项目主页和代码仓库中适合公开的链接。</p>
            )}
          </section>

          <RequirementNotice id="publication-detail-requirements-title" groups={globalContentRequirements.publications} title="建立这条正式成果记录，需要以下资料" />
        </div>

        <DetailNavigation
          back={{ title: "返回论文与报告", href: "/publications" }}
          previous={previous ? { title: previous.title, href: `/publications/${previous.slug}` } : undefined}
          next={next ? { title: next.title, href: `/publications/${next.slug}` } : undefined}
        />
      </article>
    </main>
  );
}
