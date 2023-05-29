import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Modal } from '@/components/vip-ui';

export interface DetailModalRef {
    showModal: (title: string) => void;
}

const DetailModal = forwardRef((props, ref: Ref<DetailModalRef>) => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('');
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
        showModal,
    }));

    const showModal = (title: string) => {
        setTitle(title);
        setVisible(true);
    };

    return (
        <Modal
            className="h-full page-bg bg-bg-baseColor rounded-0 text-baseColor"
            width="w-full"
            visible={visible}
            motionType="x"
        >
            <div>
                <div className="flex-between-center h-50px">
                    <div
                        className="w-56px px-20px py-17px"
                        onClick={() => setVisible(false)}
                    >
                        <i className="icon-back w-16px h-16px" />
                    </div>
                    <div className="text-lgSize text-primaryColor">
                        {t(`navTitle.${title}`)}
                    </div>
                    <div className="w-56px" />
                </div>
                <div className="p-20px">
                    2022年8月18日【盈樂杯】高尔夫邀请赛在克拉克太阳谷圆满举办，活动受到政商名流及尊贵会员的一致高度好评！
                    <Image
                        src="https://cdn.pixabay.com/photo/2023/02/28/03/42/ibex-7819817_6401.jpg"
                        className="h-166px my-15px"
                    ></Image>
                    2022年8月18日【盈樂杯】高尔夫邀请赛在克拉克太阳谷圆满举办，活动受到政商名流及尊贵会员的一致高度好评！
                    <div className="mt-41px text-right">
                        <div>详情洽谈市场部</div>
                        <div>活动时间：2023-01-03</div>
                    </div>
                </div>
            </div>
        </Modal>
    );
});

export default DetailModal;
