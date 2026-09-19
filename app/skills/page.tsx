import { PageHero } from "../_components/page-hero";
import { PortfolioSection } from "../_components/portfolio";
import { skills, projects } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/skills", title: "技术能力｜闫哲祯", description: "通过真实项目了解闫哲祯的数据建模、优化、强化学习、解释分析、Agent 工程和空间研究能力。" });
export default function SkillsPage() { return <main id="main-content" className="skills-index" tabIndex={-1}>
  <PageHero code="R2" eyebrow="CAPABILITIES IN PRACTICE" breadcrumbs={[{ label: "首页", href: "/" }, { label: "研究", href: "/research" }, { label: "技术能力" }]} title={<>用得起来的技术，<br /><span>连得起来的能力。</span></>} description="以机器学习、强化学习和智能体工程为主线：训练预测器、比较策略与优化方案，组织工具、工作流与可追溯的软件系统。" tone="dark" />
  <PortfolioSection id="ai-learning-practice" code="MODELS & TOOLS" title="大模型知识与开发实践"><div className="pf-prose"><p>熟练使用 Coze 进行智能体搭建，使用 Codex、Claude Code、OpenCode、Hermes 等工具完成开发协作与项目迭代。关注需求表达、上下文组织、工具调用、调试和结果验证。</p><p>持续关注大模型与智能体的发展，学习预训练、后训练、模型微调与 RLHF，理解不同阶段在模型能力形成与对齐中的作用。</p></div></PortfolioSection>
  <PortfolioSection id="capability-map" code="SKILLS / PROJECTS" title="六个方向，一条从问题到交付的路径"><div className="capability-matrix"><div className="capability-matrix__labels" aria-hidden="true"><span>方法与能力</span><span>在这些工作中使用</span></div>{skills.map(skill => <article key={skill.slug}><div><small>{skill.index} / {skill.englishTitle}</small><h3><a href={"/skills/" + skill.slug}>{skill.title}</a></h3><p>{skill.summary}</p><a className="capability-detail-link" href={"/skills/" + skill.slug}>查看方法与项目 <span aria-hidden="true">↗</span></a></div><ul>{projects.filter(project => skill.relatedProjects.includes(project.slug)).map(project => <li key={project.slug}><a href={"/projects/" + project.slug}><span>{project.title}</span><span aria-hidden="true">↗</span></a></li>)}</ul></article>)}</div></PortfolioSection>
</main>; }
