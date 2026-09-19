/** Profile links verified on 2026-09-08; professional identity matched to the owner's current CV on 2026-09-10. */
export const publicIdentity = {
  name: "闫哲祯",
  nickname: "小闫",
  englishName: "Zhezhen Yan",
  handle: "s1encisi",
  affiliation: "Tongji University",
  department: "同济大学环境科学与工程学院",
  program: "资源与环境硕士",
  email: "2431509@tongji.edu.cn",
  graduation: "2027 年 6 月（预计）",
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
  { id: "steam", name: "Steam", handle: "水无灯里", href: "https://steamcommunity.com/profiles/76561198817662858/", description: "游戏收藏、游玩与成就记录", source: "本人提供；已核实公开主页", verifiedAt: "2026-09-17" },
  { id: "douyin", name: "抖音", handle: "闫哲祯", href: "https://www.douyin.com/user/MS4wLjABAAAAWZujBJd_opt8w_n_PRs2c_8Fqr41sQNg1ANtqttAwjH09VPv7sJSpz0tg-0RaV6Z", description: "雀魂、鸣潮与兴趣短视频", source: "本人分享链接解析；已核实主页与作品标题", verifiedAt: "2026-09-17" },
  { id: "xiaohongshu", name: "小红书", handle: "水无灯里", href: "https://www.xiaohongshu.com/user/profile/65f73295000000000600c869", description: "展览、演出与生活记录；笔记需登录", source: "本人提供；已核实主页简介与笔记标题", verifiedAt: "2026-09-17" },
  { id: "maimai", name: "脉脉", handle: "", href: "https://maimai.cn/profile/detail?dstu=248600540", description: "职业主页与交流；需登录平台", source: "本人提供；访客访问要求登录，未读取履历", verifiedAt: null },
] as const;

export const featuredProfileIds: ReadonlySet<string> = new Set(["bilibili", "github", "bangumi"]);

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
