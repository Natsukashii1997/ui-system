import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkRules } from '../scripts/check-rules.mjs';

test('仓库符合通用规则（scripts/check-rules.mjs）', () => {
  assert.deepEqual(checkRules(process.cwd()), []);
});

test('通用规则能抓到违规样本，合规样本不误报', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'check-rules-'));
  const write = (file, text) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), text);
  };
  try {
    write('src/a.js', 'show(item.createdAt.slice(0, 16));\nshow(beijingTime(item.createdAt));\nshow(item.updatedAt.slice(11, 16)); // 北京时间\n');
    write('server/index.mjs', "server.listen(port);\nserver.listen(port, '127.0.0.1');\n");
    write('server/safe.mjs', "const ok = req => req.headers.origin === undefined;\nserver.listen(port, '127.0.0.1');\n");
    write('scripts/run.sh', 'set -euo pipefail\nif [ -n "$DRY_RUN" ]; then echo dry; fi\nif [ -n "${VERBOSE:-}" ]; then echo v; fi\n# [ -z "$X" ] 注释不算\n');
    write('scripts/loose.sh', 'if [ -z "$X" ]; then echo x; fi\n');
    write('package.json', JSON.stringify({ dependencies: { 'left-pad': '1.0.0' } }, null, 2));
    assert.deepEqual(checkRules(root).map(v => `${v.file}:${v.line} ${v.kind}`), ['src/a.js:1 time', 'server/index.mjs:1 listen', 'server/index.mjs:1 origin', 'scripts/run.sh:2 optvar', 'package.json:3 deps']);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('LESSONS 每条要有以层级词开头的「升级」行：缺行、不带层级词各报一次，合规条目和格式样例不误报', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'check-rules-'));
  // 坏样本取自真实历史：L-01 是 trainee-hub docs/LESSONS.md L-01 补层级词前的原样（升级行不带层级词）；
  // L-29 是驿窗 postpane docs/LESSONS.md L-29（2026-11 复盘时没有升级行）。都只留标题和结构
  const lessons = [
    '# 开发实录与坑', '', '## 怎么写', '', '- 格式样例：', '', '```markdown', '## L-01 <一句话现象>（<YYYY-MM-DD>）', '', '- 升级：未升级。', '```', '', '---', '',
    '## L-01 自托管 Geist 后，中文全角标点变成半角宽（2026-11-06）', '', '- 现象：略。', '- 升级：未升级。', '',
    '## L-29 内置浏览器面板隐藏时截到「卡在半路」的侧栏，误以为布局错乱（2026-11-08）', '', '- 现象：略。', '- 正确做法：略。', '',
    '## L-51 合规：未升级的也要带层级词（2026-11-19）', '', '- 现象：略。', '- 升级：〔提醒〕未升级。', '',
    '## L-52 合规：已升级写明去处（2026-11-19）', '', '- 现象：略。', '- 升级：〔机检〕已升级（2026-11-19）：scripts/check-rules.mjs 的 lessons 规则。', '',
  ].join('\n');
  try {
    fs.mkdirSync(path.join(root, 'docs'));
    fs.writeFileSync(path.join(root, 'docs/LESSONS.md'), lessons);
    const found = checkRules(root);
    assert.deepEqual(found.map(v => `${v.file}:${v.line} ${v.kind} ${v.text}`), [
      'docs/LESSONS.md:18 lessons L-01 的「升级」没以层级词开头：- 升级：未升级。',
      'docs/LESSONS.md:20 lessons L-29 缺「- 升级：」一行',
    ]);
    assert.match(found[0].rule, /〔提醒〕未升级/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
