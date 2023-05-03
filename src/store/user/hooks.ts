import { useSetRecoilState } from 'recoil';
import { setStorage } from '@/utils/storage';
import { userInfoState } from './atoms';
import { UserInfoType } from './types';

export const useSetUserInfo = () => {
    const setValue = useSetRecoilState(userInfoState);

    return (value: UserInfoType) => {
        setStorage('userInfo', value);
        setValue(value);
    };
};
