import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const animationSource = JSON.parse(
  await readFile(new URL("../app/_data/animation/public-content.json", import.meta.url), "utf8"),
);

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
  ["/", /从复杂过程/],
  ["/about", /我关注工业问题与/],
  ["/about/profile", /把模型放回工艺/],
  ["/contact", /在这里，/],
  ["/research", /选择阅读路径/],
  ["/projects", /4(?:<!-- -->)? 个相互连接的方向/],
  ["/outputs", /一条完整证据链/],
  ["/outputs/project-results", /四条研究议程的证据准备状态/],
  ["/publications", /每条成果记录会回答四组问题/],
  ["/skills", /四个方向，一条闭环/],
  ["/journey", /当前研究问题可以沿一条连贯的方法路径展开/],
  ["/education", /一段教育经历需要回答四类问题/],
  ["/experience", /从“参加过”走向“我具体做了什么”/],
  ["/honors", /每项荣誉都需要四层信息/],
  ["/insights", /两种互补的记录方式/],
  ["/notes", /4(?:<!-- -->)? 组持续更新的主题/],
  ["/thoughts", /缓慢生长的想法/],
  ["/life", /研究之外，保持具体/],
  ["/life/animation", /让故事，/],
  ...animationModuleRoutes,
];

const detailRoutes = [
  ["/projects/copper-electrowinning-surrogate", /铜电积过程的代理建模/],
  ["/projects/electrolyte-purification-optimization", /电解液净化的多目标优化/],
  ["/projects/safe-reinforcement-learning", /约束场景下的安全强化学习/],
  ["/projects/causal-explainable-industrial-ai", /可解释与因果工业智能/],
  ["/publications/publication-record-01", /建立正式论文记录需要什么/],
  ["/publications/publication-record-02", /建立公开研究报告需要什么/],
  ["/skills/industrial-process-modeling", /工业过程建模/],
  ["/skills/multi-objective-optimization", /多目标优化/],
  ["/skills/safe-reinforcement-learning", /安全强化学习/],
  ["/skills/explainable-causal-ml", /可解释与因果机器学习/],
  ["/education/masters-stage", /硕士研究阶段/],
  ["/experience/masters-research", /硕士研究阶段/],
  ["/honors/academic-research", /学术与科研记录/],
  ["/honors/competition-practice", /竞赛与实践记录/],
  ["/honors/growth-service", /成长与服务记录/],
  ["/notes/research-methods", /研究方法/],
  ["/notes/modeling-optimization", /建模与优化/],
  ["/notes/academic-writing", /论文与表达/],
  ["/notes/reproducibility", /工具与复现/],
  ["/thoughts/research-boundaries", /复杂之前，先把边界说清楚/],
  ["/thoughts/method-failure", /比平均指标更重要的/],
  ["/thoughts/life-curiosity", /认真生活/],
  ["/life/local-flavors", /地方风味与认真吃饭/],
  ["/life/coffee-tea", /咖啡、茶与慢时刻/],
  ["/life/travel-walks", /旅行、散步与临时起意/],
  ["/life/culture-objects", /电影、动画、音乐与好东西/],
  ...animationReviewRoutes,
];

const placeholderDetailRoutes = [
  "/publications/publication-record-01",
  "/publications/publication-record-02",
  "/education/masters-stage",
  "/experience/masters-research",
  "/honors/academic-research",
  "/honors/competition-practice",
  "/honors/growth-service",
  "/thoughts/research-boundaries",
  "/thoughts/method-failure",
  "/thoughts/life-curiosity",
  "/life/local-flavors",
  "/life/coffee-tea",
  "/life/travel-walks",
  "/life/culture-objects",
];

test("home server-renders the official-site navigation hierarchy", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  for (const href of [
    "/about/profile", "/research", "/outputs", "/outputs/project-results", "/journey",
    "/insights", "/contact", "/life/local-flavors", "/life/animation",
  ]) {
    assert.match(html, new RegExp(`href="${href.replaceAll("/", "\\/")}"`), href);
  }
  for (const href of [
    "/about/profile", "/contact", "/projects", "/skills", "/publications",
    "/outputs/project-results", "/education", "/experience", "/honors", "/notes",
    "/thoughts", "/life/local-flavors", "/life/coffee-tea", "/life/travel-walks",
    "/life/culture-objects", "/life/animation",
  ]) {
    const escapedHref = href.replaceAll("/", "\\/");
    assert.match(
      html,
      new RegExp(`href="${escapedHref}"[^>]*data-navigation="document"`),
      `document navigation fallback: ${href}`,
    );
  }
  assert.match(html, /copper-electrowinning-hero\.webp/);
  assert.match(html, /copper-electrowinning-hero-768\.webp 768w/);
  assert.match(html, /copper-electrowinning-hero-1200\.webp 1200w/);
  assert.match(html, /研究议程/);
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
  }
  const profile = await (await render("/about/profile")).text();
  assert.match(profile, /Zhezhen Yan/);
  assert.match(profile, /Tongji University/);
  assert.match(profile, /https:\/\/github\.com\/langchain-ai\/langchain\/issues\/37713/);
  assert.match(profile, /不代表补丁已被合并/);
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

test("annual recommendation pages preserve source counts and explicit missing-review state", async () => {
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
      assert.match(html, /完善条目需要提供推荐理由/, path);
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
    ["/about", "关于我｜小闫", "了解小闫的研究命题、工作准则与当前关注方向。"],
    ["/outputs/project-results", "项目成果｜小闫", "小闫研究主题的成果索引；性能、论文、代码与工业验证仅在核实后公开。"],
    ["/life", "生活记录｜小闫", "关于动画、味道、咖啡、散步与日常好物，慢慢收集具体的喜欢。"],
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

test("unconfirmed previews are noindex but remain followable", async () => {
  for (const path of placeholderDetailRoutes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /<meta[^>]+name="robots"[^>]+content="noindex, follow"/i, path);
  }

  for (const path of [
    "/projects/copper-electrowinning-surrogate",
    "/skills/industrial-process-modeling",
    "/notes/research-methods",
    "/life/animation/anime-journey-since-2017",
  ]) {
    const response = await render(path);
    assert.doesNotMatch(await response.text(), /<meta[^>]+name="robots"[^>]+content="noindex/i, path);
  }
});

test("sitemap includes indexable records and excludes unconfirmed previews", async () => {
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
  for (const path of placeholderDetailRoutes) {
    assert.doesNotMatch(xml, new RegExp(path.replaceAll("/", "\\/")), `excluded: ${path}`);
  }
});

test("research and insight pages expose their parent hierarchy and draft status", async () => {
  for (const path of [
    "/projects",
    "/projects/copper-electrowinning-surrogate",
    "/skills",
    "/skills/industrial-process-modeling",
  ]) {
    const response = await render(path);
    assert.match(await response.text(), /href="\/research"[^>]*>研究中心<\/a>/, path);
  }

  for (const path of ["/notes", "/notes/research-methods"]) {
    const response = await render(path);
    assert.match(await response.text(), /href="\/insights"[^>]*>记录与洞察<\/a>/, path);
  }

  const notes = await (await render("/notes")).text();
  assert.match(notes, /正在理解、验证与实践/);
  assert.doesNotMatch(notes, /理解过、验证过和实践过/);

  const insights = await (await render("/insights")).text();
  assert.match(insights, /可预览的随想草稿/);
  assert.match(insights, /status-badge status-placeholder[^>]*>资料待完善/);

  const thoughts = await (await render("/thoughts")).text();
  assert.match(thoughts, /可预览随想草稿/);
  assert.match(thoughts, /当前内容不作为学术结论/);
  assert.match(thoughts, /status-badge status-placeholder[^>]*>资料待完善/);
});

test("incomplete sections state the exact information required without internal user-facing copy", async () => {
  const requirements = [
    ["/contact", /常用邮箱、ORCID、Google Scholar/],
    ["/education/masters-stage", /学校、学院、专业、学位层次/],
    ["/experience/masters-research", /机构、团队、角色、地点和准确起止时间/],
    ["/honors/academic-research", /证书、官方获奖名单或可公开查询的链接/],
    ["/publications/publication-record-01", /DOI、出版社页面、预印本/],
    ["/life/local-flavors", /店铺准确名称、城市、地址和到访日期/],
    ["/skills/industrial-process-modeling", /实际使用过的 Python\/R\/MATLAB 等语言/],
    ["/thoughts/research-boundaries", /最终标题、正文、写作日期和主题标签/],
    ["/life/animation/recommendations/2025", /推荐理由、观看感受/],
  ];

  for (const [path, expected] of requirements) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, expected, path);
    assert.doesNotMatch(html, /用户原稿|用户提供|待本人|本人确认|由本人补充|由用户|占位内容|占位信息/, path);
  }
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

test("skill method descriptions remain grouped with their headings", async () => {
  const response = await render("/skills/industrial-process-modeling");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /class="skill-layer-copy"/);
  assert.match(html, /class="skill-layer-copy"><h3>[^<]+<\/h3><p>[^<]+<\/p><\/div>/);
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
  assert.match(hathawayHtml, /只采用《2025推荐动画》中的定稿/, "Hathaway public-source boundary");
  assert.match(hathawayHtml, /候选与 AI 辅助草稿/, "Hathaway excluded drafts");

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
