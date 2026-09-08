# GitHub 同步与本地资料

本项目的 GitHub 目标是 `s1encisi/xiaoyan-personal-hub` 私密仓库。

## 主分支与历史

- 日常开发和 GitHub 同步统一使用本地 `main`，对应 `origin/main`；本地和远端仅保留 `main` 分支。
- `typography-refine`、`typography-harmony` 和 `workbuddy/main-65d8524d` 的全部已提交改动已合并；两个排版分支呈线性继承关系，没有舍弃独有改动。
- 旧历史包含原始内容文件。GitHub 的 `main` 从包含完整合并结果的安全快照开始，原提交保存在本地 `refs/local-backups/merged-before-github-20260908` 和完整备份 `local/git-backups/before-main-sync-20260908.bundle` 中；这些历史与原始文件不上传。
- 新版网站分支 `codex/celestial-redesign` 的提交 `942bc43` 已完整合入 `main`。
- 2026-09-08 清理全部四个非 `main` 分支前，另存并验证了完整备份 `local/git-backups/before-branch-cleanup-20260908-224533.bundle`。原 WorkBuddy 工作区保留在原提交的 detached HEAD 状态，已有文件未删除。
- 后续新开发从当前 `main` 开始。需要恢复旧历史时使用本地备份，不要将包含原始资料的完整旧历史合入或推送到 GitHub。

## 内容边界

仓库包含网站源代码、依赖锁文件、公开页面所用内容与图片、设计规范和测试。

以下资料仅留在本地：

- `app/_data/animation/source-content.json`：原始汇总文件，包含未逐条公开的补充观看记录。
- `.impeccable/`、`local/`：设计过程文件、参考资料和外部审阅意见。
- `work/`、`output/`、`outputs/`、构建产物、依赖与工具缓存。
- Excel、CSV/TSV、原始数据集、数据库文件、原始 Office/PDF 文档和压缩包。
- 环境变量、私钥、凭据文件，以及标记为保密或隐私的文件。

动画页面从 `public-content.json` 读取所需内容。该文件仅保留页面已展示的字段，未公开补充记录只保留总数量，原始来源清单不进入快照。`scripts/export-public-animation.mjs` 使用明确字段列表生成快照，不修改本地原稿。新增内容仍需先审阅公开范围。

## 后续同步

当前仓库使用推送检查。新克隆的工作区需运行一次：

```powershell
git config core.hooksPath .githooks
```

每次同步前，审阅 `git diff`，只暂存本次需要提交的文件。可提前运行：

```powershell
node scripts/check-github-upload.mjs HEAD
```

检查会扫描待推送分支的完整可达历史，阻止已禁止的路径和常见凭据格式。它也会检查已提交、后来删除的文件；`.gitignore` 本身不能从历史中排除这些内容。自动检查不能判断全部业务保密语义，新增研究材料需人工审阅。

日常提交后使用 `git push` 同步 `main`。不要使用 `git push --all`、`git push --mirror` 或跳过钩子。需要同步旧分支的后续改动时，在当前 `main` 重新应用经过审阅的改动，不引入旧历史。
