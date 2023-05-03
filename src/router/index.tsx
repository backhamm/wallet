import React, { lazy, FC, useEffect } from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import UserRoute from '@/router/userCenter';
import { WrapperRouteComponent } from './config';
import Redirect from './Redirect';
import TestRoute from './test';

NProgress.configure({ showSpinner: false });
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const ScanCode = lazy(() => import('@/pages/ScanCode'));
const ServiceCenter = lazy(() => import('@/pages/ServiceCenter'));
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
        path: '/scanCode',
        element: <WrapperRouteComponent element={<ScanCode />} />,
    },
    {
        path: '/serviceCenter',
        element: <WrapperRouteComponent element={<ServiceCenter />} />,
    },
    ...UserRoute,
    ...TestRoute,
    {
        path: '/login',
        element: (
            <WrapperRouteComponent
                element={<Login />}
                auth={false}
                navBar={false}
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
