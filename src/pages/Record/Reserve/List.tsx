import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { List } from '@/components/vip-ui';
import { getHallList } from '@/api/home';

const ReserveList: FC<{ className?: string }> = ({ className }) => {
    const { t } = useTranslation();
    const [dataList, setDataList] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const { mutateAsync, isLoading, isError } = useMutation(getHallList, {
        onSuccess: (res) => {
            if (res?.code === 10000) {
                if (res?.data?.length) {
                    setHasMore(true);
                    setDataList([...dataList, ...res.data]);
                } else {
                    setHasMore(false);
                }
            }
        },
    });

    return (
        <div id="ReserveService" className={`flex-1 ${className}`}>
            <List
                getData={() => mutateAsync()}
                hasMore={hasMore}
                isLoading={isLoading}
                isError={isError}
                getScrollContainer={() =>
                    document.getElementById('ReserveService')
                }
                className="pb-20px"
            >
                {dataList.map((el, i) => {
                    return (
                        <div
                            key={i}
                            className="mb-15px rounded-8px gradient-border"
                        >
                            <div className="relative px-20px pt-15px pb-12px">
                                <div className="absolute top-0 right-0 h-18px px-7px leading-18px text-10px rounded-tr-7px rounded-bl-7px text-assistColor5 bg-assistColor4">
                                    {t(`record.service${i % 2}`)}
                                </div>
                                <div className="text-primaryColor">PHP</div>
                                <div className="flex-between-center my-10px pb-13px border-b border-baseColor border-solid">
                                    <div>OKADA</div>
                                    <div className="text-primaryColor">
                                        -5555555万
                                    </div>
                                </div>
                                <div className="flex-between-center">
                                    <div>
                                        {t('record.reserveDate')}
                                        ：2023-03-23 15:30:20
                                    </div>
                                    <div
                                        className={`text-${
                                            i % 2 ? 'success' : 'error'
                                        }`}
                                    >
                                        {t(`record.codeOut${i % 2}`)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </List>
        </div>
    );
};

export default ReserveList;
