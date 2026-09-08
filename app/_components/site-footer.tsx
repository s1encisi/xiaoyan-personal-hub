/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
import { navigationGroups, siteInfo } from "../_data/site";

export function SiteFooter() {
  return (
    <footer className="global-footer">
      <div className="footer-primary">
        <div className="footer-brand-block">
          <a className="footer-wordmark" href="/">小闫 <span>研究与生活</span></a>
          <h2>把复杂问题讲清楚，<br />把可靠方法做扎实。</h2>
          <p>{siteInfo.description}</p>
          <a className="footer-contact-link" href="/contact">联系与合作 <span aria-hidden="true">↗</span></a>
        </div>
        <nav className="footer-sitemap" aria-label="网站地图">
          {navigationGroups.map((group) => (
            <section className="footer-sitemap-group" key={group.code}>
              <a className="footer-group-link" href={group.href} data-navigation="document">
                <small>{group.code}</small><strong>{group.label}</strong>
              </a>
              <div>
                {group.children.map((child) => (
                  <a key={`${group.code}-${child.code}`} href={child.href} data-navigation="document">{child.label}</a>
                ))}
              </div>
            </section>
          ))}
        </nav>
      </div>
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} {siteInfo.name}</span>
        <span>工业过程建模 · 优化 · 可信决策</span>
        <a href="#top">返回顶部 <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
