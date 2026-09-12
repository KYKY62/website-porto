import { build, loadEnv } from 'vite';
import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { site as defaultSite } from '../src/seo/site.js';

const root = process.cwd();
const env = { ...loadEnv('production', root, ''), ...process.env };
const siteUrl = env.VITE_SITE_URL || defaultSite.origin;
const indexable = env.VERCEL_ENV === 'preview' ? 'false' : (env.VITE_INDEXABLE || 'true');
const define = {
  'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
  'import.meta.env.VITE_INDEXABLE': JSON.stringify(indexable),
};

// Only generated build folders inside this checkout can be cleared.
function generatedFolder(relative) {
  const resolved = path.resolve(root, relative);
  if (!resolved.startsWith(`${root}${path.sep}`) || !['.seo-build', '.vercel/output'].includes(relative)) {
    throw new Error(`Unsafe build output: ${resolved}`);
  }
  return resolved;
}

await rm(generatedFolder('.seo-build'), { recursive: true, force: true });
await build({ define, build: { ssr: 'src/entry-server.jsx', outDir: '.seo-build', ssrEmitAssets: true, copyPublicDir: false } });
const { render, publicPages, legacyRedirects, site, imageVariants } = await import(pathToFileURL(path.join(root, '.seo-build/entry-server.js')).href);
for (const image of Object.values(imageVariants)) {
  const source = await readFile(path.join(root, 'src/assets', image.sourceFile));
  if (createHash('sha256').update(source).digest('hex').slice(0, 10) !== image.sourceHash) {
    throw new Error(`Image variants are stale for ${image.sourceFile}. Run npm run images:optimize.`);
  }
}
const pages = publicPages();
if (new Set(pages).size !== pages.length || pages.some((url) => !/^\/(?:[a-z0-9-]+\/)*[a-z0-9-]*$/.test(url))) {
  throw new Error('Public routes must be unique lowercase slugs.');
}
const escapeXml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]));
const rendered = pages.map((url) => ({ url, ...render(url) }));
for (const page of rendered) {
  for (const image of page.body.matchAll(/<img\b[^>]*>/g)) {
    if (!/width="\d+"/.test(image[0]) || !/height="\d+"/.test(image[0])) {
      throw new Error(`${page.url} has an image without responsive metadata. Run npm run images:optimize.`);
    }
  }
  const canonical = new URL(page.seo.canonical);
  if (canonical.search || canonical.hash || !pages.includes(canonical.pathname)) {
    throw new Error(`${page.url} has an invalid canonical target: ${canonical}`);
  }
}
const canonicalUrls = rendered.filter((page) => page.seo.indexable && page.seo.canonical === new URL(page.url, site.origin).href)
  .map((page) => page.seo.canonical);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${canonicalUrls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n')}\n</urlset>\n`;
// Do not invent lastmod dates: they must reflect genuine content modifications.
const robots = `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /dashboard\nDisallow: /login\nDisallow: /api\n\nSitemap: ${site.origin}/sitemap.xml\n`;
await writeFile(path.join(root, 'public/sitemap.xml'), sitemap);
await writeFile(path.join(root, 'public/robots.txt'), robots);

await build({ define });
const template = await readFile(path.join(root, 'dist/index.html'), 'utf8');
if (!template.includes('<!--seo:start-->') || !template.includes('<div id="root"></div>')) throw new Error('Missing prerender placeholders.');
const routes = {};
for (const page of [...rendered, { url: '/404', ...render('/404') }]) {
  const file = page.url === '/' ? 'index.html' : `${page.url.slice(1)}.html`;
  const html = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, () => page.head)
    .replace('<div id="root"></div>', () => `<div id="root" data-prerendered="true">${page.body}</div>`);
  await mkdir(path.dirname(path.join(root, 'dist', file)), { recursive: true });
  await writeFile(path.join(root, 'dist', file), html);
  if (page.url !== '/404') routes[page.url] = file;
}
const redirects = Object.fromEntries(legacyRedirects().map(({ from, to }) => [from, to]));
const manifest = { origin: site.origin, indexable: site.indexable, routes, redirects };
await writeFile(path.join(root, 'dist/.routes.json'), JSON.stringify(manifest, null, 2));

// Build Output API: explicit pages and a real HTTP 404, never a catch-all SPA rewrite.
const output = generatedFolder('.vercel/output');
await rm(output, { recursive: true, force: true });
await cp(path.join(root, 'dist'), path.join(output, 'static'), { recursive: true,
  filter: (source) => path.basename(source) !== '.routes.json' });
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const redirectRule = (source, destination) => ({ src: source, headers: { Location: destination }, status: 301 });
const canonicalHost = new URL(site.origin).hostname;
const alternateHost = canonicalHost.startsWith('www.') ? canonicalHost.slice(4) : `www.${canonicalHost}`;
const vercelRoutes = [
  ...(!site.indexable ? [{ src: '/(.*)', headers: { 'X-Robots-Tag': 'noindex, follow' }, continue: true }] : []),
  { src: '/(?:assets|media)/(.*)', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }, continue: true },
  { src: '/social/(.*)', headers: { 'Cache-Control': 'public, max-age=3600' }, continue: true },
  { src: '/(?:robots\\.txt|sitemap\\.xml)', headers: { 'Cache-Control': 'public, max-age=300' }, continue: true },
  { src: '/(.*)', has: [{ type: 'host', value: alternateHost }], status: 301,
    headers: { Location: `${site.origin}/$1` } },
  ...Object.entries(redirects).map(([from, to]) => redirectRule(`^${escapeRegex(from).replace(/ /g, '(?: |%20)')}(?:/|\\.html|/index\\.html)?$`, to)),
  redirectRule('^/index\\.html/?$', '/'),
  ...pages.filter((url) => url !== '/').map((url) => redirectRule(`^${escapeRegex(url)}(?:/+|\\.html/?|/index\\.html/?)$`, url)),
  ...Object.entries(routes).map(([url, file]) => ({ src: `^${escapeRegex(url)}$`, dest: `/${file}`, caseSensitive: true,
    headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' } })),
  // Case variants resolve in one hop after the exact canonical paths above.
  ...pages.filter((url) => url !== '/').map((url) => ({ ...redirectRule(`^${escapeRegex(url)}/?$`, url), caseSensitive: false })),
  { src: '^/404(?:\\.html)?/?$', dest: '/404.html', status: 404, headers: { 'X-Robots-Tag': 'noindex, follow', 'Cache-Control': 'no-store' } },
  { handle: 'filesystem' },
  { src: '/(.*)', dest: '/404.html', status: 404, headers: { 'X-Robots-Tag': 'noindex, follow', 'Cache-Control': 'no-store' } },
];
await writeFile(path.join(output, 'config.json'), JSON.stringify({ version: 3, routes: vercelRoutes }, null, 2));
console.log(`SEO build complete: ${pages.length} public pages, ${canonicalUrls.length} sitemap URLs, ${Object.keys(redirects).length} legacy redirects. Origin: ${site.origin}`);
