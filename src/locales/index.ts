import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import resources from '@/locales/require';
import { LangEnum, LocaleEnum } from '@/enums/appEnum';

export const initLang =
    localStorage.getItem('i18nextLng') ||
    LocaleEnum[navigator.language.slice(0, 2).toLocaleUpperCase()] ||
    LocaleEnum.ZH;

export const langList = Object.keys(LangEnum).map((key) => {
    return { label: LangEnum[key], value: key };
});

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
        lng: initLang,
        fallbackLng: initLang,
        interpolation: {
            escapeValue: false,
        },
    } as any);

export default i18n;
