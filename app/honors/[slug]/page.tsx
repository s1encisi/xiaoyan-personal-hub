import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { PageHero } from "../../_components/page-hero";
import { PortfolioSection, RecordLinks } from "../../_components/portfolio";
import { getHonor, honorRecords } from "../../_data/content";
const aliases: Record<string, string> = { "academic-research": "national-encouragement-2021", "competition-practice": "culture-sports-2021", "growth-service": "merit-student-2021" };
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return honorRecords.map(record => ({ slug: record.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const record = getHonor(aliases[slug] ?? slug); if (!record) return { title: "荣誉未找到｜闫哲祯" }; return { title: record.title + "｜闫哲祯", description: record.description, alternates: { canonical: "/honors/" + record.slug }, openGraph: { title: record.title, description: record.description, images: [] }, twitter: { card: "summary", title: record.title, description: record.description, images: [] } }; }
export default async function HonorDetailPage({ params }: Props) { const { slug } = await params; if (aliases[slug]) permanentRedirect("/honors/" + aliases[slug]); const record = getHonor(slug); if (!record) notFound(); return <main id="main-content" className="record-page honor-detail" tabIndex={-1}>
  <PageHero code={record.code} eyebrow={record.category} breadcrumbs={[{ label: "首页", href: "/" }, { label: "奖学金与荣誉", href: "/honors" }, { label: record.title }]} title={record.title} description={record.description} tone="dark" density="record" />
  <div className="record-content section-shell"><PortfolioSection density="chapter" id="honor-record" code="HONOR RECORD" title="荣誉信息"><dl className="pf-facts"><div><dt>授予学校</dt><dd>{record.issuer}</dd></div><div><dt>授予时间</dt><dd>{record.date}</dd></div><div><dt>级别</dt><dd>{record.level}</dd></div><div><dt>获奖类型</dt><dd>{record.role}</dd></div></dl><RecordLinks items={[{ label: "全部荣誉", href: "/honors" }, { label: "本科教育经历", href: "/education/undergraduate-stage" }, { label: "科研与实践", href: "/experience" }]} /></PortfolioSection>
</div></main>; }
