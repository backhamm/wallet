import { selector } from 'recoil';
import { localeState } from './atoms';

export const selectorLocale = selector({
    key: 'selectorLocale',
    get: ({ get }) => {
        const state = get(localeState);
        return state.locale;
    },
});
