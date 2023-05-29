import React, { createRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import { Image, List } from '@/components/vip-ui';
import { getHallList } from '@/api/home';
import Detail, { DetailModalRef } from '@/pages/Information/Detail';
import './index.scoped.scss';

const Dynamic = () => {
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
        <div className="h-full flex flex-col">
            <div className="h-146px mb-30px overflow-hidden">
                <Swiper
                    className="w-316px h-full m-auto"
                    style={{ overflow: 'visible' }}
                    spaceBetween={10}
                >
                    {[...new Array(5)].map((el, i) => {
                        return (
                            <SwiperSlide key={i} className="relative">
                                <Image
                                    key={i}
                                    src="https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_640.jpg"
                                    className="w-full h-146px"
                                ></Image>
                                <div className="z-10 absolute left-12px bottom-3px text-lgSize">
                                    2022年8月18日【盈樂杯】高尔夫邀请赛
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
            <div className="flex items-center h-20px mb-15px px-20px text-lgSize text-primaryColor">
                <i className="w-16px h-16px icon-horn mr-15px" />
                <span>{t('common.popularNews')}</span>
            </div>
            <div id="DynamicList" className="flex-1 p-20px pt-0">
                <List
                    getData={() => mutateAsync()}
                    hasMore={hasMore}
                    isLoading={isLoading}
                    isError={isError}
                    getScrollContainer={() =>
                        document.getElementById('DynamicList')
                    }
                >
                    {dataList.map((el, i) => {
                        return (
                            <div
                                key={i}
                                className="mb-20px"
                                onClick={() =>
                                    modalRef.current.showModal('dynamicDetail')
                                }
                            >
                                <Image
                                    src="https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_640.jpg"
                                    className="h-116px mb-6px"
                                ></Image>
                                一起去听Blank
                                Pink演唱会，即日起至3/20日止赠送演唱会门票，一起去听Blank
                                Pink演唱会。
                            </div>
                        );
                    })}
                </List>
            </div>
            <Detail ref={modalRef} />
        </div>
    );
};

export default Dynamic;
