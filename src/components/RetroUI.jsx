import { Link, NavLink } from 'react-router-dom';
import { projectPath } from '../seo/paths';
import { getImageProps } from '../utils/projectImages';
export const cvUrl = 'https://drive.google.com/file/d/1-ivKqBExvPZNnVniuWYaNE88cqCCwtT7/view?usp=sharing';
export function Header() {
  return <header className="site-header shell"><Link className="brand" to="/" aria-label="Rizky home"><span className="brand-mark" aria-hidden="true">✳</span> RAS<span className="nav-arrow">.</span></Link><nav className="site-nav" aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/projects">Projects</NavLink><a href="https://github.com/KYKY62" target="_blank" rel="noreferrer">GitHub <span className="nav-arrow">↗</span></a></nav></header>;
}
export function Footer() {
  return <footer className="site-footer shell"><span>© {new Date().getFullYear()} Rizky Akbar Siregar</span><span>Built with purpose. A little pixel magic.</span><a href="#top">Back to top ↑</a></footer>;
}
export function ProjectCard({ project, index, headingLevel = 'h3', eager = false }) {
  const Heading = headingLevel;
  return <Link className="work-card" to={projectPath(project)}><div className="work-preview"><img {...getImageProps(project.thumbnail)} alt={`${project.title} application preview`} loading={eager ? 'eager' : 'lazy'}/><span className="work-number">PROJECT_{String(index + 1).padStart(2, '0')}</span></div><div className="work-info"><div className="work-title"><Heading>{project.title}</Heading><span aria-hidden="true">↗</span></div><p className="work-stack">{project.stack.join(' / ')}</p></div></Link>;
}
