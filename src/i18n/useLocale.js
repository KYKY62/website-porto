import { useLocation } from 'react-router-dom';
import { getLocaleFromPath, localizePath } from './locales';
import { messages } from './messages';

// The locale comes from the URL, so prerendered HTML and hydration always agree.
export function useLocale() {
  const { pathname } = useLocation();
  const locale = getLocaleFromPath(pathname);
  return { locale, pathname, t: messages[locale], to: (path) => localizePath(path, locale) };
}
