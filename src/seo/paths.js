import { DEFAULT_LOCALE, localizePath, stripLocale } from '../i18n/locales';

export function projectSlug(project) {
  return project.slug || project.id.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function projectPath(project, locale = DEFAULT_LOCALE) {
  return localizePath(`/project/${projectSlug(project)}`, locale);
}

export function normalizePath(pathname) {
  try {
    return decodeURIComponent(pathname).replace(/\/+$/, '') || '/';
  } catch {
    return '/404';
  }
}

// Matches the project in any locale; callers compare against projectPath(project, locale).
export function findProject(projects, pathname) {
  const path = stripLocale(normalizePath(pathname));
  return projects.find((project) => projectPath(project) === path || `/project/${project.id}` === path);
}
