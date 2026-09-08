/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import { PageHero } from "../_components/page-hero";
import { RequirementNotice } from "../_components/requirement-notice";
import { SectionHeading } from "../_components/section-heading";
import { StatusBadge } from "../_components/status-badge";
import { educationRecords } from "../_data/content";
import { globalContentRequirements } from "../_data/editorial";
import { createFixedPageMetadata } from "../_data/metadata";

export const metadata = createFixedPageMetadata({ path: "/education", title: "教育经历｜小闫", description: "教育经历档案框架；当前只确认硕士研究生身份与研究关注。" });

const stageQuestions = [
  { title: "坐标", description: "学校、院系、专业、学位与时间回答“在哪里、以什么身份学习”。" },
  { title: "选择", description: "为什么进入这一方向，哪些课程、老师或问题改变了研究兴趣。" },
  { title: "能力", description: "这一阶段真正学会了什么，怎样从课程知识走向独立研究。" },
  { title: "产出", description: "论文、项目、报告、竞赛或服务如何证明阶段性成长。" },
];

export default function EducationPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero code="J1" eyebrow="EDUCATION" breadcrumbs={[{ label: "首页", href: "/" }, { label: "成长历程", href: "/journey" }, { label: "教育经历" }]} title={<>教育不只是一所学校，<br /><span>更是一组逐渐形成的问题。</span></>} description="当前只确认硕士研究生身份与研究关注方向。教育档案最终会连接培养环境、关键选择、能力变化和阶段产出，而不是只展示学校名称。" aside={<div className="timeline-glyph" aria-hidden="true"><i /><span /><span /><span /></div>} />

      <section className="education-anatomy section-shell" aria-labelledby="education-anatomy-title">
        <SectionHeading eyebrow="STAGE ANATOMY / 阶段结构" id="education-anatomy-title" title="一段教育经历需要回答四类问题" description={<p>事实信息帮助定位，选择与能力变化才让读者理解这段经历为何重要。</p>} />
        <ol className="stage-question-grid">{stageQuestions.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
      </section>

      <section className="portal-timeline section-shell" aria-labelledby="education-title">
        <SectionHeading eyebrow="EDUCATION TIMELINE" id="education-title" title="当前教育记录" description={<p>当前条目只保留已经确认的培养层次和研究关注，详情页会逐项标明尚缺资料。</p>} density="editorial" />
        <ol>{educationRecords.map((record) => <li key={record.slug}><a href={`/education/${record.slug}`}><span>{record.code}</span><div><small>{record.period} · {record.level}</small><strong>{record.title}</strong><p>{record.summary}</p></div><StatusBadge status={record.status} /></a></li>)}</ol>
      </section>

      <RequirementNotice id="education-requirements-title" groups={globalContentRequirements.education} title="完善教育经历，需要这些信息" intro="简历可以解决学校、专业与时间；为了让页面真正体现成长，还需要一段关于研究选择、能力变化和阶段产出的第一人称说明。" />

      <section className="section-actions section-shell" aria-label="相关历程"><div><p className="micro-label">RELATED JOURNEY</p><h2>教育提供起点，科研与实践呈现能力如何被使用</h2></div><a className="text-link" href="/experience">继续查看科研与实践 <span>→</span></a></section>
    </main>
  );
}
