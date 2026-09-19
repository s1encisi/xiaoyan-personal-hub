import { PageHero } from "../../_components/page-hero";
import { PortfolioSection, ProjectTiles, RecordLinks } from "../../_components/portfolio";
import { projects } from "../../_data/content";
import { createFixedPageMetadata } from "../../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/outputs/project-results", title: "项目成果｜闫哲祯", description: "机器学习预测器、ESRL-CMO 优化框架、CuLab 工作台及空间生态分析成果。" });
export default function ProjectResultsPage() { return <main id="main-content" className="results-index" tabIndex={-1}>
  <PageHero code="O2" eyebrow="MODELS · METHODS · SOFTWARE" breadcrumbs={[{ label: "首页", href: "/" }, { label: "成果", href: "/outputs" }, { label: "项目成果" }]} title={<>把方法，<br /><span>做成能接续使用的工作。</span></>} description="从模型与实验结果，到软件接口、运行记录和学术表达，研究交付覆盖分析、优化与工程协同。" tone="dark" />
  <PortfolioSection id="deliverables" code="01 / DELIVERABLES" title="四类交付，连接研究与应用"><div className="pf-methods"><article><small>01</small><h3>预测器与模型比较</h3><p>铜电积电压、出液浓度与污水能耗预测，配套算法对照、解释分析和数据条件实验。</p></article><article><small>02</small><h3>优化框架与候选方案</h3><p>以 ESRL-CMO 连接分工况代理模型、偏好条件策略、Pareto 方案和工艺约束。</p></article><article><small>03</small><h3>研究软件与诊断工具</h3><p>CuLab 将训练、预测、优化、选择与证据诊断组织为前后端协同的工作台。</p></article><article><small>04</small><h3>论文、图表与报告</h3><p>形成第一作者论文、学术海报、毕业论文和空间分析图，将工作转化为可阅读的研究表达。</p></article></div></PortfolioSection>
  <PortfolioSection id="result-cases" code="02 / CASES" title="进入成果对应的项目"><ProjectTiles variant="rows" items={projects.filter(project => ["copper-electrowinning-surrogate", "electrolyte-purification-optimization", "culab-agent-workbench", "wastewater-energy-tabpfn", "urban-rural-ecological-footprint"].includes(project.slug))} /><RecordLinks items={[{ label: "论文与报告", href: "/publications" }, { label: "联系交流", href: "/contact" }]} /></PortfolioSection>
</main>; }
