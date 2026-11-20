# 当前状态

当前阶段目标：完成 UI 资产索引与统一验收清单（I-UI-1）。（2026-11-08 常浩确认，digital-twin#114）

更新：2026-11-08。V1.3 定的 A 方案维持：本项目只做 UI 总目录与规范，UI Skill 留在 my-skills，组件代码留在各产品仓库；另开「UI 参考与组件来源」收集好的外部 UI，已收 1 条（LeiBox）。唯一下一步：做 UI 资产索引与统一验收清单（执行单 I-UI-1）。

## 推送前钩子：从 worktree 推送不再把测试的 git 操作落到本仓库（2026-11-20，Claude，常浩回「停用并修」；已提交、PR 待合并，无需发布）

- 时间：开工 `2026-11-20 11:36`。★ 来由：今天装的推送前钩子（骨架 0.4.0）从 worktree 推送时，git 把本仓库的位置（`GIT_DIR`）带进钩子，钩子跑的 `tests/hooks.test.mjs` 在临时目录建仓库、提交、推送都继承了它。临时仓库实测：推送的分支多出测试的 3 个提交，主目录变成裸仓库、不能用，测试却全过。本仓库 11:36 检查时还没中招，钩子已临时停用。
- 改了哪些文件：`scripts/hooks/pre-push`（跑检查前 `unset $(git rev-parse --local-env-vars)`）、`tests/hooks.test.mjs`（自己的 git 调用不继承这些变量；新增一条从 worktree 真推的用例，旧钩子下失败）。和骨架 0.4.1（my-skills#116）一致。
- 测试：在本 worktree 里 `sh scripts/hooks/pre-push`（规则检查加本项目的测试命令）退出码 0：`通用规则检查通过`，`node --test tests/*.test.mjs` 原样 `ℹ pass 10` / `ℹ fail 0`；`node --test tests/hooks.test.mjs` 单跑 `ℹ pass 4` / `ℹ fail 0`，换回旧钩子时新用例失败（在骨架上验证，见 my-skills#116）。
- 验证环境：替身（临时 git 仓库、本机裸仓库、真实的 worktree 和推送）。本仓库的 `core.hooksPath` 现在是停用状态，本 PR 合并、主目录更新后再装回，装后从 worktree 真推一次再算验收。
- 外部前提与实测：依赖 git 在 worktree 里给钩子带 `GIT_DIR`、以及 `git rev-parse --local-env-vars` 列出要清的变量，都在临时仓库实测过。
- 与授权不一致之处、遗留问题、范围外发现：停用钩子用的是 `git config --unset core.hooksPath`，装回是 `git config core.hooksPath scripts/hooks`。
- 本轮新坑：无（跨项目的坑，已向常浩提全局坑提案，未写入）。

## 装提交、推送前的必经检查钩子（2026-11-20，Claude，常浩批复盘 P4、P6「批（按改过的）」；已提交、PR 待合并，无需发布）

- 时间：开工 `2026-11-20 11:02`。★ 来由：跨项目复盘 P6「检查脚本接进必经环节」：没有 CI 的仓库装 pre-push 钩子；P4 的 commit-msg 钩子一起装。钩子来自起步骨架 0.4.0（my-skills#112）。
- 改了哪些文件：`scripts/hooks/pre-push`（推送前跑 `node scripts/check-rules.mjs` 和 `node --test tests/*.test.mjs`）、`scripts/hooks/commit-msg` + `commit-msg.mjs`（修复类提交正文要有「同类：」一行）、`tests/hooks.test.mjs`（单测 + 临时仓库真跑）、`AGENTS.md`（加安装命令 `git config core.hooksPath scripts/hooks`）；本文件。
- 测试：`node --test tests/hooks.test.mjs` 原样 `ℹ pass 3` / `ℹ fail 0`；在本 worktree 里 `sh scripts/hooks/pre-push` 退出码 0（证据 `~/session-retro/2026-10-18_2026-11-18/evidence/p6-hooks/ui-system.txt`）。
- 验证环境：替身（临时 git 仓库、本机裸仓库）；本仓库的 `core.hooksPath` 合并后才在本机装，装后真推一次再算验收。
- 外部前提与实测：依赖 git 的 `core.hooksPath` 和钩子退出码，已在临时仓库实测。
- 与授权不一致之处、遗留问题、范围外发现：无。
- 本轮新坑：无。

## LESSONS 升级行补层级词、加规则检查（2026-11-19，Claude，跨项目复盘收尾子 agent，常浩批了「老项目接入 LESSONS 升级行检查：一次补齐」；已提交到 `claude/lessons-level`、PR 待合并、无需发布）

- 时间：开工 `2026-11-19 10:18`（`date '+%F %H:%M'` 记录）。来由：跨项目复盘 D 批，各项目 LESSONS 的「升级」行统一带层级词，并由规则检查守住。
- 改了哪些文件：`scripts/check-rules.mjs`（加 `lessons` 规则：每条 `## L-xx` 要有以〔结构〕〔机检〕〔体检〕〔文字〕〔提醒〕开头的「- 升级：」一行，写法照起步骨架）；`tests/check-rules.test.mjs`（加 1 条测试：缺升级行、升级行不带层级词各报一次，格式样例和合规条目不误报）；`docs/LESSONS.md`（「怎么升级」补一条层级词要求，格式样例改成「〔提醒〕未升级。」，与起步骨架一致）；本仓库 LESSONS 还没有真实条目，规则在真实文件上为绿。另修起步骨架带来的漏报：判断占位标题前先去掉反引号里的内容（标题里的 `<all_urls>` 之类原来会让整条不查），写法同 chatgpt-clipper#10（`cd80285`），并加 1 条测试；骨架本身由主会话另行处理。本节交接。
- 测试：`node --test tests/*.test.mjs` 改前 `ℹ pass 4` / `ℹ fail 0`，改后 `ℹ pass 6` / `ℹ fail 0`；`node scripts/check-rules.mjs` 改前改后都输出 `通用规则检查通过`。
- 验证：在 worktree `~/Sandbox/worktrees/ui-system-lessons-level` 里跑；改前改后日志在 `~/Library/Application Support/ui-system/evidence/2026-11-19-lessons-level/`。
- 截图：无。
- 发布与回读：无需发布。
- 与授权不一致之处、遗留问题、范围外发现：规则检查没有接进 CI 或提交前钩子，只在手动跑测试时生效（照实记录，没为此改结构）。
- 本轮新坑：无。

## 新增 UI 参考收集：收录 LeiBox（2026-11-08，Claude，常浩说「A 维持……不断地把好的东西收集起来，LeiBox 这套免费的组件库加到我的 ui-system 去」；已提交并推送、无需发布）

- 时间：开工 `2026-11-08 01:22`（`date '+%F %H:%M'` 记录）。来由：常浩确认维持 V1.3 的 A 方案，并要求本项目持续收集好的 UI 与组件参考。
- 改了哪些文件：新增 `docs/references/README.md`（收录规则加第一条 LeiBox）；`AGENTS.md` 导航表加一行；本文件。
- 测试：`node --test tests/*.test.mjs` 原样结果 `ℹ pass 4` / `ℹ fail 0`；`node scripts/check-rules.mjs` 输出 `通用规则检查通过`。
- 验证：用 `gh api` 读了 LeiBox 的仓库信息和 README：许可是 NOASSERTION，README 写明「仅供学习使用」，仓库约 280 MB。所以只记链接和评估，不把代码搬进本仓库。
- 截图：无。
- 发布与回读：无需发布。
- 与授权不一致之处、遗留问题、范围外发现：LeiBox 自带的 Skill 没安装，要装须走 my-skills 准入；常浩说的「把好的 UI 收集起来」，后续每条都照 `docs/references/README.md` 的规则追加。
- 本轮新坑：无。

## 项目起步：建仓与协作骨架（2026-11-07，Claude，常浩转来 V1.3 定稿并要求按批次推进，首批含本项目骨架；已提交并推送、无需发布）

- 时间：开工 `2026-11-07 21:56`（`date '+%F %H:%M'` 记录）。来由：《项目体系重构 V1.3》新增能力项目，执行单 I-UI-0。
- 改了哪些文件：用「项目起步」铺骨架：`AGENTS.md`（含边界一节）、`CURRENT.md`、`docs/LESSONS.md`、`docs/OPERATIONS.md`、`docs/templates/handoff.md`、`docs/agents/` 三份、`tests/handoff-format.test.mjs`、`scripts/check-rules.mjs` 与 `tests/check-rules.test.mjs`、`.github/pull_request_template.md`。
- 测试：`node --test tests/*.test.mjs` 原样结果 `ℹ pass 4` / `ℹ fail 0`；`node scripts/check-rules.mjs` 输出 `通用规则检查通过`。
- 验证：推送后回读仓库为私有、只允许 squash、合并后删分支、5 个分流标签在。
- 截图：无。
- 发布与回读：无需发布。
- 与授权不一致之处、遗留问题、范围外发现：执行单见 `digital-twin/docs/项目体系重构/2026-11-07-V1.3技术确认与分仓执行单.md`。
- 本轮新坑：无。
