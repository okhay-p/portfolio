import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const output = fileURLToPath(new URL('../dist/', import.meta.url));
const origin = 'https://oakkarphyo.com';

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith('.html') ? [file] : [];
  }));
  return nested.flat();
}

async function resolveLocal(route) {
  const relative = decodeURIComponent(route).replace(/^\//, '');
  for (const candidate of [relative, relative + '.html', path.join(relative, 'index.html')]) {
    const file = path.join(output, candidate);
    try { if ((await stat(file)).isFile()) return file; } catch {}
  }
  assert.fail('Missing generated local route or asset: ' + route);
}

const files = await htmlFiles(output);
const pages = new Map(await Promise.all(files.map(async file => [file, await readFile(file, 'utf8')])));
const sitemap = await readFile(path.join(output, 'sitemap.xml'), 'utf8');

for (const [file, html] of pages) {
  const relative = path.relative(output, file).replaceAll(path.sep, '/');
  const route = relative === '404.html' ? '/404.html' : '/' + relative.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');
  assert.ok(html.includes('<h1'), relative + ' needs a static heading');
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, relative + ' needs one canonical');
  assert.ok(html.includes('href="' + origin + route + '"'), relative + ' canonical must match route');
  if (relative !== '404.html') assert.ok(sitemap.includes('<loc>' + origin + route + '</loc>'));
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1];
    if (href.startsWith('#')) {
      assert.ok(html.includes('id="' + href.slice(1) + '"'), relative + ' has a broken anchor: ' + href);
    } else if (href.startsWith('/')) {
      const target = new URL(href, origin);
      const targetFile = await resolveLocal(target.pathname);
      if (target.hash) {
        const targetHtml = pages.get(targetFile);
        assert.ok(targetHtml?.includes('id="' + target.hash.slice(1) + '"'), relative + ' has a broken anchor: ' + href);
      }
    }
  }
}

const home = pages.get(path.join(output, 'index.html'));
const article = pages.get(path.join(output, 'writing/playkit-webrtc.html'));
assert.ok(home?.includes('Learning by') && home.includes('PlayKit') && home.includes('What I learned about WebRTC'));
assert.ok(article?.includes('Game night taught me WebRTC.') && article.includes('<svg'));
assert.ok(article.includes('Interactive Connectivity Establishment') && article.includes('No TURN relay is enabled.'));
assert.ok(!article.includes('<script'), 'The case study must work entirely without client JavaScript');
assert.ok(!sitemap.includes('/404'), 'The sitemap must exclude the error page');
assert.ok(!sitemap.includes('prototypes'), 'Exploratory layouts must stay unpublished');
console.log('Static HTML, canonical URLs, sitemap, local assets, and anchor navigation verified for ' + pages.size + ' pages.');
