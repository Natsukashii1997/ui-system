# Issue 看板：GitHub

本仓库的需求、规格和任务都放在 GitHub Issues（`Natsukashii1997/ui-system`），一律用本机已登录的 `gh`，在仓库目录里运行时 `gh` 会自己认出仓库。

## 操作

- 新建：`gh issue create --title "标题" --body-file <正文文件>`。多行正文先写进临时文件再传，不在命令行里转义。
- 读取：`gh issue view <号> --json number,title,body,labels,comments`
- 列表：`gh issue list --state open --json number,title,labels`，按需加 `--label`、`--state`。
- 评论：`gh issue comment <号> --body-file <正文文件>`
- 标签：`gh issue edit <号> --add-label "…"`，去掉用 `--remove-label "…"`。
- 关闭：验收通过后才关，`gh issue close <号> --comment "结果、证据、遗留"`。
- 子任务：`gh issue create --parent <父号> …`；用不了时在子任务正文第一行写 `Part of #<父号>`，父任务里维护清单。
- 依赖：优先用 GitHub 原生的 issue 依赖；用不了时在正文第一行写 `Blocked by: #<号>`。阻塞的 issue 没关之前，不算可以开工。

## PR 算不算需求入口

**否。** 外部 PR 不进分流。

## 技能里的说法怎么对应

- “publish to the issue tracker”：在本仓库建 issue。
- “fetch the relevant ticket”：按上面「读取」拿 issue。
- `$wayfinder` 的地图和子任务用法，照上游模板 `~/.agents/skills/setup-matt-pocock-skills/issue-tracker-github.md` 的「Wayfinding operations」。

建 issue、评论、改标签、关闭都是外部写入，仍以当轮授权为准。
