import { lazy } from 'react';
import ContactView from "./component/ContactView";
import EditView from "./component/EditView";

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
            children: [
                {
                    path: ':id',
                    element: <ContactView />
                },
                {
                    path: ':id/edit',
                    element: <EditView />
                }
            ]
        },
    ],
};

export default UserManageAppConfig;