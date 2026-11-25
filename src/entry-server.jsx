import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import projects from './data/projects';
import { getSeo, renderSeoHead } from './seo/metadata';
import { projectPath } from './seo/paths';
import { LOCALES, localizePath } from './i18n/locales';
export { site } from './seo/site';
export { default as imageVariants } from './data/imageVariants';

// Indonesian pages first (no prefix), then each other locale under its prefix.
export function publicPages() {
  const basePages = ['/', '/projects', ...projects.map((project) => projectPath(project))];
  return LOCALES.flatMap((locale) => basePages.map((page) => localizePath(page, locale)));
}

// One 404 page per locale: /404 (Indonesian) and /en/404.
export function notFoundPages() {
  return LOCALES.map((locale) => localizePath('/404', locale));
}

export function legacyRedirects() {
  return LOCALES.flatMap((locale) => projects
    .filter((project) => `/project/${project.id}` !== projectPath(project))
    .map((project) => ({ from: localizePath(`/project/${project.id}`, locale), to: projectPath(project, locale) })));
}

export function render(pathname) {
  const seo = getSeo(pathname);
  return { body: renderToString(<StaticRouter location={pathname}><App /></StaticRouter>),
    head: renderSeoHead(seo), seo };
}
