import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const animationSource = JSON.parse(
  await readFile(new URL("../app/_data/animation/public-content.json", import.meta.url), "utf8"),
);
const journalSource = JSON.parse(await readFile(new URL("../app/_data/journal-data.json", import.meta.url), "utf8"));
const journalYears = [...new Set(journalSource.map(record => record.year))];

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(path = "/") {
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function findTag(html, tagName, attribute, value) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))]
    .map(([tag]) => tag)
    .find((tag) => tag.includes(`${attribute}="${value}"`));
}

function findTags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map(([tag]) => tag);
}

function readAttribute(tag, attribute) {
  return tag?.match(new RegExp(`(?:^|\\s)${attribute}="([^"]*)"`, "i"))?.[1];
}

function assertLocalPoster(tag, context, expectedLoading = "lazy") {
  assert.match(readAttribute(tag, "src") ?? "", /^\/images\/animation\/posters\/[a-z0-9-]+\.(?:jpe?g|webp)$/i, `${context}: local poster`);
  assert.match(readAttribute(tag, "alt") ?? "", /\S/, `${context}: non-empty alt`);
  assert.match(readAttribute(tag, "width") ?? "", /^\d+$/, `${context}: intrinsic width`);
  assert.match(readAttribute(tag, "height") ?? "", /^\d+$/, `${context}: intrinsic height`);
  assert.equal(readAttribute(tag, "loading"), expectedLoading, `${context}: loading`);
}

const animationModuleRoutes = [
  ["/life/animation/recommendations", /原稿记录了几部，这里就完整保留几部/],
  ["/life/animation/reviews", /每篇文章都标明来源边界/],
  ["/life/animation/archive", /长期总表按年份重新建立索引/],
  ["/life/animation/timeline", /阶段标题与说明根据现存片单和原稿整理/],
];

const legacyAnimationReviewRoutes = [
  ["/life/animation/anime-journey-since-2017", /从《寻找失去的未来》开始/],
  ["/life/animation/hibike-euphonium-rewatch", /一首青春交响曲/],
  ["/life/animation/evangelion-thrice-upon-a-time", /在不满与告别之间/],
  ["/life/animation/poppin-dream-five-years", /终于理解“心动与闪耀”/],
  ["/life/animation/aria-the-animation-farewell", /温柔日常里的离别/],
  ["/life/animation/anime-picks-2022", /2022 年动画个人推荐榜/],
];

const newAnimationReviewRoutes = [
  ["/life/animation/magi-personal-review", /魔笛 MAGI/],
  ["/life/animation/high-school-fleet-personal-review", /高校舰队/],
  ["/life/animation/bang-dream-season-3", /BanG Dream! 第三季/],
  ["/life/animation/her-blue-sky", /知晓天空之蓝的人啊/],
  ["/life/animation/re-stage-dream-days", /Re:Stage! Dream Days/],
  ["/life/animation/uma-musume-season-2", /赛马娘 第二季/],
  ["/life/animation/strawberry-panic", /惊爆草莓/],
  ["/life/animation/honkai-graduation-trip", /一路顺风，琪亚娜/],
  ["/life/animation/idol-franchises", /三大偶像系列动画总评/],
  ["/life/animation/mobile-suit-gundam-hathaway-rewatch", /理想主义者的安魂曲/],
];

const animationReviewRoutes = [...legacyAnimationReviewRoutes, ...newAnimationReviewRoutes];

const moduleRoutes = [
  ["/", new RegExp("让模型学会理解")],
  ["/about", new RegExp("研究智能方法")],
  ["/about/profile", new RegExp("从区域生态")],
  ["/contact", new RegExp("通过邮箱联系我")],
  ["/research", new RegExp("预测、优化与工程实现")],
  ["/projects", new RegExp("机器学习与智能体工程")],
  ["/outputs", new RegExp("论文、算法与研究软件")],
  ["/outputs/project-results", new RegExp("四类交付")],
  ["/publications", new RegExp("第一作者研究成果")],
  ["/skills", new RegExp("六个方向")],
  ["/journey", new RegExp("从大连到上海")],
  ["/education", new RegExp("两段学习经历")],
  ["/experience", new RegExp("科研、工程与实习")],
  ["/honors", new RegExp("奖学金与荣誉记录")],
  ["/insights", new RegExp("来自项目的方法笔记")],
  ["/notes", new RegExp("研究、建模、写作与工程")],
  ["/thoughts", new RegExp("研究、协作与日常")],
  ["/life", new RegExp("研究之外，保持具体")],
  ["/life/journal", new RegExp("按年份翻阅")],
  ["/life/gaming", new RegExp("对局之外")],
  ["/life/animation", new RegExp("让故事，")],
  ...animationModuleRoutes,
];

const detailRoutes = [
  ["/projects/reliable-commerce-agents", /电商智能体的可靠售后执行/],
  ...journalYears.map(year => ["/life/journal/" + year, new RegExp(year + " 年图文目录")]),
  ["/projects/copper-electrowinning-surrogate", new RegExp("铜电积过程的机器学习预测")],
  ["/projects/electrolyte-purification-optimization", new RegExp("铜电积的约束多目标优化")],
  ["/projects/safe-reinforcement-learning", new RegExp("ESRL-CMO")],
  ["/projects/causal-explainable-industrial-ai", new RegExp("工业模型解释与诊断")],
  ["/projects/culab-agent-workbench", new RegExp("CuLab")],
  ["/projects/wastewater-energy-tabpfn", new RegExp("有限样本下的污水处理能耗预测")],
  ["/projects/urban-rural-ecological-footprint", new RegExp("城乡视角下的省域生态足迹")],
  ["/projects/land-use-gee", new RegExp("辽西地区土地利用")],
  ["/projects/biochar-arsenic-adsorption", new RegExp("酸洗去灰")],
  ["/publications/publication-record-01", new RegExp("10.20237/j.issn.1007-7545.2025.09.002")],
  ["/publications/publication-record-02", new RegExp("Journal of Cleaner Production")],
  ["/publications/wastewater-energy-tabpfn", new RegExp("Water Environment Research")],
  ["/publications/urban-rural-ecological-footprint", new RegExp("城乡视角下中国省域")],
  ["/publications/urban-water-poster-2025", new RegExp("Sustainable Urban Water Systems")],
  ["/skills/industrial-process-modeling", new RegExp("工业过程与表格数据建模")],
  ["/skills/multi-objective-optimization", new RegExp("多目标优化")],
  ["/skills/safe-reinforcement-learning", new RegExp("安全强化学习")],
  ["/skills/explainable-causal-ml", new RegExp("可解释机器学习")],
  ["/skills/agent-engineering", new RegExp("AI Agent")],
  ["/skills/spatial-environmental-analysis", new RegExp("空间分析与环境研究")],
  ["/education/masters-stage", new RegExp("资源与环境硕士")],
  ["/education/undergraduate-stage", new RegExp("大连理工大学")],
  ["/experience/masters-research", new RegExp("铜砷分离数字调控")],
  ["/experience/jincheng-talent-internship", new RegExp("晋城市委组织部")],
  ["/experience/tongji-library", new RegExp("图书馆阅读推广")],
  ["/experience/tongji-class-communication", new RegExp("班级宣传")],
  ["/experience/dongdaor-internship", new RegExp("废酸资源化")],
  ["/experience/dut-student-affairs", new RegExp("校园融媒体")],
  ["/experience/dut-sunshine-association", new RegExp("阳光心理健康协会")],
  ["/experience/dut-international-media", new RegExp("双语校园传播")],
  ["/experience/nature-education", new RegExp("E-ONE")],
  ["/experience/hangzhou-tech-visit", new RegExp("宇树科技与强脑科技参访")],
  ["/honors/national-encouragement-2021", new RegExp("国家励志奖学金")],
  ["/honors/national-encouragement-2022", new RegExp("国家励志奖学金")],
  ["/honors/academic-excellence-2021", new RegExp("学习优秀奖学金")],
  ["/honors/culture-sports-2021", new RegExp("文体活动奖学金")],
  ["/honors/merit-student-2021", new RegExp("校三好学生")],
  ["/notes/research-methods", new RegExp("从真实任务建立研究问题")],
  ["/notes/modeling-optimization", new RegExp("从预测器走向优化器")],
  ["/notes/academic-writing", new RegExp("把研究贡献讲清楚")],
  ["/notes/reproducibility", new RegExp("让研究软件")],
  ["/thoughts/research-boundaries", new RegExp("从一张地图")],
  ["/thoughts/method-failure", new RegExp("整理成别人用得上的信息")],
  ["/thoughts/life-curiosity", new RegExp("把好奇心")],
  ["/life/running-outdoors", new RegExp("长跑与户外")],
  ["/life/reading-notes", new RegExp("阅读与科幻")],
  ["/life/travel-walks", new RegExp("城市观察与散步")],
  ["/life/culture-objects", new RegExp("影像与文化表达")],
  ...animationReviewRoutes,
];

const publicPortfolioRoutes = detailRoutes.filter(([path]) => !path.startsWith("/life/animation/")).map(([path]) => path);

test("Notion library exposes eight topics and real chapter links", async () => {
  const html = await (await render("/notes")).text();
  assert.equal((html.match(/class="library-chapter"/g) ?? []).length, 8);
  const links = findTags(html, "a").filter(tag => (readAttribute(tag, "href") ?? "").startsWith("https://app.notion.com/"));
  assert.equal(links.length, 35);
  for (const tag of links) {
    assert.equal(readAttribute(tag, "target"), "_blank");
    assert.match(readAttribute(tag, "rel") ?? "", /noopener/);
  }
  assert.match(html, /完整资料可直接在 Notion 中阅读/);
});

test("journal preserves broad coverage, year navigation and local image boundaries", async () => {
  assert.equal(journalSource.length, 61);
  assert.equal(journalSource.reduce((sum, item) => sum + item.photos.length, 0), 250);
  const images = new Set();
  for (const year of journalYears) {
    const response = await render(`/life/journal/${year}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const records = journalSource.filter(entry => entry.year === year);
    assert.equal((html.match(/class="journal-story"/g) ?? []).length, records.length);
    for (const record of records) {
      assert.ok(findTag(html, "article", "id", `entry-${record.slug}`));
      assert.ok(html.includes(`href="#entry-${record.slug}"`));
      for (const photo of record.photos) {
        assert.match(photo.src, /^\/images\/journal\/[a-z0-9-]+\.webp$/);
        assert.ok(photo.width > 0 && photo.height > 0 && photo.smallWidth > 0);
        images.add(photo.src); images.add(photo.small);
      }
    }
    assert.doesNotMatch(html, /wxid_|qpic\.cn|video\.qq\.com|media-access|dpapi|my-moments|local[\\/]moments|sns\.db|\b(?:enc|token|authkey)=/i);
  }
  for (const path of images) assert.ok((await stat(new URL("../public" + path, import.meta.url))).isFile());
  assert.equal((await render("/life/journal/1900")).status, 404);
});

test("visitor pages omit production labels while retaining professional AI topics", async () => {
  for (const [path] of [...moduleRoutes, ...detailRoutes]) {
    const html = await (await render(path)).text();
    assert.doesNotMatch(html, /AI\s*生成|AI\s*辅助|Codex\s*辅助/, path);
  }
  assert.match(await (await render("/skills/agent-engineering")).text(), /AI Agent/);
});

test("home server-renders the official-site navigation hierarchy", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  for (const href of [
    "/about/profile", "/research", "/outputs", "/outputs/project-results", "/journey",
    "/insights", "/contact", "/life/running-outdoors", "/life/animation",
  ]) {
    assert.match(html, new RegExp(`href="${href.replaceAll("/", "\\/")}"`), href);
  }
  for (const href of [
    "/about/profile", "/contact", "/projects", "/skills", "/publications",
    "/outputs/project-results", "/education", "/experience", "/honors", "/notes",
    "/thoughts", "/life/running-outdoors", "/life/reading-notes", "/life/travel-walks",
    "/life/culture-objects", "/life/animation",
  ]) {
    const escapedHref = href.replaceAll("/", "\\/");
    assert.match(
      html,
      new RegExp(`href="${escapedHref}"[^>]*data-navigation="document"`),
      `document navigation fallback: ${href}`,
    );
  }
  assert.match(html, /images\/home-p3r\/hero-1920\.webp/);
  for (const abstract of ["commerce", "policy", "tabpfn", "culab"]) {
    assert.match(html, new RegExp(`images/home-p3r/${abstract}-abstract\\.webp`));
  }
  assert.match(html, /images\/home-p3r\/agent-stargazing\.jpg/);
  assert.doesNotMatch(html, /copper-electrowinning-hero/);
  assert.match(html, /研究与工程/);
  assert.equal(
    readAttribute(findTag(html, "link", "rel", "canonical"), "href"),
    "https://xiaoyan-personal-hub.s1encisi.chatgpt.site",
  );
  assert.doesNotMatch(html, /data-design-contract/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});

test("public profiles are usable links and omit unnecessary personal details", async () => {
  for (const path of ["/", "/about/profile", "/contact"]) {
    const html = await (await render(path)).text();
    for (const url of ["https://space.bilibili.com/103442064", "https://github.com/s1encisi", "https://bgm.tv/user/s1encisi"]) {
      const link = findTag(html, "a", "href", url);
      assert.ok(link, `${path}: ${url}`);
      assert.equal(readAttribute(link, "target"), "_blank");
      assert.match(readAttribute(link, "rel") ?? "", /noopener/);
    }
    assert.doesNotMatch(html, /Siping Road|Shanghai 200092|github_pat_/);
    assert.doesNotMatch(html, /douyin\.com\/user\/self|zhipin\.com\/web\/geek\/recommend|trackable_token=/);
    if (path !== "/") {
      for (const url of ["https://steamcommunity.com/profiles/76561198817662858/", "https://www.xiaohongshu.com/user/profile/65f73295000000000600c869", "https://maimai.cn/profile/detail?dstu=248600540", "https://www.douyin.com/user/MS4wLjABAAAAWZujBJd_opt8w_n_PRs2c_8Fqr41sQNg1ANtqttAwjH09VPv7sJSpz0tg-0RaV6Z"]) {
        const link = findTag(html, "a", "href", url);
        assert.ok(link, `${path}: additional owner profile ${url}`);
        assert.equal(readAttribute(link, "target"), "_blank");
        assert.match(readAttribute(link, "rel") ?? "", /noopener/);
      }
    }
  }
  const profile = await (await render("/about/profile")).text();
  assert.match(profile, /Zhezhen Yan/);
  assert.match(profile, /同济大学/);
  assert.match(profile, /https:\/\/github\.com\/langchain-ai\/langchain\/issues\/37713/);
  assert.match(profile, /反馈过 ChatDeepSeek/);
});

test("motion controls have a static server fallback on all themed entry pages", async () => {
  for (const path of ["/", "/life", "/life/animation", "/research"]) {
    const html = await (await render(path)).text();
    assert.match(html, /data-motion="off"/);
    const toggle = findTag(html, "button", "aria-label", "开启动态效果");
    assert.ok(toggle, path);
    assert.equal(readAttribute(toggle, "aria-pressed"), "false");
    assert.match(html, /<h1\b/);
  }
});

test("animation external sources remain distinct from the local archive", async () => {
  const html = await (await render("/life/animation")).text();
  assert.match(html, /2,502/);
  assert.match(html, /2026-09-08/);
  assert.match(html, /平台计数与站内番剧总表分别统计，不相加/);
  for (const id of ["cv44645807", "cv20716673", "cv9912879", "cv6770928"]) {
    assert.ok(findTag(html, "a", "href", `https://www.bilibili.com/read/${id}`));
  }
});

test("all module and portal routes render distinct content", async () => {
  for (const [path, pattern] of moduleRoutes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), pattern, path);
  }
});

test("animation hub exposes four real document-navigation destinations", async () => {
  const response = await render("/life/animation");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const [href] of animationModuleRoutes) {
    const anchor = findTag(html, "a", "href", href);
    assert.ok(anchor, `animation module link: ${href}`);
    assert.equal(readAttribute(anchor, "data-navigation"), "document", `document navigation: ${href}`);
  }
});

test("four fixed animation module pages render distinct content", async () => {
  const rendered = [];
  for (const [path, pattern] of animationModuleRoutes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, pattern, path);
    rendered.push(html);
  }
  assert.equal(new Set(rendered).size, animationModuleRoutes.length, "module pages must not collapse to one document");
});

test("annual recommendation pages preserve source counts and identify title-only list entries", async () => {
  for (const [year, expectedCount] of [["2022", 26], ["2024", 11], ["2025", 10]]) {
    const path = `/life/animation/recommendations/${year}`;
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const recommendationEntries = findTags(html, "article")
      .filter((tag) => readAttribute(tag, "data-recommendation-entry") !== undefined);
    assert.equal(recommendationEntries.length, expectedCount, path);
    if (year === "2025") {
      assert.match(html, /电锯人 蕾塞篇/, path);
      assert.match(html, /年度片单收录/, path);
    }
  }
});

test("animation summaries preserve source boundaries and derive their visible period", async () => {
  const recommendationYears = Object.keys(animationSource.annualRecommendations).map(Number);
  const expectedPeriod = `${Math.min(...recommendationYears)}—${Math.max(...recommendationYears)}`;

  const recommendationIndex = await (await render("/life/animation/recommendations")).text();
  assert.match(recommendationIndex, new RegExp(expectedPeriod), "recommendation period comes from source years");
  assert.match(recommendationIndex, /年度推荐与片单/, "mixed recommendation and title-only records are labeled accurately");
  assert.match(recommendationIndex, /26 条；其中 15 条保留了评价文字，11 条目前仅有作品名/, "2022 written and title-only counts remain explicit");
  assert.match(recommendationIndex, /11 条年度片单记录/, "2024 title-only list is not presented as complete reviews");
  assert.doesNotMatch(recommendationIndex, /11 部完整记录/, "2024 title-only list avoids an unsupported completeness claim");
  assert.match(recommendationIndex, /10 条年度推荐记录中，9 条保留了推荐文字，1 条目前仅有作品名/, "2025 written and title-only counts remain explicit");

  const archiveIndex = await (await render("/life/animation/archive")).text();
  assert.match(archiveIndex, /包含 1,451 条记录，其中有重复文本/, "supplemental count is presented as records rather than unique titles");
  assert.match(archiveIndex, /与主表大量重合/, "supplemental records disclose overlap");
  assert.match(archiveIndex, /单独统计、不与主表相加/, "supplemental records are not presented as additive");
  assert.doesNotMatch(archiveIndex, /早期原始观看笔记/, "supplemental records avoid an unsupported age claim");
});

test("animation review codes are unique and legacy social image URLs remain available", async () => {
  const reviewsHtml = await (await render("/life/animation/reviews")).text();
  const reviewCodes = [...reviewsHtml.matchAll(/<p>(A(?:R|E)\d{2})(?:<!-- -->)?\s*\//g)].map((match) => match[1]);
  assert.equal(reviewCodes.length, 16, "all 16 animation articles expose a code");
  assert.equal(new Set(reviewCodes).size, reviewCodes.length, "animation article codes are unique");
  assert.deepEqual(reviewCodes.slice(0, 2), ["AR08", "AR14"], "dated 2025 reviews remain together at the start");
  assert.deepEqual(reviewCodes.slice(-3), ["AR01", "AR02", "AR12"], "reviews without a source year are grouped at the end");

  for (const fileName of ["og.png", "og-editorial.png", "og-editorial.optimized.png"]) {
    const file = await stat(new URL(`../public/${fileName}`, import.meta.url));
    assert.ok(file.isFile() && file.size > 0, `${fileName}: legacy social image remains available`);
  }
});

test("recommendation and review indexes render accessible local posters lazily", async () => {
  for (const path of [
    "/life/animation/recommendations",
    "/life/animation/recommendations/2025",
    "/life/animation/reviews",
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const posters = findTags(await response.text(), "img")
      .filter((tag) => (readAttribute(tag, "src") ?? "").startsWith("/images/animation/"));
    assert.ok(posters.length > 0, `${path}: posters rendered`);
    posters.forEach((poster, index) => assertLocalPoster(poster, `${path}: poster ${index + 1}`));
  }

  const hubPosters = findTags(await (await render("/life/animation")).text(), "img")
    .filter((tag) => (readAttribute(tag, "src") ?? "").startsWith("/images/animation/"));
  assert.ok(hubPosters.length > 1, "animation hub: featured and secondary posters rendered");
  assertLocalPoster(hubPosters[0], "animation hub: featured poster", "eager");
  hubPosters.slice(1).forEach((poster, index) => assertLocalPoster(poster, `animation hub: secondary poster ${index + 1}`));
});

test("fixed pages emit route-specific canonical and social metadata", async () => {
  const origin = "https://xiaoyan-personal-hub.s1encisi.chatgpt.site";
  for (const [path, title, description] of [
    ["/about", "关于闫哲祯｜Zhezhen Yan", "同济大学资源与环境硕士，以环境工程为基础，研究工业预测、智能优化与 AI Agent 工程。"],
    ["/outputs/project-results", "项目成果｜闫哲祯", "机器学习预测器、ESRL-CMO 优化框架、CuLab 工作台及空间生态分析成果。"],
    ["/life", "生活记录｜闫哲祯", "长跑、科幻阅读、城市观察、摄影与动画，构成研究之外的闫哲祯。"],
    ["/life/animation", "动画观测站｜动画与影评｜小闫", "从 2017 年开始的动画档案：年度推荐、影评原文、番剧总表，以及 Bilibili 与 Bangumi 的公开记录。"],
  ]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const canonical = findTag(html, "link", "rel", "canonical");
    const openGraphUrl = findTag(html, "meta", "property", "og:url");
    const openGraphTitle = findTag(html, "meta", "property", "og:title");
    const openGraphDescription = findTag(html, "meta", "property", "og:description");
    const twitterTitle = findTag(html, "meta", "name", "twitter:title");
    const twitterDescription = findTag(html, "meta", "name", "twitter:description");
    const openGraphImage = findTag(html, "meta", "property", "og:image");

    assert.equal(readAttribute(canonical, "href"), `${origin}${path}`, `${path}: canonical`);
    assert.equal(readAttribute(openGraphUrl, "content"), `${origin}${path}`, `${path}: og:url`);
    assert.equal(readAttribute(openGraphTitle, "content"), title, `${path}: og:title`);
    assert.equal(readAttribute(openGraphDescription, "content"), description, `${path}: og:description`);
    assert.equal(readAttribute(twitterTitle, "content"), title, `${path}: twitter:title`);
    assert.equal(readAttribute(twitterDescription, "content"), description, `${path}: twitter:description`);
    assert.equal(readAttribute(openGraphImage, "content"), `${origin}/og-editorial.jpg`, `${path}: og:image`);
  }
});

test("archive year pages emit route-specific canonical and social metadata", async () => {
  const origin = "https://xiaoyan-personal-hub.s1encisi.chatgpt.site";
  for (const [year, expectedTitle] of [
    ["2026", "2026 年番剧总表｜动画观测站"],
    ["undated", "未标注时间的番剧总表｜动画观测站"],
  ]) {
    const path = `/life/animation/archive/${year}`;
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.equal(readAttribute(findTag(html, "link", "rel", "canonical"), "href"), `${origin}${path}`, `${path}: canonical`);
    assert.equal(readAttribute(findTag(html, "meta", "property", "og:url"), "content"), `${origin}${path}`, `${path}: og:url`);
    assert.equal(readAttribute(findTag(html, "meta", "property", "og:title"), "content"), expectedTitle, `${path}: og:title`);
    assert.equal(readAttribute(findTag(html, "meta", "name", "twitter:title"), "content"), expectedTitle, `${path}: twitter:title`);
    assert.match(html, /<meta[^>]+name="twitter:card"[^>]+content="summary"/i, `${path}: text-only X card`);
    assert.doesNotMatch(html, /property="og:image"/i, `${path}: no inherited OG image`);
  }
});

test("every implemented detail route renders its record and metadata", async () => {
  for (const [path, pattern] of detailRoutes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, pattern, path);
    assert.match(html, /property="og:title"/i, path);
    assert.match(html, /name="twitter:title"/i, path);
    if (path.startsWith("/life/animation/")) {
      const openGraphImage = findTag(html, "meta", "property", "og:image");
      const twitterImage = findTag(html, "meta", "name", "twitter:image");
      const expectedPoster = /^https:\/\/xiaoyan-personal-hub\.s1encisi\.chatgpt\.site\/images\/animation\/posters\/[a-z0-9-]+\.(?:jpe?g|webp)$/i;
      assert.match(html, /<meta[^>]+name="twitter:card"[^>]+content="summary_large_image"/i, `${path}: poster X card`);
      assert.match(readAttribute(openGraphImage, "content") ?? "", expectedPoster, `${path}: real local OG poster`);
      assert.match(readAttribute(twitterImage, "content") ?? "", expectedPoster, `${path}: real local X poster`);
    } else {
      assert.match(html, /<meta[^>]+name="twitter:card"[^>]+content="summary"/i, `${path}: text-only X card`);
      assert.doesNotMatch(html, /property="og:image"/i, `${path}: no record image means no inherited OG image`);
      assert.doesNotMatch(html, /name="twitter:image"/i, `${path}: no record image means no inherited X image`);
    }
  }
});

test("new and legacy animation review URLs remain live", async () => {
  for (const [group, routes] of [
    ["legacy", legacyAnimationReviewRoutes],
    ["new", newAnimationReviewRoutes],
  ]) {
    for (const [path, pattern] of routes) {
      const response = await render(path);
      assert.equal(response.status, 200, `${group}: ${path}`);
      assert.match(await response.text(), pattern, `${group}: ${path}`);
    }
  }
});

test("complete portfolio records are indexable and visitor-facing", async () => {
  for (const path of publicPortfolioRoutes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.doesNotMatch(html, /<meta[^>]+name="robots"[^>]+content="noindex/i, path);
    assert.doesNotMatch(html, /需要提供|资料待完善|当前尚未|尚未获得|档案框架|查看所需资料|未来条目|现有正文/, path);
    assert.match(html, /<h1\b/, path);
    assert.match(html, /<h2\b/, path);
  }
});

test("sitemap includes completed portfolio and animation records", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  const expectedAnimationRoutes = [
    ...animationModuleRoutes.map(([path]) => path),
    ...animationReviewRoutes.map(([path]) => path),
    ...["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"]
      .map((year) => `/life/animation/recommendations/${year}`),
    ...["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "undated"]
      .map((year) => `/life/animation/archive/${year}`),
  ];
  for (const path of [
    "/projects/copper-electrowinning-surrogate",
    "/skills/industrial-process-modeling",
    "/notes/research-methods",
    ...expectedAnimationRoutes,
  ]) {
    assert.match(xml, new RegExp(path.replaceAll("/", "\\/")), `included: ${path}`);
  }
  for (const path of publicPortfolioRoutes) {
    assert.ok(xml.includes(path), "portfolio record included: " + path);
  }
});

test("research and personal pages retain usable parent navigation", async () => {
  for (const [path, parent] of [["/projects/copper-electrowinning-surrogate", "/projects"], ["/skills/agent-engineering", "/skills"], ["/notes/reproducibility", "/notes"], ["/thoughts/life-curiosity", "/thoughts"], ["/life/reading-notes", "/life"]]) {
    const html = await (await render(path)).text();
    assert.ok(findTag(html, "a", "href", parent), path);
    assert.doesNotMatch(html, /status-placeholder|可预览的随想草稿|可预览随想草稿/, path);
  }
});

test("professional identity, publication stages and contact are consistent", async () => {
  const home = await (await render("/")).text();
  assert.match(home, /闫哲祯/);
  assert.match(home, /机器学习、强化学习与智能体工程/);
  const profile = await (await render("/about/profile")).text();
  assert.match(profile, /4\.66/);
  assert.match(profile, /2027/);
  const contact = await (await render("/contact")).text();
  assert.ok(findTag(contact, "a", "href", "mailto:2431509@tongji.edu.cn"));
  const published = await (await render("/publications/publication-record-01")).text();
  assert.match(published, /已发表/);
  assert.match(published, /10\.20237\/j\.issn\.1007-7545\.2025\.09\.002/);
  const revised = await (await render("/publications/publication-record-02")).text();
  assert.match(revised, /Journal of Cleaner Production/);
  assert.match(revised, /修回中/);
  const submitted = await (await render("/publications/wastewater-energy-tabpfn")).text();
  assert.match(submitted, /Water Environment Research/);
  assert.match(submitted, /在审/);
  assert.doesNotMatch(submitted, /Environmental Research<|10\.\d{4,9}\//);
  const optimization = await (await render("/projects/electrolyte-purification-optimization")).text();
  assert.match(optimization, /43\.1%/);
  assert.match(optimization, /50—55 g\/L/);
  assert.match(optimization, /离线代理环境/);
});

test("all rendered website routes omit internal user and placeholder phrasing", async () => {
  const paths = new Set([
    ...moduleRoutes.map(([path]) => path),
    ...detailRoutes.map(([path]) => path),
    ...["2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"]
      .map((year) => `/life/animation/recommendations/${year}`),
    ...["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "undated"]
      .map((year) => `/life/animation/archive/${year}`),
  ]);

  for (const path of paths) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.doesNotMatch(html, /用户原稿|用户提供|待本人|本人确认|由本人补充|由用户|占位内容|占位信息/, path);
  }
});

test("all server-rendered internal page links resolve", async () => {
  const paths = new Set(moduleRoutes.map(([path]) => path));
  for (const [path] of [...moduleRoutes, ...detailRoutes]) {
    const response = await render(path);
    const html = await response.text();
    for (const match of html.matchAll(/href="(\/[^"#?]*)[^"]*"/g)) {
      const href = match[1];
      if (
        href.startsWith("/_") ||
        /\.(?:css|js|map|png|jpe?g|webp|svg|ico|woff2?)$/i.test(href)
      ) continue;
      paths.add(href);
    }
  }

  for (const path of paths) {
    const response = await render(path);
    assert.notEqual(response.status, 404, `broken internal link: ${path}`);
  }
});

test("project detail table-of-contents fragments resolve", async () => {
  for (const [path] of detailRoutes.filter(([route]) => route.startsWith("/projects/"))) {
    const response = await render(path);
    const html = await response.text();
    for (const match of html.matchAll(/href="#([^"]+)"/g)) {
      assert.match(html, new RegExp(`id="${match[1]}"`), `${path}: #${match[1]}`);
    }
  }
});

test("skill methods keep descriptions with their headings", async () => {
  const response = await render("/skills/industrial-process-modeling");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /class="pf-methods"/);
  assert.match(html.replace(/<!--[\s\S]*?-->/g, ""), /<article><small>[^<]+<\/small><h3>[^<]+<\/h3><p>[^<]+<\/p><\/article>/);
});

test("detail routes expose both current page and parent location", async () => {
  const html = await (await render("/life/culture-objects")).text();
  assert.match(html, /href="\/life"[^>]+aria-current="location"/, "life parent location");
  assert.match(html, /href="\/life\/culture-objects"[^>]+aria-current="page"/, "life detail current page");

  const animationHtml = await (await render("/life/animation/hibike-euphonium-rewatch")).text();
  assert.match(animationHtml, /href="\/life"[^>]+aria-current="location"/, "animation life parent location");
  assert.match(animationHtml, /href="\/life\/animation"[^>]+aria-current="location"/, "animation section location");
  assert.match(animationHtml, /来源与公开边界/, "animation review source boundary heading");
  assert.match(animationHtml, /页面保留原文措辞与观点/, "animation review source boundary copy");

  const hathawayHtml = await (await render("/life/animation/mobile-suit-gundam-hathaway-rewatch")).text();
  assert.match(hathawayHtml, /采用《2025推荐动画》中的定稿/, "Hathaway public-source boundary");
  assert.match(hathawayHtml, /采用年度推荐定稿/, "Hathaway uses the final recommendation text");

  const evaHtml = await (await render("/life/animation/evangelion-thrice-upon-a-time")).text();
  assert.match(evaHtml, /2021 年首段在源文件中本就未写完/, "EVA incomplete-source disclosure");
});

test("unknown detail routes return the custom 404", async () => {
  for (const path of [
    "/not-a-real-route",
    "/projects/not-a-real-project",
    "/publications/not-a-real-publication",
    "/skills/not-a-real-skill",
    "/education/not-a-real-education",
    "/experience/not-a-real-experience",
    "/honors/not-a-real-honor",
    "/notes/not-a-real-note",
    "/thoughts/not-a-real-thought",
    "/life/not-a-real-life-record",
    "/life/animation/not-a-real-review",
    "/life/animation/reviews/not-a-real-review",
    "/life/animation/recommendations/not-a-real-year",
    "/life/animation/archive/not-a-real-year",
  ]) {
    const response = await render(path);
    assert.equal(response.status, 404, path);
    assert.match(await response.text(), /这条路径还没有内容/);
  }
});


test("legacy placeholder URLs lead to complete related content", async () => {
  for (const [oldPath, newPath] of [["/life/local-flavors", "/life/culture-objects"], ["/life/coffee-tea", "/life/reading-notes"], ["/honors/academic-research", "/honors/national-encouragement-2021"], ["/honors/competition-practice", "/honors/culture-sports-2021"], ["/honors/growth-service", "/honors/merit-student-2021"]]) {
    const response = await render(oldPath);
    assert.equal(response.status, 308, oldPath);
    assert.equal(new URL(response.headers.get("location"), "http://localhost").pathname, newPath);
    assert.equal((await render(newPath)).status, 200, newPath);
  }
});

test("all public images exist and private source files have no download links", async () => {
  const assets = new Set();
  for (const [path] of [...moduleRoutes, ...detailRoutes]) {
    const html = await (await render(path)).text();
    for (const tag of findTags(html, "img")) {
      const src = readAttribute(tag, "src");
      if (src?.startsWith("/")) assets.add(src);
      assert.ok(readAttribute(tag, "alt"), path + ": image alternative text");
      assert.ok(Number(readAttribute(tag, "width")) > 0, path + ": image width");
      assert.ok(Number(readAttribute(tag, "height")) > 0, path + ": image height");
    }
    assert.doesNotMatch(html, /href="[^"<>]*\.(?:docx?|xlsx?|csv|bundle)(?:[?#"])/i, path);
    assert.doesNotMatch(html, /(?:E|C):[\\/]|身份证|家庭经济情况|原始成绩单|github_pat_/, path);
  }
  assert.ok(assets.has("/images/profile/zhezhen-yan.webp"));
  for (const src of assets) assert.ok((await stat(new URL("../public" + src, import.meta.url))).isFile(), src);
});

test("personal photo stories are reachable, responsive and isolated from private archives", async () => {
  const pages = ["/", "/life", "/life/travel-walks", "/life/culture-objects", "/life/animation", "/about/profile", "/experience/hangzhou-tech-visit", "/experience/jincheng-talent-internship"];
  const rendered = new Map();
  const publicPhotos = new Set();
  for (const path of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    rendered.set(path, html);
    const photos = findTags(html, "img").filter(tag => (readAttribute(tag, "src") ?? "").startsWith("/images/field-notes/"));
    assert.ok(photos.length > 0, `${path}: actual personal photos`);
    for (const tag of photos) {
      const src = readAttribute(tag, "src");
      publicPhotos.add(src);
      const srcSet = readAttribute(tag, "srcSet") ?? "";
      assert.equal(srcSet.split(",").length, 2, `${src}: two responsive variants`);
      assert.ok(readAttribute(tag, "sizes"), `${src}: responsive sizes`);
      for (const candidate of srcSet.split(",")) {
        const match = candidate.trim().match(/^(\/images\/field-notes\/[a-z0-9-]+\.webp) (\d+)w$/);
        assert.ok(match, `${src}: local srcset candidate`);
        const file = await stat(new URL("../public" + match[1], import.meta.url));
        assert.ok(file.isFile() && file.size > 0 && file.size < 500_000, `${match[1]}: optimized photo`);
      }
    }
    assert.doesNotMatch(html, /wxid_|qpic\.cn|video\.qq\.com|media-access|dpapi|my-moments|local[\\/]moments|sns\.db|\b(?:enc|token|authkey)=/i, `${path}: no private archive or access data`);
    for (const tag of findTags(html, "a")) {
      const href = readAttribute(tag, "href") ?? "";
      if (!href.startsWith("/images/field-notes/")) continue;
      assert.equal(readAttribute(tag, "target"), "_blank", `${href}: full-size image`);
      assert.match(readAttribute(tag, "aria-label") ?? "", /新标签页/, `${href}: opening behavior is announced`);
    }
  }
  assert.equal(publicPhotos.size, 22, "22 curated photographs are visible on relevant website pages");
  assert.equal((rendered.get("/life/travel-walks").match(/class="field-story"/g) ?? []).length, 6, "six travel and astronomy stories");
  assert.equal((rendered.get("/life/culture-objects").match(/class="field-story"/g) ?? []).length, 4, "four music and culture stories");
  assert.match(rendered.get("/experience/hangzhou-tech-visit"), /参访参与者/);
  assert.match(rendered.get("/experience/hangzhou-tech-visit"), /参访与观察/);
  for (const path of ["/", "/life"]) assert.doesNotMatch(rendered.get(path), /life-window(?:-768)?\.webp/, `${path}: real life cover replaces illustration`);

  for (const [path, html] of rendered) {
    for (const tag of findTags(html, "a")) {
      const href = readAttribute(tag, "href") ?? "";
      if (!/^\/life\/(?:travel-walks|culture-objects)#/.test(href)) continue;
      const [destination, fragment] = href.split("#");
      assert.ok(findTag(rendered.get(destination), "article", "id", fragment), `${path}: ${href} resolves to a photo story`);
    }
  }
});
