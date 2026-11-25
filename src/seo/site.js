// Override at build time with VITE_SITE_URL; no credentials belong in VITE_* variables.
const configuredUrl = import.meta.env?.VITE_SITE_URL || 'https://rizkyakbar.net';
const parsedUrl = new URL(configuredUrl);
if (parsedUrl.protocol !== 'https:' || parsedUrl.pathname !== '/' || parsedUrl.search || parsedUrl.hash || parsedUrl.username || parsedUrl.password) {
  throw new Error('VITE_SITE_URL must be an HTTPS origin without a path, query, or credentials.');
}

// Localized titles and descriptions live in src/i18n/messages.js (seo.*).
export const site = {
  origin: parsedUrl.origin,
  name: 'Rizky Akbar Siregar',
  image: '/social/portfolio.jpg',
  indexable: import.meta.env?.VITE_INDEXABLE !== 'false',
};

export function absoluteUrl(path) {
  return new URL(path, `${site.origin}/`).href;
}
