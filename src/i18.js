import i18n from "i18next";
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            'Welcome to React': 'Welcome to React and react-i18next',
        },
    },
    zh: {
        translation: {
            'Welcome to React': '欢迎使用React和i18n国际化',
        }
    }
};

i18n
    .use(initReactI18next)
    .init(({
        resources,
        lng: 'zh',
        keySeparator: false,
        interpolation: {
            escapeValue: false, //防止xss脚本
        }
    }));

export default i18n;