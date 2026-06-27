import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import projects from '../data/projects';
import './DetailPage.css';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [project]);

  if (!project) {
    return (
      <div className="detail-page">
        <div className="not-found">
          <h2>Project Not Found</h2>
          <p>The project you are looking for does not exist.</p>
          <button className="back-btn" style={{ position: 'relative', top: 0, left: 0 }} onClick={() => navigate('/')}>
            Go Back
          </button>
        </div>
      </div>
    );
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
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="detail-container" ref={cardRef}>
        <div className="detail-card">
          <div className="detail-hero-img">
            <img src={project.images[0]} alt={project.title} />
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
                  <img key={i} src={img} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" />
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
    </div>
  );
}

export default DetailPage;
