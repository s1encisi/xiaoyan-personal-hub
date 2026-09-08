/** Public sources checked on 2026-09-08. No private repositories or street address are exposed. */
export const publicIdentity = {
  name: "小闫",
  englishName: "Zhezhen Yan",
  handle: "s1encisi",
  affiliation: "Tongji University",
  city: "上海",
  profileBio: "水无灯里",
  bilibiliAlias: "水无灯里Aquamarine",
  bangumiAlias: "水无灯里（遥かなる苍）",
  bilibiliBio: "AUQA是由奇迹构成的",
  verifiedAt: "2026-09-08",
  source: "https://github.com/s1encisi",
};

export const publicProfiles = [
  { id: "bilibili", name: "Bilibili", handle: "水无灯里Aquamarine", href: "https://space.bilibili.com/103442064", description: "动画专栏、视频与日常关注", source: "Bilibili 公开个人空间", verifiedAt: "2026-09-08" },
  { id: "github", name: "GitHub", handle: "s1encisi", href: "https://github.com/s1encisi", description: "代码实践与公开问题交流", source: "GitHub 公开主页与 API", verifiedAt: "2026-09-08" },
  { id: "bangumi", name: "Bangumi", handle: "水无灯里（遥かなる苍）", href: "https://bgm.tv/user/s1encisi", description: "动画收藏与观看记录", source: "Bangumi 公开时光机", verifiedAt: "2026-09-08" },
] as const;

export const bangumiSnapshot = {
  watched: 2502, watching: 20, wish: 176,
  joinedAt: "2021-11-09", verifiedAt: "2026-09-08",
  href: "https://bgm.tv/user/s1encisi",
  watchedHref: "https://bgm.tv/anime/list/s1encisi/collect",
  watchingHref: "https://bgm.tv/anime/list/s1encisi/do",
  wishHref: "https://bgm.tv/anime/list/s1encisi/wish",
};

export const publicAnimationEssays = [
  { title: "2025年个人向二刷/新看动画推荐与感想合集", href: "https://www.bilibili.com/read/cv44645807", subject: "年度回看", localHref: "/life/animation/recommendations/2025" },
  { title: "2022动画推荐", href: "https://www.bilibili.com/read/cv20716673", subject: "年度片单", localHref: "/life/animation/recommendations/2022" },
  { title: "京吹，一首真正的青春交响曲", href: "https://www.bilibili.com/read/cv9912879", subject: "吹响吧！上低音号", localHref: "/life/animation/hibike-euphonium-rewatch" },
  { title: "Re:stage,Dream Days—闪耀在群星之巅的偶像", href: "https://www.bilibili.com/read/cv6770928", subject: "偶像与舞台", localHref: "/life/animation/re-stage-dream-days" },
] as const;

export const publicContributions = [
  {
    title: "多轮推理对话中的消息字段兼容性",
    project: "LangChain",
    date: "2026-05-27",
    kind: "公开问题反馈",
    description: "记录 ChatDeepSeek 多轮对话中 reasoning_content 的传递问题，并给出相关代码定位。",
    href: "https://github.com/langchain-ai/langchain/issues/37713",
    sourceTitle: "ChatDeepSeek drops reasoning_content in multi-turn conversations",
    note: "问题反馈记录，不代表补丁已被合并。",
  },
] as const;
