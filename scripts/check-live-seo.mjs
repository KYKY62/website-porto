// Read-only verification after deployment. No Search Console credentials needed.
import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile('dist/.routes.json', 'utf8'));
const origin = new URL(process.argv[2] || manifest.origin).origin;
let failures = 0;
const check = (condition, message) => {
  console.log(`${condition ? 'PASS' : 'FAIL'} ${message}`);
  if (!condition) failures++;
};
async function request(pathname) {
  return fetch(`${origin}${pathname}`, { redirect: 'manual', signal: AbortSignal.timeout(15000) });
}
try {
  for (const route of Object.keys(manifest.routes)) {
    const response = await request(route);
    const html = await response.text();
    check(response.status === 200, `${route}: HTTP 200`);
    check(!/noindex/i.test(response.headers.get('x-robots-tag') || ''), `${route}: no noindex header`);
    check(/<meta[^>]+name="robots"[^>]+content="index,/.test(html), `${route}: indexable HTML`);
    check(html.includes(`rel="canonical" href="${manifest.origin}${route}"`), `${route}: expected canonical`);
    check((html.match(/<h1\b/g) || []).length === 1, `${route}: one H1 before JavaScript`);
  }
  const sitemap = await request('/sitemap.xml');
  check(sitemap.status === 200 && /xml/.test(sitemap.headers.get('content-type') || ''), 'sitemap.xml: HTTP 200 and XML content type');
  const xml = await sitemap.text();
  check((xml.match(/<loc>/g) || []).length === Object.keys(manifest.routes).length, 'sitemap.xml: public page count');
  const robots = await request('/robots.txt');
  check(robots.status === 200 && (await robots.text()).includes(`Sitemap: ${manifest.origin}/sitemap.xml`), 'robots.txt: correct sitemap');
  const missing = await request('/project/seo-check-missing-page');
  check(missing.status === 404, 'Unknown project: real HTTP 404');
  const alias = await request('/projects/');
  check([301, 308].includes(alias.status) && new URL(alias.headers.get('location'), origin).pathname === '/projects', 'Trailing slash redirects to canonical');
} catch (error) {
  check(false, error.message);
}
process.exitCode = failures ? 1 : 0;
