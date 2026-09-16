import type { Metadata, Viewport } from "next";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { createFixedPageMetadata, SITE_ORIGIN } from "./_data/metadata";
import "./design-system.css";
import "./universe-system.css";
import "./portfolio.css";
import "./field-notes.css";

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f4f7fb",
};

const homeTitle = "闫哲祯 Zhezhen Yan｜工业智能、机器学习与个人作品";
const homeDescription = "闫哲祯的个人网站。同济大学资源与环境硕士，研究工业过程预测、安全强化学习与智能优化，展示论文、工程项目、教育实践、写作与生活。";
const homeMetadata = createFixedPageMetadata({
  path: "/",
  title: homeTitle,
  description: homeDescription,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  ...homeMetadata,
  title: { default: homeTitle, template: "%s" },
};

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: "闫哲祯｜研究、工程与生活",
      inLanguage: "zh-CN",
      description: homeDescription,
    },
    {
      "@type": "Person",
      "@id": `${SITE_ORIGIN}/#person`,
      name: "闫哲祯",
      alternateName: ["Zhezhen Yan", "小闫"],
      email: "2431509@tongji.edu.cn",
      url: SITE_ORIGIN,
      description: "关注工业过程建模、多目标优化、安全强化学习与可信工业智能的硕士研究生。",
      knowsAbout: ["铜电积", "电解液净化", "代理建模", "多目标优化", "安全强化学习", "可解释机器学习"],
    },
  ],
}).replaceAll("<", "\\u003c");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-motion="off">
      <body id="top">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
        <a className="skip-link" href="#main-content">跳到主要内容</a>
        <SiteHeader />
        <div className="page-transition">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
