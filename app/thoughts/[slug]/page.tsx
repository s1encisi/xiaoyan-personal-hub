import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "../../_components/page-hero";
import { PortfolioSection, RecordLinks } from "../../_components/portfolio";
import { getReflection, reflections } from "../../_data/content";
import { RecordReading } from "../../_components/record-reading";
import { reflectionReading } from "../../_data/portfolio-reading";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return reflections.map(record => ({ slug: record.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const record = getReflection(slug); if (!record) return { title: "随想未找到｜闫哲祯" }; return { title: record.title + "｜随想｜闫哲祯", description: record.summary, alternates: { canonical: "/thoughts/" + slug }, openGraph: { title: record.title, description: record.summary, images: [] }, twitter: { card: "summary", title: record.title, description: record.summary, images: [] } }; }
export default async function ThoughtPage({ params }: Props) { const { slug } = await params; const record = getReflection(slug); if (!record) notFound(); return <main id="main-content" className="reading-page thought-detail" tabIndex={-1}><PageHero code="I2" eyebrow={record.topic} breadcrumbs={[{ label: "首页", href: "/" }, { label: "随想", href: "/thoughts" }, { label: record.title }]} title={record.title} description={record.summary} density="detail" /><div className="reading-content section-shell"><PortfolioSection density="chapter" id="essay" code="PERSONAL ESSAY / 2026.09" title={record.topic}><div className="pf-prose">{record.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></PortfolioSection><RecordReading prefix="thought-reading" sections={reflectionReading[slug]} /><RecordLinks items={[{ label: "全部随想", href: "/thoughts" }, { label: "个人介绍", href: "/about/profile" }, { label: "生活记录", href: "/life" }]} /></div></main>; }
