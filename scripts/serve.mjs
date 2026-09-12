import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const types = { '.html': 'text/html; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

export async function createSeoServer(directory = path.resolve('dist')) {
  const manifest = JSON.parse(await readFile(path.join(directory, '.routes.json'), 'utf8'));
  return http.createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, { Allow: 'GET, HEAD', 'X-Robots-Tag': 'noindex' });
        return response.end();
      }
      const url = new URL(request.url, 'http://localhost');
      let pathname;
      try { pathname = decodeURIComponent(url.pathname); }
      catch { response.writeHead(400, { 'X-Robots-Tag': 'noindex' }); return response.end(); }
      const base = pathname.replace(/\/+$/, '').replace(/\/index\.html$/i, '').replace(/\.html$/i, '') || '/';
      const legacy = Object.entries(manifest.redirects).find(([from]) => from.toLowerCase() === base.toLowerCase());
      const target = legacy?.[1] || Object.keys(manifest.routes).find((route) => route.toLowerCase() === base.toLowerCase());
      if (target && pathname !== target) {
        response.writeHead(301, { Location: `${target}${url.search}`, 'Cache-Control': 'public, max-age=300' });
        return response.end();
      }
      let status = 200;
      let filename = manifest.routes[pathname];
      if (!filename) {
        // Only known HTML pages are routable; hidden build manifests stay private.
        if (pathname.split('/').some((part) => part.startsWith('.')) || /\.html$/i.test(pathname) || pathname.includes('\\')) status = 404;
        else filename = pathname.slice(1);
      }
      let content;
      if (status === 200 && filename) {
        const absolute = path.resolve(directory, filename);
        if (!absolute.startsWith(`${directory}${path.sep}`)) status = 404;
        else {
          try { content = await readFile(absolute); }
          catch (error) { if (['ENOENT', 'EISDIR', 'ENOTDIR'].includes(error.code)) status = 404; else throw error; }
        }
      } else status = 404;
      if (status === 404) { filename = '404.html'; content = await readFile(path.join(directory, filename)); }
      const headers = { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': status === 404 ? 'no-store' : /^\/(assets|media)\//.test(pathname)
          ? 'public, max-age=31536000, immutable' : /\.(xml|txt)$/.test(pathname)
            ? 'public, max-age=300' : filename.endsWith('.html') ? 'public, max-age=0, must-revalidate' : 'public, max-age=3600' };
      if (status === 404 || !manifest.indexable) headers['X-Robots-Tag'] = 'noindex, follow';
      const etag = `"${createHash('sha256').update(content).digest('hex').slice(0, 24)}"`;
      headers.ETag = etag;
      if (status === 200 && request.headers['if-none-match'] === etag) {
        response.writeHead(304, headers);
        return response.end();
      }
      response.writeHead(status, { ...headers, 'Content-Length': content.length });
      response.end(request.method === 'HEAD' ? undefined : content);
    } catch (error) {
      console.error(error);
      response.writeHead(500, { 'X-Robots-Tag': 'noindex', 'Cache-Control': 'no-store' });
      response.end('Server error');
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = await createSeoServer();
  const port = Number(process.env.PORT || 4173);
  server.listen(port, '127.0.0.1', () => console.log(`SEO preview: http://127.0.0.1:${port} (static HTML, redirects, real 404)`));
}
