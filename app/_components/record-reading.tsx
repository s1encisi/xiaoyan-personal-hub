import { PortfolioSection, RecordLinks } from "./portfolio";
import type { ReadingSection } from "../_data/portfolio-reading";

export function RecordReading({ sections, prefix = "reading" }: { sections?: ReadingSection[]; prefix?: string }) {
  if (!sections?.length) return null;
  return <div className="record-reading" id={prefix}>{sections.map((section,index) => <PortfolioSection key={section.title} density="chapter" id={`${prefix}-${index+1}`} code="IN DETAIL" title={section.title}><div className="pf-prose">{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</div>{section.links && <RecordLinks items={section.links} />}</PortfolioSection>)}</div>;
}
