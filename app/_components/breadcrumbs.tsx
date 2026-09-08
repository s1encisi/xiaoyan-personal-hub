type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="面包屑导航">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? <a href={item.href} data-navigation="document">{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
