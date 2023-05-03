import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import resources from '@/locales/require';

const detectorOptions = {
    order: [
        'querystring',
        'cookie',
        'localStorage',
        'sessionStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
    ],

    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    caches: ['localStorage', 'sessionStorage'],
    excludeCacheFor: ['cimode'],
};

i18n.use(detector)
    .use(initReactI18next)
    .init({
        detection: detectorOptions,
        resources,
        lng:
            localStorage.getItem('i18nextLng') ??
            navigator.language.slice(0, 2),
        fallbackLng:
            localStorage.getItem('i18nextLng') ??
            navigator.language.slice(0, 2),
        interpolation: {
            escapeValue: false,
        },
    } as any);

export default i18n;
