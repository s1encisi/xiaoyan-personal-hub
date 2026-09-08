

type AnimationCrumb = {
  label: string;
  href?: string;
};

type AnimationSectionHeroProps = {
  code: string;
  title: string;
  description: string;
  breadcrumbs: AnimationCrumb[];
  stats?: { label: string; value: string }[];
};

export function AnimationSectionHero({
  code,
  title,
  description,
  breadcrumbs,
  stats = [],
}: AnimationSectionHeroProps) {
  return (
    <header className="animation-section-hero">
      <nav className="animation-breadcrumbs" aria-label="面包屑">
        <ol>
          {breadcrumbs.map((item, index) => (
            <li key={`${item.label}-${index}`}>
              {item.href ? <a href={item.href} data-navigation="document">{item.label}</a> : <span aria-current="page">{item.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <div className="animation-section-heading">
        <div>
          <p>{code}</p>
          <h1>{title}</h1>
        </div>
        <p>{description}</p>
      </div>
      {stats.length > 0 && (
        <dl className="animation-section-stats">
          {stats.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}
