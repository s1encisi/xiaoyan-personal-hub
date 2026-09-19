import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import { AmbientScene } from "./ambient-scene";
import { TopicStrands, MotionReveal } from "./effects/ai-effects";
import { ModuleAccent } from "./module-accent";

type PageHeroProps = {
  code: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  aside?: ReactNode;
  tone?: "light" | "dark";
  density?: "portal" | "detail" | "record";
  meta?: ReactNode;
};

export function PageHero({ code, eyebrow, title, description, breadcrumbs, aside, tone = "light", density = "portal", meta }: PageHeroProps) {
  return (
    <section className={`page-hero page-hero-${tone}`} data-module={code.charAt(0)} data-density={density}>
      <div className="module-atmosphere" aria-hidden="true">{code.startsWith("L") ? <AmbientScene kind="life" /> : <TopicStrands />}<span /><span /><span /></div>
      <span className="page-chapter-code" aria-hidden="true">{code}</span>
      <MotionReveal className="page-hero-main">
        <Breadcrumbs items={breadcrumbs} />
        <p className="page-hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {meta && <div className="page-hero-meta">{meta}</div>}
        <p className="page-hero-description">{description}</p>
      </MotionReveal>
      {aside && <aside className="page-hero-aside">{aside}</aside>}
      <ModuleAccent />
    </section>
  );
}
