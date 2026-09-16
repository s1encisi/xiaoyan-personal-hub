import { PageHero } from "../_components/page-hero";
import { PortfolioSection, ProjectTiles, RecordLinks } from "../_components/portfolio";
import { projects } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/research", title: "研究与工程｜闫哲祯", description: "面向工业与环境过程，以预测建模、优化决策、可解释分析和研究软件连接数据与应用。" });
export default function ResearchPage() { return <main id="main-content" className="research-index" tabIndex={-1}>
  <PageHero code="02" eyebrow="INDUSTRIAL & ENVIRONMENTAL INTELLIGENCE" breadcrumbs={[{ label: "首页", href: "/" }, { label: "研究与工程" }]} title={<>让数据读懂过程，<br /><span>让模型支持选择。</span></>} description="我的研究从环境数据与工艺需求出发，发展预测、解释和优化方法，并将它们组织为能够使用的工程系统。" tone="dark" />
  <PortfolioSection id="research-line" code="RESEARCH THREAD" title="预测、优化与工程实现"><div className="pf-methods"><article><small>01 / UNDERSTAND</small><h3>从过程与数据建立预测</h3><p>针对铜电积浓度、电压与污水能耗，比较模型并分析不同工况与数据条件。</p></article><article><small>02 / DECIDE</small><h3>在多项目标中生成可行方案</h3><p>以分工况代理环境连接 NSGA-II 与 PPO-Lagrangian，处理目标偏好与工艺约束。</p></article><article><small>03 / EXPLAIN</small><h3>让变量响应可以被讨论</h3><p>使用 SHAP、PDP 和 ICE，把模型表现展开为特征贡献与工程语境中的响应关系。</p></article><article><small>04 / BUILD</small><h3>让研究工作能够接续</h3><p>通过 CuLab 工作台、数值工具和证据诊断连接运行、结果与使用者。</p></article></div></PortfolioSection>
  <PortfolioSection id="selected-work" code="SELECTED CASES" title="代表性工作"><ProjectTiles items={projects.filter(project => ["copper-electrowinning-surrogate", "electrolyte-purification-optimization", "culab-agent-workbench", "wastewater-energy-tabpfn"].includes(project.slug))} /><RecordLinks items={[{ label: "全部研究与项目", href: "/projects" }, { label: "技术能力", href: "/skills" }, { label: "论文与成果", href: "/publications" }]} /></PortfolioSection>
</main>; }
