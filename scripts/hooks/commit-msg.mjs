// 修复类提交的正文必须有一行「同类：搜了什么，命中几处，怎么处理」，否则拒绝提交
// （全局指令第 3 节「修 bug 先搜同类」，复盘 P4，常浩 2026-11-20 批）。算修复类的：
// - 标题以 fix 或「修」开头（「修改」「修订」不算）；
// - 标题任意位置有 返修、返工、回滚、热修、修复、修正、hotfix、bugfix（Fable 评估挂起 5，常浩 2026-11-20 选甲）。
//   「编号 / 模块名：…返修」这类写法占了返修提交的大半，只认开头会漏。「回退」不算，多是 fallback 的意思。
// 不查：Merge、Revert、fixup!、squash! 自动生成的提交；写明别的类型的（feat:、docs: 等，带 scope 也算）；
// 以 CURRENT、交接、记录、文档 开头的。确实不是修复却被拦，写「同类：不适用，<原因>」。
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const FIX_WORDS = /返修|返工|回滚|热修|修复|修正|hotfix|bugfix/i;
const NOT_FIX = /^(feat|docs|chore|test|style|ci|build|refactor|perf)(\([^)]*\))?!?:|^(CURRENT|交接|记录|文档)/i;

export function checkMessage(text) {
  // 注释只认 git 模板的「# 」和单独的「#」：用 -m 提交时 git 不删 # 行，「#172 返修：…」这种标题要留着查
  const lines = String(text).split('\n').filter(l => !/^#(\s|$)/.test(l));
  const subject = (lines.find(l => l.trim()) ?? '').trim();
  if (/^(Merge|Revert|fixup!|squash!)/.test(subject)) return '';
  const isFix = /^fix\b/i.test(subject) || (/^修/.test(subject) && !/^修(改|订)/.test(subject))
    || (!NOT_FIX.test(subject) && FIX_WORDS.test(subject));
  if (!isFix) return '';
  const body = lines.slice(lines.findIndex(l => l.trim()) + 1).join('\n');
  if (/^同类[：:]\s*\S/m.test(body)) return '';
  return `修复类提交「${subject}」的正文缺一行「同类：搜了什么，命中几处，怎么处理」（全局指令第 3 节「修 bug 先搜同类」）。补上再提交，例如：\n\n同类：搜了 .slice(0, 数字)，命中 3 处，都改成 fit()\n\n确实不是修复（只是提到返修、回滚等字样），写「同类：不适用，<原因>」。`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const problem = checkMessage(readFileSync(process.argv[2], 'utf8'));
  if (problem) {
    console.error(`[commit-msg] ${problem}`);
    process.exit(1);
  }
}
