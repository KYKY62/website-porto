// Indonesian lives at the root; every other locale gets a URL prefix (/en).
export const DEFAULT_LOCALE = 'id';
export const LOCALES = ['id', 'en'];

export const localeInfo = {
  id: { lang: 'id', ogLocale: 'id_ID', label: 'ID', name: 'Bahasa Indonesia' },
  en: { lang: 'en', ogLocale: 'en_US', label: 'EN', name: 'English' },
};

const prefixPattern = /^\/(en)(?=\/|$)/i;

export function getLocaleFromPath(pathname = '/') {
  return prefixPattern.exec(pathname)?.[1].toLowerCase() || DEFAULT_LOCALE;
}

export function stripLocale(pathname = '/') {
  return pathname.replace(prefixPattern, '') || '/';
}

export function localizePath(pathname, locale) {
  const base = stripLocale(pathname);
  if (locale === DEFAULT_LOCALE) return base;
  return base === '/' ? `/${locale}` : `/${locale}${base}`;
}

// Content fields may be a plain string (same in every language) or { id, en }.
export function localized(value, locale) {
  if (value == null || typeof value === 'string') return value;
  return value[locale] ?? value[DEFAULT_LOCALE];
}
