import { deffHttp } from '@/utils/axios';
import { HallResult } from '@/types/api/home';

enum Api {
    CMS_HALL_CACHE = '/api/cms/hall/cache',
}

export const getHallList = () =>
    deffHttp.post<HallResult[]>(
        { url: Api.CMS_HALL_CACHE },
        { withToken: false },
    );
