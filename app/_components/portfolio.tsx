import type { ReactNode } from "react";
import type { ProjectRecord, PublicationRecord } from "../_data/content";
import { StatusBadge } from "./status-badge";

export function PortfolioSection({ id, code, title, intro, children, density = "section" }: { id: string; code: string; title: string; intro?: string; children: ReactNode; density?: "section" | "chapter" }) {
  return <section id={id} className={`pf-section ${density === "chapter" ? "pf-chapter" : "section-shell"}`} aria-labelledby={`${id}-title`}><header className="pf-section-heading"><p className="micro-label">{code}</p><h2 id={`${id}-title`}>{title}</h2>{intro && <p>{intro}</p>}</header>{children}</section>;
}

export function PortfolioStats({ items }: { items: { value: string; label: string; note?: string }[] }) {
  return <dl className="pf-stats">{items.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd>{item.note && <dd className="pf-stat-note">{item.note}</dd>}</div>)}</dl>;
}

export function RecordLinks({ items }: { items: { label: string; href: string }[] }) {
  return <div className="pf-links">{items.map(item => <a key={item.href} href={item.href} {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{item.label}<span aria-hidden="true">↗</span></a>)}</div>;
}

export function ProjectTiles({ items, variant = "grid" }: { items: ProjectRecord[]; variant?: "grid" | "rows" }) {
  return <div className={`pf-project-grid${variant === "rows" ? " pf-project-grid--rows" : ""}`}>{items.map(project => <a className="pf-project" href={`/projects/${project.slug}`} key={project.slug}><div className="pf-project-top"><span>{project.index}</span><small>{project.category}</small></div><h3>{project.title}</h3><p>{project.summary}</p><div className="pf-tags">{project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div><b>阅读案例 <span aria-hidden="true">↗</span></b></a>)}</div>;
}

export function PublicationList({ items }: { items: PublicationRecord[] }) {
  return <div className="pf-publications">{items.map(record => <article key={record.slug}><div className="pf-publication-status"><span>{record.year}</span><StatusBadge status={record.status} /></div><div><p className="pf-overline">{record.type}</p><h3><a href={`/publications/${record.slug}`}>{record.title}</a></h3><p className="pf-venue">{record.venue}</p><p>{record.summary}</p><RecordLinks items={[{ label: "研究内容与贡献", href: `/publications/${record.slug}` }, ...(record.doi ? [{ label: "期刊原文", href: record.links[0].href }] : [])]} /></div></article>)}</div>;
}
