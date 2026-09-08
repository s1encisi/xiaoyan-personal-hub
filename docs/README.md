# 项目文档索引

这里集中保存会长期影响网站内容、结构和视觉决策的项目文档。

| 文档 | 用途 |
| --- | --- |
| [`PRODUCT.md`](PRODUCT.md) | 网站定位、信息架构、内容边界和验收标准 |
| [`DESIGN.md`](DESIGN.md) | 视觉系统、排版、动效、响应式与可访问性规范 |
| [`CONTENT_GAPS.md`](CONTENT_GAPS.md) | 待补充资料、占位内容和已核实数据口径 |
| [`design-qa.md`](design-qa.md) | 已执行的设计检查、问题与修正记录 |
| [`GITHUB_SYNC.md`](GITHUB_SYNC.md) | GitHub 同步范围、本地资料保护与推送检查 |
| [`CELESTIAL_REDESIGN.md`](CELESTIAL_REDESIGN.md) | 当前个人星图视觉、公开资料来源及外部评审依据 |
| [`animation/design-reference.png`](animation/design-reference.png) | 动画分站最终选用的视觉方向参考 |
| [`animation/poster-sources.json`](animation/poster-sources.json) | 动画海报的匹配记录、公开来源与版权说明 |

## 本地资料与生成产物

- `local/references/`：只用于设计对照的截图或图片。
- `local/reviews/`：其他模型或智能体提供的原始审阅意见。
- `work/`：抓取清单、提取脚本、构建归档等过程文件。
- `output/`：浏览器测试截图和质量检查输出。

`local/`、`work/` 和 `output/` 均不会进入 Git 或公开部署。需要长期保留并与协作者共享的结论，应整理进本目录中的正式文档，而不是直接提交过程材料。
