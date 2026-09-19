import { CommerceEvidence } from "../../_components/commerce-evidence";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "../../_components/page-hero";
import { DetailNavigation } from "../../_components/detail-navigation";
import { PortfolioSection, RecordLinks } from "../../_components/portfolio";
import { getProject, projects, skills, publicationRecords } from "../../_data/content";
import { PageContents } from "../../_components/page-contents";
import { RecordReading } from "../../_components/record-reading";
import { projectReading } from "../../_data/portfolio-reading";
import { ResearchFigure } from "../../_components/research-figure";

const caseContents = [{ id: "question", label: "问题与事实" }, { id: "route", label: "方法与工作" }, { id: "project-reading", label: "展开阅读" }, { id: "evidence", label: "结果与交付" }, { id: "related", label: "关联阅读" }];
type DetailProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { slug } = await params; const project = getProject(slug);
  if (!project) return { title: "项目未找到｜闫哲祯" };
  return { title: project.title + "｜闫哲祯", description: project.summary, alternates: { canonical: "/projects/" + slug }, openGraph: { title: project.title, description: project.summary, url: "/projects/" + slug, images: [] }, twitter: { card: "summary", title: project.title, description: project.summary, images: [] } };
}
export default async function ProjectDetailPage({ params }: DetailProps) {
  const { slug } = await params; const project = getProject(slug); if (!project) notFound();
  const index = projects.findIndex(item => item.slug === slug);
  const related = skills.filter(skill => project.relatedSkills.includes(skill.slug));
  const publications = publicationRecords.filter(record => record.links.some(link => link.href === "/projects/" + slug));
  const density = "chapter";
  return <main id="main-content" className="case-detail" tabIndex={-1}>
    <PageHero code={"R" + project.index} eyebrow={project.englishTitle} breadcrumbs={[{ label: "首页", href: "/" }, { label: "研究与项目", href: "/projects" }, { label: project.title }]} title={project.title} description={project.summary} tone="dark" density="detail" />
    <div className="case-layout section-shell">
    <PageContents items={caseContents} />
    <div className="case-body">
    <PortfolioSection id="question" code="01 / PROJECT" title={project.question} density={density}><dl className="pf-facts">{project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl></PortfolioSection>
    <PortfolioSection id="route" code="02 / APPROACH" title="方法与工作内容" density={density}><div className="pf-methods">{project.route.map(step => <article key={step.step}><small>{step.step}</small><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></PortfolioSection>
    <ResearchFigure kind={["electrolyte-purification-optimization","safe-reinforcement-learning"].includes(slug) ? "esrl" : slug === "wastewater-energy-tabpfn" ? "tabpfn" : undefined} />
    {slug === "reliable-commerce-agents" && <CommerceEvidence />}
    <RecordReading prefix="project-reading" sections={projectReading[slug]} />
    <PortfolioSection id="evidence" code="03 / RESULTS" title="结果与交付" density={density}><ol className="pf-result-list">{project.evaluation.map(result => <li key={result}>{result}</li>)}</ol>{project.boundaries.map(text => <p className="pf-status-note" key={text}>{text}</p>)}</PortfolioSection>
    <PortfolioSection id="related" code="04 / CONTINUE" title="沿着这个项目继续阅读" density={density}><RecordLinks items={[...publications.map(record => ({ label: record.title, href: "/publications/" + record.slug })), ...related.map(skill => ({ label: skill.title, href: "/skills/" + skill.slug })), { label: "联系交流", href: "/contact" }]} /></PortfolioSection>
    </div></div>
    <DetailNavigation back={{ title: "全部研究与项目", href: "/projects" }} previous={projects[index - 1] ? { title: projects[index - 1].title, href: "/projects/" + projects[index - 1].slug } : undefined} next={projects[index + 1] ? { title: projects[index + 1].title, href: "/projects/" + projects[index + 1].slug } : undefined} />
  </main>;
}
