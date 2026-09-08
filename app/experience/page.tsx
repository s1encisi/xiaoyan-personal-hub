/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import { PageHero } from "../_components/page-hero";
import { RequirementNotice } from "../_components/requirement-notice";
import { SectionHeading } from "../_components/section-heading";
import { StatusBadge } from "../_components/status-badge";
import { experienceRecords } from "../_data/content";
import { globalContentRequirements } from "../_data/editorial";
import { createFixedPageMetadata } from "../_data/metadata";

export const metadata = createFixedPageMetadata({ path: "/experience", title: "科研与实践｜小闫", description: "科研与实践档案框架；当前未核实的机构、角色与公开输出不作推断。" });

const experienceChain = [
  { title: "问题", description: "当时面对什么具体问题，为什么值得投入。" },
  { title: "职责", description: "在团队中负责什么，边界在哪里，与谁协作。" },
  { title: "行动", description: "采用哪些方法，做过哪些关键判断或迭代。" },
  { title: "结果", description: "交付了什么，怎样评价，哪里仍然失败或受限。" },
  { title: "变化", description: "这段经历如何改变之后的能力、方法或选择。" },
];

export default function ExperiencePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero code="J2" eyebrow="RESEARCH & PRACTICE" breadcrumbs={[{ label: "首页", href: "/" }, { label: "成长历程", href: "/journey" }, { label: "科研与实践" }]} title={<>一段经历是否重要，<br /><span>要看承担、判断与结果。</span></>} description="这里将按时间记录研究、项目与协作经历。当前只有硕士研究阶段和关注方向可确认，机构、团队、角色、任务与结果需要原始材料后再公开。" aside={<div className="timeline-glyph" aria-hidden="true"><i /><span /><span /><span /></div>} />

      <section className="experience-anatomy section-shell" aria-labelledby="experience-anatomy-title">
        <SectionHeading eyebrow="CASE LOGIC / 经历叙事" id="experience-anatomy-title" title="从“参加过”走向“我具体做了什么”" description={<p>每段经历都沿同一条链展开，避免只罗列机构和岗位，也避免把团队成果全部归到个人名下。</p>} />
        <ol className="evidence-chain experience-chain">{experienceChain.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
      </section>

      <section className="experience-timeline section-shell" aria-labelledby="experience-title">
        <SectionHeading eyebrow="TIMELINE / 经历时间轴" id="experience-title" title="当前科研与实践记录" description={<p>条目保留已确认的研究关注；需要资料的字段在详情页逐项展开。</p>} density="editorial" />
        <ol>{experienceRecords.map((item) => <li className="timeline-node" key={item.slug}><div className="timeline-phase"><span>{item.phase}</span><StatusBadge status={item.status} /></div><div className="timeline-glyph" aria-hidden="true"><i /></div><div className="timeline-copy"><small>{item.code} · {item.type}</small><h3><a href={`/experience/${item.slug}`}>{item.title}</a></h3><p>{item.summary}</p><small>{item.meta}</small><a className="text-link" href={`/experience/${item.slug}`}>查看经历详情 <span>→</span></a></div></li>)}</ol>
      </section>

      <RequirementNotice id="experience-requirements-title" groups={globalContentRequirements.experience} title="把科研与实践写成可验证案例，需要这些信息" intro="一份简历只能提供时间和机构；真正体现能力的材料是具体任务、关键判断、个人贡献、结果与失败复盘。" />

      <section className="section-actions section-shell" aria-label="相关历程"><div><p className="micro-label">RELATED JOURNEY</p><h2>把经历放回教育过程与完整成长路径</h2></div><div><a className="text-link" href="/education">教育经历 <span>→</span></a><a className="text-link" href="/journey">成长历程总览 <span>→</span></a></div></section>
    </main>
  );
}
