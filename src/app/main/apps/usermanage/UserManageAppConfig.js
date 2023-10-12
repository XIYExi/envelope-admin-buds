import { lazy } from 'react';

const UserManageApp = lazy(() => import('./UserManageApp'));

const UserManageAppConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'apps/usermanage',
            element: <UserManageApp />,
        },
    ],
};

export default UserManageAppConfig;