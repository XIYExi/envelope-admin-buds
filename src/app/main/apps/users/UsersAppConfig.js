import {lazy} from 'react';

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
            children: []
        },
    ],
};

export default UsersAppConfig;
