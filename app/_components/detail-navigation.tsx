type Neighbor = { title: string; href: string };

export function DetailNavigation({ back, previous, next }: { back: Neighbor; previous?: Neighbor; next?: Neighbor }) {
  return (
    <nav className="detail-navigation" aria-label="详情页导航">
      <a className="detail-back" href={back.href} data-navigation="document">← {back.title}</a>
      <div>
        {previous ? <a href={previous.href} data-navigation="document"><small>上一篇</small><span>{previous.title}</span></a> : <span />}
        {next ? <a href={next.href} data-navigation="document"><small>下一篇</small><span>{next.title}</span></a> : <span />}
      </div>
    </nav>
  );
}
