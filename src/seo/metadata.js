import projects from '../data/projects';
import { site, absoluteUrl } from './site';
import { findProject, normalizePath, projectPath } from './paths';
import { getSocialImage } from '../utils/projectImages';

export function summarize(text, limit = 160) {
  const value = text.replace(/\s+/g, ' ').trim();
  if (value.length <= limit) return value;
  return `${value.slice(0, limit - 1).replace(/\s+\S*$/, '')}…`;
}

export function getSeo(pathname) {
  const path = normalizePath(pathname);
  const project = findProject(projects, path);
  const canonicalPath = project ? projectPath(project) : path;
  const found = path === '/' || path === '/projects' || Boolean(project);
  const overrides = project?.seo || {};
  const title = overrides.title || (project
    ? `${project.title} | Project by ${site.name}`
    : path === '/projects' ? `Web & Mobile Projects | ${site.name}`
      : found ? site.title : `Page Not Found | ${site.name}`);
  const description = overrides.description || (project
    ? summarize(`${project.title}: ${project.description}`)
    : path === '/projects'
      ? 'Browse web and mobile projects by Rizky Akbar Siregar: government portals, multi-tenant websites, Flutter apps, and education platforms.'
      : found ? site.description : 'This page could not be found. Explore Rizky Akbar Siregar’s portfolio and web and mobile projects.');
  const canonical = found ? absoluteUrl(overrides.canonicalUrl || canonicalPath) : null;
  if (canonical && new URL(canonical).origin !== site.origin) {
    throw new Error(`Canonical URL must use the configured site origin: ${canonical}`);
  }
  const image = absoluteUrl(overrides.ogImage || (project && getSocialImage(project.thumbnail)) || site.image);
  const breadcrumbs = project ? [
    { name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' },
    { name: project.title, path: canonicalPath },
  ] : [{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }];
  const structuredData = !found ? [] : path === '/' ? [
    { '@context': 'https://schema.org', '@type': 'Person', '@id': absoluteUrl('/#person'), name: site.name,
      url: absoluteUrl('/'), jobTitle: 'Full-Stack Developer', description: site.description,
      sameAs: ['https://github.com/KYKY62', 'https://www.linkedin.com/in/rizkysrg62/'],
      knowsAbout: ['Flutter', 'Laravel', 'Vue', 'Golang', 'Web development', 'Mobile application development'] },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: `${site.name} Portfolio`, url: absoluteUrl('/'), inLanguage: site.language },
  ] : [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path),
    })) },
    project ? { '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title, description,
      url: canonical, image, author: { '@type': 'Person', name: site.name, url: absoluteUrl('/') } }
      : { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Web and mobile projects',
        itemListElement: projects.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.title, url: absoluteUrl(projectPath(item)) })) },
  ];
  return { title, description, canonical, image, imageAlt: project ? `${project.title} application preview` : `${site.name} web and mobile portfolio`,
    ogTitle: overrides.ogTitle || title, ogDescription: overrides.ogDescription || description,
    type: 'website', found, indexable: found && site.indexable, structuredData };
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

export function renderSeoHead(seo) {
  const meta = (attribute, name, content) => `<meta data-seo ${attribute}="${name}" content="${escapeHtml(content)}">`;
  return [
    `<title data-seo>${escapeHtml(seo.title)}</title>`,
    meta('name', 'description', seo.description),
    meta('name', 'robots', seo.indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'),
    seo.canonical ? `<link data-seo rel="canonical" href="${escapeHtml(seo.canonical)}">` : '',
    meta('property', 'og:title', seo.ogTitle), meta('property', 'og:description', seo.ogDescription),
    meta('property', 'og:type', seo.type), meta('property', 'og:image', seo.image),
    meta('property', 'og:image:alt', seo.imageAlt), meta('property', 'og:site_name', `${site.name} Portfolio`),
    meta('property', 'og:locale', site.locale), seo.canonical ? meta('property', 'og:url', seo.canonical) : '',
    meta('name', 'twitter:card', 'summary_large_image'), meta('name', 'twitter:title', seo.ogTitle),
    meta('name', 'twitter:description', seo.ogDescription), meta('name', 'twitter:image', seo.image),
    meta('name', 'twitter:image:alt', seo.imageAlt),
    ...seo.structuredData.map((data) => `<script data-seo type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`),
  ].filter(Boolean).join('\n');
}
