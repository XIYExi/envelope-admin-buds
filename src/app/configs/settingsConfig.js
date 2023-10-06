import themesConfig from "./themesConfig";
import i18n from '../../i18';


const settingsConfig = {
    layout: {
        style: 'layout1',//布局格式
        config: {}
    },
    customScrollbars: true,
    direction: i18n.dir(i18n.options.lng) || 'ltr', // rtl, ltr
    theme: {
        main: themesConfig.default,
        navbar: themesConfig.default,
        toolbar: themesConfig.default,
        footer: themesConfig.default,
    },
    defaultAuth: ['admin'],
    loginRedirectUrl: '/',
};

export default settingsConfig;