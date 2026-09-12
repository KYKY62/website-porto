import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import projects from './data/projects';
import { getSeo, renderSeoHead } from './seo/metadata';
import { projectPath } from './seo/paths';
export { site } from './seo/site';
export { default as imageVariants } from './data/imageVariants';

export function publicPages() {
  return ['/', '/projects', ...projects.map(projectPath)];
}

export function legacyRedirects() {
  return projects.filter((project) => `/project/${project.id}` !== projectPath(project))
    .map((project) => ({ from: `/project/${project.id}`, to: projectPath(project) }));
}

export function render(pathname) {
  const seo = getSeo(pathname);
  return { body: renderToString(<StaticRouter location={pathname}><App /></StaticRouter>),
    head: renderSeoHead(seo), seo };
}
