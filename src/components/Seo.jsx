import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeo, renderSeoHead } from '../seo/metadata';

// Static generation supplies the same tags in the initial HTTP response.
// This keeps them (and <html lang>) current when navigating with React Router.
export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = getSeo(pathname);
    const template = document.createElement('template');
    template.innerHTML = renderSeoHead(seo);
    document.head.querySelectorAll('[data-seo]').forEach((element) => element.remove());
    document.head.append(template.content);
    document.documentElement.lang = seo.lang;
  }, [pathname]);
  return null;
}
