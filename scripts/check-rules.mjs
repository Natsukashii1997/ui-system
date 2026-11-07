// 通用规则检查：只查机器能判定的几条（AGENTS.md「规则」；全局坑 G-02、G-07、G-08）。项目长出自己的硬规矩、且能机检的，照 RULES 的样子往下加。
// 只认 Node / 前端项目的写法，别的技术栈按需改。用法：node scripts/check-rules.mjs；tests/check-rules.test.mjs 也会跑。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RULES = {
  listen: '本机服务只监听 127.0.0.1（AGENTS.md 规则）',
  deps: '依赖只许 ALLOWED_DEPS 里的；要加依赖，先改 scripts/check-rules.mjs 的 ALLOWED_DEPS，并在交接里说明理由（AGENTS.md 规则）',
  time: '页面上的时间经统一的格式化函数按北京时间显示，不直接截取 ISO 字符串（全局坑 G-02）；截取的确实是北京时间字符串时，在行内注释写「北京时间」',
  origin: '开了本机服务的入口要校验来源（Host 是本机、Origin 同源）再处理写请求，只监听 127.0.0.1 挡不住浏览器里的任意网页（全局坑 G-07）；校验放在别的文件时，在 listen 那一行注释写「来源校验见 xxx」',
  optvar: '带 set -u 的脚本里，可选开关要写成 ${X:-}，裸引用在变量没设时会让整段退出（全局坑 G-08）',
};
// 要扫的源码目录，按项目结构改；不存在的目录跳过
const SCAN = ['src', 'server'];
// 要扫的 shell 脚本目录（G-08）
const SCAN_SH = ['scripts', 'bin'];
const EXTS = ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx'];
// 截取 *At 字段当日期时间显示，或把 ISO 的 T 换成空格：多半把 UTC 当成了北京时间
const TIME = [/\b\w*(?:At|_at)\.slice\(\s*(?:0\s*,\s*1[06]|5\s*,\s*16|11\s*,\s*16)\s*\)/, /\.replace\(\s*["']T["']\s*,\s*["'] ["']\s*\)/];
const TIME_OK = /\/[/*]\s*北京时间/;
const LISTEN_OK = /\.listen\(\s*[\w.]+\s*,\s*['"]127\.0\.0\.1['"]/;
// 同一文件里有这些写法之一，就当做了来源校验（G-07）
const ORIGIN_OK = /headers\s*(?:\.\s*(?:origin|host)\b|\[\s*['"](?:origin|host)['"]\s*\])|getHeader\(\s*['"](?:origin|host)['"]|来源校验见/i;
// set -u / set -eu / set -euo pipefail 之类（G-08）
const SET_U = /^\s*set\s+-[a-z]*u[a-z]*\b/m;
// [ -n "$X" ]、[[ -z $X ]]：判断可选开关是否设置，却没写 ${X:-}
const OPTVAR = /\[\[?\s+-[nz]\s+"?\$(?:\{[A-Za-z_]\w*\}|[A-Za-z_]\w*)"?/;
// package.json 用白名单：黑名单认不出新出的库，白名单逼着每个新依赖都过一遍交接
const ALLOWED_DEPS = [];

function files(dir, exts = EXTS) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap(entry => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === 'node_modules' ? [] : files(file, exts);
    return exts.includes(path.extname(entry.name)) ? [file] : [];
  });
}

export function checkRules(root) {
  const found = [];
  const hit = (file, line, kind, text) => found.push({ file: path.relative(root, file), line, kind, rule: RULES[kind], text: text.trim() });
  for (const file of SCAN.flatMap(dir => files(path.join(root, dir)))) {
    const src = fs.readFileSync(file, 'utf8');
    const lines = src.split('\n');
    lines.forEach((text, i) => {
      if (TIME.some(r => r.test(text)) && !TIME_OK.test(text)) hit(file, i + 1, 'time', text);
      if (text.includes('.listen(') && !LISTEN_OK.test(text)) hit(file, i + 1, 'listen', text);
    });
    const at = lines.findIndex(text => text.includes('.listen('));
    if (at >= 0 && !ORIGIN_OK.test(src)) hit(file, at + 1, 'origin', lines[at]);
  }
  for (const file of SCAN_SH.flatMap(dir => files(path.join(root, dir), ['.sh']))) {
    const src = fs.readFileSync(file, 'utf8');
    if (!SET_U.test(src)) continue;
    src.split('\n').forEach((text, i) => {
      if (OPTVAR.test(text) && !text.trimStart().startsWith('#')) hit(file, i + 1, 'optvar', text);
    });
  }
  const pkgFile = path.join(root, 'package.json');
  if (fs.existsSync(pkgFile)) {
    const text = fs.readFileSync(pkgFile, 'utf8'), pkg = JSON.parse(text), lines = text.split('\n');
    const at = key => lines.findIndex(line => line.includes(`"${key}":`)) + 1;
    for (const name of Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).filter(n => !ALLOWED_DEPS.includes(n))) hit(pkgFile, at(name), 'deps', name);
  }
  return found;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const found = checkRules(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
  for (const v of found) console.error(`${v.file}:${v.line}  ${v.text}\n  ↳ ${v.rule}`);
  if (found.length) { console.error(`通用规则检查未通过：${found.length} 处`); process.exitCode = 1; }
  else console.log('通用规则检查通过');
}
