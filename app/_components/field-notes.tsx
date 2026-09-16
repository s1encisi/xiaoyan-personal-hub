/* eslint-disable @next/next/no-img-element -- Optimized local photographs with responsive sources. */
import { ArrowUpRight } from "lucide-react";
import { fieldPhotos, type FieldPhotoId } from "../_data/field-photos";
import { fieldNoteHref, type FieldNote } from "../_data/field-notes";
import { RecordLinks } from "./portfolio";
import { PhotoMotion } from "./editorial-motion";

export function FieldImage({ id, priority = false, sizes = "(max-width: 760px) 90vw, 45vw" }: { id: FieldPhotoId; priority?: boolean; sizes?: string }) {
  const photo = fieldPhotos[id];
  return <img src={photo.src} srcSet={photo.srcSet} sizes={sizes} width={photo.width} height={photo.height} alt={photo.alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />;
}

export function PhotoGallery({ photos }: { photos: FieldPhotoId[] }) {
  return <div className="field-gallery" data-photo-count={photos.length}>{photos.map((id) => {
    const photo = fieldPhotos[id];
    return <figure key={id} className={photo.height > photo.width ? "field-photo field-photo--portrait" : "field-photo"}>
      <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`${photo.caption}，打开大图（新标签页）`}><FieldImage id={id} /><span className="field-photo__zoom" aria-hidden="true"><ArrowUpRight size={18} /></span></a>
      <figcaption>{photo.caption}</figcaption>
    </figure>;
  })}</div>;
}

export function FieldNoteIndex({ notes, label = "图文目录" }: { notes: FieldNote[]; label?: string }) {
  return <nav className="field-index" aria-label={label}>{notes.map(note => <a href={fieldNoteHref(note)} key={note.slug}><time dateTime={note.dateTime}>{note.period}</time><span>{note.title}</span><ArrowUpRight size={15} aria-hidden="true" /></a>)}</nav>;
}

export function FieldNoteStory({ note }: { note: FieldNote }) {
  return <article className="field-story" id={note.slug} aria-labelledby={`${note.slug}-title`}>
    <header className="field-story__heading"><p><time dateTime={note.dateTime}>{note.period}</time><span>{note.place}</span></p><h3 id={`${note.slug}-title`}>{note.title}</h3></header>
    <div className="field-story__prose">{note.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
    <PhotoGallery photos={note.photos} />
    {note.related && <RecordLinks items={[note.related]} />}
    <a className="field-story__back" href="#photo-journal">回到图文目录 <span aria-hidden="true">↑</span></a>
  </article>;
}

export function FieldHighlights({ notes }: { notes: FieldNote[] }) {
  return <div className="field-highlights">{notes.map(note => <a className="field-highlight" href={fieldNoteHref(note)} key={note.slug}>
    <div className="field-highlight__image"><PhotoMotion><FieldImage id={note.photos[0]} sizes="(max-width: 760px) 90vw, (max-width: 1100px) 44vw, 29vw" /></PhotoMotion></div>
    <div className="field-highlight__meta"><time dateTime={note.dateTime}>{note.period}</time><span>{note.place}</span></div>
    <h3>{note.title}</h3><p>{note.summary}</p><span className="field-highlight__link">图文记录 <ArrowUpRight size={17} aria-hidden="true" /></span>
  </a>)}</div>;
}
