import type { AxiosResponse } from 'axios';
import type { Result } from '@/types/utils/axios';

export const errorData = (res: AxiosResponse<Result<any>>) => {
    return {
        data: null,
        msg: res.data.msg,
        code: res.data.code,
    };
};
