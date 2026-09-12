import projects from '../data/projects';
import { Header, Footer, ProjectCard } from '../components/RetroUI';
import './AllProjectsPage.css';
export default function AllProjectsPage() {
  return <div id="top"><Header/><main className="all-projects shell"><div className="all-projects-header"><p className="eyebrow">The project archive / {String(projects.length).padStart(2, '0')} entries</p><h1>Web &amp; mobile projects.</h1><p>A collection of web, mobile, and everything in between.</p></div><div className="project-grid">{projects.map((project, index) => <ProjectCard key={`${project.id}-${index}`} project={project} index={index} headingLevel="h2" eager={index < 3}/>)}</div></main><Footer/></div>;
}
