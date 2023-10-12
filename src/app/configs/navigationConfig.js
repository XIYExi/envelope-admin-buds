import i18next from "i18next";
import en from './navigation-i18n/en';
import zh from './navigation-i18n/zh';


i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('zh', 'navigation', zh);


const navigationConfig = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        subtitle: 'Unique dashboard designs',
        subtitleTranslate: 'DASHBOARDSDESC',
        type: 'group',
        icon: 'heroicons-outline:home',
        translate: 'DASHBOARDS',
        children: [
            {
                id: 'dashboards.analytics',
                title: 'Analytics',
                type: 'item',
                translate: 'ANALYTICS',
                icon: 'heroicons-outline:chart-pie',
                url: '/dashboards/analytics',
            },
        ]
    },
    {
        id: 'apps',
        title: 'Applications',
        subtitle: 'Custom made application designs',
        subtitleTranslate: 'APPLICATIONSDESC',
        type: 'group',
        icon: 'heroicons-outline:cube',
        translate: 'APPLICATIONS',
        children: [
            {
                id: 'apps.calendar',
                title: 'Calendar',
                subtitle: '3 upcoming events',
                subtitleTranslate: 'CALENDARSUB',
                type: 'item',
                icon: 'heroicons-outline:calendar',
                url: '/apps/calendar',
                translate: 'CALENDAR',
            },
            {
                id: 'apps.usermanage',
                title: 'User Manage',
                type: 'item',
                icon: 'heroicons-outline:user',
                url: '/apps/usermanage',
                translate: 'USERMANAGE',
            }
        ]
    },
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