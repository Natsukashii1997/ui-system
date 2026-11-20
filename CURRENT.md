# 当前状态

当前阶段目标：完成 UI 资产索引与统一验收清单（I-UI-1）。（2026-11-08 常浩确认，digital-twin#114）

更新：2026-11-20。V1.3 定的 A 方案维持：本项目只做 UI 总目录与规范，UI Skill 留在 my-skills，组件代码留在各产品仓库；另开「UI 参考与组件来源」收集好的外部 UI，已收 4 条（LeiBox、歸藏设计系统、awesome-design-md、Vercel 官方 design.md）；基础设计规范 v0.3 已由常浩确认（`docs/design-spec/DESIGN.md`）。唯一下一步：做 UI 资产索引与统一验收清单（执行单 I-UI-1）。

## 基础设计规范 v0.3 确认并入库，补 Vercel 解读和已定内容登记表（2026-11-20，Claude 接手会话，常浩回「确认 v0.3」「都按推荐」「合并」；已提交，PR #8 合并，无需发布）

- 时间：开工 `2026-11-20 17:23`。★ 来由：接上一节的交接，把规范定下来并入库。
- 改了哪些文件：`docs/design-spec/DESIGN.md`（由 `DESIGN.draft.md` 改名；状态行改成常浩已确认，附录 B 改成「还没校验的部分」并把「4 级」对齐成「4 档」，依据行链到 Vercel 解读）；`docs/design-spec/audits/2026-11-20-规范调整对比.html`（页尾路径和「仍是草案」两处说法改成已确认，已重新发布到原链接第 2 版）；新增 `docs/references/2026-11-20-Vercel官方design.md解读.md`（结构、和规范各条的对应、还没收进规范的 7 点、不要照搬的部分；原文没有许可声明，不进仓库）；`docs/references/README.md`（加 Vercel 一行和条目备注）；新增 `docs/DECIDED.md`（登记「可存原文」和 v0.3 两项，已登记 DECIDED.md）；`AGENTS.md`（导航加「判断某处算不算已定」，规范一行改路径，结构说明补 `DECIDED.md`、`design-spec/`、`references/`）；本文件。
- 测试：在 worktree `~/Sandbox/worktrees/ui-system-guizang-extract` 里跑 `node --test tests/*.test.mjs`，原样结果 `ℹ pass 11` / `ℹ fail 0`；`node scripts/check-rules.mjs` 输出 `通用规则检查通过`。
- 验证：对比页复查两处（页首标题断成两行、小节标题无孤字，演示一上下两块排版正常，1440 宽无横向溢出、控制台无报错），属替身通过：本机给仓库里这份 HTML 套了 UTF-8 外壳看的，线上页要登录没打开；重新发布后的第 2 版没有再看，只改了三处文字。Vercel 解读对照 `~/Sandbox/2026-11-20-vercel-design/design.md` 原文写，样式表只看了公开的令牌名。
- 截图：`~/Library/Application Support/ui-system/evidence/2026-11-20-compare-recheck/`（`01-页首标题-1440.jpg`、`02-演示一上下排-1440.png`）。
- 发布与回读：无需发布。
- 与授权不一致之处、遗留问题、范围外发现：**规则和现状对不上**：上一节交接和 2026-11-07 建仓记录都写仓库是私有，2026-11-20 17:35 用 `gh api repos/Natsukashii1997/ui-system` 回读是 `"private":false`，匿名访问返回 200。常浩 2026-11-20 回「保持公开」，过目删改清单后回「按清单改」（经 Agent HUD 送达）：删掉歸藏提炼第 6 节的口述原话，规范 Q-02 的出处和歸藏提炼两处点名的例子改成不点名的说法（规则内容没变），去掉两处和本项目无关的话。工程流程第 5 节按「私有仓库」写内容边界，和现状对不上，没动，留给常浩定。Vercel 解读第 3 节列的 7 点要不要收进规范，等常浩定。
- 主线「自己的设计规范」（完成 14/16，2026-11-20 17:48 更新）：✅ 歸藏提炼；✅ 归位；✅ Vercel design.md 解读（已写进仓库）；✅ 九模块提炼；✅ 59 个品牌原文入库；✅ 草案 v0.1（选风格，被否）；✅ 重写为风格无关的 v0.2；✅ 试查数字分身工作台首页；✅ 按试查调 6 处成 v0.3；✅ 前后对比页（`docs/design-spec/audits/2026-11-20-规范调整对比.html`，线上 https://claude.ai/artifact/KuBShvbRcDY4ow4RmnmrQD ）；✅ 常浩确认 v0.3；✅ Vercel 解读写进仓库（常浩回「都按推荐」）；✖ 三版视觉方向预览（常浩说明不锁定风格）；✅ 合并 PR #8（常浩 2026-11-20 回「合并」，经 Agent HUD 送达；issue #7）；📌 拿一张被否的页面反向验证；📌 可机检的红线加进 ui-preflight。
- 本轮新坑：无。

## 58 份 DESIGN.md 按九模块提炼，起草设计规范草案（2026-11-20，Claude，常浩要求把 design.x-meng.cc 的 design.md 都下载、存入设计仓库、提炼总结并提炼自己的设计规范，按小红书帖子的九模块梳理；未提交、无需发布）

- 时间：开工 `2026-11-20 16:19`。★ 来由：常浩要提炼自己的设计规范，指定按 DESIGN.md 九模块框架梳理各品牌的规范。
- 改了哪些文件：新增 `docs/references/2026-11-20-DESIGN.md九模块提炼.md`（逐模块的共识、分歧、缺口）；新增 `docs/references/design-md-notes/`（7 份分模块笔记，子 agent 写）；新增 `docs/design-spec/DESIGN.md`（基础设计规范 v0.3，起草时文件名是 `DESIGN.draft.md`，常浩确认后改名，与风格无关，55 条规则、11 条红线；v0.1 让常浩选风格，常浩当天纠正「要的是底层一致性，不限定风格」后重写）；新增 `docs/references/design-md/`（59 个品牌的原文和预览页，237 个文件约 4.4 MB，附 MIT 许可和说明；常浩 2026-11-20 回「改，全部存」）；`docs/references/README.md`（加 awesome-design-md 一行和条目备注，收录规则补「许可允许时可存原文」的例外）；新增 `docs/design-spec/audits/2026-11-20-数字分身工作台首页.md`（拿常浩定稿的首页试查规范：构图和对齐类红线全过，查出对比度 36 处不够、三分之一文字小于 12px，另有 6 处规则要调，常浩回「按建议调」后已改进 v0.3）；新增 `docs/design-spec/audits/2026-11-20-规范调整对比.html`（六处调整的原版、调整后和页面演示，细线风格）；`AGENTS.md`（导航表加「写或改设计规范」一行）；本文件。
- 测试：在 worktree `~/Sandbox/worktrees/ui-system-guizang-extract` 里跑 `node --test tests/*.test.mjs`，原样结果 `ℹ pass 11` / `ℹ fail 0`；`node scripts/check-rules.mjs` 输出 `通用规则检查通过`。
- 验证：59 个品牌的文件下载到 `~/Sandbox/2026-11-20-xmeng-design/md/`，235/236 个文件有内容（Warp 的 DESIGN.md 在站点上是空文件）；子 agent 的数字由主会话用脚本抽核 12 处，个别相差 1–2 家。草案里的中文排版数值、正文字号、标题字重没有在真实界面里验证。
- 截图：无。
- 发布与回读：无需发布。
- 与授权不一致之处、遗留问题、范围外发现：存原文改了参考目录「只记链接」的规则，已先发改动确认，常浩回「改，全部存」后才做，规则里补了例外条款；Warp 的 DESIGN.md 在镜像站是空文件，用本机技能里的版本补上；本项目还没有 `docs/DECIDED.md`，这次的决定暂记在参考目录的规则里；Vercel 官方 design.md 的解读还没写进仓库；基础设计规范草案未经常浩确认，附录 B 列了 4 项待确认，建议数值和中文排版数值没有在真实界面里验证。
- 主线清单：见上面 2026-11-20 接手会话那一节（以那里为准）。
- 本轮新坑：无。

## 收录歸藏设计系统，并提炼「设计规范该约束哪些维度」（2026-11-20，Claude，常浩要求提炼歸藏的设计思路、存进 UI 设计体系后说「归位」；未提交、无需发布）

- 时间：开工 `2026-11-20 16:09`。★ 来由：常浩要提炼自己的设计规范，卡在不知道该从哪些维度约束，要求从歸藏的设计系统里提炼思路，不照搬审美。
- 改了哪些文件：新增 `docs/references/2026-11-20-歸藏设计规范提炼.md`（6 层 27 个约束维度、10 个写法特征、不要照搬的部分、产品界面要补的 11 个维度、规范目录模板和起步顺序）；`docs/references/README.md`（表格加一行，加「歸藏设计系统」条目备注）；本文件（更新行的收录数和日期，加本节）。
- 测试：在 worktree `~/Sandbox/worktrees/ui-system-guizang-extract` 里跑 `node --test tests/*.test.mjs`，原样结果 `ℹ pass 11` / `ℹ fail 0`；`node scripts/check-rules.mjs` 输出 `通用规则检查通过`。
- 验证：读的是 `op7418/dsh-guizang-design` 提交 `e275f1e` 的浅克隆（`~/Sandbox/2026-11-20-guizang-design/repo`）；读了哪些文件、没读哪些，写在提炼文档开头。
- 截图：无。
- 发布与回读：无需发布。
- 与授权不一致之处、遗留问题、范围外发现：歸藏仓库是 AGPL-3.0，本文只提炼方法，没搬代码；提炼文档里点名的个人例子，推送前已改成不点名的说法（见上面接手会话一节）。
- 本轮新坑：无。

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
