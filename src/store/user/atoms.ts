import { atom } from 'recoil';
import { getStorage } from '@/utils/storage';
import { UserInfoType } from './types';

export const userInfoState = atom<UserInfoType>({
    key: 'userInfoState',
    default: (getStorage('userInfo') ?? {}) as UserInfoType,
});

export const userCurrencyState = atom<string>({
    key: 'userCurrency',
    default: 'PHP',
});
