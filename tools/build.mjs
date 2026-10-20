import { build } from 'esbuild';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
mkdirSync('assets', { recursive: true });
await build({entryPoints: ["src/app.jsx"], bundle: true, minify: true, format: 'iife', platform: 'browser',
  outfile: "assets/app.js", legalComments: 'eof', define: {'process.env.NODE_ENV': '"production"'}});
const styles = await postcss([tailwindcss({base: process.cwd(), optimize: true})]).process(readFileSync('src/input.css', 'utf8'), {from: 'src/input.css', to: 'assets/app.css'});
writeFileSync('assets/app.css', styles.css);
const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
const notices = [];
for (const [path, pkg] of Object.entries(lock.packages)) {
  if (!path || pkg.dev) continue;
  const file = ['LICENSE', 'LICENSE.md', 'LICENSE.txt'].map(name => `${path}/${name}`).find(existsSync);
  if (file) notices.push(`${path} (${pkg.version})\n${readFileSync(file, 'utf8')}`);
}
writeFileSync('assets/THIRD-PARTY-NOTICES.txt', notices.join('\n\n---\n\n'));
