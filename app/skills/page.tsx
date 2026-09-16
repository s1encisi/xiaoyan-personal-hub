import { PageHero } from "../_components/page-hero";
import { PortfolioSection } from "../_components/portfolio";
import { skills, projects } from "../_data/content";
import { createFixedPageMetadata } from "../_data/metadata";
export const metadata = createFixedPageMetadata({ path: "/skills", title: "技术能力｜闫哲祯", description: "通过真实项目了解闫哲祯的数据建模、优化、强化学习、解释分析、Agent 工程和空间研究能力。" });
export default function SkillsPage() { return <main id="main-content" className="skills-index" tabIndex={-1}>
  <PageHero code="R2" eyebrow="CAPABILITIES IN PRACTICE" breadcrumbs={[{ label: "首页", href: "/" }, { label: "研究", href: "/research" }, { label: "技术能力" }]} title={<>用得起来的技术，<br /><span>连得起来的能力。</span></>} description="我的能力形成于具体问题：处理工业数据，训练预测器，比较优化方案，开发可追溯的工作台，也分析区域生态与遥感信息。" tone="dark" />
  <PortfolioSection id="capability-map" code="SKILLS / PROJECTS" title="六个方向，一条从问题到交付的路径"><div className="capability-matrix"><div className="capability-matrix__labels" aria-hidden="true"><span>方法与能力</span><span>在这些工作中使用</span></div>{skills.map(skill => <article key={skill.slug}><div><small>{skill.index} / {skill.englishTitle}</small><h3><a href={"/skills/" + skill.slug}>{skill.title}</a></h3><p>{skill.summary}</p><a className="capability-detail-link" href={"/skills/" + skill.slug}>查看方法与项目 <span aria-hidden="true">↗</span></a></div><ul>{projects.filter(project => skill.relatedProjects.includes(project.slug)).map(project => <li key={project.slug}><a href={"/projects/" + project.slug}><span>{project.title}</span><span aria-hidden="true">↗</span></a></li>)}</ul></article>)}</div></PortfolioSection>
</main>; }
