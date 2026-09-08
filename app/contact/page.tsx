import { PageHero } from "../_components/page-hero";
import { RequirementNotice } from "../_components/requirement-notice";
import { SectionHeading } from "../_components/section-heading";
import { globalContentRequirements } from "../_data/editorial";
import { createFixedPageMetadata } from "../_data/metadata";

export const metadata = createFixedPageMetadata({ path: "/contact", title: "联系与合作｜小闫", description: "交流方向与联系资料清单；真实联系方式待提供后公开。" });

const conversationPaths = [
  { code: "01", href: "/projects/copper-electrowinning-surrogate", title: "过程建模", description: "铜电积、有限数据代理模型、误差与外推边界。" },
  { code: "02", href: "/projects/electrolyte-purification-optimization", title: "优化决策", description: "电解液净化、多目标权衡、约束与方案选择。" },
  { code: "03", href: "/projects/safe-reinforcement-learning", title: "安全学习", description: "约束强化学习、风险评估、回退与部署门槛。" },
  { code: "04", href: "/projects/causal-explainable-industrial-ai", title: "可信智能", description: "模型审计、关联解释、因果边界与工业决策。" },
];

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero code="A2" eyebrow="CONTACT" breadcrumbs={[{ label: "首页", href: "/" }, { label: "关于", href: "/about" }, { label: "联系与合作" }]} title={<>从一个具体问题，<br /><span>开始一次有准备的交流。</span></>} description="当前尚未提供可公开邮箱或学术主页，因此页面不生成虚假联系方式。可以先从下列研究议题了解交流范围，再补充真实联系入口。" tone="dark" aside={<div className="contact-mark" aria-hidden="true"><span>Hi</span><small>OPEN TO CONVERSATION</small></div>} />

      <section className="contact-paths section-shell" aria-labelledby="contact-paths-title">
        <SectionHeading eyebrow="CONVERSATION PATHS / 交流方向" id="contact-paths-title" title="四个可以直接进入具体问题的入口" description={<p>每个入口都连接完整的研究专题，包含问题、关键选择、方法路线、评价底线和证据需求。</p>} />
        <div className="contact-path-list">{conversationPaths.map((item) => <a key={item.code} href={item.href}><span>{item.code}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><b>了解方向 ↗</b></a>)}</div>
      </section>

      <section className="contact-brief section-shell" aria-labelledby="contact-brief-title">
        <SectionHeading eyebrow="GOOD FIRST MESSAGE / 有效开场" id="contact-brief-title" title="一封高效的联系信息，可以先说明四件事" description={<p>不需要写得很长，具体问题与真实上下文比泛泛的“交流一下”更容易形成有效讨论。</p>} density="editorial" />
        <ol className="contact-brief-grid"><li><span>01</span><h3>问题</h3><p>希望讨论的对象、困难或判断是什么。</p></li><li><span>02</span><h3>背景</h3><p>当前场景、数据、约束与已经尝试的方法。</p></li><li><span>03</span><h3>目标</h3><p>期待得到一次讨论、方法建议还是具体协作。</p></li><li><span>04</span><h3>材料</h3><p>可以公开的链接、图表或一页说明。</p></li></ol>
      </section>

      <RequirementNotice id="contact-requirements-title" groups={globalContentRequirements.contact} title="让联系入口真正可用，需要这些信息" intro="至少提供一个可公开邮箱；GitHub、ORCID、Google Scholar、简历和合作偏好可以按公开范围逐项增加。" />

      <section className="section-actions section-shell" aria-label="继续浏览"><div><p className="micro-label">BEFORE CONTACT</p><h2>先了解研究问题与个人背景</h2></div><div><a className="primary-action" href="/research">进入研究中心 <span>→</span></a><a className="text-link" href="/about">阅读个人介绍</a></div></section>
    </main>
  );
}
