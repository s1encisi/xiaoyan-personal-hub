import type { Metadata, Viewport } from "next";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { createFixedPageMetadata, SITE_ORIGIN } from "./_data/metadata";
import "./design-system.css";
import "./universe-system.css";
import "./portfolio.css";
import "./field-notes.css";
import "./_components/social-links.css";

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f4f7fb",
};

const homeTitle = "闫哲祯 Zhezhen Yan｜机器学习、强化学习与智能体工程";
const homeDescription = "闫哲祯的个人网站。同济大学资源与环境硕士，关注机器学习、强化学习、智能体工程与可靠执行，展示论文、工程项目、教育实践、写作与生活。";
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
      description: "关注机器学习、强化学习、大模型与智能体工程的硕士研究生。",
      knowsAbout: ["机器学习", "强化学习", "智能体工程", "大模型", "多目标优化", "可解释机器学习", "工业过程建模"],
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
