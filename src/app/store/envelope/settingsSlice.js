import {createTheme, getContrastRatio} from "@mui/material/styles";
import {createAsyncThunk, createSlice, createSelector} from "@reduxjs/toolkit";
import _ from '@lodash';
import {
    defaultSettings,
    defaultThemeOptions,
    extendThemeWithMixins,
    getParsedQuerySettings,
    mustHaveThemeOptions,
} from "../../../@envelope/default-settings";
import settingsConfig from "../../configs/settingsConfig";
import themeLayoutConfigs from "../../theme-layouts/themeLayoutConfigs";
import {setUser, updateUserSettings} from "../userSlice";
import {darkPaletteText, lightPaletteText} from "../../configs/themesConfig";
import {bgcolor} from "@mui/system";


export const changeEnvelopeTheme = (theme) => (dispatch, getState) => {
    const {envelope} = getState();

    const {settings} = envelope;

    const newSettings = {
        ...settings.current,
        theme: {
            main: theme,
            navbar: theme,
            toolbar: theme,
            footer: theme,
        },
    };

    dispatch(setDefaultSettings(newSettings));
}


function getInitialSettings() {
    const defaultLayoutStyle =
        settingsConfig.layout && settingsConfig.layout.style ? settingsConfig.layout.style : 'layout1';
    const layout = {
        style: defaultLayoutStyle,
        config: themeLayoutConfigs[defaultLayoutStyle].defaults,
    };
    return _.merge({}, defaultSettings, { layout }, settingsConfig, getParsedQuerySettings());
}


export function generateSettings(_defaultSettings, _newSettings){
    const response = _.merge(
        {},
        _defaultSettings,
        {layout: {config: themeLayoutConfigs[_newSettings?.layout?.style]?.default}},
        _newSettings,
    );

    return response;
}


const initialSettings = getInitialSettings();

const initialState = {
    initial: initialSettings,
    defaults: _.merge({}, initialSettings),
    current: _.merge({}, initialSettings),
}


export const setDefaultSettings = createAsyncThunk(
    'envelope/settings/setDefaultSettings',
    async (val, {dispatch, getState}) => {
        const {envelope} = getState();
        const {settings} = envelope;
        const defaults = generateSettings(settings.defaults, val);

        dispatch(updateUserSettings(defaults));

        return {
            ...settings,
            defaults: _.merge({}, defaults),
            current: _.merge({}, defaults),
        };
    }
)


const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings: (state, action) => {
            const current = generateSettings(state.defaults, action.payload);

            return {
                ...state,
                current
            };
        },
        setInitialSettings: (state, action) => {
            return _.merge({}, initialSettings);
        },
        resetSettings: (state, action) => {
            return {
                ...state,
                defaults: _.merge({}, state.defaults),
                current: _.merge({}, state.defaults),
            }
        }
    },
    extraReducers: {
        [setDefaultSettings.fulfilled]: (state, action) => action.payload,
        [setUser.fulfilled]: (state, action) => {
            const defaults = generateSettings(state.defaults, action.payload?.data?.settings);
            return {
                ...state,
                defaults: _.merge({}, defaults),
                current: _.merge({}, defaults),
            };
        },
    }
});


const getDirection = (state) => state.envelope.settings.current.direction;
const getMainTheme = (state) => state.envelope.settings.current.theme.main;
const getNavbarTheme = (state) => state.envelope.settings.current.theme.navbar;
const getToolbarTheme = (state) => state.envelope.settings.current.theme.toolbar;
const getFooterTheme = (state) => state.envelope.settings.current.theme.footer;

function generateMuiTheme(theme, direction){
    const data = _.merge({}, defaultThemeOptions, theme, mustHaveThemeOptions);
    const response = createTheme(
        _.merge({}, data, {
            mixins: extendThemeWithMixins(data),
            direction,
        })
    );
    return response;
}


export const selectContrastMainTheme = (object) => {
    function isDark(color){
        return getContrastRatio(color, '#ffffff') >= 3;
    }
    return isDark(bgcolor) ? selectMainThemeDark : selectMainThemeLight;
}


function changeThemeMode(theme, mode) {
    const modes = {
        dark: {
            palette: {
                mode: 'dark',
                divider: 'rgba(241,245,249,.12)',
                background: {
                    paper: '#1E2125',
                    default: '#121212',
                },
                text: darkPaletteText,
            },
        },
        light: {
            palette: {
                mode: 'light',
                divider: '#e2e8f0',
                background: {
                    paper: '#FFFFFF',
                    default: '#F7F7F7',
                },
                text: lightPaletteText,
            },
        },
    };

    return _.merge({}, theme, modes[mode]);
}


export const selectMainTheme = createSelector(
    [getMainTheme, getDirection],
    (theme, direction) => generateMuiTheme(theme, direction)
);

export const selectMainThemeDark = createSelector(
    [getMainTheme, getDirection],
    (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectMainThemeLight = createSelector(
    [getMainTheme, getDirection],
    (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectNavbarTheme = createSelector(
    [getNavbarTheme, getDirection],
    (theme, direction) => generateMuiTheme(theme, direction)
);

export const selectNavbarThemeDark = createSelector(
    [getNavbarTheme, getDirection],
    (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectNavbarThemeLight = createSelector(
    [getNavbarTheme, getDirection],
    (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectToolbarTheme = createSelector(
    [getToolbarTheme, getDirection],
    (theme, direction) => generateMuiTheme(theme, direction)
);

export const selectToolbarThemeDark = createSelector(
    [getToolbarTheme, getDirection],
    (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectToolbarThemeLight = createSelector(
    [getToolbarTheme, getDirection],
    (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectFooterTheme = createSelector(
    [getFooterTheme, getDirection],
    (theme, direction) => generateMuiTheme(theme, direction)
);

export const selectFooterThemeDark = createSelector(
    [getFooterTheme, getDirection],
    (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'dark'), direction)
);

export const selectFooterThemeLight = createSelector(
    [getFooterTheme, getDirection],
    (theme, direction) => generateMuiTheme(changeThemeMode(theme, 'light'), direction)
);

export const selectEnvelopeCurrentSettings = ({ envelope }) => envelope.settings.current;

export const selectEnvelopeCurrentLayoutConfig = ({ envelope }) => envelope.settings.current.layout.config;

export const selectEnvelopeDefaultSettings = ({ envelope }) => envelope.settings.defaults;

export const selectEnvelopeThemesSettings = ({ envelope }) => envelope.settings.themes;

export const { resetSettings, setInitialSettings, setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;