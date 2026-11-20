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
  for (const msg of ['feat: 加导出', '修改 README', '修订交接模板', 'Merge branch x', 'Revert "fix: x"', 'fixup! fix: x', 'prefix: 不是修复', '# 注释\n文档：补说明'])
    assert.equal(checkMessage(msg), '', msg);
});

function tempRepo(t) {
  const dir = mkdtempSync(path.join(tmpdir(), 'hooks-test-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const git = (...args) => spawnSync('git', ['-C', dir, ...args], { encoding: 'utf8', env: { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@example.com', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@example.com' } });
  execFileSync('git', ['init', '-q', '-b', 'main', dir]);
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
  execFileSync('git', ['init', '-q', '--bare', remote]);
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
