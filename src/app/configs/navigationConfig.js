import i18next from "i18next";
import en from './navigation-i18n/en';
import zh from './navigation-i18n/zh';


i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('zh', 'navigation', zh);


const navigationConfig = [
    {
        id: 'example-component',
        title: 'Example',
        translate: 'EXAMPLE',
        type: 'item',
        icon: 'heroicons-outline:star',
        url: 'example',
    }
]


export default navigationConfig;