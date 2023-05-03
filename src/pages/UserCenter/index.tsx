import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { handleClipboard } from '@/utils/clipboard';
import { Button } from '@/components/vip-ui';
import UserItem from '@/pages/UserCenter/UserItem';

export interface operateListType {
    title: string;
    titleColor: string;
    icon?: boolean;
    key?: string;
    subTitle?: string;
    arrow?: boolean;
}

const UserBanner: FC = () => {
    const { t } = useTranslation();

    return (
        <div className="flex-between-center h-136px mb-30px pl-20px user-banner">
            <i className="icon-games w-50px h-50px" />
            <div className="flex-1 pl-9px">
                <div className="h-30px leading-30px text-16px">
                    Erick_Zhu
                    <i
                        className="icon-vip w-52px h-30px pl-31px text-[#66340A]"
                        style={{ fontFamily: 'Arial-BoldItalicMT' }}
                    >
                        5
                    </i>
                </div>
                <div
                    className="flex items-center h-20px leading-20px text-[#626161]"
                    onClick={(e) => handleClipboard('OK164557', e)}
                >
                    OK164557
                    <i className="icon-copy w-12px h-13px ml-9px" />
                </div>
            </div>
            <div className="w-80px h-34px leading-34px bg-[#DFB975] rounded-l-100px text-center">
                {t('userCenter.account')}
            </div>
        </div>
    );
};

const UserCenter: FC = () => {
    const { t } = useTranslation();
    const operateLang: Array<operateListType> = t('userCenter.operateList', {
        returnObjects: true,
    });

    const operateArr = operateLang.map(
        (el: operateListType, i: number): operateListType => {
            const arr = [
                'notify',
                'password',
                'authorizer',
                'setting',
                'language',
                'balance',
                'about',
            ];
            return {
                ...el,
                key: arr[i],
                icon: i < 4,
                arrow: arr[i] !== 'setting',
            };
        },
    );

    return (
        <div className="pt-20px pb-90px px-10px text-lgSize text-assistColor5">
            <UserBanner />
            <UserItem itemArr={operateArr.slice(0, 3)} />
            <UserItem
                className="mt-20px mb-47px"
                itemArr={operateArr.slice(3)}
            />
            <Button className="w-316px m-auto">{t('userCenter.logout')}</Button>
        </div>
    );
};

export default UserCenter;
