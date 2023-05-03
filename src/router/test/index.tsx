import React from 'react';
import { RouteObject } from 'react-router-dom';
import Redirect from '../Redirect';
import { WrapperRouteComponent } from '../config';

const Test = React.lazy(() => import('@/pages/TestPage'));
const TestDetail = React.lazy(() => import('@/pages/TestPage/Detail'));

const TestRoute: RouteObject[] = [
    {
        path: '/test',
        element: <Redirect to="/test/demo" />,
    },
    {
        path: '/testDemo',
        element: <WrapperRouteComponent element={<Test />} tabBar />,
    },
    {
        path: '/testDetail',
        element: <WrapperRouteComponent element={<TestDetail />} tabBar />,
    },
];

export default TestRoute;
