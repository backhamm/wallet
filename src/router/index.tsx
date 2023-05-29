import React, { lazy, FC, useEffect } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { WrapperRouteComponent } from './config';
import Redirect from './Redirect';
import TestRoute from './test';

NProgress.configure({ showSpinner: false });
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const MorePage = lazy(() => import('@/pages/Home/MorePage'));
const ScanCode = lazy(() => import('@/pages/ScanCode'));
const ServiceCenter = lazy(() => import('@/pages/ServiceCenter'));

const Notify = lazy(() => import('@/pages/Information/Notify'));
const Activity = lazy(() => import('@/pages/Information/Activity'));
const Dynamic = lazy(() => import('@/pages/Information/Dynamic'));
const UserCenter = lazy(() => import('@/pages/UserCenter'));
const Password = lazy(() => import('@/pages/UserCenter/Password'));
const Authorizer = lazy(() => import('@/pages/UserCenter/Authorizer'));
const About = lazy(() => import('@/pages/UserCenter/About'));

const ReserveService = lazy(() => import('@/pages/Record/Reserve/Service'));
const ReserveRecord = lazy(() => import('@/pages/Record/Reserve/Record'));

const NotAuthority = lazy(() => import('@/components/ResultPage/NotAuthority'));
const NotFound = lazy(() => import('@/components/ResultPage/NotFound'));

const routeList: RouteObject[] = [
    {
        path: '/',
        element: <Redirect to="/home" />,
    },
    {
        path: '/home',
        element: (
            <WrapperRouteComponent
                element={<Home />}
                isMotion={false}
                navBar={false}
                tabBar
                outerClass={false}
            />
        ),
    },
    {
        path: '/more',
        element: (
            <WrapperRouteComponent element={<MorePage />} isMotion={false} />
        ),
    },
    {
        path: '/scanCode',
        element: <WrapperRouteComponent element={<ScanCode />} />,
    },
    {
        path: '/serviceCenter',
        element: (
            <WrapperRouteComponent
                element={<ServiceCenter />}
                isMotion={false}
            />
        ),
    },
    {
        path: '/userCenter',
        element: <WrapperRouteComponent element={<UserCenter />} />,
    },
    {
        path: '/notify',
        element: <WrapperRouteComponent element={<Notify />} />,
    },
    {
        path: '/activity',
        element: <WrapperRouteComponent element={<Activity />} />,
    },
    {
        path: '/dynamic',
        element: <WrapperRouteComponent element={<Dynamic />} tabBar />,
    },
    {
        path: '/password',
        element: (
            <WrapperRouteComponent element={<Password />} outerClass={false} />
        ),
    },
    {
        path: '/authorizer',
        element: <WrapperRouteComponent element={<Authorizer />} />,
    },
    {
        path: '/about',
        element: <WrapperRouteComponent element={<About />} />,
    },
    {
        path: '/reserveService',
        element: <WrapperRouteComponent element={<ReserveService />} />,
    },
    {
        path: '/reserveRecord',
        element: <WrapperRouteComponent element={<ReserveRecord />} />,
    },
    ...TestRoute,
    {
        path: '/login',
        element: (
            <WrapperRouteComponent
                element={<Login />}
                auth={false}
                navBar={false}
                isMotion={false}
            />
        ),
    },
    {
        path: '*' || '/404',
        element: (
            <WrapperRouteComponent
                element={<NotFound />}
                auth={false}
                navBar={false}
            />
        ),
    },
    {
        path: '/403',
        element: (
            <WrapperRouteComponent
                element={<NotAuthority />}
                auth={false}
                navBar={false}
            />
        ),
    },
];

const RenderRouter: FC = () => {
    useEffect(() => {
        NProgress.done();
        return () => {
            NProgress.start();
        };
    });
    return useRoutes(routeList);
};

export default RenderRouter;
