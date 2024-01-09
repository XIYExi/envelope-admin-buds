import {lazy} from "react";


const FormApp = lazy(() => import('./FormApp'));

const FormAppConfig = {
    settings: {
        layout: {},
    },
    routes: [
        {
            path: '/lowcode/form',
            element: <FormApp />
        }
    ]
}

export default FormAppConfig;