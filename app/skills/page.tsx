import { PageHero } from "../_components/page-hero";
import { createFixedPageMetadata } from "../_data/metadata";
import { skills } from "../_data/content";

export const metadata = createFixedPageMetadata({
  path: "/skills",
  title: "技术能力｜小闫",
  description: "从问题定义、数据审查、建模优化到安全评估和结果解释的研究能力体系。",
});

export default function SkillsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero
        code="R2"
        eyebrow="CAPABILITIES"
        breadcrumbs={[{ label: "首页", href: "/" }, { label: "研究中心", href: "/research" }, { label: "技术能力" }]}
        title={<>技术能力不是清单，<br /><span>而是一条研究链路。</span></>}
        description="我关注如何界定问题、审查数据、建立模型、开展优化、评估风险，并把结果解释清楚。以下描述研究方向，不使用未经证实的熟练度百分比。"
        aside={<div className="capability-axis" aria-hidden="true"><span>问题</span><i /><span>模型</span><i /><span>决策</span></div>}
      />

      <section className="capability-map section-shell" aria-labelledby="capability-map-title">
        <div className="section-kicker split-kicker">
          <div><p className="micro-label">CAPABILITY MAP / 能力地图</p><h2 id="capability-map-title">四个方向，一条闭环</h2></div>
          <p>从真实工业过程出发，经由建模与优化，最终回到风险、解释和决策责任。</p>
        </div>
        <div className="capability-matrix">
          {skills.map((skill) => (
            <a key={skill.slug} className="capability-cell" href={`/skills/${skill.slug}`}>
              <span>{skill.index}</span>
              <small>{skill.englishTitle}</small>
              <h3>{skill.title}</h3>
              <p>{skill.summary}</p>
              <b aria-hidden="true">探索方向 ↗</b>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
