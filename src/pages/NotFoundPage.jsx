import { Link } from 'react-router-dom';
import { Header, Footer } from '../components/RetroUI';
import './DetailPage.css';

export default function NotFoundPage() {
  return <div id="top"><Header/><main className="detail-page not-found">
    <p className="eyebrow">404 / Page not found</p>
    <h1 className="detail-title">Nothing here yet.</h1>
    <p>The page may have moved or the address may be incorrect.</p>
    <Link className="pixel-button" to="/">Back to home</Link>{' '}
    <Link className="pixel-button primary" to="/projects">Explore projects</Link>
  </main><Footer/></div>;
}
