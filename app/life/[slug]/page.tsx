import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { PageHero } from "../../_components/page-hero";
import { PortfolioSection, RecordLinks } from "../../_components/portfolio";
import { getLifeCategory, lifeCategories } from "../../_data/content";
import { FieldNoteIndex, FieldNoteStory } from "../../_components/field-notes";
import { fieldNotes } from "../../_data/field-notes";
import { RecordReading } from "../../_components/record-reading";
import { lifeReading } from "../../_data/portfolio-reading";
const aliases: Record<string, string> = { "local-flavors": "culture-objects", "coffee-tea": "reading-notes" };
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return lifeCategories.map(record => ({ slug: record.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const record = getLifeCategory(aliases[slug] ?? slug); if (!record) return { title: "生活记录未找到｜闫哲祯" }; return { title: record.title + "｜生活记录｜闫哲祯", description: record.intro, alternates: { canonical: "/life/" + record.slug }, openGraph: { title: record.title, description: record.intro, images: [] }, twitter: { card: "summary", title: record.title, description: record.intro, images: [] } }; }
export default async function LifeDetailPage({ params }: Props) { const { slug } = await params; if (aliases[slug]) permanentRedirect("/life/" + aliases[slug]); const record = getLifeCategory(slug); if (!record) notFound(); const notes = fieldNotes.filter(note => note.category === slug); return <main id="main-content" className={notes.length ? "photo-story-page" : "reading-page life-reading-page"} tabIndex={-1}>
  <PageHero code="L" eyebrow={record.code + " / LIFE"} breadcrumbs={[{ label: "首页", href: "/" }, { label: "生活", href: "/life" }, { label: record.title }]} title={record.title} description={record.intro} density="detail" />
  {notes.length > 0 && <PortfolioSection id="photo-journal" code="PLACES & MOMENTS" title={slug === "travel-walks" ? "走过的地方，留下的画面" : "把喜欢，带到现场"} intro="照片与文字来自我的日常记录。这里按主题重新整理，留住每次出发和相遇的细节。"><FieldNoteIndex notes={notes} />{notes.map(note => <FieldNoteStory key={note.slug} note={note} />)}</PortfolioSection>}
  <div className="reading-content section-shell">{record.sections.map((section, i) => <PortfolioSection key={section.title} id={"life-story-" + i} code={"0" + (i + 1)} title={section.title} density="chapter"><div className="pf-prose">{section.items.map(item => <p key={item}>{item}</p>)}</div></PortfolioSection>)}
  <RecordReading prefix="life-reading" sections={lifeReading[slug]} />
  <PortfolioSection id="continue" code="CONTINUE READING" title="从这里继续" density="chapter"><RecordLinks items={[...(record.relatedLinks ?? []).map(item => ({ label: item.title, href: item.href })), { label: "完整日常图文档案", href: "/life/journal" }, { label: "全部生活记录", href: "/life" }]} /></PortfolioSection></div>
</main>; }
