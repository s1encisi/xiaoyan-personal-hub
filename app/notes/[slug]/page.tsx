import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "../../_components/page-hero";
import { PortfolioSection, RecordLinks } from "../../_components/portfolio";
import { getKnowledge, knowledge } from "../../_data/content";
import { PageContents } from "../../_components/page-contents";
import { RecordReading } from "../../_components/record-reading";
import { knowledgeReading } from "../../_data/portfolio-reading";
type Props = { params: Promise<{ slug: string }> };
const related: Record<string, { label: string; href: string }[]> = { "research-methods": [{ label: "省域生态足迹研究", href: "/projects/urban-rural-ecological-footprint" }, { label: "污水能耗预测", href: "/projects/wastewater-energy-tabpfn" }], "modeling-optimization": [{ label: "铜电积多目标优化", href: "/projects/electrolyte-purification-optimization" }, { label: "安全强化学习方法", href: "/projects/safe-reinforcement-learning" }], "academic-writing": [{ label: "论文与报告", href: "/publications" }], "reproducibility": [{ label: "CuLab 工作台", href: "/projects/culab-agent-workbench" }] };
export function generateStaticParams() { return knowledge.map(record => ({ slug: record.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const record = getKnowledge(slug); if (!record) return { title: "笔记未找到｜闫哲祯" }; return { title: record.title + "｜方法笔记｜闫哲祯", description: record.intro, alternates: { canonical: "/notes/" + slug }, openGraph: { title: record.title, description: record.intro, images: [] }, twitter: { card: "summary", title: record.title, description: record.intro, images: [] } }; }
export default async function NotePage({ params }: Props) { const { slug } = await params; const record = getKnowledge(slug); if (!record) notFound(); return <main id="main-content" className="method-notes-page" tabIndex={-1}>
  <PageHero code={record.code} eyebrow="METHOD NOTES" breadcrumbs={[{ label: "首页", href: "/" }, { label: "知识库", href: "/notes" }, { label: record.title }]} title={record.title} description={record.intro} tone="dark" density="detail" />
  <div className="case-layout section-shell"><PageContents items={[...record.sections.map((section, i) => ({ id: "note-section-" + i, label: section.title })), { id: "related", label: "回到项目" }]} /><div className="case-body reading-column">
  {record.sections.map((section, i) => <PortfolioSection key={section.title} id={"note-section-" + i} code={"0" + (i + 1)} title={section.title} density="chapter"><div className="pf-prose">{section.items.map(item => <p key={item}>{item}</p>)}</div></PortfolioSection>)}
  <RecordReading prefix="note-reading" sections={knowledgeReading[slug]} />
  <PortfolioSection id="related" code="RELATED WORK" title="回到具体项目" density="chapter"><RecordLinks items={[...(related[slug] ?? []), { label: "全部方法笔记与知识库", href: "/notes" }]} /></PortfolioSection>
  </div></div>
</main>; }
