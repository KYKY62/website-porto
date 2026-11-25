import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/RetroUI';
import './DetailPage.css';
import { useLocale } from '../i18n/useLocale';

export default function NotFoundPage() {
  const { t, to } = useLocale();
  return <div id="top"><Header/><main className="detail-page not-found">
    <p className="eyebrow">404 / Page not found</p>
    <h1 className="detail-title">{t.notFound.heading}</h1>
    <p>{t.notFound.body}</p>
    <Link className="pixel-button" to={to("/")}>{t.notFound.home}</Link>{' '}
    <Link className="pixel-button primary" to={to("/projects")}>{t.notFound.explore}</Link>
  </main><Footer/></div>;
}
