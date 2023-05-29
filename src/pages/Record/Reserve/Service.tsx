import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/vip-ui';
import ReserveList from '@/pages/Record/Reserve/List';

const ReserveService: FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-full py-20px px-10px pb-0">
            <div className="flex-between-center h-60px mb-30px px-10px rounded-10px bg-assistColor3 bg-opacity-80">
                <Button
                    icon={<i className="w-26px h-26px icon-kaigong" />}
                    className="h-44px"
                    width="w-142px"
                >
                    {t('record.service0')}
                </Button>
                <Button
                    icon={
                        <i className="w-26px h-26px icon-reserveWithdrawal" />
                    }
                    className="h-44px"
                    width="w-142px"
                >
                    {t('record.service1')}
                </Button>
            </div>
            <div className="flex-between-center h-20px mb-20px px-10px">
                <div>{t('record.reserveRecord')}</div>
                <div
                    className="flex-between-center h-20px leading-25px"
                    onClick={() => navigate('/reserveRecord')}
                >
                    <span>{t('record.allRecord')}</span>
                    <i className="w-6px h-12px icon-arrow ml-5px align-middle	" />
                </div>
            </div>
            <ReserveList />
        </div>
    );
};

export default ReserveService;
