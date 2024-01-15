import {lazy} from 'react';
import EditView from "./component/EditView";

const UsersApp = lazy(() => import('./UsersApp'));


const UsersAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/apps/users',
            element: <UsersApp/>,
            children: [
                {
                    path: ':id/edit',
                    element: <EditView />
                }
            ]
        },
    ],
};

export default UsersAppConfig;
