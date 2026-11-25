import projects from '../data/projects';
import { site, absoluteUrl } from './site';
import { findProject, normalizePath, projectPath } from './paths';
import { getSocialImage } from '../utils/projectImages';
import { DEFAULT_LOCALE, LOCALES, getLocaleFromPath, localeInfo, localized, localizePath, stripLocale } from '../i18n/locales';
import { messages } from '../i18n/messages';

export function summarize(text, limit = 160) {
  const value = text.replace(/\s+/g, ' ').trim();
  if (value.length <= limit) return value;
  return `${value.slice(0, limit - 1).replace(/\s+\S*$/, '')}…`;
}

export function getSeo(pathname) {
  const normalized = normalizePath(pathname);
  const locale = getLocaleFromPath(normalized);
  const path = stripLocale(normalized);
  const t = messages[locale];
  const localPath = (value) => localizePath(value, locale);
  const project = findProject(projects, path);
  const basePath = project ? projectPath(project) : path;
  const canonicalPath = localPath(basePath);
  const found = path === '/' || path === '/projects' || Boolean(project);
  // Optional project.seo fields may be plain strings or { id, en }.
  const override = (key) => localized(project?.seo?.[key], locale);
  const title = override('title') || (project
    ? t.seo.projectTitle(project.title)
    : path === '/projects' ? t.seo.projectsTitle
      : found ? t.seo.homeTitle : t.seo.notFoundTitle);
  const description = override('description') || (project
    ? summarize(`${project.title}: ${localized(project.description, locale)}`)
    : path === '/projects' ? t.seo.projectsDescription
      : found ? t.seo.homeDescription : t.seo.notFoundDescription);
  const canonical = found ? absoluteUrl(override('canonicalUrl') || canonicalPath) : null;
  if (canonical && new URL(canonical).origin !== site.origin) {
    throw new Error(`Canonical URL must use the configured site origin: ${canonical}`);
  }
  const alternates = found ? [
    ...LOCALES.map((code) => ({ hreflang: localeInfo[code].lang, href: absoluteUrl(localizePath(basePath, code)) })),
    { hreflang: 'x-default', href: absoluteUrl(localizePath(basePath, DEFAULT_LOCALE)) },
  ] : [];
  const image = absoluteUrl(override('ogImage') || (project && getSocialImage(project.thumbnail)) || site.image);
  const breadcrumbs = [
    { name: t.nav.home, path: localPath('/') }, { name: t.nav.projects, path: localPath('/projects') },
    ...(project ? [{ name: project.title, path: canonicalPath }] : []),
  ];
  const structuredData = !found ? [] : path === '/' ? [
    { '@context': 'https://schema.org', '@type': 'Person', '@id': absoluteUrl('/#person'), name: site.name,
      url: absoluteUrl(localPath('/')), jobTitle: 'Full-Stack Developer', description: t.seo.homeDescription,
      sameAs: ['https://github.com/KYKY62', 'https://www.linkedin.com/in/rizkysrg62/'],
      knowsAbout: ['Flutter', 'Laravel', 'Vue', 'Golang', 'Web development', 'Mobile application development'] },
    { '@context': 'https://schema.org', '@type': 'WebSite', name: t.seo.siteName, url: absoluteUrl(localPath('/')),
      inLanguage: localeInfo[locale].lang },
  ] : [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path),
    })) },
    project ? { '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title, description,
      url: canonical, image, inLanguage: localeInfo[locale].lang,
      author: { '@type': 'Person', name: site.name, url: absoluteUrl(localPath('/')) } }
      : { '@context': 'https://schema.org', '@type': 'ItemList', name: t.seo.projectListName,
        itemListElement: projects.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.title,
          url: absoluteUrl(projectPath(item, locale)) })) },
  ];
  return { title, description, canonical, alternates, image,
    imageAlt: project ? t.card.previewAlt(project.title) : t.seo.portfolioAlt,
    ogTitle: override('ogTitle') || title, ogDescription: override('ogDescription') || description,
    type: 'website', found, indexable: found && site.indexable, structuredData,
    locale, lang: localeInfo[locale].lang, siteName: t.seo.siteName };
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
    ...seo.alternates.map((item) => `<link data-seo rel="alternate" hreflang="${item.hreflang}" href="${escapeHtml(item.href)}">`),
    meta('property', 'og:title', seo.ogTitle), meta('property', 'og:description', seo.ogDescription),
    meta('property', 'og:type', seo.type), meta('property', 'og:image', seo.image),
    meta('property', 'og:image:alt', seo.imageAlt), meta('property', 'og:site_name', seo.siteName),
    meta('property', 'og:locale', localeInfo[seo.locale].ogLocale),
    ...LOCALES.filter((code) => code !== seo.locale).map((code) => meta('property', 'og:locale:alternate', localeInfo[code].ogLocale)),
    seo.canonical ? meta('property', 'og:url', seo.canonical) : '',
    meta('name', 'twitter:card', 'summary_large_image'), meta('name', 'twitter:title', seo.ogTitle),
    meta('name', 'twitter:description', seo.ogDescription), meta('name', 'twitter:image', seo.image),
    meta('name', 'twitter:image:alt', seo.imageAlt),
    ...seo.structuredData.map((data) => `<script data-seo type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`),
  ].filter(Boolean).join('\n');
}
