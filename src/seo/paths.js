export function projectSlug(project) {
  return project.slug || project.id.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function projectPath(project) {
  return `/project/${projectSlug(project)}`;
}

export function normalizePath(pathname) {
  try {
    return decodeURIComponent(pathname).replace(/\/+$/, '') || '/';
  } catch {
    return '/404';
  }
}

export function findProject(projects, pathname) {
  const path = normalizePath(pathname);
  return projects.find((project) => projectPath(project) === path || `/project/${project.id}` === path);
}
