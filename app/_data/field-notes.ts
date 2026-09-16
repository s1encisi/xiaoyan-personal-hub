import type { FieldPhotoId } from "./field-photos";

export type FieldNote = {
  slug: string;
  category: "travel-walks" | "culture-objects";
  title: string;
  period: string;
  dateTime: string;
  place: string;
  summary: string;
  paragraphs: string[];
  photos: FieldPhotoId[];
  related?: { href: string; label: string };
};

// Dates indicate the month of each personal record; overnight posts are not used as event dates.
export const fieldNotes: FieldNote[] = [
  {
    slug: "astronomy-and-dishui", category: "travel-walks", title: "白天走近宇宙，夜晚等一场烟花",
    period: "2026.06", dateTime: "2026-06", place: "上海 · 天文馆与滴水湖",
    summary: "从天文馆里的地球与航天展陈，走到滴水湖边的夜色与烟花。",
    paragraphs: ["这一天的安排很简单：天文馆，再去滴水湖看烟花。巨大的地球装置、月球探测和空间站展陈，把平时在屏幕上看到的宇宙带到了眼前。", "天黑之后，视线从展厅转向湖面。建筑的光映在水上，烟花在头顶展开。网站首页的星空，也和这样的兴趣有关：我一直愿意为天文、远处的世界和一次现场体验留出时间。"],
    photos: ["astronomy-earth", "astronomy-lander", "astronomy-station", "dishui-night", "dishui-fireworks"],
  },
  {
    slug: "qingdao-coast", category: "travel-walks", title: "把青岛留在蓝色里",
    period: "2026.06", dateTime: "2026-06", place: "山东 · 青岛",
    summary: "红瓦屋顶、海边栏杆和夜间码头，一座海滨城市的三种切面。",
    paragraphs: ["这次青岛记录只写了两个字：青岛。照片留下了更多细节——层层展开的红瓦屋顶，海边的红色栏杆，还有一起出现在镜头里的小玩偶。", "到了晚上，海面换成另一种蓝，码头和建筑的灯光成为画面的主角。我喜欢用这样一组照片记住城市：同一片水域，在白天和夜里呈现不同的样子。"],
    photos: ["qingdao-sea", "qingdao-roofs", "qingdao-marina"],
  },
  {
    slug: "hangzhou-weekend", category: "travel-walks", title: "从科技园走到西湖边",
    period: "2025.12", dateTime: "2025-12", place: "浙江 · 杭州",
    summary: "青松计划参访之后，在浙大、西湖、博物馆与运河之间度过一个周末。",
    paragraphs: ["报名学校的“青松计划”去杭州参观宇树科技和强脑科技，也给自己留出了认识这座城市的时间。周五参访结束后去了浙江大学，周六沿着西湖走了一整圈，从雷峰塔到断桥残雪。", "周日的路线经过飞来峰、灵隐、杭州博物馆、河坊街和京杭大运河。博物馆里的战国水晶杯让我停留了很久；离开前，还去茶叶市场买了西湖龙井和九曲红梅。一个周末里，技术产品、校园、古老造物和日常生活自然地接在了一起。"],
    photos: ["westlake-view", "westlake-autumn"],
    related: { href: "/experience/hangzhou-tech-visit", label: "宇树科技与强脑科技参访" },
  },
  {
    slug: "jiaxing-waterways", category: "travel-walks", title: "嘉兴：屋顶、水岸与夜色",
    period: "2026.08", dateTime: "2026-08", place: "浙江 · 嘉兴",
    summary: "从白天的灰瓦与绿树，走到夜里被灯光照亮的水巷。",
    paragraphs: ["嘉兴这组照片里，我最想留下的是水边的层次：白天，从高处看屋顶、树冠和水面；夜里，灯火沿着两岸展开。", "散步和拍照给了我一个放慢观察的理由。建筑不只是路过的背景，倒影和光线也能成为记住一座城市的线索。"],
    photos: ["jiaxing-roofs", "jiaxing-canal"],
  },
  {
    slug: "jincheng-lanterns", category: "travel-walks", title: "晋城的年味，在湖边亮起来",
    period: "2026.02", dateTime: "2026-02", place: "山西 · 晋城龙马湖",
    summary: "桥、亭阁与成片灯组，把冬夜的湖面变成一场灯会。",
    paragraphs: ["“晋城每年的灯是真好看。”这是我在这组照片旁写下的话。龙马湖的灯组、桥和亭阁映在水里，把熟悉的年节气氛变得很具体。", "2025 年夏天，我曾在晋城实习。再次把这座城市放进相册，记录的视角从工作日的办公楼，转向了夜晚的湖面与灯火。"],
    photos: ["jincheng-lanterns", "jincheng-pavilion"],
    related: { href: "/experience/jincheng-talent-internship", label: "在晋城的实习经历" },
  },
  {
    slug: "sheshan-observatory", category: "travel-walks", title: "去佘山，看看观测天空的旧仪器",
    period: "2024.11", dateTime: "2024-11", place: "上海 · 佘山",
    summary: "一次顶着降温与大风出发的参访，停留在历史望远镜和观测记录前。",
    paragraphs: ["那天上海降温、刮大风，我还是按原定计划坐了约两小时地铁去佘山。山上的天文展陈很有意思，我拍下了望远镜、观测设备和相关说明。", "看这些仪器时，天文不再只是壮观的图像，也是一代代人如何制造工具、留下记录、逐步认识天空的过程。这种对工具和观察的好奇，也延续到了之后的上海天文馆参观。"],
    photos: ["sheshan-instruments"],
  },
  {
    slug: "milet-first-live", category: "culture-objects", title: "第一次演唱会，留给了 milet",
    period: "2024.11", dateTime: "2024-11", place: "上海 · 虹馆",
    summary: "从大一时反复播放的歌，到第一次站在演唱会现场。",
    paragraphs: ["大一那年，我一直在听 milet。2024 年 11 月，终于在上海听到了现场，这也是我人生中的第一次演唱会。她不断和观众互动，安可时的气氛把整场演出推到了很高的位置。", "当时我用“行走的 CD 机”形容她的声音。喜欢很久的歌从耳机走到眼前，是一种很直接的快乐；唯一的小遗憾，是那晚没有唱到我最喜欢的《You & I》。"],
    photos: ["milet-venue"],
  },
  {
    slug: "wuthering-waves-live", category: "culture-objects", title: "在现场，再走一遍鸣潮的世界",
    period: "2026.07", dateTime: "2026-07", place: "上海 · 东方体育中心",
    summary: "音乐、灯光与全场合唱，把长时间陪伴的游戏世界带到了现实。",
    paragraphs: ["在鸣潮“致予新世界”上海音乐会，熟悉的音乐带着我重新走过乘霄山、黑海岸和之后的篇章。作为从开服持续游玩的玩家，听到这些旋律时，记住的不只有曲子，也有一路走来的场景。", "舞台、灯光和歌曲编排都让我很投入。最后合唱《星炬不熄》的时候，共同喜欢一部作品这件事变得可以听见。散场后，同好们还聚在一起聊天、唱歌——来自不同地方的人，因为同一份兴趣度过了一个晚上。"],
    photos: ["wuthering-stage"],
    related: { href: "/life/animation", label: "我的动画与作品记录" },
  },
  {
    slug: "bilibili-anniversary", category: "culture-objects", title: "十年用户，走进 B 站周年现场",
    period: "2026.06", dateTime: "2026-06", place: "哔哩哔哩十七周年活动",
    summary: "抽中周年活动名额后，从屏幕前的观看者成为现场的一名参与者。",
    paragraphs: ["很幸运抽中了 B 站十七周年活动的名额。作为使用了约十年的用户，能在现场见到熟悉的创作者、听大家聊作品，是一次和日常观看很不一样的体验。", "我在记录里写到了活动布置、舞台互动，也记下了做得很用心的小电视与投币纪念物。这些小细节让我感到，长期使用的平台也承载着很多具体的个人记忆。"],
    photos: ["bilibili-stage"],
    related: { href: "https://space.bilibili.com/103442064", label: "我的 Bilibili 主页" },
  },
  {
    slug: "bilibiliworld-2025", category: "culture-objects", title: "重回 BW，把喜欢的世界走一遍",
    period: "2025.07", dateTime: "2025-07", place: "上海 · BilibiliWorld",
    summary: "赶首班地铁、逛展台、看模型，也再次感受兴趣在现实中的密度。",
    paragraphs: ["上一次去 BW 还是高一暑假。2025 年，我用了两天重新走进展会：早起赶首班地铁、排队、参加活动，把想看的展台尽量逛到。", "照片里留下了模型、手办和各种创作。持续看动画、写作品记录之后，再到这样的现场，会更直观地感受到一部作品怎样被不同的人继续表达。"],
    photos: ["bw-figures"],
    related: { href: "/life/animation/recommendations", label: "继续读年度动画推荐" },
  },
];

export function getFieldNote(slug: string) {
  const note = fieldNotes.find(item => item.slug === slug);
  if (!note) throw new Error(`Unknown field note: ${slug}`);
  return note;
}

export function fieldNoteHref(note: FieldNote) {
  return `/life/${note.category}#${note.slug}`;
}

export const experiencePhotos: Partial<Record<string, FieldPhotoId[]>> = {
  "hangzhou-tech-visit": ["hangzhou-robot", "hangzhou-hand"],
  "jincheng-talent-internship": ["jincheng-office"],
};
