import { atom } from 'recoil';
import { LocaleEnum } from '@/enums/appEnum';
import { LocaleStateType } from './types';

export const localeState = atom<LocaleStateType>({
    key: 'localeState',
    default: {
        locale:
            ((localStorage.getItem('i18nextLng') ||
                navigator.language.slice(0, 2)) as LocaleEnum) ?? LocaleEnum.ZH,
    },
});
