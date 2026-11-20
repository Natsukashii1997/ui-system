# UI 参考与组件来源

常浩看到好的 UI、组件库、交互动效，就收在这里，作为以后各产品选组件、定风格的参考来源。

**收录规则**
- **只记链接和评估，不搬代码。** 第三方代码、设计、图片、字体的权利归原作者。要复用到某个产品时，先核对原始许可，再在那个产品的仓库里接入，并写明来源。
- **例外：许可明确允许再分发的，可以存原文。** 存的时候附上许可全文，写明来源、下载日期和是否官方出品。存原文前先问常浩。（2026-11-20 常浩确认，第一例是 awesome-design-md，存在 [design-md/](design-md/)。）
- **它的 Skill 不在这里装。** 第三方 Skill 要安装，先按 my-skills 的准入流程审查（`skill-governance-audit`）；GitHub 上的开源项目也可以在 GitHub 中心收藏。
- **状态只有四种**：待评估 → 已试用 → 已采用（写明用在哪个产品）／不采用（写明原因）。

| 名称 | 链接 | 是什么 | 技术栈 | 许可 | 状态 | 收录 |
|---|---|---|---|---|---|---|
| LeiBox | [GitHub](https://github.com/leishifu666/LeiBox) · [在线站](https://leibox.pantoria.cn) | 网页组件、交互与动效收藏：可交互演示加组件文档，导航、卡片、表单、分享、AI 输入、加载反馈、玻璃质感等；另有 LeiBox Skill，可按需检索组件 | 每个组件提供 React / Vue / Svelte / Solid / Preact / Vanilla 版本（以详情页为准） | **未声明开源许可**（GitHub 识别为 NOASSERTION），README 写明「仅供学习使用」，复用要逐个核对来源许可 | 待评估 | 2026-11-08，常浩提供 |
| 歸藏设计系统 | [GitHub](https://github.com/op7418/dsh-guizang-design) | 设计师歸藏的内容排版设计系统：网页 PPT、图文卡片、网页排版三个 skill 共用一套 token，杂志风 6 套、瑞士风 4 套主题，带中文排版规则、配色对比度约束、版式登记和质检脚本 | HTML/CSS 单文件模板 + Node 校验脚本；DeepSeek Harness 插件 | AGPL-3.0（去 AI 味 skill 为 MIT）；卡片 skill 另有商业授权说明 | 待评估 | 2026-11-20，常浩提供；提炼见 [2026-11-20-歸藏设计规范提炼.md](2026-11-20-歸藏设计规范提炼.md) |
| awesome-design-md（DESIGN.md 合集） | [GitHub](https://github.com/VoltAgent/awesome-design-md) · [镜像站](https://design.x-meng.cc/) | 按 Google Stitch 提出的 DESIGN.md 格式，从各品牌公开网站提炼的设计规范合集（上游 84 份，镜像站 59 份），每份九个模块；**不是品牌官方文档** | Markdown + 预览 HTML | MIT | 待评估 | 2026-11-20，常浩提供；提炼见 [2026-11-20-DESIGN.md九模块提炼.md](2026-11-20-DESIGN.md九模块提炼.md) |
| Vercel 官方 design.md | [vercel.com/design](https://vercel.com/design) | Vercel 自己写给 AI 的设计工作说明，管给客户看的报告类网页（报告、提案、对比、计算器）：优先级、何时问人、四遍工作法、构图与克制的判断标准、自查顺序、17 条拒绝清单；色值字号都在配套样式表里 | Markdown + 一份 CSS（Geist 字体） | **未声明许可**，只记链接和解读，原文不进仓库 | 已采用：基础设计规范里 27 条规则以它为出处 | 2026-11-20，常浩提供；解读见 [2026-11-20-Vercel官方design.md解读.md](2026-11-20-Vercel官方design.md解读.md) |

## 条目备注

### LeiBox
- 仓库约 280 MB，GitHub 149 星，2026-11-06 仍在更新。
- 自带 Skill，安装命令是 `npx skills add https://leibox.pantoria.cn --skill leibox`。这是第三方 Skill，**没装**，要装先走 my-skills 准入审查。
- 适合当「交互和动效灵感库」：先在在线站上点开试，觉得对味，再看那个组件的来源和许可。商用或公开发布前，必须拿到授权，或者换成权利清楚的替代实现。

### 歸藏设计系统
- 收它是为了学**怎么写设计规范**，不是为了借用它的审美。提炼出的 27 个约束维度、10 个写法特征，以及做产品界面要补的 11 个维度，见 [2026-11-20-歸藏设计规范提炼.md](2026-11-20-歸藏设计规范提炼.md)。以后写本项目的「设计原则与规范」时拿它当维度清单用。
- 它服务于内容排版（PPT、卡片、长文），交互状态、表单、空态这类产品界面维度没有覆盖。
- AGPL-3.0：模板、样式、脚本不能直接搬进闭源产品；只借鉴方法不受影响。

### awesome-design-md（DESIGN.md 合集）
- 素材来自各品牌的营销官网，有抓取错误和套模板的痕迹；单个数值不要当真，多家一致的规律才可信。
- 58 份按九模块的横向提炼见 [2026-11-20-DESIGN.md九模块提炼.md](2026-11-20-DESIGN.md九模块提炼.md)，分模块笔记在 [design-md-notes/](design-md-notes/)。
- 本机已装同源技能 `awesome-design-md`（74 份，版本比镜像站新），要照某个品牌的风格做页面时直接用技能。
- 原文已存进 [design-md/](design-md/)（59 个品牌，每个 4 个文件，共约 4.4 MB，2026-11-20 常浩确认）。说明和品牌清单见该目录的 README。

### Vercel 官方 design.md
- 品牌方自己写的，和 awesome-design-md 里从官网反推的那份 Vercel 不是一回事，以这份为准。
- 管的是报告类网页，明说不是产品界面；表单流程、导航、空态这些它没有覆盖。
- 解读、和基础规范各条的对应、还没收进规范的 7 点、不要照搬的部分，见 [2026-11-20-Vercel官方design.md解读.md](2026-11-20-Vercel官方design.md解读.md)。
- 下载的原文和样式表在 `~/Sandbox/2026-11-20-vercel-design/`（本机，不进仓库）。
