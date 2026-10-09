import { readdir, writeFile } from 'node:fs/promises';

const origin = 'https://oakkarphyo.com';
const outputDirectory = new URL('../dist/', import.meta.url);
const escapeXml = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
}[character]));

async function pagePaths(directory, prefix = '') {
  const pages = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = `${prefix}${entry.name}`;
    if (entry.isDirectory()) {
      pages.push(...await pagePaths(new URL(`${entry.name}/`, directory), `${path}/`));
    } else if (entry.name.endsWith('.html') && entry.name !== '404.html') {
      // Match Cloudflare's default clean URLs: index.html -> /, about.html -> /about.
      const route = path.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');
      pages.push(`${origin}/${route.split('/').map(encodeURIComponent).join('/')}`);
    }
  }
  return pages;
}

const urls = [...new Set(await pagePaths(outputDirectory))].sort();
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n')}
</urlset>
`;

await writeFile(new URL('sitemap.xml', outputDirectory), sitemap, 'utf8');
console.log(`Generated sitemap.xml with ${urls.length} public page(s).`);
