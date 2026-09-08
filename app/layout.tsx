import type { Metadata, Viewport } from "next";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { createFixedPageMetadata, SITE_ORIGIN } from "./_data/metadata";
import "./design-system.css";

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f4f7fb",
};

const homeTitle = "小闫｜工业智能、可信 AI 与个人研究档案";
const homeDescription = "小闫的多页面个人网站：研究背景、研究专题、论文成果、技术能力、教育经历、知识整理与生活记录。";
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
      name: "小闫｜个人研究与生活档案",
      inLanguage: "zh-CN",
      description: homeDescription,
    },
    {
      "@type": "Person",
      "@id": `${SITE_ORIGIN}/#person`,
      name: "小闫",
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
    <html lang="zh-CN">
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
