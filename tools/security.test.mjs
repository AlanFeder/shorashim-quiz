import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
test('the deployed page executes local audited assets, without remote CDN code', () => {
  const html = readFileSync("index.html", 'utf8');
  const scriptSources = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)].map(m => m[1]);
  assert.ok(scriptSources.length > 0);
  for (const src of scriptSources) {
    assert.match(src, /^assets\/[a-z0-9.-]+\.js$/);
    assert.ok(existsSync(src), `Missing asset: ${src}`);
  }
  assert.doesNotMatch(html, /text\/babel|tailwind\.config|cdn\.tailwindcss\.com|unpkg\.com|d3js\.org/);
  assert.ok(readFileSync('assets/app.css', 'utf8').length > 1000);
  assert.ok(readFileSync('assets/THIRD-PARTY-NOTICES.txt', 'utf8').includes('MIT'));
});
