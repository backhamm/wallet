import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { WrapperRouteComponent } from '../config';

const UserCenter = lazy(() => import('@/pages/UserCenter'));
const Notify = lazy(() => import('@/pages/UserCenter/Notify'));
const Password = lazy(() => import('@/pages/UserCenter/Password'));
const Authorizer = lazy(() => import('@/pages/UserCenter/Authorizer'));
const About = lazy(() => import('@/pages/UserCenter/About'));

const UserRoute: RouteObject[] = [
    {
        path: '/userCenter',
        element: <WrapperRouteComponent element={<UserCenter />} />,
    },
    {
        path: '/notify',
        element: <WrapperRouteComponent element={<Notify />} />,
    },
    {
        path: '/password',
        element: <WrapperRouteComponent element={<Password />} />,
    },
    {
        path: '/authorizer',
        element: <WrapperRouteComponent element={<Authorizer />} />,
    },
    {
        path: '/about',
        element: <WrapperRouteComponent element={<About />} />,
    },
];

export default UserRoute;
