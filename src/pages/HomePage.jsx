import { Link } from "react-router-dom";
import projects from "../data/projects";
import { Header, Footer, ProjectCard, cvUrl } from "../components/RetroUI";
import "./HomePage.css";
import TypingName from "../components/TypingName";

const workExperience = [
  {
    role: "Tenaga Ahli Programmer",
    company: "Diskominfo Langkat",
    period: "Jan 2025 – Sekarang",
    location: "Langkat",
    current: true,
  },
  {
    role: "Fullstack Developer",
    company: "Akademi Bidan Langkat",
    period: "Jul 2025 – Sept 2025",
    location: "Langkat",
  },
  {
    role: "Flutter Developer",
    company: "BMKG Wilayah 1 Medan",
    period: "Sept 2023 – Des 2023",
    location: "Medan",
  },
];

function PixelComputer() {
  return (
    <div className="computer-scene">
      <div className="scene-label">PERSONAL_WORKSPACE.EXE</div>
      <svg
        className="pixel-computer"
        viewBox="0 0 320 270"
        role="img"
        aria-label="Retro pixel computer displaying a code prompt"
        shapeRendering="crispEdges"
      >
        <g fill="currentColor">
          <path
            d="M64 30h176v8h8v132h-8v8H64v-8h-8V38h8zm8 16v108h160V46z"
            fillRule="evenodd"
          />
          <path d="M76 50h152v100H76z" />
          <path d="M140 178h28v24h-28zM112 202h84v8h-84zM64 220h176v8h8v8h8v16H48v-16h8v-8h8zM260 222h16v8h8v22h-32v-22h8z" />
          <path d="M28 80h8v8h8v8h-8v8h-8v-8h-8v-8h8zM270 46h8v8h8v8h-8v8h-8v-8h-8v-8h8z" />
        </g>
        <g fill="var(--bg-primary)">
          <path d="M84 58h136v84H84zM64 236h8v8h-8zm16 0h8v8h-8zm16 0h8v8h-8zm16 0h8v8h-8zm16 0h64v8h-64zm72 0h8v8h-8zm16 0h16v8h-16z" />
        </g>
        <g fill="var(--accent)">
          <path d="M101 78h8v8h8v8h-8v8h-8v-8h8v-8h-8zM125 98h32v6h-32zM100 118h64v4h-64zM172 118h24v4h-24zM208 162h8v8h-8z" />
        </g>
      </svg>
      <div className="scene-caption">
        <span>● SYSTEM ONLINE</span>
        <span>LET'S BUILD SOMETHING.</span>
      </div>
    </div>
  );
}
export default function HomePage() {
  return (
    <div id="top">
      <Header />
      <main className="shell">
        <section className="intro">
          <div className="intro-copy">
            <p className="eyebrow">
              <span className="status-square" /> Hello, world. I'm
            </p>
            <TypingName />
            <p className="role">Full-Stack Developer</p>
            <p className="intro-description">
              Turning ideas into things you can use.
              <br />I build thoughtful web & mobile experiences,
              <br className="desktop-break" /> one pixel at a time.
            </p>
            <div className="hero-actions">
              <Link to="/projects" className="pixel-button primary">
                Explore projects <span aria-hidden="true">↗</span>
              </Link>
              <a
                className="pixel-button"
                href={cvUrl}
                target="_blank"
                rel="noreferrer"
              >
                Download CV <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <PixelComputer />
        </section>
        <div className="skills-strip">
          <span className="eyebrow">My toolkit</span>
          <span>Flutter</span>
          <span className="separator">✳</span>
          <span>Laravel</span>
          <span className="separator">✳</span>
          <span>Golang</span>
          <span className="separator">✳</span>
          <span>REST API</span>
        </div>
        <section
          className="work-experience"
          aria-labelledby="experience-heading"
          lang="id"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Work experience</p>
              <h2 id="experience-heading">Pengalaman kerja.</h2>
            </div>
          </div>
          <ol className="experience-list">
            {workExperience.map((experience, index) => (
              <li className="experience-item" key={experience.company}>
                <span className="experience-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="experience-info">
                  <h3>{experience.role}</h3>
                  <p>{experience.company}</p>
                </div>
                <div className="experience-meta">
                  <p>{experience.period}</p>
                  <p className="experience-location">
                    {experience.current && (
                      <span className="experience-status">Aktif</span>
                    )}
                    {experience.location}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section className="selected-work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / Selected work</p>
              <h2>Made with intention.</h2>
            </div>
            <Link to="/projects">
              All projects ({String(projects.length).padStart(2, "0")}) ↗
            </Link>
          </div>
          <div className="project-grid">
            {projects.slice(1, 4).map((project, index) => (
              <ProjectCard
                key={`${project.id}-${index}`}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>
        <section className="contact-line">
          <p>
            Have an idea in mind?
            <br />
            <span>Let's make it real.</span>
          </p>
          <a
            href="https://github.com/KYKY62"
            target="_blank"
            rel="noreferrer"
            className="pixel-button"
          >
            Find me on GitHub ↗
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
