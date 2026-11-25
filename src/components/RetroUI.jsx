import { Link, NavLink } from "react-router-dom";
import { projectPath } from "../seo/paths";
import { getImageProps } from "../utils/projectImages";
import { LOCALES, localeInfo, localizePath } from "../i18n/locales";
import { useLocale } from "../i18n/useLocale";
export const cvUrl =
  "https://drive.google.com/file/d/1-ivKqBExvPZNnVniuWYaNE88cqCCwtT7/view?usp=sharing";

function LanguageSwitch() {
  const { locale, pathname, t } = useLocale();
  return (
    <div className="lang-switch" role="group" aria-label={t.nav.language}>
      {LOCALES.map((code, index) => (
        <span key={code} className="lang-switch-item">
          {index > 0 && <span className="lang-switch-sep" aria-hidden="true">/</span>}
          <Link
            to={localizePath(pathname, code)}
            hrefLang={code}
            lang={code}
            title={localeInfo[code].name}
            aria-current={code === locale ? "true" : undefined}
          >
            {localeInfo[code].label}
          </Link>
        </span>
      ))}
    </div>
  );
}

export function Header() {
  const { t, to } = useLocale();
  return (
    <header className="site-header shell">
      <Link className="brand" to={to("/")} aria-label={t.nav.brand}>
        <span className="brand-mark" aria-hidden="true">
          ✳
        </span>{" "}
        RAS<span className="nav-arrow">.</span>
      </Link>
      <nav className="site-nav" aria-label={t.nav.main}>
        <NavLink to={to("/")} end>
          {t.nav.home}
        </NavLink>
        <NavLink to={to("/projects")}>{t.nav.projects}</NavLink>
        <a href="https://github.com/KYKY62" target="_blank" rel="noreferrer">
          GitHub <span className="nav-arrow">↗</span>
        </a>
        <a href="https://code.rizkyakbar.net" target="_blank" rel="noreferrer">
          {t.nav.collection} <span className="nav-arrow">↗</span>
        </a>
      </nav>
      <LanguageSwitch />
    </header>
  );
}
export function Footer() {
  const { t } = useLocale();
  return (
    <footer className="site-footer shell">
      <span>© {new Date().getFullYear()} Rizky Akbar Siregar</span>
      <span>{t.footer.tagline}</span>
      <a href="#top">{t.footer.backToTop}</a>
    </footer>
  );
}
export function ProjectCard({
  project,
  index,
  headingLevel = "h3",
  eager = false,
}) {
  const { locale, t } = useLocale();
  const Heading = headingLevel;
  return (
    <Link className="work-card" to={projectPath(project, locale)}>
      <div className="work-preview">
        <img
          {...getImageProps(project.thumbnail)}
          alt={t.card.previewAlt(project.title)}
          loading={eager ? "eager" : "lazy"}
        />
        <span className="work-number">
          PROJECT_{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="work-info">
        <div className="work-title">
          <Heading>{project.title}</Heading>
          <span aria-hidden="true">↗</span>
        </div>
        <p className="work-stack">{project.stack.join(" / ")}</p>
      </div>
    </Link>
  );
}
