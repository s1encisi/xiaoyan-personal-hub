import { BendGallery } from "../../_components/effects/bend-gallery";
import { PageHero } from "../../_components/page-hero";
import { PortfolioSection, RecordLinks } from "../../_components/portfolio";
import { JournalHighlights, JournalYearNav } from "../../_components/journal";
import { journalEntries, journalPhotoCount, journalYears } from "../../_data/journal";
import { createFixedPageMetadata } from "../../_data/metadata";
import "./journal.css";

export const metadata = createFixedPageMetadata({ path: "/life/journal", title: "日常图文档案｜闫哲祯", description: "校园、旅行、音乐、游戏和城市日常。按年份翻阅照片与当时写下的片段。" });
export default function JournalPage() {
  const featured = ["2026-08-14-70","2026-08-01-68","2026-07-18-67","2026-06-15-60","2025-12-07-41","2024-11-16-09"].map(slug => journalEntries.find(entry => entry.slug===slug)).filter(entry=>entry!==undefined);
  return <main id="main-content" className="journal-page" tabIndex={-1}>
    <PageHero code="L / JOURNAL" eyebrow="A LIFE IN FRAGMENTS" breadcrumbs={[{label:"首页",href:"/"},{label:"生活",href:"/life"},{label:"日常图文档案"}]} title={<>日子很长，<br /><span>总有一些想留下的瞬间。</span></>} description="从校园和实习，到旅行、音乐和共同的兴趣。文字与图像，让一段经历保留当时的语气。" />
    <section className="section-shell journal-overview" aria-labelledby="journal-years"><div><p className="micro-label">BY YEAR</p><h2 id="journal-years">按年份翻阅</h2><p>{journalEntries.length} 则记录 · {journalPhotoCount} 幅图像 · {journalYears.at(-1)}—{journalYears[0]}</p></div><JournalYearNav /></section>
    <section className="section-shell" aria-labelledby="bend-title"><h2 id="bend-title">沿着照片，再走一段路</h2><BendGallery items={featured.filter(entry => entry.photos.length > 0).slice(0,4).map(entry => ({ image: entry.photos[0].src, title: entry.title, href: `/life/journal/${entry.year}#entry-${entry.slug}` }))} /></section>
    <PortfolioSection id="journal-scenes" code="PLACES & PEOPLE" title="一些想重新翻开的片段"><JournalHighlights entries={featured} /><RecordLinks items={[{label:"从最新一年开始",href:`/life/journal/${journalYears[0]}`},{label:"主题摄影故事",href:"/life/travel-walks"},{label:"演出与文化现场",href:"/life/culture-objects"}]} /></PortfolioSection>
  </main>;
}
