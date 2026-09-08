/* eslint-disable @next/next/no-html-link-for-pages -- Vinext production requires native document navigation. */
export default function NotFound() {
  return (
    <main className="not-found" id="main-content" tabIndex={-1}>
      <div className="not-found-code" aria-hidden="true">404</div>
      <p className="micro-label">PAGE NOT FOUND</p>
      <h1>这条路径还没有内容。</h1>
      <p>可能是链接发生了变化，或者对应的研究记录尚未公开。</p>
      <div><a className="primary-action" href="/">返回首页 <span>→</span></a><a className="text-link" href="/projects">浏览研究专题</a></div>
    </main>
  );
}
