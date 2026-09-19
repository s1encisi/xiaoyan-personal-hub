/* eslint-disable @next/next/no-img-element -- Reviewed local photographs and image records. */
import { ArrowUpRight } from "lucide-react";
import { journalEntries, journalEntryHref, journalYears, type JournalEntry } from "../_data/journal";

export function JournalYearNav({ current }: { current?: string }) {
  return <nav className="journal-year-nav" aria-label="日常记录年份">{journalYears.map(year => <a href={`/life/journal/${year}`} key={year} aria-current={year === current ? "page" : undefined}>{year}<span>{journalEntries.filter(entry => entry.year === year).length} 则</span></a>)}</nav>;
}

export function JournalStory({ entry }: { entry: JournalEntry }) {
  const id = `entry-${entry.slug}`;
  const length = entry.paragraphs.join("").length;
  const body = <div className="journal-prose">{entry.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>;
  return <article className="journal-story" id={id} aria-labelledby={`${id}-title`}>
    <header className="journal-story__header"><p><time dateTime={entry.date}>记于 {entry.date.replaceAll("-", ".")}</time><span>{entry.categoryLabel}</span>{entry.place && <span>{entry.place}</span>}</p><h2 id={`${id}-title`}>{entry.title}</h2></header>
    {length > 650 ? <><p className="journal-excerpt">{entry.paragraphs[0].slice(0,180)}…</p><details className="journal-full-text"><summary>展开完整记录</summary>{body}</details></> : body}
    {entry.photos.length > 0 && <div className="journal-gallery" data-count={entry.photos.length}>{entry.photos.map((photo,index) => <figure key={photo.src}><a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`${photo.alt}，打开大图（新标签页）`}><img src={photo.small} srcSet={photo.width > photo.smallWidth ? `${photo.small} ${photo.smallWidth}w, ${photo.src} ${photo.width}w` : undefined} sizes="(max-width: 480px) 44vw, (max-width: 900px) 40vw, 26vw" width={photo.width} height={photo.height} alt={photo.alt} loading="lazy" decoding="async" /><span aria-hidden="true">{String(index+1).padStart(2,"0")} <ArrowUpRight size={15} /></span></a></figure>)}</div>}
    <footer className="journal-story__footer">{entry.relatedHref && <a href={entry.relatedHref}>继续阅读相关内容 ↗</a>}<a href="#year-directory">回到这一年的目录 ↑</a></footer>
  </article>;
}

export function JournalHighlights({ entries }: { entries: JournalEntry[] }) {
  return <div className="journal-highlights">{entries.map(entry => <a key={entry.slug} href={journalEntryHref(entry)}>{entry.photos[0] && <div><img src={entry.photos[0].small} width={entry.photos[0].width} height={entry.photos[0].height} alt={entry.photos[0].alt} loading="lazy" /></div>}<small>{entry.date.replaceAll("-", ".")} · {entry.categoryLabel}</small><h3>{entry.title}</h3><p>{entry.paragraphs.join(" ").slice(0,100)}{entry.paragraphs.join(" ").length>100?"…":""}</p><span>打开记录 ↗</span></a>)}</div>;
}
