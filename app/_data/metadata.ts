import type { Metadata } from "next";

export const SITE_ORIGIN = "https://xiaoyan-personal-hub.s1encisi.chatgpt.site";

const SITE_SOCIAL_IMAGE = `${SITE_ORIGIN}/og-editorial.jpg`;

type FixedPageMetadata = {
  path: `/${string}` | "/";
  title: string;
  description: string;
};

export function createFixedPageMetadata({
  path,
  title,
  description,
}: FixedPageMetadata): Metadata {
  const url = new URL(path, SITE_ORIGIN).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      images: [
        {
          url: SITE_SOCIAL_IMAGE,
          width: 1200,
          height: 630,
          alt: "小闫｜从复杂过程，到可信决策",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE_SOCIAL_IMAGE],
    },
  };
}
