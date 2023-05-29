import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReserveList from '@/pages/Record/Reserve/List';
import Select from '@/pages/Record/Select';
import { getHallList } from '@/api/home';
import { ReserveType } from '@/pages/Record/Select/data';

interface HallArrType {
    id: number;
    hall_name: string;
}

const ReserveRecord: FC = () => {
    const { t } = useTranslation();
    const [hall, setHall] = useState<any>();
    const [type, setType] = useState<any>();
    const [hallArr, setHallArr] = useState([]);

    useEffect(() => {
        getHallList().then((res) => {
            setHallArr(
                res?.data.map((el: HallArrType) => ({
                    label: el.hall_name,
                    value: el.id,
                })) || [],
            );
        });
    }, []);

    return (
        <div className="flex flex-col h-full pt-20px">
            <div className="flex-between-center h-50px mb-20px px-20px bg-assistColor3 bg-opacity-80">
                <div>
                    {t('record.venueType')}：
                    <Select
                        value={hall}
                        list={hallArr}
                        onChange={(val) => setHall(val)}
                        title={t('record.venueType')}
                    />
                </div>
                <div>
                    {t('record.reserveType')}：
                    <Select
                        value={type}
                        list={ReserveType}
                        onChange={(val) => setType(val)}
                        title={t('record.reserveType')}
                    />
                </div>
            </div>
            <ReserveList className="px-10px" />
        </div>
    );
};

export default ReserveRecord;
