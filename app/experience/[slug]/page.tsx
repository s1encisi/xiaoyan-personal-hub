import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { DetailNavigation } from "../../_components/detail-navigation";
import { RequirementNotice } from "../../_components/requirement-notice";
import { StatusBadge } from "../../_components/status-badge";
import { experienceRecords, getExperience, isNonPublicStatus } from "../../_data/content";
import { globalContentRequirements } from "../../_data/editorial";

type DetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return experienceRecords.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getExperience(slug);
  if (!record) return { title: "经历记录未找到｜小闫" };
  const canonicalPath = `/experience/${slug}`;
  return {
    title: `${record.title}｜科研与实践｜小闫`,
    description: record.summary,
    alternates: { canonical: canonicalPath },
    robots: isNonPublicStatus(record.status) ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${record.title}｜科研与实践`,
      description: record.summary,
      url: canonicalPath,
      images: [],
    },
    twitter: { card: "summary", title: `${record.title}｜科研与实践`, description: record.summary, images: [] },
  };
}

export default async function ExperienceDetailPage({ params }: DetailProps) {
  const { slug } = await params;
  const record = getExperience(slug);
  if (!record) notFound();
  const index = experienceRecords.findIndex((item) => item.slug === slug);
  const previous = experienceRecords[index - 1];
  const next = experienceRecords[index + 1];

  return (
    <main id="main-content" tabIndex={-1}>
      <article className="detail-shell detail-experience">
        <header className="detail-shell-hero">
          <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "成长历程", href: "/journey" }, { label: "科研与实践", href: "/experience" }, { label: record.title }]} />
          <div className="detail-shell-heading">
            <div><p className="micro-label">{record.code} / {record.type}</p><h1>{record.title}</h1><p>{record.summary}</p></div>
            <StatusBadge status={record.status} />
          </div>
        </header>

        <div className="detail-shell-body section-shell">
          <section aria-labelledby="experience-facts-title">
            <div className="section-kicker"><p className="micro-label">01 / CONTEXT</p><h2 id="experience-facts-title">经历信息</h2></div>
            <dl className="fact-list">
              <div><dt>机构 / 团队</dt><dd>{record.organization}</dd></div>
              <div><dt>个人角色</dt><dd>{record.role}</dd></div>
              <div><dt>时间</dt><dd>{record.period}</dd></div>
              <div><dt>地点</dt><dd>{record.location}</dd></div>
              <div><dt>阶段</dt><dd>{record.phase}</dd></div>
            </dl>
          </section>

          <section aria-labelledby="experience-responsibilities-title">
            <div className="section-kicker"><p className="micro-label">02 / RESPONSIBILITIES</p><h2 id="experience-responsibilities-title">主要工作</h2></div>
            <p className="detail-prose">{record.description}</p>
            <ul className="editorial-list">{record.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section aria-labelledby="experience-outputs-title">
            <div className="section-kicker"><p className="micro-label">03 / OUTPUTS</p><h2 id="experience-outputs-title">相关输出</h2></div>
            <ul className="editorial-list">{record.outputs.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="record-story-map" aria-labelledby="experience-story-title">
            <div className="section-kicker"><p className="micro-label">04 / CONTRIBUTION LOGIC</p><h2 id="experience-story-title">详情最终需要证明三件事</h2></div>
            <ol><li><span>01</span><h3>承担了什么</h3><p>具体职责、协作边界与本人可以独立说明的工作。</p></li><li><span>02</span><h3>怎样做出判断</h3><p>方案选择、关键取舍、失败迭代与复盘依据。</p></li><li><span>03</span><h3>留下了什么</h3><p>可核查交付物、评价结果和能力变化。</p></li></ol>
          </section>

          <RequirementNotice id="experience-detail-requirements-title" groups={globalContentRequirements.experience} title="把这段经历写成可验证案例，需要以下资料" intro={`${record.meta}；还需要具体任务、协作对象、个人贡献、结果和公开产物。`} />
        </div>

        <DetailNavigation
          back={{ title: "返回经历列表", href: "/experience" }}
          previous={previous ? { title: previous.title, href: `/experience/${previous.slug}` } : undefined}
          next={next ? { title: next.title, href: `/experience/${next.slug}` } : undefined}
        />
      </article>
    </main>
  );
}
