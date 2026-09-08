import { PageHero } from "../_components/page-hero";
import { RequirementNotice } from "../_components/requirement-notice";
import { SectionHeading } from "../_components/section-heading";
import { StatusBadge } from "../_components/status-badge";
import { educationRecords } from "../_data/content";
import { globalContentRequirements } from "../_data/editorial";
import { createFixedPageMetadata } from "../_data/metadata";

export const metadata = createFixedPageMetadata({ path: "/journey", title: "成长历程｜小闫", description: "教育、科研实践与荣誉的结构化履历入口；未核实信息明确列出所需材料。" });

const journeyDimensions = [
  { code: "J1", href: "/education", title: "教育经历", description: "学校、专业与培养环境提供坐标；课程、研究方向和关键选择解释能力从哪里形成。", action: "进入教育档案" },
  { code: "J2", href: "/experience", title: "科研与实践", description: "用机构、角色、任务、方法和交付物说明在真实协作中承担过什么。", action: "进入经历档案" },
  { code: "J3", href: "/honors", title: "竞赛与荣誉", description: "奖项本身只是结果，还要连接参评范围、个人贡献、作品与公开证明。", action: "进入荣誉档案" },
];

const capabilityThread = [
  { code: "01", title: "理解过程", description: "从铜电积、电解液净化等具体工业对象出发，先识别变量、边界和决策场景。" },
  { code: "02", title: "建立模型", description: "把过程问题转化为可验证的预测、代理建模或状态表达任务。" },
  { code: "03", title: "形成决策", description: "在多目标、约束与风险并存时比较方案，而不是只追逐单一指标。" },
  { code: "04", title: "审查结论", description: "通过可解释、因果边界、失败案例和复现记录约束结论强度。" },
];

export default function JourneyPortalPage() {
  const currentStage = educationRecords[0];
  const requirements = [...globalContentRequirements.education, ...globalContentRequirements.experience, ...globalContentRequirements.honors];

  return (
    <main id="main-content" tabIndex={-1}>
      <PageHero code="04" eyebrow="JOURNEY" breadcrumbs={[{ label: "首页", href: "/" }, { label: "成长历程" }]} title={<>一段经历的价值，<br /><span>在于它如何改变能力与选择。</span></>} description="目前能够确认的身份是硕士研究生，研究关注工业过程建模、优化与可信智能。学校、团队、时间、职责和荣誉等个人履历尚需资料，因此这里先公开真实边界和完整记录框架。" aside={<div className="timeline-glyph" aria-hidden="true"><i /><span /><span /><span /></div>} />

      <section className="journey-current section-shell" aria-labelledby="journey-current-title">
        <SectionHeading eyebrow="CURRENT POSITION / 当前坐标" id="journey-current-title" title="硕士研究阶段，是现阶段唯一能够确认的履历节点" description={<p>下面的研究方向来自已确认背景；学校、学院、导师、起止时间和阶段成果未获得材料，不在页面中推断。</p>} density="editorial" />
        <a className="journey-current-record" href={`/education/${currentStage.slug}`}>
          <span>{currentStage.code}</span>
          <div><small>{currentStage.level} · {currentStage.period}</small><h3>{currentStage.title}</h3><p>{currentStage.summary}</p><div className="focus-cloud"><span>铜电积</span><span>电解液净化</span><span>代理模型</span><span>多目标优化</span><span>安全强化学习</span><span>可信工业智能</span></div></div>
          <StatusBadge status={currentStage.status} />
          <b>查看阶段详情 →</b>
        </a>
      </section>

      <section className="journey-capability-thread section-shell" aria-labelledby="journey-thread-title">
        <SectionHeading eyebrow="METHOD THREAD / 方法主线" id="journey-thread-title" title="当前研究问题可以沿一条连贯的方法路径展开" description={<p>这不是履历时间线，也不单凭研究兴趣证明个人能力；它说明这些研究问题通常如何从理解过程走向建立模型、支持决策与审查结论。</p>} />
        <ol>{capabilityThread.map((item) => <li key={item.code}><span>{item.code}</span><h3>{item.title}</h3><p>{item.description}</p></li>)}</ol>
      </section>

      <section className="journey-paths section-shell" aria-labelledby="journey-portals-title">
        <SectionHeading eyebrow="PATHS / 历程导航" id="journey-portals-title" title="从三个维度理解一段成长" description={<p>教育回答从哪里出发，经历回答承担过什么，荣誉回答哪些结果获得了外部认可。三者需要互相印证。</p>} />
        <div className="journey-path-list">
          {journeyDimensions.map((item) => <a key={item.code} href={item.href}><span>{item.code}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><b>{item.action} ↗</b></a>)}
        </div>
      </section>

      <RequirementNotice id="journey-requirements-title" groups={requirements} title="把成长路径变成真实时间线，需要这些材料" intro="优先提供简历或一份按时间排列的经历说明，再为最重要的一到两段经历补充个人选择、具体工作、结果与证明。" />
    </main>
  );
}
