import { Link, Navigate, useLocation } from 'react-router-dom';
import { Header, Footer } from '../components/RetroUI';
import projects from '../data/projects';
import { findProject, projectPath } from '../seo/paths';
import { getImageProps } from '../utils/projectImages';
import NotFoundPage from './NotFoundPage';
import './DetailPage.css';

function DetailPage() {
  const location = useLocation();
  const project = findProject(projects, location.pathname);

  if (!project) {
    return <NotFoundPage />;
  }

  if (location.pathname !== projectPath(project)) {
    return <Navigate replace to={`${projectPath(project)}${location.search}${location.hash}`} />;
  }

  const actions = [];
  if (project.link) {
    actions.push({
      label: 'View on GitHub',
      href: project.link,
      className: 'detail-link',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      ),
    });
  }
  if (project.download) {
    actions.push({
      label: 'Download App',
      href: project.download,
      className: 'detail-link detail-link--outline',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
    });
  }
  if (project.website) {
    actions.push({
      label: 'Visit Website',
      href: project.website,
      className: 'detail-link detail-link--outline',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    });
  }

  return (
    <div id="top"><Header/><main className="detail-page">
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <Link to="/">Home</Link><span aria-hidden="true">/</span>
        <Link to="/projects">Projects</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{project.title}</span>
      </nav>

      <div className="detail-container">
        <div className="detail-card">
          <div className="detail-hero-img">
            <img {...getImageProps(project.images[0], { detail: true })} alt={`${project.title} application interface`} loading="eager" fetchPriority="high" />
          </div>

          <div className="detail-body">
            <h1 className="detail-title">{project.title}</h1>

            <div className="detail-stack">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <p className="detail-desc">{project.description}</p>

            {project.images.length > 1 && (
              <div className="detail-gallery">
                {project.images.slice(1).map((img, i) => (
                  <img key={i} {...getImageProps(img, { detail: true })} alt={`${project.title} additional screenshot ${i + 1}`} loading="lazy" />
                ))}
              </div>
            )}

            {actions.length > 0 && (
              <div className="detail-actions">
                {actions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={action.className}
                  >
                    {action.label}
                    {action.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <section className="related-projects" aria-labelledby="related-heading">
        <h2 id="related-heading">More projects</h2>
        <ul>{projects.filter((item) => item.id !== project.id).sort((a, b) =>
          b.stack.filter((tech) => project.stack.includes(tech)).length - a.stack.filter((tech) => project.stack.includes(tech)).length
        ).slice(0, 3).map((item) => <li key={item.id}><Link to={projectPath(item)}>{item.title} ↗</Link></li>)}</ul>
      </section>
    </main><Footer/></div>
  );
}

export default DetailPage;
