// Override at build time with VITE_SITE_URL; no credentials belong in VITE_* variables.
const configuredUrl = import.meta.env?.VITE_SITE_URL || 'https://rizkyakbar.net';
const parsedUrl = new URL(configuredUrl);
if (parsedUrl.protocol !== 'https:' || parsedUrl.pathname !== '/' || parsedUrl.search || parsedUrl.hash || parsedUrl.username || parsedUrl.password) {
  throw new Error('VITE_SITE_URL must be an HTTPS origin without a path, query, or credentials.');
}

export const site = {
  origin: parsedUrl.origin,
  name: 'Rizky Akbar Siregar',
  title: 'Rizky Akbar Siregar | Full-Stack Developer in Indonesia',
  description: 'Explore Rizky Akbar Siregar’s web and mobile development portfolio, including Laravel, Vue, Flutter, and public service projects in Langkat and Medan.',
  image: '/social/portfolio.jpg',
  language: 'en',
  locale: 'en_US',
  indexable: import.meta.env?.VITE_INDEXABLE !== 'false',
};

export function absoluteUrl(path) {
  return new URL(path, `${site.origin}/`).href;
}
