# 当前状态

更新：2026-11-08。V1.3 定的 A 方案维持：本项目只做 UI 总目录与规范，UI Skill 留在 my-skills，组件代码留在各产品仓库；另开「UI 参考与组件来源」收集好的外部 UI，已收 1 条（LeiBox）。唯一下一步：做 UI 资产索引与统一验收清单（执行单 I-UI-1）。

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
