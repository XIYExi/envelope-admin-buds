import {Provider} from "react-redux";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StyledEngineProvider } from '@mui/material/styles';
import routes from "./configs/routesConfig";
import store from './store';
import AppContext from './AppContext';


const withAppProvider = (Component) => (props) => {
    const WrapperComponent = () => (
        <AppContext.Provider value={{routes}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Provider store={store}>
                    <StyledEngineProvider injectFirst>
                        <Component {...props}/>
                    </StyledEngineProvider>
                </Provider>
            </LocalizationProvider>
        </AppContext.Provider>
    );

    return WrapperComponent;
};

export default withAppProvider;