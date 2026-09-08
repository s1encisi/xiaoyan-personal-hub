import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  density?: "standard" | "compact" | "editorial";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  density = "standard",
}: SectionHeadingProps) {
  return (
    <header className={`section-heading section-heading-${density}`}>
      <div>
        {eyebrow ? <p className="micro-label">{eyebrow}</p> : null}
        <h2 id={id}>{title}</h2>
      </div>
      {description ? <div className="section-heading-description">{description}</div> : null}
    </header>
  );
}
