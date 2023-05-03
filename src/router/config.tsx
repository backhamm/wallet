import React, { FC, Suspense } from 'react';
import { RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Loading } from '@/components/vip-ui';
import { localeState } from '@/store/common/atoms';
import { API_URL } from '@/common/constants';
import NavBar from '@/components/NavBar';
import TabBar from '@/components/TabBar';
import PrivateRoute from './privateRoute';

export type WrapperRouteProps = RouteProps & {
    title?: string;
    auth?: boolean;
    isMotion?: boolean;
    navBar?: boolean;
    tabBar?: boolean;
    outerClass?: string | boolean;
};

const PublicRoute = (props: any) => {
    return props.element;
};

export const WrapperRouteComponent: FC<WrapperRouteProps> = ({
    title,
    auth = true,
    isMotion = true,
    navBar = true,
    tabBar = false,
    outerClass = 'page-bg',
    ...props
}) => {
    const store = useRecoilValue(localeState);
    const { t } = useTranslation();

    const WitchRoute = auth ? PrivateRoute : PublicRoute;
    const navTitle = t(
        `navTitle.${
            title ||
            location.pathname.slice(location.pathname.lastIndexOf('/') + 1)
        }`,
    );

    return (
        <HelmetProvider>
            <Helmet>
                <html lang={store.locale} />
                <meta property="og:title" content={navTitle} />
                <title>{navTitle}</title>
                <link rel="canonical" href={API_URL} />
            </Helmet>
            <main
                className={`flex flex-col h-full text-baseColor bg-baseColor text-baseSize ${outerClass}`}
            >
                {navBar && <NavBar title={navTitle} />}
                <div className="flex-1 overflow-auto">
                    <Suspense fallback={<Loading />}>
                        {isMotion ? (
                            <motion.div
                                key={navTitle}
                                initial={{ opacity: 0, y: '20vw' }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <WitchRoute {...props} />
                            </motion.div>
                        ) : (
                            <WitchRoute {...props} />
                        )}
                    </Suspense>
                </div>
                {tabBar && <TabBar />}
            </main>
        </HelmetProvider>
    );
};
