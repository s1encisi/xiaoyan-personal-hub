import { PageHero } from "../_components/page-hero";
import { PortfolioSection, ProjectTiles, RecordLinks } from "../_components/portfolio";
import { projects } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/research", title: "研究与工程｜闫哲祯", description: "机器学习、强化学习、可解释建模与智能体工程：从方法研究到可运行系统。" });
export default function ResearchPage() { return <main id="main-content" className="research-index" tabIndex={-1}>
  <PageHero code="02" eyebrow="MACHINE LEARNING / REINFORCEMENT LEARNING / AGENTS" breadcrumbs={[{ label: "首页", href: "/" }, { label: "研究与工程" }]} title={<>让模型读懂数据，<br /><span>让智能走向行动。</span></>} description="我关注机器学习如何理解数据、强化学习如何生成决策，以及智能体如何可靠地完成任务。工业、环境与电商是这些方法的实际应用场景。" tone="dark" />
  <PortfolioSection id="research-line" code="RESEARCH THREAD" title="预测、优化与工程实现"><div className="pf-methods"><article><small>01 / UNDERSTAND</small><h3>从过程与数据建立预测</h3><p>围绕表格学习、样本规模和解释分析比较模型，研究它们在不同数据条件下的表现。</p></article><article><small>02 / DECIDE</small><h3>在多项目标中生成可行方案</h3><p>以分工况代理环境连接 NSGA-II 与 PPO-Lagrangian，处理目标偏好与工艺约束。</p></article><article><small>03 / EXPLAIN</small><h3>让变量响应可以被讨论</h3><p>使用 SHAP、PDP 和 ICE，把模型表现展开为特征贡献与工程语境中的响应关系。</p></article><article><small>04 / BUILD</small><h3>让智能体可靠执行任务</h3><p>通过电商售后可靠性升级与 CuLab 工作台，连接工具、审批、执行、结果核实与使用者。</p></article></div></PortfolioSection>
  <PortfolioSection id="selected-work" code="SELECTED CASES" title="代表性工作"><ProjectTiles items={projects.filter(project => ["reliable-commerce-agents", "safe-reinforcement-learning", "culab-agent-workbench", "wastewater-energy-tabpfn"].includes(project.slug))} /><RecordLinks items={[{ label: "全部研究与项目", href: "/projects" }, { label: "技术能力", href: "/skills" }, { label: "论文与成果", href: "/publications" }]} /></PortfolioSection>
</main>; }
