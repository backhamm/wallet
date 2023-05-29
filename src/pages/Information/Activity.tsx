import React, { createRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Image, List } from '@/components/vip-ui';
import { getHallList } from '@/api/home';
import Detail, { DetailModalRef } from '@/pages/Information/Detail';

const Activity = () => {
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
        <div id="ActivityList">
            <List
                getData={() => mutateAsync()}
                hasMore={hasMore}
                isLoading={isLoading}
                isError={isError}
                getScrollContainer={() =>
                    document.getElementById('ActivityList')
                }
                className="p-20px"
            >
                {dataList.map((el, i) => {
                    return (
                        <div
                            key={i}
                            className="mb-20px"
                            onClick={() =>
                                modalRef.current.showModal('activity')
                            }
                        >
                            <Image
                                src="https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_640.jpg"
                                className="h-116px mb-6px"
                            ></Image>
                            【活动】即日起至3/20日止赠送BlankPink演唱会门票
                        </div>
                    );
                })}
            </List>
            <Detail ref={modalRef} />
        </div>
    );
};

export default Activity;
