import BrowserRouter from "../@envelope/core/BrowserRouter";
import EnvelopeLayout from "../@envelope/core/EnvelopeLayout";
import EnvelopeTheme from "../@envelope/core/EnvelopeTheme";
import { SnackbarProvider } from 'notistack';
import { useSelector } from 'react-redux';
//import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrentLanguageDirection} from "./store/i18nSlice";
import { selectUser} from "./store/userSlice";
import themeLayouts from "./theme-layouts/themeLayout";
import { selectMainTheme} from "./store/envelope/settingsSlice";
import EnvelopeAuthorization from "../@envelope/core/EnvelopeAuthorization";
import settingsConfig from "./configs/settingsConfig";
import withAppProvider from "./withAppProvider";
import { AuthProvider } from './auth/AuthContext';
import {Fragment} from "react";


const emotionCacheOptions = {
    rtl: {
        key: 'muirtl',
        stylisPlugins: [],
        insertionPoint: document.getElementById('emotion-insertion-point'),
    },
    ltr: {
        key: 'muiltr',
        stylisPlugins: [],
        insertionPoint: document.getElementById('emotion-insertion-point'),
    },
};


function App() {
    const user = useSelector(selectUser);
    const langDirection = useSelector(selectCurrentLanguageDirection);
    const mainTheme = useSelector(selectMainTheme);

    return (
        <Fragment>
            {/*Cache Provider -> rtl ltr*/}
            <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>

                {/*MUI Theme Provider*/}
                <EnvelopeTheme theme={mainTheme} direction={langDirection}>

                    {/*Auth Provider*/}
                    <AuthProvider>

                        {/*Routes*/}
                        <BrowserRouter>

                            {/*Interceptor and wrapper with Route*/}
                            <EnvelopeAuthorization
                                userRole={user.role}
                                loginRedirectUrl={settingsConfig.loginRedirectUrl}
                            >

                                {/*bottom snackbar Provider*/}
                                <SnackbarProvider
                                    maxSnack={5}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    classes={{
                                        containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
                                    }}
                                >

                                    {/*Layout children components to render*/}
                                    <EnvelopeLayout layouts={themeLayouts} />

                                </SnackbarProvider>{/*END bottom snackbar Provider*/}
                            </EnvelopeAuthorization>{/*END Interceptor and wrapper with Route*/}
                        </BrowserRouter>{/*END Routes*/}
                    </AuthProvider>{/*END Auth Provider*/}
                </EnvelopeTheme>{/*END MUI Theme Provider*/}
            </CacheProvider>{/*END Cache Provider -> rtl ltr*/}
        </Fragment>
    );
}

export default withAppProvider(App)();
