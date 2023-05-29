import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { getLanguage } from '@/config/locale';

const GuidePage: FC = () => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(true);

    return ReactDOM.createPortal(
        visible ? (
            <div className="fixed inset-0 z-9999 overflow-auto">
                <div
                    className="absolute top-20px right-20px text-baseColor px-20px leading-32px rounded-50px bg-[#f2f2f21a]"
                    onClick={() => setVisible(false)}
                >
                    {t('login.skip')}
                </div>
                <img
                    width="100%"
                    src={require(`@/assets/images/login/guide-${getLanguage()}.png`)}
                    alt=""
                />
            </div>
        ) : (
            <></>
        ),
        document.getElementById('root'),
    );
};

export default GuidePage;
