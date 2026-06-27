import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import projects from '../data/projects';
import { useSplash } from '../context/SplashContext';
import './AllProjectsPage.css';

function AllProjectsPage() {
  const navigate = useNavigate();
  const { phase, fadeOut } = useSplash();
  const gridRef = useRef(null);
  const headerRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (animatedRef.current) return;

    const runAnimation = () => {
      animatedRef.current = true;

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.all-project-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.2)',
            stagger: 0.08,
            delay: 0.1,
          }
        );
      }
    };

    // set initial state (hidden)
    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 0, y: -30 });
    }
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.all-project-card');
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.95 });
    }

    if (phase === 'visible') {
      // came from Explore button, wait for browser layout then fade splash
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fadeOut();
          // delay animation until splash starts fading
          setTimeout(() => {
            runAnimation();
          }, 120);
        });
      });
    } else {
      // direct load / not from splash, animate immediately after layout
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          runAnimation();
        });
      });
    }
  }, [phase, fadeOut]);

  return (
    <div className="all-projects">
      <button className="back-btn" onClick={() => navigate('/')}>
        &larr; Home
      </button>

      <div className="all-projects-header" ref={headerRef}>
        <h1>All Projects</h1>
        <p>A showcase of my work and experiments</p>
      </div>

      <div className="all-projects-grid" ref={gridRef}>
        {projects.map((project) => (
          <div
            key={project.id}
            className="all-project-card"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <img src={project.thumbnail} alt={project.title} />
            <div className="card-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="card-tags">
                {project.stack.slice(0, 4).map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProjectsPage;
