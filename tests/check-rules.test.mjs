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
