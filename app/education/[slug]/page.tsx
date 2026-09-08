import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { DetailNavigation } from "../../_components/detail-navigation";
import { RequirementNotice } from "../../_components/requirement-notice";
import { StatusBadge } from "../../_components/status-badge";
import { educationRecords, getEducation, isNonPublicStatus } from "../../_data/content";
import { globalContentRequirements } from "../../_data/editorial";

type DetailProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return educationRecords.map((record) => ({ slug: record.slug }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getEducation(slug);
  if (!record) return { title: "教育记录未找到｜小闫" };
  const canonicalPath = `/education/${slug}`;
  return {
    title: `${record.title}｜教育经历｜小闫`,
    description: record.summary,
    alternates: { canonical: canonicalPath },
    robots: isNonPublicStatus(record.status) ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${record.title}｜教育经历`,
      description: record.summary,
      url: canonicalPath,
      images: [],
    },
    twitter: { card: "summary", title: `${record.title}｜教育经历`, description: record.summary, images: [] },
  };
}

export default async function EducationDetailPage({ params }: DetailProps) {
  const { slug } = await params;
  const record = getEducation(slug);
  if (!record) notFound();
  const index = educationRecords.findIndex((item) => item.slug === slug);
  const previous = educationRecords[index - 1];
  const next = educationRecords[index + 1];

  return (
    <main id="main-content" tabIndex={-1}>
      <article className="detail-shell detail-education">
        <header className="detail-shell-hero">
          <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "成长历程", href: "/journey" }, { label: "教育经历", href: "/education" }, { label: record.title }]} />
          <div className="detail-shell-heading">
            <div><p className="micro-label">{record.code} / {record.phase}</p><h1>{record.title}</h1><p>{record.summary}</p></div>
            <StatusBadge status={record.status} />
          </div>
        </header>

        <div className="detail-shell-body section-shell">
          <section aria-labelledby="education-facts-title">
            <div className="section-kicker"><p className="micro-label">01 / PROFILE</p><h2 id="education-facts-title">阶段信息</h2></div>
            <dl className="fact-list">
              <div><dt>培养层次</dt><dd>{record.level}</dd></div>
              <div><dt>学校</dt><dd>{record.institution}</dd></div>
              <div><dt>院系</dt><dd>{record.school}</dd></div>
              <div><dt>专业</dt><dd>{record.major}</dd></div>
              <div><dt>导师</dt><dd>{record.supervisor}</dd></div>
              <div><dt>时间</dt><dd>{record.period}</dd></div>
              <div><dt>地点</dt><dd>{record.location}</dd></div>
            </dl>
          </section>

          <section aria-labelledby="education-details-title">
            <div className="section-kicker"><p className="micro-label">02 / DETAILS</p><h2 id="education-details-title">学习与研究内容</h2></div>
            <ul className="editorial-list">{record.details.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="record-story-map" aria-labelledby="education-story-title">
            <div className="section-kicker"><p className="micro-label">03 / NARRATIVE</p><h2 id="education-story-title">阶段叙事将围绕三次连接展开</h2></div>
            <ol><li><span>01</span><h3>从课程到问题</h3><p>哪些知识真正进入了研究问题，而不只是出现在成绩单上。</p></li><li><span>02</span><h3>从跟随到独立</h3><p>如何逐步承担问题定义、实验、分析和表达。</p></li><li><span>03</span><h3>从阶段到下一步</h3><p>这一阶段的选择与困难怎样影响之后的研究方向。</p></li></ol>
          </section>

          <RequirementNotice id="education-detail-requirements-title" groups={globalContentRequirements.education} title="把硕士阶段写成完整教育记录，需要以下资料" />
        </div>

        <DetailNavigation
          back={{ title: "返回教育列表", href: "/education" }}
          previous={previous ? { title: previous.title, href: `/education/${previous.slug}` } : undefined}
          next={next ? { title: next.title, href: `/education/${next.slug}` } : undefined}
        />
      </article>
    </main>
  );
}
