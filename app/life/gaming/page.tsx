/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages -- Local screenshot assets and Vinext native document navigation. */
import type { Metadata } from "next";
import { ArrowUpRight, Gamepad2, ChevronDown } from "lucide-react";
import { Breadcrumbs } from "../../_components/breadcrumbs";
import { gamingRecords, gamingSections, steamProfileUrl } from "../../_data/gaming";
import { getFieldNote } from "../../_data/field-notes";
import { FieldHighlights } from "../../_components/field-notes";
import "./gaming.css";

const title = "游戏足迹｜闫哲祯";
const description = "竞技对局、角色与世界、跨平台游戏库：用真实截图留下一份个人游戏记录。";
export const metadata: Metadata = { title, description, alternates: { canonical: "/life/gaming" }, openGraph: { title, description, url: "/life/gaming", images: [] }, twitter: { card: "summary", title, description, images: [] } };

export default function GamingPage() {
  return <main id="main-content" className="gaming-page" tabIndex={-1}>
    <header className="gaming-hero">
      <div className="section-shell">
        <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "生活", href: "/life" }, { label: "游戏足迹" }]} />
        <div className="gaming-hero__layout"><div><p className="gaming-eyebrow">PLAY / EXPLORE / REMEMBER</p><h1>对局之外，<br /><span>还有许多世界。</span></h1><p className="gaming-intro">竞技、探索、角色与故事。<br />把玩过的游戏，也留成一份可以翻阅的记录。</p><a className="gaming-steam" href={steamProfileUrl} target="_blank" rel="noopener noreferrer">在 Steam 找到我 <ArrowUpRight size={18} /></a></div><aside className="gaming-identity"><Gamepad2 size={38} strokeWidth={1} aria-hidden="true" /><span>PLAYER ARCHIVE</span><strong>水无灯里</strong><p>ARIA / AQUAMARINE</p><div><b>14</b><span>张图像记录<br />3 条阅读线索</span></div></aside></div>
        <nav className="gaming-directory" aria-label="游戏足迹目录">{gamingSections.map((section, index) => <a key={section.id} href={`#${section.id}`}><small>0{index + 1}</small>{section.title}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</nav>
      </div>
    </header>
    <div className="section-shell gaming-content"><p className="gaming-snapshot-note">图像整理于 2026 年 9 月。数值保留截图当时的状态，各平台与赛季分别统计。</p>
      {gamingSections.map(section => <section className="gaming-section" key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}><header><p className="gaming-eyebrow">{section.code}</p><h2 id={`${section.id}-title`}>{section.title}</h2><p>{section.description}</p></header>
        <div className="gaming-grid">{gamingRecords.filter(record => record.section === section.id).map(record => <article className="game-record" id={record.id} key={record.id}>
          <div className="game-record__preview"><img src={record.image.preview} width={record.image.previewWidth} height={record.image.previewHeight} alt={`${record.title}档案预览`} loading="lazy" decoding="async" /></div>
          <div className="game-record__copy"><p className="gaming-eyebrow">{record.platform}</p><h3>{record.title}</h3><p>{record.description}</p><ul className="game-record__facts" aria-label={`${record.title}图中记录`}>{record.facts.map(fact => <li key={fact}>{fact}</li>)}</ul></div>
          <details className="game-record__details"><summary><span>展开{record.title}完整长图</span><ChevronDown size={18} aria-hidden="true" /></summary><figure><a href={record.image.src} target="_blank" rel="noopener noreferrer" aria-label={`${record.title}，在新标签页查看大图`}><img src={record.image.src} width={record.image.width} height={record.image.height} alt={`${record.title}的个人游戏档案截图`} loading="lazy" decoding="async" /></a><figcaption>个人游戏截图 · <a href={record.image.src} target="_blank" rel="noopener noreferrer">打开大图 ↗</a></figcaption></figure></details>
        </article>)}</div>
      </section>)}
      <section className="gaming-section gaming-beyond" aria-labelledby="gaming-beyond-title"><header><p className="gaming-eyebrow">BEYOND THE SCREEN</p><h2 id="gaming-beyond-title">从屏幕，走到现场</h2><p>熟悉的游戏和音乐，也成为了可以亲自参与、拍照和回看的经历。</p></header><FieldHighlights notes={[getFieldNote("wuthering-waves-live"),getFieldNote("bilibili-anniversary")]} /><div className="gaming-related"><a href="/life/journal">翻阅更多演出与现场记录 <ArrowUpRight size={18} /></a><a href="https://www.douyin.com/video/7646976578627145280" target="_blank" rel="noopener noreferrer">抖音 · 宝牌仙人 <ArrowUpRight size={18} /></a></div></section>
    </div>
  </main>;
}
