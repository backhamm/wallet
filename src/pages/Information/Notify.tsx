import React, { createRef, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { List } from '@/components/vip-ui';
import { getHallList } from '@/api/home';
import Detail, { DetailModalRef } from '@/pages/Information/Detail';

const Notify: FC = () => {
    const { t } = useTranslation();
    const [dataList, setDataList] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const modalRef = createRef<DetailModalRef>();

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
        <div id="NotifyList">
            <List
                getData={() => mutateAsync()}
                hasMore={hasMore}
                isLoading={isLoading}
                isError={isError}
                getScrollContainer={() => document.getElementById('NotifyList')}
                className="p-20px"
            >
                {dataList.map((el, i) => {
                    return (
                        <div
                            key={i}
                            className="mb-20px pt-15px pb-10px px-20px notify-bg text-assistColor5"
                            onClick={() =>
                                modalRef.current.showModal('notifyDetail')
                            }
                        >
                            <div className="flex-between-center mb-22px">
                                <i className="w-30px h-30px icon-games" />
                                <div className="flex-1 mx-11px truncate text-lgSize">
                                    担保收款{el.hall_name}
                                </div>
                                <div>2023-02-23 14:43:54</div>
                            </div>
                            <div className="w-256px h-25px m-auto mb-25px px-10px leading-25px truncate rounded-4px border-1px border-solid border-assistColor2">
                                通知标题通知标题通知标题awdjaajwfkajwkfajwdawdsawd
                            </div>
                            <div className="flex justify-end items-center">
                                {t('userCenter.toDetail')}
                                <i className="w-6px h-9px ml-5px icon-arrowBlack" />
                            </div>
                        </div>
                    );
                })}
            </List>
            <Detail ref={modalRef} />
        </div>
    );
};

export default Notify;
