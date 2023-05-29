import React, { FC, Suspense } from 'react';
import { RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { localeState, navTitleState } from '@/store/common/atoms';
import { API_URL } from '@/common/constants';
import NavBar from '@/components/NavBar';
import TabBar from '@/components/TabBar';
import { Loading } from '@/components/vip-ui';
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
    const locale = useRecoilValue(localeState);
    const navTitle = useRecoilValue(navTitleState);
    const { t } = useTranslation();

    const WitchRoute = auth ? PrivateRoute : PublicRoute;
    const NavTitle = t(
        `navTitle.${
            navTitle ||
            title ||
            location.pathname.slice(location.pathname.lastIndexOf('/') + 1)
        }`,
    );

    return (
        <HelmetProvider>
            <Helmet>
                <html lang={locale.locale} />
                <meta property="og:title" content={NavTitle} />
                <title>{NavTitle}</title>
                <link rel="canonical" href={API_URL} />
            </Helmet>
            <main
                className={`flex flex-col h-full text-baseColor bg-baseColor text-baseSize ${outerClass}`}
            >
                {navBar && <NavBar title={NavTitle} />}
                <div className="flex-1 overflow-auto">
                    <Suspense
                        fallback={
                            <div className="fixed inset-0 flex-center-center">
                                <Loading size={26} text={t('home.loading')} />
                            </div>
                        }
                    >
                        {isMotion ? (
                            <motion.div
                                key={NavTitle}
                                initial={{ opacity: 0, y: '20vw' }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="h-full"
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
