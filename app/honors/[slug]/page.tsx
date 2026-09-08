import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { DetailNavigation } from "../../_components/detail-navigation";
import { RequirementNotice } from "../../_components/requirement-notice";
import { StatusBadge } from "../../_components/status-badge";
import { getHonor, honorRecords, isNonPublicStatus } from "../../_data/content";
import { globalContentRequirements } from "../../_data/editorial";

type DetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return honorRecords.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getHonor(slug);
  if (!record) return { title: "荣誉记录未找到｜小闫" };
  const canonicalPath = `/honors/${slug}`;
  return {
    title: `${record.title}｜竞赛与荣誉｜小闫`,
    description: record.description,
    alternates: { canonical: canonicalPath },
    robots: isNonPublicStatus(record.status) ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${record.title}｜竞赛与荣誉`,
      description: record.description,
      url: canonicalPath,
      images: [],
    },
    twitter: { card: "summary", title: `${record.title}｜竞赛与荣誉`, description: record.description, images: [] },
  };
}

export default async function HonorDetailPage({ params }: DetailProps) {
  const { slug } = await params;
  const record = getHonor(slug);
  if (!record) notFound();
  const index = honorRecords.findIndex((item) => item.slug === slug);
  const previous = honorRecords[index - 1];
  const next = honorRecords[index + 1];

  return (
    <main id="main-content" tabIndex={-1}>
      <article className="detail-shell detail-honor">
        <header className="detail-shell-hero">
          <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "成长历程", href: "/journey" }, { label: "竞赛与荣誉", href: "/honors" }, { label: record.title }]} />
          <div className="detail-shell-heading">
            <div><p className="micro-label">{record.code} / {record.category}</p><h1>{record.title}</h1><p>{record.description}</p></div>
            <StatusBadge status={record.status} />
          </div>
        </header>

        <div className="detail-shell-body section-shell">
          <section aria-labelledby="honor-facts-title">
            <div className="section-kicker"><p className="micro-label">01 / RECORD</p><h2 id="honor-facts-title">记录信息</h2></div>
            <dl className="fact-list">
              <div><dt>授予机构</dt><dd>{record.issuer}</dd></div>
              <div><dt>等级 / 成绩</dt><dd>{record.level}</dd></div>
              <div><dt>时间</dt><dd>{record.date}</dd></div>
              <div><dt>范围</dt><dd>{record.scope}</dd></div>
              <div><dt>个人角色</dt><dd>{record.role}</dd></div>
            </dl>
          </section>

          <section aria-labelledby="honor-contribution-title">
            <div className="section-kicker"><p className="micro-label">02 / CONTRIBUTION</p><h2 id="honor-contribution-title">个人贡献</h2></div>
            <p className="detail-prose">{record.contribution}</p>
          </section>

          <section aria-labelledby="honor-proof-title">
            <div className="section-kicker"><p className="micro-label">03 / PROOF</p><h2 id="honor-proof-title">证明材料</h2></div>
            {record.proofUrl ? <a className="text-link" href={record.proofUrl}>查看证明材料 <span>↗</span></a> : <p className="content-placeholder-note">需要提供证书、官方获奖名单或可公开查询的链接，并注明奖项名称、授予机构、等级、日期和承担的主要工作。</p>}
          </section>

          <section className="record-story-map" aria-labelledby="honor-story-title">
            <div className="section-kicker"><p className="micro-label">04 / CONTEXT</p><h2 id="honor-story-title">一项荣誉如何进入个人档案</h2></div>
            <ol><li><span>01</span><h3>先核实事实</h3><p>名称、等级、时间、机构与评选范围必须准确。</p></li><li><span>02</span><h3>再连接作品</h3><p>说明对应项目、竞赛任务、论文或服务内容。</p></li><li><span>03</span><h3>最后说明贡献</h3><p>区分团队成果、个人角色与能够公开证明的部分。</p></li></ol>
          </section>

          <RequirementNotice id="honor-detail-requirements-title" groups={globalContentRequirements.honors} title={`把“${record.category}”替换为真实记录，需要以下资料`} />
        </div>

        <DetailNavigation
          back={{ title: "返回荣誉列表", href: "/honors" }}
          previous={previous ? { title: previous.title, href: `/honors/${previous.slug}` } : undefined}
          next={next ? { title: next.title, href: `/honors/${next.slug}` } : undefined}
        />
      </article>
    </main>
  );
}
