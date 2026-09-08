import type { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";

type PageHeroProps = {
  code: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  aside?: ReactNode;
  tone?: "light" | "dark";
};

export function PageHero({ code, eyebrow, title, description, breadcrumbs, aside, tone = "light" }: PageHeroProps) {
  return (
    <section className={`page-hero page-hero-${tone}`}>
      <span className="page-chapter-code" aria-hidden="true">{code}</span>
      <div className="page-hero-main">
        <Breadcrumbs items={breadcrumbs} />
        <p className="page-hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-description">{description}</p>
      </div>
      {aside && <aside className="page-hero-aside">{aside}</aside>}
    </section>
  );
}
