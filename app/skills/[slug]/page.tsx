import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "../../_components/page-hero";
import { DetailNavigation } from "../../_components/detail-navigation";
import { PortfolioSection, ProjectTiles } from "../../_components/portfolio";
import { getSkill, projects, skills } from "../../_data/content";
import { PageContents } from "../../_components/page-contents";
import { RecordReading } from "../../_components/record-reading";
import { skillReading } from "../../_data/portfolio-reading";

const methodContents = [{ id: "practice", label: "方法与适用范围" }, { id: "working-method", label: "如何使用" }, { id: "projects", label: "对应项目" }];
type DetailProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return skills.map(skill => ({ slug: skill.slug })); }
export async function generateMetadata({ params }: DetailProps): Promise<Metadata> { const { slug } = await params; const skill = getSkill(slug); if (!skill) return { title: "技术方向未找到｜闫哲祯" }; return { title: skill.title + "｜闫哲祯", description: skill.summary, alternates: { canonical: "/skills/" + slug }, openGraph: { title: skill.title, description: skill.summary, url: "/skills/" + slug, images: [] }, twitter: { card: "summary", title: skill.title, description: skill.summary, images: [] } }; }
export default async function SkillDetailPage({ params }: DetailProps) {
  const { slug } = await params; const skill = getSkill(slug); if (!skill) notFound(); const index = skills.findIndex(item => item.slug === slug);
  return <main id="main-content" className="case-detail method-detail" tabIndex={-1}>
    <PageHero code={skill.index} eyebrow={skill.englishTitle} breadcrumbs={[{ label: "首页", href: "/" }, { label: "技术能力", href: "/skills" }, { label: skill.title }]} title={skill.title} description={skill.summary} tone="dark" density="detail" />
    <div className="case-layout section-shell"><PageContents items={methodContents} /><div className="case-body">
    <PortfolioSection id="practice" code="01 / IN PRACTICE" title={skill.principle} density="chapter"><div className="pf-methods">{skill.layers.map((layer, i) => <article key={layer.title}><small>0{i + 1}</small><h3>{layer.title}</h3><p>{layer.description}</p></article>)}</div></PortfolioSection>
    <PortfolioSection id="working-method" code="02 / WORKING METHOD" title="我如何使用这些方法" density="chapter"><ol className="pf-result-list">{skill.checks.map(item => <li key={item}>{item}</li>)}</ol></PortfolioSection>
    <RecordReading prefix="skill-reading" sections={skillReading[slug]} />
    <PortfolioSection id="projects" code="03 / RELATED WORK" title="对应的项目实践" density="chapter"><ProjectTiles items={projects.filter(project => skill.relatedProjects.includes(project.slug))} variant="rows" /></PortfolioSection>
    </div></div>
    <DetailNavigation back={{ title: "全部技术能力", href: "/skills" }} previous={skills[index - 1] ? { title: skills[index - 1].title, href: "/skills/" + skills[index - 1].slug } : undefined} next={skills[index + 1] ? { title: skills[index + 1].title, href: "/skills/" + skills[index + 1].slug } : undefined} />
  </main>;
}
