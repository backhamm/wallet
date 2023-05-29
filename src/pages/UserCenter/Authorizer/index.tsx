import React, { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { List } from '@/components/vip-ui';
import { getHallList } from '@/api/home';

const Authorizer: FC = () => {
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
        <div id="Authorizer">
            <List
                getData={() => mutateAsync()}
                isLoading={isLoading}
                isError={isError}
                hasMore={hasMore}
                getScrollContainer={() => document.getElementById('Authorizer')}
                className="p-20px text-lgSize"
            >
                {dataList.map((el, i) => {
                    return (
                        <div
                            key={i}
                            className="flex items-center h-90px mb-20px text-assistColor5 authorizer-bg"
                        >
                            <div className="w-110px text-center">李大海</div>
                            <div className="flex-1">
                                <div>+63 9770338794</div>
                                <div className="mt-4px">存卡、佣金、订务</div>
                            </div>
                        </div>
                    );
                })}
            </List>
        </div>
    );
};

export default Authorizer;
