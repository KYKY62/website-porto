import projects from "../data/projects";
import { Header, Footer, ProjectCard } from "../components/RetroUI";
import "./AllProjectsPage.css";
import { useLocale } from "../i18n/useLocale";
export default function AllProjectsPage() {
  const { t } = useLocale();
  return (
    <div id="top">
      <Header />
      <main className="all-projects shell">
        <div className="all-projects-header">
          <p className="eyebrow">
            The project archive / {String(projects.length).padStart(2, "0")}{" "}
            entries
          </p>
          <h1>{t.projects.heading}</h1>
          <p>{t.projects.lead}</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${index}`}
              project={project}
              index={index}
              headingLevel="h2"
              eager={index < 3}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
