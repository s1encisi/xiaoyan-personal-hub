import { personalKnowledge, personalReflections, personalLife } from "./personal-writing";
import { careerProjects, careerSkills, careerPublications, careerEducation, careerExperience, careerHonors } from "./career";

export type VerificationStatus = "verified" | "topic" | "placeholder";

export type ContentStatusLabel = "已确认" | "研究主题" | "资料待完善" | "暂不公开" | "已发表" | "修回中" | "在审" | "已完成" | "会议展示";

const nonPublicStatusLabels: ReadonlySet<ContentStatusLabel> = new Set([
  "资料待完善",
  "暂不公开",
]);

/** 资料尚未完善的详情页只允许预览，不进入搜索索引或站点地图。 */
export function isNonPublicStatus(status: ContentStatusLabel) {
  return nonPublicStatusLabels.has(status);
}

export type ProjectRecord = {
  slug: string;
  index: string;
  title: string;
  englishTitle: string;
  category: string;
  summary: string;
  question: string;
  status: VerificationStatus;
  tags: string[];
  facts: { label: string; value: string }[];
  route: { step: string; title: string; text: string }[];
  evaluation: string[];
  boundaries: string[];
  relatedSkills: string[];
};

export const projects: ProjectRecord[] = careerProjects;

export type SkillRecord = {
  slug: string;
  index: string;
  title: string;
  englishTitle: string;
  summary: string;
  principle: string;
  layers: { title: string; description: string }[];
  checks: string[];
  relatedProjects: string[];
};

export const skills: SkillRecord[] = careerSkills;

export type KnowledgeRecord = {
  slug: string;
  code: string;
  title: string;
  summary: string;
  intro: string;
  sections: { title: string; items: string[] }[];
};

export const knowledge: KnowledgeRecord[] = personalKnowledge;

export type ReflectionRecord = {
  slug: string;
  topic: string;
  title: string;
  summary: string;
  /** 兼容既有列表页，详情页正文请使用 body。 */
  text: string;
  body: string[];
  tags: string[];
  status: ContentStatusLabel;
};

export const reflections: ReflectionRecord[] = personalReflections;

export type LifeSection = {
  title: string;
  items: string[];
};

export type LifeCategoryRecord = {
  slug: string;
  code: string;
  title: string;
  summary: string;
  intro: string;
  tone: "copper" | "sand" | "blue" | "sage";
  sections: LifeSection[];
  relatedLinks?: { href: string; title: string; description: string }[];
  status: ContentStatusLabel;
};

export const lifeCategories: LifeCategoryRecord[] = personalLife;

export const animationInterest = {
  code: "ANIME",
  title: "动画、叙事与影评",
  summary: "从 2017 年正式入坑，到后来持续整理总表、季度片单和长短影评，动画已经成为我坚持时间最久、也最愿意反复回看的兴趣。",
  intro: "这里整理我的真实观看经历：入坑故事、反复重看的作品、年度片单，以及那些在多年后仍然想写下来的画面与感受。",
  stages: [
    { code: "01", title: "2017 · 入坑", description: "从《寻找失去的未来》开始，也是在 4 月 12 日第一次注册 B 站账号。" },
    { code: "02", title: "持续 · 记录", description: "用总表、新番评价和年度片单，留下作品与当时生活发生联系的方式。" },
    { code: "03", title: "多年后 · 重看", description: "二刷不是为了重复结论，而是看见经历变化后，自己如何重新理解作品。" },
  ],
  anchors: [
    {
      label: "入坑第一作",
      title: "寻找失去的未来",
      note: "总表中保留了两次观看记录；它也是后来持续看动画的起点。",
    },
    {
      label: "最喜欢的 TV 动画",
      title: "末日时在做什么？有没有空？可以来拯救吗？",
      note: "原始笔记写着“最后一集十几刷”，是个人偏好最明确的一部作品。",
    },
    {
      label: "最喜欢的动画电影",
      title: "你的名字。",
      note: "二刷之后继续收藏了原作、设定资料与相关读物。",
    },
    {
      label: "始终珍视的纯爱动画",
      title: "月色真美",
      note: "喜欢它朴素、自然的情感推进，也一直记得最后追逐列车的片段。",
    },
  ],
  yearShelves: [
    {
      year: "2022",
      label: "年度个人十选",
      note: "从当年新 TV 动画中整理的个人推荐，重点关注氛围、人物与完成度。",
      titles: ["向山进发 Next Summit", "赛博朋克：边缘行者", "街角魔族 2丁目", "辉夜大小姐想让我告白－究极浪漫－"],
    },
    {
      year: "2024",
      label: "重看与补完",
      note: "这一年的记录里，重看占了很大比重：有些作品越往后看，越能理解它的节奏。",
      titles: ["水星领航员（二刷）", "向山进发（二刷）", "攻壳机动队 S.A.C.", "葬送的芙莉莲"],
    },
    {
      year: "2025",
      label: "回看与新发现",
      note: "在旧作二刷与新番之间并行，留下了对青春、科研、日常和群像叙事的新观察。",
      titles: ["闪光的哈萨维（二刷）", "败犬女主太多了！（二刷）", "金牌得主", "琉璃的宝石"],
    },
  ],
} as const;

export type AnimationReviewRecord = {
  slug: string;
  code: string;
  title: string;
  englishTitle: string;
  lens: string;
  summary: string;
  facts: { label: string; value: string }[];
  sections: { title: string; paragraphs: string[] }[];
  tags: string[];
  sourceNote: string;
  status: ContentStatusLabel;
};

// 下列内容依据小闫保存在番剧总表、新番评价、年度记录与文章影评中的原稿整理。
// 只修正明显错字、断句与公开表达，不补写原稿中不存在的剧情事实或评价。
export const animationReviews: AnimationReviewRecord[] = [
  {
    slug: "anime-journey-since-2017",
    code: "AE01",
    title: "从《寻找失去的未来》开始",
    englishTitle: "MY ANIME JOURNEY SINCE 2017",
    lens: "入坑经历与长期兴趣",
    summary: "从小学暑假追完当时已更新的六百多集《海贼王》，到 2017 年 4 月 12 日正式入坑：这是一段动画如何成为长期爱好的个人记录。",
    facts: [
      { label: "内容类型", value: "个人观看史" },
      { label: "时间跨度", value: "小学 · 2017 · 至今" },
      { label: "剧透提示", value: "无核心剧情剧透" },
    ],
    sections: [
      {
        title: "第一次接触日本动画",
        paragraphs: [
          "真正开始看番以前，我接触最多的日本动画只有《海贼王》。小学六年级的一个暑假，我和弟弟在同学家偶然看到它，后来两个人用整个假期追完了当时已经更新的六百多集。那时还没有“入坑”的概念，只觉得原来一个故事可以长到陪人度过整个夏天。",
        ],
      },
      {
        title: "2017 年 4 月 12 日",
        paragraphs: [
          "2017 年初三时，我在视频网站首页偶然点开《寻找失去的未来》，很快又看了《政宗君的复仇》。同桌知道后，向我推荐《灼眼的夏娜》《未闻花名》，也第一次告诉我 B 站的存在。4 月 12 日晚上，我注册了账号；现在回头看，是那位同桌替我推开了动画世界的一扇门。",
          "随后我沿着当时的热门作品一路补番，也在 2017 年遇到了很多后来仍会想起的作品。《月色真美》尤其特别：没有夸张设定，感情推进像流水一样自然，最后追逐列车的片段至今仍留在记忆里。",
        ],
      },
      {
        title: "几部不会被轻易替代的作品",
        paragraphs: [
          "在早期总表里，《寻找失去的未来》被写成“入坑第一作”；《末日时在做什么？有没有空？可以来拯救吗？》旁边写着“最后一集十几刷”；《你的名字。》则是我最喜欢的动画电影之一，二刷以后还陆续收藏了原作和设定资料。它们未必构成一份客观榜单，却准确保存了我当时最直接的喜欢。",
          "动画后来逐渐变成我坚持最久的兴趣：我开始做总表、排新番日程、写年度推荐，也会在几年后重新看一部旧作。记录的意义并不只是证明看过多少，而是保存某部作品曾经怎样进入我的生活。",
        ],
      },
    ],
    tags: ["观看史", "2017", "长期兴趣"],
    sourceNote: "依据早期《番剧总结》和《总番剧列表》整理，保留原意，仅调整断句与明显错字。",
    status: "已确认",
  },
  {
    slug: "hibike-euphonium-rewatch",
    code: "AR02",
    title: "《吹响吧！上低音号》：一首青春交响曲",
    englishTitle: "HIBIKE! EUPHONIUM — A REWATCH",
    lens: "人物、音乐与镜头语言",
    summary: "二刷之后，我仍把《吹响吧！上低音号》看作京都动画最完整的作品之一：人物、音乐、色彩与分镜共同写出了一段青春。",
    facts: [
      { label: "内容类型", value: "二刷长评" },
      { label: "观看范围", value: "TV · 剧场版 · 利兹与青鸟" },
      { label: "剧透提示", value: "涉及人物关系与关键镜头" },
    ],
    sections: [
      {
        title: "二刷：像第一次重新认识它",
        paragraphs: [
          "那次重看，我把京都动画多年来的作品大致重新看了一遍，把《吹响吧！上低音号》放在最后。因为距离第一次观看已有几年，很多剧情只剩模糊印象，反而像重新认识这部作品。看完整个系列与《利兹与青鸟》后，我仍然认为它是京都动画在人物、音乐与演出上的一次集成。",
        ],
      },
      {
        title: "人物先从外形和姿态里出现",
        paragraphs: [
          "我很喜欢作品用细节区分人物状态：久美子和丽奈束发、散发时的气质变化，明日香成熟中带着俏皮，夏纪的慵懒、优子的活泼、霙近似小动物般的羞涩。造型没有替代人物塑造，却会在角色开口以前，先给观众一个可以继续验证的印象。",
          "明日香是整支吹奏部里最强势也最难被看透的人。她看上去几乎什么都能处理，因此更少有人相信她也会遇到无法解决的事。这个人物给我最深的提醒是：无论别人怎样评价，面对内心真正喜欢、真正想做的事，都不应该先欺骗自己。",
        ],
      },
      {
        title: "音乐、色彩和青春的情绪",
        paragraphs: [
          "古典音乐与比赛曲不仅服务演奏场景，也在帮助观众理解人物关系。大吉山的深蓝夜空、城市灯光与白色衣服，庙会桥上的烟花，以及河边练习时的黄昏，都把角色难以直接说出口的不安、迷茫和靠近转化成了视觉情绪。",
          "作品最动人的地方，是画面与音乐从不只负责“好看”和“好听”。当演奏持续数分钟，镜头仍会通过移动、环绕、人物特写和小物件维持节奏，让观众既听见乐曲，也看见每个人正处于怎样的状态。",
        ],
      },
      {
        title: "位置倒转，就是成长发生过的证据",
        paragraphs: [
          "第一季开头，久美子站在校门台阶下望向上方的明日香；第二季结尾，两人的位置发生了倒转。对我来说，这既是新旧交替，也是久美子在音乐、待人处事和自我理解上的成长。作品还会用不让角色同框、遮住正脸、蜘蛛网与飞走的蝴蝶等镜头传递关系变化，让很少的画面承载很高的信息密度。",
          "能写的地方还有太多。重看之后，我仍希望自己可以像吹奏部的大家一样，在最好的青春里，认真写下属于自己的那段旋律。",
        ],
      },
    ],
    tags: ["京都动画", "青春", "视听语言"],
    sourceNote: "依据《番剧评价》中的二刷长评整理；删去重复口语，保留人物与镜头判断。",
    status: "已确认",
  },
  {
    slug: "evangelion-thrice-upon-a-time",
    code: "AR03",
    title: "《EVA：终》：在不满与告别之间",
    englishTitle: "THRICE UPON A TIME — REVISITED",
    lens: "成长、和解与告别",
    summary: "“作为动画电影是优秀的，但作为 EVA 的结局是不及格的。”四年后在影院重看，我仍保留这个判断，也终于接受了它选择的告别。",
    facts: [
      { label: "内容类型", value: "影院重看短评" },
      { label: "观看背景", value: "BD 首看 · 四年后补票" },
      { label: "剧透提示", value: "包含结局与人物去向" },
    ],
    sections: [
      {
        title: "四年后，评价没有改变",
        paragraphs: [
          "第一次看 BD 时，我只给了它七分。四年后在线下补票，我的评价仍然是：作为一部动画电影，它是优秀的；但作为 EVA 的结局，它并不合格。作品用村落、家庭和种田生活引导丽，也让真嗣最终决定面对父亲与自己，以父子之间的理解收束整个系列。这是一种很强硬的成长，也是一种近乎背叛过去的和解。",
        ],
      },
      {
        title: "成为大人，然后呢？",
        paragraphs: [
          "《终》像是在对真嗣、对观众，也对曾经被 EVA 困住的一代人说：你们已经成为大人了。庵野秀明最终选择爱与和平，真嗣也终于长大；但接受和解结局的观众，是否真的接受了与自己的和解？当所有谜题都被关闭，EVA 似乎也失去了继续拒绝和解的空间。",
        ],
      },
      {
        title: "音乐响起以后",
        paragraphs: [
          "但当影院里《One Last Kiss》的前奏响起时，很多不满忽然散去了。这场横跨近三十年的斗争，对创作者、观众和作品本身也许都是一种折磨，是时候让它拥有一个结局。人会成长，但接受眼前的世界，并不意味着否定或忘记过去。",
          "《Beautiful World》结束时，我仿佛回到初中第一次看 EVA 的夏天。也许我没有像真嗣一样成为“大人”，所以仍会对结局感到不满；可那个让温暖春光照进残酷世界与观众内心的结尾，的确配得上一句：再见了，所有的 Evangelion。",
        ],
      },
    ],
    tags: ["EVA", "成长", "告别"],
    sourceNote: "依据影院重看后写下的《EVA终》短评整理，核心判断和情绪转折均保留原文。",
    status: "已确认",
  },
  {
    slug: "poppin-dream-five-years",
    code: "AR04",
    title: "Poppin’ Dream!：终于理解“心动与闪耀”",
    englishTitle: "POPPIN' DREAM! — FIVE YEARS LATER",
    lens: "作品陪伴与个人记忆",
    summary: "从高一暑假在上海 BW 偶然听见一首歌，到五年后看见成员一起抬头望向星空：我终于理解了这个企划反复谈起的“心动与闪耀”。",
    facts: [
      { label: "内容类型", value: "作品陪伴长评" },
      { label: "观看背景", value: "高一入坑 · 五年后重访" },
      { label: "剧透提示", value: "涉及剧场版演出片段" },
    ],
    sections: [
      {
        title: "从上海 BW 的一个展台开始",
        paragraphs: [
          "高一暑假，我去上海参加第二届 BW，在途中偶然遇到 Poppin'Party 的展台，只听了一首歌。回家后，我开始玩台服，也从那里逐渐了解 BanG Dream!。当时的我对偶像番和音游都没有太大兴趣，Poppin'Party 的歌却带来一种很难解释的吸引力。",
        ],
      },
      {
        title: "一个企划慢慢进入生活",
        paragraphs: [
          "后来我第一次研究怎样玩日服，也因为 BanG Dream! 接触到 Love Live!、偶像大师和更多偶像企划。它改变的不只是一份片单：我开始喜欢音游、偶像动画和现场文化，每天上线打几首歌，也逐渐成为生活里稳定的小习惯。",
          "五年时间里，我一直没能准确解释“kira kira doki doki”到底是什么，却隐约知道，那就是这个企划想传递给我的东西。",
        ],
      },
      {
        title: "并不完美，但那一分钟足够",
        paragraphs: [
          "从电影本身看，它并不完美：篇幅很短，剧情推进有牵强之处，其他乐队的加入也压缩了 Poppin'Party 自己的空间。但关于五位成员的互动、日常与舞台，我仍然非常喜欢。",
          "当第二首歌结束，香澄指向星空，所有人一起抬头的那一分钟，我第一次真正理解了“心动与闪耀”。当时脑中只有一个念头：我遇见 BanG Dream!，也许就是为了这一刻的感动。",
        ],
      },
    ],
    tags: ["BanG Dream!", "陪伴", "现场文化"],
    sourceNote: "依据《番剧评价》中的 Poppin’ Dream! 长评整理，保留个人经历与对影片优缺点的判断。",
    status: "已确认",
  },
  {
    slug: "aria-the-animation-farewell",
    code: "AR05",
    title: "《水星领航员》：温柔日常里的离别",
    englishTitle: "ARIA — GROWING UP AND PARTING",
    lens: "日常、成长与分别",
    summary: "它明明是一部极其温柔的日常动画，却让我在看完后像与老朋友分别一样难过：成长让每个人接近目标，也让曾经朝夕相处的人渐渐走远。",
    facts: [
      { label: "内容类型", value: "年度观看长评" },
      { label: "观看背景", value: "2022 年末 · 全系列补完" },
      { label: "剧透提示", value: "涉及第三季结局" },
    ],
    sections: [
      {
        title: "在年末遇见新威尼斯",
        paragraphs: [
          "第一季第一集的片头曲响起时，我就大概明白，这会是一个多么温柔的故事。按理说，单元剧形式的日常动画适合每天慢慢看一集，可我还是被新威尼斯、被灯里她们普通而温馨的生活不断吸引。",
          "奇怪的是，这部近乎纯粹的治愈动画，在结束后留给我的却不是轻松，而是与老朋友分别般的伤感。直到第三季最后，我才慢慢理解这种情绪来自哪里。",
        ],
      },
      {
        title: "梦想实现时，生活也开始分流",
        paragraphs: [
          "灯里成为正式领航员，也意味着艾莉西亚将离开原来的舞台。大家都成长了，都向着自己的目标前进；可走得越远，曾经可以天天见面、共同练习的人，也越容易被工作和生活隔开。",
          "这不是遥远的物理距离，也不是永远无法再见。恰恰因为“以后还可以见”，这种分别才更贴近真实生活：再见面的机会究竟还有多少？再见时，彼此又已经走到了哪里？",
        ],
      },
      {
        title: "不是怀念过去，而是珍惜仍在继续的现在",
        paragraphs: [
          "《水星领航员》的世界大多温暖、善良，甚至美好得近乎虚幻；只有这种随着成长逐渐分开的感觉，真实到让我每次听见最初的旋律，都会想起故事的结尾。",
          "它最终留下的不是“过去才是最好的”，而是一种更温柔的提醒：每个人都要继续自己的生活，保持向前看；曾经的快乐没有消失，而现在也仍然可以拥有新的快乐。",
        ],
      },
    ],
    tags: ["水星领航员", "治愈日常", "成长与离别"],
    sourceNote: "依据 2022 年年度记录中的《水星领航员》长评整理；将原稿中的长段落分节，保留核心情绪与判断。",
    status: "已确认",
  },
  {
    slug: "anime-picks-2022",
    code: "AL06",
    title: "2022 年动画个人推荐十选",
    englishTitle: "MY 2022 ANIME PICKS",
    lens: "年度片单与观看语境",
    summary: "这不是一份客观排名，而是 2022 年年末留下的个人观看切片：从登山、夜晚与日常，到赛博朋克、恋爱喜剧与太空歌剧。",
    facts: [
      { label: "内容类型", value: "年度个人片单" },
      { label: "记录时间", value: "2022 年末" },
      { label: "选择范围", value: "当年观看的新 TV 动画" },
    ],
    sections: [
      {
        title: "写在榜单前",
        paragraphs: [
          "2022 年末，我把当年看过的新动画做了一次个人向整理。那时每个季度都会稳定追不少新番，同时也不断补以前的作品。重看这份榜单，比“哪部最强”更有意思的，是它保存了当时最在意的东西：氛围、人物关系、完成度，以及一部作品能否把某种生活感留在屏幕之外。",
        ],
      },
      {
        title: "01—05",
        paragraphs: [
          "01｜《向山进发 Next Summit》——我在 2022 年最喜欢、也最期待的动画。稳定的作画、每集不同的片尾小故事，以及沿途的日本风景，让登山、友情与日常自然地连在一起。",
          "02｜《赛博朋克：边缘行者》——独特的画风、音乐和故事节奏，共同塑造了一个几乎注定走向悲剧的赛博朋克社会。",
          "03｜《街角魔族 2丁目》——主线与日常结合得非常自然，既保留轻松的生活节奏，也让人物关系持续向前。",
          "04｜《银河英雄传说 Die Neue These》——吸引我的并不是“太空”本身，而是作品不断摆出专制、民主、理想与现实之间难以简单回答的问题。",
          "05｜《辉夜大小姐想让我告白－究极浪漫－》——恋爱喜剧可以一季比一季更完整，也可以在让人开心的同时，把人物多年的犹豫推向真正的变化。",
        ],
      },
      {
        title: "06—10",
        paragraphs: [
          "06｜《86－不存在的战区－》——最后阶段的演出与氛围尤其出色；我也保留一个疑问：作品提出了人与 AI、种族与战争，却没有把每个问题都同样深入地讨论下去。",
          "07｜《孤独摇滚！》——表情、演出和音乐让“社恐”不只是一个标签，也变成了不断尝试走向他人的具体过程。",
          "08｜《彻夜之歌》——色彩与音乐搭出近乎理想化的夜晚氛围；看完以后，会让人也想在深夜走到街上。",
          "09｜《明日酱的水手服》——它把青春少女的活力直接铺满画面，观看时能感到一种很具体的年轻与明亮。",
          "10｜《相合之物》——没有夸张的作画与跌宕情节，依然可以依靠温馨、普通的日常，让人在忙碌一天后安静下来。",
        ],
      },
    ],
    tags: ["2022", "年度十选", "个人片单"],
    sourceNote: "依据 2022 年年末推荐榜整理；保留个人排序，删去会随时间变化的热度与平台数据。",
    status: "已确认",
  },
];

export type PublicationRecord = {
  slug: string;
  code: string;
  type: string;
  title: string;
  summary: string;
  year: string;
  venue: string;
  authors: string;
  doi: string | null;
  abstract: string;
  contribution: string;
  links: { label: string; href: string }[];
  status: ContentStatusLabel;
};

export const publicationRecords: PublicationRecord[] = careerPublications;

export type EducationRecord = {
  slug: string;
  code: string;
  phase: string;
  level: string;
  title: string;
  institution: string;
  school: string;
  major: string;
  supervisor: string;
  period: string;
  location: string;
  summary: string;
  details: string[];
  status: ContentStatusLabel;
};

export const educationRecords: EducationRecord[] = careerEducation;

export type ExperienceRecord = {
  slug: string;
  code: string;
  phase: string;
  type: string;
  title: string;
  description: string;
  summary: string;
  organization: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
  outputs: string[];
  /** 兼容既有时间轴。 */
  meta: string;
  status: ContentStatusLabel;
};

export const experienceRecords: ExperienceRecord[] = careerExperience;

export type HonorRecord = {
  slug: string;
  code: string;
  category: string;
  title: string;
  description: string;
  issuer: string;
  level: string;
  date: string;
  scope: string;
  role: string;
  contribution: string;
  proofUrl: string | null;
  status: ContentStatusLabel;
};

export const honorRecords: HonorRecord[] = careerHonors;

/** 兼容既有荣誉列表页；新页面应优先使用 honorRecords。 */
export const honorGroups = honorRecords;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getSkill(slug: string) {
  return skills.find((skill) => skill.slug === slug);
}

export function getKnowledge(slug: string) {
  return knowledge.find((entry) => entry.slug === slug);
}

export function getPublication(slug: string) {
  return publicationRecords.find((record) => record.slug === slug);
}

export function getEducation(slug: string) {
  return educationRecords.find((record) => record.slug === slug);
}

export function getExperience(slug: string) {
  return experienceRecords.find((record) => record.slug === slug);
}

export function getHonor(slug: string) {
  return honorRecords.find((record) => record.slug === slug);
}

export function getReflection(slug: string) {
  return reflections.find((record) => record.slug === slug);
}

export function getLifeCategory(slug: string) {
  return lifeCategories.find((record) => record.slug === slug);
}

export function getAnimationReview(slug: string) {
  return animationReviews.find((record) => record.slug === slug);
}
