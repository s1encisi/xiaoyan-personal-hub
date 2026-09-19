import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "../../_components/page-hero";
import { DetailNavigation } from "../../_components/detail-navigation";
import { PortfolioSection, RecordLinks } from "../../_components/portfolio";
import { StatusBadge } from "../../_components/status-badge";
import { getPublication, publicationRecords } from "../../_data/content";
import { RecordReading } from "../../_components/record-reading";
import { publicationReading } from "../../_data/portfolio-reading";
import { ResearchFigure } from "../../_components/research-figure";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return publicationRecords.map(record => ({ slug: record.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const record = getPublication(slug); if (!record) return { title: "成果未找到｜闫哲祯" }; return { title: record.title + "｜闫哲祯", description: record.summary, alternates: { canonical: "/publications/" + slug }, openGraph: { title: record.title, description: record.summary, url: "/publications/" + slug, images: [] }, twitter: { card: "summary", title: record.title, description: record.summary, images: [] } }; }
export default async function PublicationDetailPage({ params }: Props) { const { slug } = await params; const record = getPublication(slug); if (!record) notFound(); const index = publicationRecords.findIndex(item => item.slug === slug);
  return <main id="main-content" className="publication-detail" tabIndex={-1}>
    <PageHero code={record.code} eyebrow={`${record.type} / ${record.year}`} breadcrumbs={[{ label: "首页", href: "/" }, { label: "论文与报告", href: "/publications" }, { label: record.type }]} title={record.title} description={record.summary} tone="dark" density="detail" meta={<section id="bibliography" className="publication-facts" aria-label="成果信息"><StatusBadge status={record.status} /><dl><div><dt>作者</dt><dd>{record.authors}</dd></div><div><dt>刊物 / 机构</dt><dd>{record.venue}</dd></div><div><dt>年份</dt><dd>{record.year}</dd></div>{record.doi && <div><dt>DOI</dt><dd><a href={`https://doi.org/${record.doi}`} target="_blank" rel="noopener noreferrer">{record.doi} ↗</a></dd></div>}</dl></section>} />
    <div className="reading-content section-shell">
    <PortfolioSection id="abstract" code="02 / RESEARCH" title="研究内容" density="chapter"><div className="pf-prose"><p>{record.abstract}</p></div></PortfolioSection>
    <ResearchFigure kind={slug === "publication-record-02" ? "esrl" : slug === "wastewater-energy-tabpfn" ? "tabpfn" : undefined} />
    <RecordReading prefix="publication-reading" sections={publicationReading[slug]} />
    <PortfolioSection id="contribution" code="03 / MY CONTRIBUTION" title="我承担的工作" density="chapter"><div className="pf-prose"><p>{record.contribution}</p></div><RecordLinks items={record.links} /></PortfolioSection>
    </div>
    <DetailNavigation back={{ title: "全部论文与报告", href: "/publications" }} previous={publicationRecords[index - 1] ? { title: publicationRecords[index - 1].title, href: "/publications/" + publicationRecords[index - 1].slug } : undefined} next={publicationRecords[index + 1] ? { title: publicationRecords[index + 1].title, href: "/publications/" + publicationRecords[index + 1].slug } : undefined} />
  </main>;
}
