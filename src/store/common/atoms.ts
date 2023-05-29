import { atom } from 'recoil';
import { initLang } from '@/locales';
import { LocaleStateType } from './types';

export const localeState = atom<LocaleStateType>({
    key: 'localeState',
    default: {
        locale: initLang,
    },
});

export const navTitleState = atom<string>({
    key: 'navTitleState',
    default: '',
});
