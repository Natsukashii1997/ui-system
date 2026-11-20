import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { checkMessage } from '../scripts/hooks/commit-msg.mjs';

// scripts/hooks 下的两个钩子（复盘 P4、P6）：commit-msg 查修复类提交的「同类：」一行，pre-push 跑规则检查和测试。
// 真跑的用例在临时仓库里装钩子（core.hooksPath），不碰本项目的 .git。

test('commit-msg：修复类提交没写「同类：」就拒绝，其余不查', () => {
  // 复盘 B 类「修一处，不修同类」样本：agent-autoloop #280 的提交（d26c7f2，只修了插件里的两处截断），说明节选
  const pr280 = "fix(sources): cap an event's words without splitting a character (#280)\n\nThe GitHub and GitLab source plugins cut summary and detail with\nslice(0, 200) and slice(0, 4000) ...\n";
  assert.match(checkMessage(pr280), /缺一行「同类：/);
  assert.match(checkMessage('修：页面时间少了 8 小时\n'), /缺一行「同类：/);
  assert.match(checkMessage('Fix(ui): 表头不齐\n\n同类：\n'), /缺一行「同类：/, '同类后面没写内容也不算');
  assert.equal(checkMessage('fix: 截断\n\n同类：搜了 .slice(0, 数字)，命中 3 处，都改成 fit()\n'), '');
  assert.equal(checkMessage('修复：x\n\n同类: 搜了 toISOString().slice，命中 0 处\n'), '');
  for (const msg of ['feat: 加导出', '修改 README', '修订交接模板', 'Merge branch x', 'Revert "fix: x"', 'fixup! fix: x', 'prefix: 加导出按钮', '# 注释\n文档：补说明'])
    assert.equal(checkMessage(msg), '', msg);
});

test('commit-msg：返修、返工、回滚、hotfix 这类不在开头也算修复，写明别的类型或交接、记录的不查', () => {
  // 0.4.x 只认开头的 fix /「修」，下面这些真实标题（digital-twin、postpane、chatgpt-clipper 等，2026-11）都漏拦了
  for (const subject of [
    '#172 返修：backend 所在默认网络断宿主和外网、关 VCS 集成',
    '0B-1 审查第 1 轮返修：确认码不可覆盖、逐个现读后发',
    '夜跑主控：按 ChatGPT High 第 1 轮审查返修（#92）',
    '按交叉审查返修：预留目录核对身份、暂存回收、失败走下载兜底',
    '安全审计 11-18：修复通道越权、确认误判、日志泄露和并发配置写入',
    '第 2 批审查修正：预览后八格被改不写入',
    '侧栏返工：间距按定稿改回',
    '回滚 #88：撤掉会丢草稿的自动保存',
    'hotfix: 登录页白屏',
    'ui: Bugfix for 表头错位',
  ]) {
    assert.match(checkMessage(`${subject}\n`), /缺一行「同类：/, subject);
    assert.equal(checkMessage(`${subject}\n\n同类：搜了同一写法，命中 0 处\n`), '', subject);
  }
  assert.match(checkMessage('# 请输入提交说明\n#172 返修：x\n#\n'), /缺一行「同类：/, '编辑器模板里的「# 」注释照样跳过，「#172」开头的标题不当注释');
  assert.match(checkMessage('0D：升级、回滚、搬家演练\n'), /确实不是修复.*同类：不适用/s, '被拦的非修复提交，报错里告诉它怎么写');
  assert.equal(checkMessage('0D：升级、回滚、搬家演练\n\n同类：不适用，只是演练记录\n'), '');
  for (const msg of [
    'feat: E4a 可访问性基础修复：焦点框、抽屉与 ⌘K 焦点管理',
    'docs: C 批验收返修记录、浏览器端到端复验脚本与补拍截图',
    'docs(dt-orc): V4.0 按第 1 轮审查返修（#60）',
    'chore!: 回滚依赖版本',
    'CURRENT：0B-4a 第 2 轮返修完成，第 3 轮待常浩授权',
    '交接：#348 第 4 轮返修',
    '记录：第 3 轮复审结果与修复提交号（#92）',
    '文档与交接：#411 L2 第 1 轮返修',
    'feat: 每日巡检补上辅助任务回退检查',
    'ADR-015 草案：底座方向、信任边界、迁移回退',
    'Revert "回滚 #88"',
  ])
    assert.equal(checkMessage(msg), '', msg);
});

// 这份测试会被推送前钩子跑到，git 在钩子里带着本项目仓库的位置（GIT_DIR 等）。下面的 git 一律不继承它，只动临时仓库。
const LOCAL = execFileSync('git', ['rev-parse', '--local-env-vars'], { encoding: 'utf8' }).split('\n').filter(Boolean);
const env = { ...Object.fromEntries(Object.entries(process.env).filter(([name]) => !LOCAL.includes(name))), GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@example.com', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@example.com' };

function tempRepo(t) {
  const dir = mkdtempSync(path.join(tmpdir(), 'hooks-test-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const git = (...args) => spawnSync('git', ['-C', dir, ...args], { encoding: 'utf8', env });
  execFileSync('git', ['init', '-q', '-b', 'main', dir], { env });
  cpSync(path.resolve('scripts/hooks'), path.join(dir, 'scripts/hooks'), { recursive: true });
  git('config', 'core.hooksPath', 'scripts/hooks');
  return { dir, git };
}

test('commit-msg 真跑：装上钩子后，没写「同类：」的修复提交被拒，写了的通过', t => {
  const { dir, git } = tempRepo(t);
  writeFileSync(path.join(dir, 'a.txt'), '1');
  git('add', '-A');
  const bad = git('commit', '-q', '-m', 'fix: 截断');
  assert.notEqual(bad.status, 0);
  assert.match(bad.stderr, /缺一行「同类：/);
  const good = git('commit', '-q', '-m', 'fix: 截断', '-m', '同类：搜了 slice，命中 1 处');
  assert.equal(good.status, 0, good.stderr);
});

test('pre-push 真跑：规则检查不过就推不上去，过了才推', t => {
  const { dir, git } = tempRepo(t);
  const remote = mkdtempSync(path.join(tmpdir(), 'hooks-remote-'));
  t.after(() => rmSync(remote, { recursive: true, force: true }));
  execFileSync('git', ['init', '-q', '--bare', remote], { env });
  // 项目可能把 TESTS 改成了只在本项目跑得起来的命令（swift、python、tsc）：临时仓库里换回默认，只验钩子的拦与放
  const hook = path.join(dir, 'scripts/hooks/pre-push');
  writeFileSync(hook, readFileSync(hook, 'utf8').replace(/^TESTS=.*$/m, "TESTS='node --test tests/*.test.mjs'"));
  git('remote', 'add', 'origin', remote);
  mkdirSync(path.join(dir, 'tests'));
  writeFileSync(path.join(dir, 'tests/ok.test.mjs'), "import { test } from 'node:test'; test('ok', () => {});\n");
  writeFileSync(path.join(dir, 'scripts/check-rules.mjs'), "console.error('违反 G-08'); process.exit(1);\n");
  git('add', '-A');
  assert.equal(git('commit', '-q', '-m', 'feat: x').status, 0);
  const blocked = git('push', '-q', 'origin', 'main');
  assert.notEqual(blocked.status, 0);
  assert.match(blocked.stderr, /违反 G-08/);
  writeFileSync(path.join(dir, 'scripts/check-rules.mjs'), "console.log('通用规则检查通过');\n");
  git('add', '-A');
  git('commit', '-q', '-m', 'feat: 规则检查过了');
  const ok = git('push', '-q', 'origin', 'main');
  assert.equal(ok.status, 0, ok.stderr);
});

test('pre-push 真跑：从 worktree 推送，测试命令里的 git 操作落不到这个仓库上', t => {
  const { dir, git } = tempRepo(t);
  const scratch = mkdtempSync(path.join(tmpdir(), 'hooks-worktree-'));
  t.after(() => rmSync(scratch, { recursive: true, force: true }));
  const [remote, probe, worktree] = ['remote.git', 'probe', 'worktree'].map(name => path.join(scratch, name));
  execFileSync('git', ['init', '-q', '--bare', remote], { env });
  // 测试命令换成项目测试里常见的两步：在别处新建一个仓库，往里提交。带着这个仓库的 GIT_DIR 跑，两步都会落到这个仓库上
  const hook = path.join(dir, 'scripts/hooks/pre-push');
  const tests = `git init -q "${probe}" && git -C "${probe}" commit -q --allow-empty -m probe`;
  writeFileSync(hook, readFileSync(hook, 'utf8').replace(/^TESTS=.*$/m, `TESTS='${tests}'`));
  writeFileSync(path.join(dir, 'scripts/check-rules.mjs'), "console.log('通用规则检查通过');\n");
  git('remote', 'add', 'origin', remote);
  git('add', '-A');
  assert.equal(git('commit', '-q', '-m', 'feat: x').status, 0);
  assert.equal(git('worktree', 'add', '-q', worktree, '-b', 'side').status, 0);
  const pushed = spawnSync('git', ['-C', worktree, 'push', '-q', 'origin', 'side'], { encoding: 'utf8', env });
  assert.equal(pushed.status, 0, pushed.stderr);
  assert.equal(git('rev-list', '--count', 'side').stdout.trim(), '1', '测试命令的提交落到了推送的分支上');
  assert.equal(git('config', '--get', 'core.bare').stdout.trim(), 'false', '推送前钩子把这个仓库改成了裸仓库');
  assert.equal(spawnSync('git', ['-C', probe, 'rev-list', '--count', 'HEAD'], { encoding: 'utf8', env }).stdout.trim(), '1', '测试命令的提交没有落在它自己建的仓库里');
});

test('pre-push 真跑：测试命令找到的 git 和终端里一样，不是 git 自己 libexec 目录里的那份', t => {
  // git 跑钩子时把 libexec/git-core 放在 PATH 最前面并设 GIT_EXEC_PATH。测试用 `command -v git` 找到的就成了 libexec 里的 git，
  // 再换 PATH 跑它，克隆本地仓库时找不到 git-upload-pack（agent-autoloop 的 3 条安装测试只在钩子里失败，2026-11-20，L-07）
  const { dir, git } = tempRepo(t);
  const remote = mkdtempSync(path.join(tmpdir(), 'hooks-remote-'));
  t.after(() => rmSync(remote, { recursive: true, force: true }));
  execFileSync('git', ['init', '-q', '--bare', remote], { env });
  const hook = path.join(dir, 'scripts/hooks/pre-push');
  const tests = 'p=$(command -v git); case "$p" in "$(git --exec-path)"/*) echo "钩子里找到的 git：$p" >&2; exit 1;; esac; [ -z "${GIT_EXEC_PATH:-}" ] || { echo "钩子里还有 GIT_EXEC_PATH" >&2; exit 1; }';
  writeFileSync(hook, readFileSync(hook, 'utf8').replace(/^TESTS=.*$/m, () => `TESTS='${tests}'`));
  writeFileSync(path.join(dir, 'scripts/check-rules.mjs'), "console.log('通用规则检查通过');\n");
  git('remote', 'add', 'origin', remote);
  git('add', '-A');
  assert.equal(git('commit', '-q', '-m', 'feat: x').status, 0);
  const pushed = git('push', '-q', 'origin', 'main');
  assert.equal(pushed.status, 0, pushed.stderr);
});
