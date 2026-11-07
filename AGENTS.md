# UI 设计体系 协作约定（Codex / Claude 必读）

跨项目复用的 UI 设计能力：设计原则与规范、视觉风格与 Design Tokens 规划、已有设计资产索引、可复用界面模式、界面质量与截图验收标准。进入顺序：本文件 → [CURRENT.md](CURRENT.md)（当前状态与唯一下一步）。需求以 《V1.3 架构定稿》（`/Users/nat/Documents/ChatGPT/个人/work/digital-twin/docs/项目体系重构/2026-11-07-V1.3-ChatGPT架构定稿与工程推进令.md`） 为准。所有面向用户的文字用简体中文。本文件只放怎么开始和做什么事之前读哪份；操作细节在 [docs/OPERATIONS.md](docs/OPERATIONS.md)，按需读对应一节。

## 边界（V1.3 第 2、9 节，2026-11-07 冻结）

- `ui-styles`、`excel-aura` 等可执行 Skill 的正式版本在 my-skills，本仓库只建立引用关系，不另存一份。
- 各产品的界面代码留在各自仓库；两个真实产品出现相同组件需求后，再评估共享组件，不为统一而先建大型组件库。
- 起步先做 UI 资产索引与统一验收清单。

## 做什么事之前读哪份

| 要做的事 | 先读 |
|---|---|
| 改需求、加功能 | 《V1.3 架构定稿》（`/Users/nat/Documents/ChatGPT/个人/work/digital-twin/docs/项目体系重构/2026-11-07-V1.3-ChatGPT架构定稿与工程推进令.md`） |
| 收集或查找 UI 参考、外部组件库 | [docs/references/README.md](docs/references/README.md)（只记链接与评估，不搬代码） |
| 排障、改脚本、装 launchd 或定时任务 | 先 `grep -n 关键词 docs/LESSONS.md`，再搜全局坑 `/Users/nat/Documents/ChatGPT/个人/work/agent-kit/LESSONS.md` |
| 开需求、拆任务、实现、审查 | 下面「Agent skills」一节 |
| 写交接、验收别人的交接 | [docs/templates/handoff.md](docs/templates/handoff.md) 骨架；[OPERATIONS](docs/OPERATIONS.md)「交接写法」「报告与验收」 |

项目长出接口、样式、发布等文档后，在这张表里加一行。

## 分工

- 以用户每轮明确授权的范围为准；授权外的不做。
- 一次只做一件授权的事；范围外的问题记进交接，不顺手修。
- 并行的会话各开独立 worktree，不在同一目录改代码；做不到时照全局坑 G-04，只提交自己的改动。

## 运行

```sh
node --test tests/*.test.mjs     # 交接格式 + 通用规则（含自测）
node scripts/check-rules.mjs     # 只跑通用规则检查
```

## 结构

```
AGENTS.md            入口（本文件）
CURRENT.md           当前状态与唯一下一步；每轮交接写在顶部
docs/
  agents/            Matt Pocock 技能读的约定：issue 看板、分流标签、领域文档
  LESSONS.md         本项目的坑（排障、改脚本前先搜）
  OPERATIONS.md      操作手册：交接写法、报告与验收
  templates/handoff.md  交接一节的骨架
scripts/
  check-rules.mjs    通用规则检查（只查机器能判定的）
tests/               node:test 测试
```

## Agent skills

开发流程用 Matt Pocock skills（`~/.agents/skills/`）：大活走 `to-spec` → `to-tickets` → `implement` / `tdd` → `code-review` → PR；小改（一张 issue、一天内做完）跳过 `to-spec`。Claude 用 `/技能名`，Codex 用 `$技能名`；这几个技能只在点名时加载，不会自动触发。

### Issue tracker

需求、规格与任务用本仓库 GitHub Issues。见 `docs/agents/issue-tracker.md`。

### Triage labels

五个默认分流标签。见 `docs/agents/triage-labels.md`。

### Domain docs

single-context：根目录 `GLOSSARY.md` 与 `docs/adr/`，用到时再建。见 `docs/agents/domain.md`。

改动怎么走、分支怎么起名、交接写在哪、怎么合并：见 `/Users/nat/Documents/ChatGPT/个人/work/agent-kit/工程流程.md`。

## 规则

- 验证用的备份、日志等证据放 `~/Library/Application Support/ui-system/evidence/`，不放 `/tmp`（全局坑 G-01）；私人数据与完整日志不进仓库。
- 本机服务只监听 127.0.0.1；新增依赖先改 `scripts/check-rules.mjs` 的 `ALLOWED_DEPS`，并在交接里说明理由（`check-rules` 会查）。
- 页面上的时间经统一的格式化函数按北京时间显示，不直接截取 ISO 字符串（全局坑 G-02，`check-rules` 会查）。

## 交接格式

每轮完成后，在 CURRENT.md 顶部新增一节（旧节保留在下面，过长时归档到 `docs/history/`），骨架照抄 [docs/templates/handoff.md](docs/templates/handoff.md)；`tests/handoff-format.test.mjs` 会检查顶部一节有没有日期、「时间：开工」「测试：」「本轮新坑：」三行，新坑编号在 LESSONS 里要存在。每一行怎么写、报告与验收的防伪造五条见 [OPERATIONS](docs/OPERATIONS.md)「交接写法」「报告与验收」；没做就写「未做」。
