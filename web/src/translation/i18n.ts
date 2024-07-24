import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import { localeToFacebookLocale } from 'translation/locales';

// Init localisation package and ensure it uses relevant plugins
// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(resourcesToBackend((language: string) => import(`../locales/${language}.json`)))
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['querystring', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false, // Not needed for react as it escapes by default
    },
  });

i18n.on('languageChanged', function (lng: keyof typeof localeToFacebookLocale) {
  document.documentElement.setAttribute('lang', lng);
  // TODO: Use react-helmet to manage meta tags
  document.title = `Electricity Maps | ${i18n.t('misc.maintitle')}`;
  // Optional chaining added to ensure jsdom works
  document
    .querySelector('meta[property="og:locale"]')
    ?.setAttribute('content', localeToFacebookLocale[lng || 'en']);
});

export { default } from 'i18next';
