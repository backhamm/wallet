import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Image } from '@/components/vip-ui';

const About: FC = () => {
    const { t } = useTranslation();
    return (
        <div className="pt-64px px-28px text-center">
            <Image
                className="w-156px h-147px m-auto"
                src={require('@/assets/images/userCenter/big-logo.png')}
                alt=""
            />
            <div className="mt-24px mb-46px text-20px">V2.0.2</div>
            <Button>{t('userCenter.newVersion', { val: 'v2.1.0' })}</Button>
        </div>
    );
};

export default About;
