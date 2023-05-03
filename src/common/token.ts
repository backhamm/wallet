/**
 * @description: token设置
 */
import { setStorage, getStorage, removeStorage } from '@/utils/storage';

const tokenKey = 'token';

export default Object.freeze({
    clearToken: () => {
        removeStorage(tokenKey);
    },
    setToken: (data: string) => {
        setStorage(tokenKey, data);
    },
    getToken: () => {
        return getStorage(tokenKey);
    },
});
