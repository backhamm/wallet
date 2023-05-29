import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/vip-ui';

const HomeModal = () => {
    const [visible, setVisible] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const close = () => {
        setVisible(false);
    };

    useEffect(() => {
        // setVisible(true);
    }, []);

    return (
        <Modal
            visible={visible}
            onCancel={close}
            title={t('modal.safetyTitle')}
            confirmText={t('modal.set')}
            onConfirm={() => {
                close();
                navigate('/password');
            }}
            clickExternal={false}
            className="text-center rounded-8px bg-gradient-to-r from-[#fdefd4] to-[#ffe4b0]"
        >
            <div
                className="mt-14px text-baseSize"
                dangerouslySetInnerHTML={{ __html: t('modal.safetyTips') }}
            />
        </Modal>
    );
};

export default HomeModal;
