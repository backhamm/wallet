import React, {
    createRef,
    FC,
    forwardRef,
    Ref,
    useImperativeHandle,
    useState,
} from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { operateListType } from '@/pages/UserCenter/index';
import { Modal } from '@/components/vip-ui';
import { changeLanguage, getLanguage } from '@/config/locale';
import { LangEnum } from '@/enums/appEnum';
import { userCurrencyState } from '@/store/user/atoms';
import { pullUpList } from '@/common/motion';
import { langList } from '@/locales';

interface UserItemProps {
    itemArr: operateListType[];
    className?: string;
}

interface UserModalRef {
    showModal: (type: string) => void;
}

interface ModalListType {
    language: { label: string; value: string }[];
    balance: string[];
}

const UserModal = forwardRef((props, ref: Ref<UserModalRef>) => {
    const [modalType, setModalType] = useState<string>('');
    const [visible, setVisible] = useState<boolean>(false);
    const { t } = useTranslation();
    const setUserCurrency = useSetRecoilState(userCurrencyState);

    const modalList: ModalListType = {
        language: langList,
        balance: ['PHP', 'HKD', 'CRN', 'KRW', 'USDT'],
    };

    useImperativeHandle(ref, () => ({
        showModal,
    }));

    const showModal = (type: string) => {
        setModalType(type);
        setVisible(true);
    };

    return (
        <Modal
            visible={visible}
            onCancel={() => setVisible(false)}
            title={t(`userCenter.modalTitle.${modalType}`)}
            className="leading-40px text-lgSize text-center rounded-8px bg-gradient-to-r from-[#fdefd4] to-[#ffe4b0]"
        >
            {modalList[modalType]?.map((el) => {
                return (
                    <div
                        key={typeof el === 'string' ? el : el.value}
                        onClick={() => {
                            setVisible(false);
                            switch (modalType) {
                                case 'language':
                                    return changeLanguage(el.value);
                                case 'balance':
                                    return setUserCurrency(el);
                            }
                        }}
                    >
                        {typeof el === 'string' ? el : el.label}
                    </div>
                );
            })}
        </Modal>
    );
});

const UserItem: FC<UserItemProps> = ({ itemArr, className }) => {
    const navigate = useNavigate();
    const userCurrency = useRecoilValue(userCurrencyState);
    const modalRef = createRef<UserModalRef>();

    const itemContentClass = (i: number) => {
        return `flex-between-center h-50px mx-10px px-10px ${
            !i ? '' : 'border-t-1px border-solid border-baseColor'
        }`;
    };

    const handleClick = (key: string) => {
        switch (key) {
            case 'setting':
                return false;
            case 'language':
            case 'balance':
                return modalRef.current.showModal(key);
            default:
                return navigate(`/${key}`);
        }
    };

    return (
        <>
            <motion.ul
                variants={pullUpList.container}
                initial="hidden"
                animate="visible"
                className={`overflow-hidden rounded-8px text-baseColor gradient-border ${className}`}
            >
                {itemArr.map((el: operateListType, i: number) => {
                    const { key, title, icon, subTitle, arrow = true } = el;

                    return (
                        <motion.li
                            key={key}
                            variants={pullUpList.item}
                            className={itemContentClass(i)}
                            onClick={() => handleClick(key)}
                        >
                            {icon && (
                                <i
                                    className={`icon-${key} w-16px h-16px mr-10px`}
                                />
                            )}
                            <div
                                className="flex-1"
                                style={{
                                    color: !arrow ? '#FAE4C0' : '',
                                }}
                            >
                                {title}
                            </div>
                            <div className="flex items-center text-baseSize">
                                {key === 'balance'
                                    ? userCurrency
                                    : key === 'language'
                                    ? LangEnum[getLanguage()]
                                    : subTitle}
                                <>
                                    {arrow && (
                                        <i className="icon-arrow w-6px h-14px ml-10px" />
                                    )}
                                </>
                            </div>
                        </motion.li>
                    );
                })}
            </motion.ul>
            <UserModal ref={modalRef} />
        </>
    );
};

export default UserItem;
