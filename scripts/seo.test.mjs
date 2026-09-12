import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { createSeoServer } from './serve.mjs';

const directory = path.resolve('dist');
const manifest = JSON.parse(await readFile(path.join(directory, '.routes.json'), 'utf8'));
const decode = (value) => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const meta = (html, name) => decode(html.match(new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]+content="([^"]*)"`))?.[1] || '');
const canonical = (html) => decode(html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1] || '');
let server, origin;
before(async () => {
  server = await createSeoServer(directory);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { server.closeAllConnections(); await new Promise((resolve) => server.close(resolve)); });

test('Every public page has unique metadata, one H1, crawlable content and local assets', async () => {
  const titles = new Set(), descriptions = new Set();
  for (const [route, filename] of Object.entries(manifest.routes)) {
    const html = await readFile(path.join(directory, filename), 'utf8');
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one H1`);
    assert.equal((html.match(/<title\b/g) || []).length, 1);
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.equal(canonical(html), new URL(route, manifest.origin).href);
    const title = decode(html.match(/<title[^>]*>([^<]+)<\/title>/)?.[1] || '');
    const description = meta(html, 'description');
    assert(title && description, `${route}: non-empty title and description`);
    assert(!titles.has(title), `${route}: duplicate title`);
    assert(!descriptions.has(description), `${route}: duplicate description`);
    titles.add(title); descriptions.add(description);
    assert.equal(meta(html, 'robots').startsWith('index,'), manifest.indexable);
    assert.equal(meta(html, 'og:url'), canonical(html));
    for (const name of ['og:title', 'og:description', 'og:type', 'og:image', 'og:image:alt', 'twitter:title', 'twitter:description', 'twitter:image']) assert(meta(html, name), `${route}: ${name}`);
    assert.equal(meta(html, 'twitter:card'), 'summary_large_image');
    const social = new URL(meta(html, 'og:image'));
    assert.equal(social.origin, manifest.origin);
    await access(path.join(directory, social.pathname));
    assert(html.includes('data-prerendered="true"'));
    assert(!html.includes('/src/assets/'), `${route}: production assets must be resolved`);
    for (const script of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(script[1]);
    for (const image of html.matchAll(/<img\b[^>]*>/g)) {
      assert(/alt="[^"]+"/.test(image[0]), `${route}: descriptive alt`);
      assert(/width="\d+"/.test(image[0]) && /height="\d+"/.test(image[0]), `${route}: image dimensions`);
      const src = decode(image[0].match(/\bsrc="([^"]+)"/)[1]);
      await access(path.join(directory, src));
    }
    for (const link of html.matchAll(/<a[^>]*href="(\/[^"#?]*)[^"]*"/g)) {
      assert(Object.hasOwn(manifest.routes, decode(link[1])), `${route}: invalid internal link ${link[1]}`);
    }
    const response = await fetch(`${origin}${route}`);
    assert.equal(response.status, 200, route);
    assert.equal(await response.text(), html);
  }
});

test('Sitemap and robots use the same canonical origin and only public routes', async () => {
  const sitemap = await fetch(`${origin}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get('content-type'), /application\/xml/);
  const xml = await sitemap.text();
  assert.match(xml, /xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9"/);
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
  assert.deepEqual(urls, manifest.indexable ? Object.keys(manifest.routes).map((route) => new URL(route, manifest.origin).href) : []);
  assert(!xml.includes('<lastmod>'), 'Do not manufacture modification dates');
  const robotsResponse = await fetch(`${origin}/robots.txt`);
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert(robots.includes(`Sitemap: ${manifest.origin}/sitemap.xml`));
  assert(!/Disallow: \/(?:$|assets|media|social)/m.test(robots));
});

test('Legacy, trailing-slash and HTML aliases redirect once to canonical pages', async () => {
  const aliases = { ...manifest.redirects, '/index.html': '/' };
  for (const route of Object.keys(manifest.routes).filter((item) => item !== '/')) {
    aliases[`${route}/`] = route;
    aliases[`${route}.html`] = route;
    aliases[`${route}/index.html`] = route;
    aliases[route.toUpperCase()] = route;
  }
  for (const [from, to] of Object.entries(aliases)) {
    const response = await fetch(`${origin}${from}?utm_source=test`, { redirect: 'manual' });
    assert.equal(response.status, 301, from);
    assert.equal(response.headers.get('location'), `${to}?utm_source=test`);
    const destination = await fetch(`${origin}${response.headers.get('location')}`, { redirect: 'manual' });
    assert.equal(destination.status, 200);
    assert.equal(canonical(await destination.text()), new URL(to, manifest.origin).href);
  }
});

test('Unknown routes return HTTP 404 and noindex, including missing project IDs', async () => {
  for (const route of ['/does-not-exist', '/project/does-not-exist', '/404', '/404.html', '/admin', '/login', '/api/example', '/.routes.json']) {
    const response = await fetch(`${origin}${route}`);
    assert.equal(response.status, 404, route);
    assert.match(response.headers.get('x-robots-tag'), /noindex/);
    const html = await response.text();
    assert.match(meta(html, 'robots'), /noindex/);
    assert.equal(canonical(html), '');
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  }
});

test('LCP images are eager, assets cacheable, HEAD and conditional GET work', async () => {
  const detail = await readFile(path.join(directory, manifest.routes['/project/multisite']), 'utf8');
  assert.match(detail, /<img[^>]*loading="eager"[^>]*fetchPriority="high"/i);
  const media = detail.match(/<img[^>]*\bsrc="([^"]+)"/)[1];
  const imageResponse = await fetch(`${origin}${media}`, { method: 'HEAD' });
  assert.equal(imageResponse.status, 200);
  assert.match(imageResponse.headers.get('cache-control'), /immutable/);
  assert.equal(await imageResponse.text(), '');
  const conditional = await fetch(`${origin}${media}`, { headers: { 'If-None-Match': imageResponse.headers.get('etag') } });
  assert.equal(conditional.status, 304);
});

test('Vercel artifact contains explicit page mappings and a real 404 fallback', async () => {
  const config = JSON.parse(await readFile('.vercel/output/config.json', 'utf8'));
  assert.equal(config.version, 3);
  assert.equal(config.routes.at(-1).status, 404);
  assert.equal(config.routes.at(-1).dest, '/404.html');
  assert(!config.routes.some((route) => route.src === '/(.*)' && route.dest === '/index.html'));
  for (const file of Object.values(manifest.routes)) {
    assert(config.routes.some((route) => route.dest === `/${file}` && route.caseSensitive === true));
    await access(path.join('.vercel/output/static', file));
  }
});
