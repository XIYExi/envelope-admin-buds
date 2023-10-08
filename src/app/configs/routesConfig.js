import EnvelopeUtils from "../../@envelope/utils";
import EnvelopeLoading from "../../@envelope/core/EnvelopeLoading";
import {Navigate} from 'react-router-dom';
import settingsConfig from "./settingsConfig";
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';


const routeConfigs = [ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig];

const routes = [
    ...EnvelopeUtils.generateRoutesFromConfigs(routeConfigs,
        settingsConfig.defaultAuth),
    {
        path: '/',
        element: <Navigate to="/example" />,
        auth: settingsConfig.defaultAuth,
    },
    {
        path: 'loading',
        element: <EnvelopeLoading />,
    },
    {
        path: '404',
        element: <Error404Page />,
    },
    {
        path: '*',
        element: <Navigate to="404" />,
    },
];

export default routes;
