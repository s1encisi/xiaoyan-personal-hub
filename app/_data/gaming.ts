import images from "./gaming-images.json";

export const steamProfileUrl = "https://steamcommunity.com/profiles/76561198817662858/";
export const gamingSections = [
  { id: "competitive", code: "01 / MATCHES", title: "对局里的投入", description: "从 CS2 的长期游玩，到王者荣耀、无畏契约与永劫无间。平台战绩、赛季回顾和对局记录，分别留下不同阶段的轨迹。" },
  { id: "worlds", code: "02 / WORLDS", title: "走进不同的世界", description: "原神的地图与角色，鸣潮的探索与共鸣者，绝区零和终末地的培养档案。游戏里的另一种节奏，是把一个世界慢慢展开。" },
  { id: "library", code: "03 / COLLECTION", title: "游戏库里的不同节奏", description: "Steam、Epic 与跨平台游戏记录。除了竞技射击，也有雀魂、泰坦陨落 2、战地风云 5、三色绘恋等不同类型的作品。" },
] as const;

type GameRecord = { number: number; id: string; section: typeof gamingSections[number]["id"]; title: string; platform: string; description: string; facts: string[] };
const records: GameRecord[] = [
  { number: 14, id: "counter-strike", section: "competitive", title: "CS · 平台战绩", platform: "COUNTER-STRIKE", description: "枪械、地图和一场场对局。这里保留平台里的个人表现与常用武器记录；它与 Steam 的总游玩时长采用不同统计范围。", facts: ["Rating 1.10", "ADR 77.29", "637 场历史胜场"] },
  { number: 15, id: "cs-5e", section: "competitive", title: "CS · 5E 对局", platform: "5EPLAY", description: "另一份对局视角：平台汇总了胜率、比赛场次、武器与地图表现。", facts: ["47 场记录", "51% 胜率"] },
  { number: 16, id: "valorant", section: "competitive", title: "无畏契约", platform: "VALORANT", description: "个人等级与装备展示，留下一套曾经使用过的配装。", facts: ["Lv.133", "8 款皮肤"] },
  { number: 17, id: "honor-s26", section: "competitive", title: "王者荣耀 · S26", platform: "SEASON REVIEW", description: "一份旧赛季回顾：最高段位为无双王者 26 星，分路偏好是对抗路。", facts: ["354 场排位", "56.2% 排位胜率"] },
  { number: 18, id: "honor-profile", section: "competitive", title: "王者荣耀 · 生涯记录", platform: "HONOR OF KINGS", description: "从总场次、英雄使用到赛季入口，保留营地中的另一张个人档案。", facts: ["3,951 场总场次", "957 次 MVP"] },
  { number: 21, id: "naraka", section: "competitive", title: "永劫无间", platform: "NARAKA", description: "近身交锋、角色与配合。截图保留了梦华赛季三排战绩，以及常用英雄和武器。", facts: ["Lv.257", "740 小时", "梦华赛季 · 三排"] },
  { number: 20, id: "genshin", section: "worlds", title: "原神", platform: "GENSHIN IMPACT", description: "从地图传送点到角色与成就，提瓦特的游玩记录被留在这张长图里。", facts: ["冒险等级 58", "515 天活跃", "533 项成就"] },
  { number: 22, id: "wuthering-waves", section: "worlds", title: "鸣潮", platform: "WUTHERING WAVES", description: "角色培养、区域探索与阶段挑战。游戏中的音乐与角色，也连接着我去过的线下现场。", facts: ["80 级", "51 位共鸣者", "864 项成就"] },
  { number: 19, id: "zenless", section: "worlds", title: "绝区零", platform: "ZENLESS ZONE ZERO", description: "新艾利都的代理人、邦布和成长记录。这里展示个人档案与角色培养的一个阶段。", facts: ["Lv.56", "278 天活跃", "27 位代理人"] },
  { number: 13, id: "endfield", section: "worlds", title: "明日方舟：终末地", platform: "ARKNIGHTS: ENDFIELD", description: "干员、装备、探索与据点建设，组成这份终末地档案。", facts: ["权限等阶 55", "22 位干员", "探索等级 6"] },
  { number: 12, id: "cross-platform", section: "library", title: "跨平台游戏回顾", platform: "MY GAME LIBRARY", description: "把 Steam、Epic 与其他平台放在同一张兴趣地图中，回看玩过的游戏、角色与类型。", facts: ["跨平台汇总", "游戏与角色收藏"] },
  { number: 10, id: "steam-library", section: "library", title: "Steam 游玩记录", platform: "STEAM", description: "CS2 是这份清单中游玩时间最长的作品。雀魂、战地风云 5、泰坦陨落 2 等也留下了各自的进度。", facts: ["CS2 · 2,021.1 小时", "雀魂 · 31.9 小时"] },
  { number: 11, id: "epic-library", section: "library", title: "Epic 游戏库", platform: "EPIC GAMES", description: "永劫无间占据了这份平台记录的大部分游玩时间，游戏库也保留着其他作品的收藏与体验。", facts: ["平台游戏库", "游玩与成就记录"] },
  { number: 9, id: "game-community", section: "library", title: "游戏社区档案", platform: "PROFILE & PLAYTIME", description: "以“水无灯里 ARIA”记录游戏与兴趣。个人资料、游玩清单与成就，构成另一份日常档案。", facts: ["游戏列表", "时长与成就"] },
];

export const gamingRecords = records.map(record => {
  const image = images.find(item => item.number === record.number);
  if (!image) throw new Error(`Missing gaming image: ${record.number}`);
  return { ...record, image };
});
