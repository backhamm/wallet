import { selector } from 'recoil';
import { userCurrencyState, userInfoState } from './atoms';

export const selectorUserInfo = selector({
    key: 'selectorUserInfo',
    get: ({ get }) => {
        return get(userInfoState);
    },
});

export const selectorUserCurrency = selector({
    key: 'selectorUserCurrency',
    get: ({ get }) => {
        return get(userCurrencyState);
    },
});
