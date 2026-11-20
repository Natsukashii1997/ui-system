// 修复类提交（标题以 fix 或「修」开头）的正文必须有一行「同类：搜了什么，命中几处，怎么处理」，
// 否则拒绝提交（全局指令第 3 节「修 bug 先搜同类」，复盘 P4，常浩 2026-11-20 批）。
// 「修改」「修订」不算修复；Merge、Revert、fixup!、squash! 自动生成的提交不查。
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function checkMessage(text) {
  const lines = String(text).split('\n').filter(l => !l.startsWith('#'));
  const subject = (lines.find(l => l.trim()) ?? '').trim();
  if (/^(Merge|Revert|fixup!|squash!)/.test(subject)) return '';
  const isFix = /^fix\b/i.test(subject) || (/^修/.test(subject) && !/^修(改|订)/.test(subject));
  if (!isFix) return '';
  const body = lines.slice(lines.findIndex(l => l.trim()) + 1).join('\n');
  if (/^同类[：:]\s*\S/m.test(body)) return '';
  return `修复类提交「${subject}」的正文缺一行「同类：搜了什么，命中几处，怎么处理」（全局指令第 3 节「修 bug 先搜同类」）。补上再提交，例如：\n\n同类：搜了 .slice(0, 数字)，命中 3 处，都改成 fit()`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const problem = checkMessage(readFileSync(process.argv[2], 'utf8'));
  if (problem) {
    console.error(`[commit-msg] ${problem}`);
    process.exit(1);
  }
}
