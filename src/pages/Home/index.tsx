import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Record from '@/pages/Home/Record';
import NavList from '@/pages/Home/NavList';
import Header from '@/pages/Home/Header';

const Home: FC = () => {
    const { t } = useTranslation();
    const navArr: Array<string> = Object.keys(
        t('home.nav', { returnObjects: true }),
    );

    return (
        <div className="h-full pb-32px home-top-bg overflow-x-hidden">
            <Header />
            <div className="px-10px pb-15px">
                <NavList
                    navArr={navArr.slice(0, 4)}
                    size={36}
                    className="h-74px mb-20px px-10px rounded-36px bg-opacity-70"
                />
                <NavList
                    navArr={navArr.slice(4)}
                    className="flex-wrap h-168px rounded-10px bg-opacity-45"
                />
            </div>

            <Record />
        </div>
    );
};

export default Home;
