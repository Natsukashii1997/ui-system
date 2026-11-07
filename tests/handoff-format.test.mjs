import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// CURRENT.md 顶部一节必须按 docs/templates/handoff.md 的骨架写：标题带日期，有「开工时刻」「测试」「本轮新坑」三行，
// 新坑编号在 docs/LESSONS.md 里存在（AGENTS.md「交接格式」「报告与验收」）。
const topSection = text => text.split(/^(?=## )/m)[1] ?? '';
export function checkHandoff(section, lessons) {
  const problems = [];
  const title = section.split('\n')[0];
  if (!/^## .*\d{4}-\d{2}-\d{2}/.test(title)) problems.push('标题没有日期');
  if (!/^- 时间：开工 `?\d{4}-\d{2}-\d{2} \d{2}:\d{2}/m.test(section)) problems.push('缺「- 时间：开工 YYYY-MM-DD HH:mm」');
  if (!/^- 测试：/m.test(section)) problems.push('缺「- 测试：」');
  const pit = section.match(/^- 本轮新坑：(.*)$/m);
  if (!pit) problems.push('缺「- 本轮新坑：无 / L-xx」');
  else if (!/^(无|L-\d{2}(、L-\d{2})*)/.test(pit[1])) problems.push(`「本轮新坑」须写「无」或 L-xx：${pit[1]}`);
  else for (const id of pit[1].match(/L-\d{2}/g) ?? []) if (!lessons.includes(`## ${id} `)) problems.push(`本轮新坑 ${id} 在 docs/LESSONS.md 里不存在`);
  return problems;
}

test('CURRENT.md 顶部一节符合交接骨架', () => {
  assert.deepEqual(checkHandoff(topSection(readFileSync('CURRENT.md', 'utf8')), readFileSync('docs/LESSONS.md', 'utf8')), []);
});

test('交接检查能抓到缺项与不存在的坑编号，合规样本不误报', () => {
  const lessons = '## L-01 甲（2026-10-18）\n## L-07 乙（2026-10-23）\n';
  const good = '## 某事（2026-10-24，Claude，用户同意；未提交）\n\n- 时间：开工 `2026-10-24 00:02`（`date` 记录）。\n- 测试：`npm test` 原样结果 `ℹ pass 1` / `ℹ fail 0`。\n- 本轮新坑：L-01、L-07。\n';
  assert.deepEqual(checkHandoff(good, lessons), []);
  assert.deepEqual(checkHandoff(good.replace('L-01、L-07。', '无（预览名额被占属 L-07）'), lessons), []);
  const bad = '## 某事（Claude）\n\n- 改了哪些文件：x\n- 本轮新坑：L-09。\n';
  assert.deepEqual(checkHandoff(bad, lessons), ['标题没有日期', '缺「- 时间：开工 YYYY-MM-DD HH:mm」', '缺「- 测试：」', '本轮新坑 L-09 在 docs/LESSONS.md 里不存在']);
  assert.deepEqual(checkHandoff(good.replace('- 本轮新坑：L-01、L-07。', '- 本轮新坑：没有'), lessons), ['「本轮新坑」须写「无」或 L-xx：没有']);
});
