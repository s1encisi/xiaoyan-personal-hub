import { PageHero } from "../_components/page-hero";
import { RequirementNotice } from "../_components/requirement-notice";
import { SectionHeading } from "../_components/section-heading";
import { StatusBadge } from "../_components/status-badge";
import { honorRecords } from "../_data/content";
import { globalContentRequirements } from "../_data/editorial";
import { createFixedPageMetadata } from "../_data/metadata";

export const metadata = createFixedPageMetadata({ path: "/honors", title: "竞赛与荣誉｜小闫", description: "小闫经过核实后公开的竞赛、奖项与荣誉记录。" });

const honorReading = [
  { title: "事实", description: "准确名称、等级、日期、主办或授予机构，以及参评范围。" },
  { title: "语境", description: "奖项对应什么项目、作品、课程或服务经历。" },
  { title: "贡献", description: "个人或团队参评、承担角色、关键工作与合作边界。" },
  { title: "证明", description: "证书、官方名单、作品或能够公开核查的页面。" },
];

export default function HonorsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero code="J3" eyebrow="HONORS & MILESTONES" breadcrumbs={[{ label: "首页", href: "/" }, { label: "成长历程", href: "/journey" }, { label: "竞赛与荣誉" }]} title={<>荣誉是一项结果，<br /><span>贡献和证明让它有意义。</span></>} description="当前尚未获得可公开且能够核实的荣誉材料，因此不生成奖项名称或等级。档案已经按学术科研、竞赛实践、成长服务三类建立完整入口。" tone="dark" aside={<div className="honor-seal" aria-hidden="true"><span>Y</span><small>VERIFIED<br />ONLY</small></div>} />

      <section className="honor-reading-guide section-shell" aria-labelledby="honor-reading-title">
        <SectionHeading eyebrow="READING GUIDE / 阅读方式" id="honor-reading-title" title="每项荣誉都需要四层信息" description={<p>这样既能避免证书墙式堆叠，也能让读者理解奖项背后的工作、能力与外部证据。</p>} />
        <ol className="stage-question-grid">{honorReading.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
      </section>

      <section className="honor-archive section-shell" aria-labelledby="honor-archive-title">
        <SectionHeading eyebrow="ARCHIVE / 分类档案" id="honor-archive-title" title="三类记录入口已经建立，事实材料尚待补充" description={<p>点击可查看每类记录的字段结构和所需证明；这些入口本身不代表已经获得对应荣誉。</p>} density="editorial" />
        <div className="honor-archive-list">{honorRecords.map((record) => <a key={record.slug} href={`/honors/${record.slug}`}><span>{record.code}</span><div><small>{record.category}</small><h3>{record.title}</h3><p>{record.description}</p></div><StatusBadge status={record.status} /></a>)}</div>
      </section>

      <RequirementNotice id="honors-requirements-title" groups={globalContentRequirements.honors} title="发布一项竞赛或荣誉记录，需要这些材料" intro="证书或官方名单用于核实事实；项目说明和个人贡献材料用于说明为什么获得、具体做了什么。两部分缺一不可。" />

      <section className="section-actions section-shell" aria-label="履历相关入口"><div><p className="micro-label">RELATED JOURNEY</p><h2>把外部认可放回真实成长路径</h2></div><a className="text-link" href="/journey">成长历程总览 <span>→</span></a></section>
    </main>
  );
}
