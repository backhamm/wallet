import React, { FC, useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { List } from '@/components/vip-ui';
import { getHallList } from '@/api/home';

type TestDetailProps = {};

const TestDetail: FC<TestDetailProps> = (props) => {
    const { mutateAsync, isLoading, isError } = useMutation(getHallList, {
        onSuccess: (res) => {
            if (res?.code === 10000) {
                setList(list.concat(res.data));
            }
        },
    });
    const [hasMore, setHasMore] = useState(true);
    const [list, setList] = useState([]);

    useEffect(() => {
        if (list.length > 30) {
            setHasMore(false);
        } else {
            setHasMore(true);
        }
    }, [list]);
    return (
        <div id="list">
            <List
                getData={() => mutateAsync()}
                hasMore={hasMore}
                isLoading={isLoading}
                isError={isError}
                getScrollContainer={() => document.getElementById('list')}
            >
                <div>
                    {(list ?? [])?.map((_, index) => (
                        <div key={index} className="w-full h-[200px]">
                            {index}
                        </div>
                    ))}
                </div>
            </List>
        </div>
    );
};

export default TestDetail;
