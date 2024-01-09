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
            },
            {
                id: 'apps.mailbox',
                title: 'Mailbox',
                type: 'item',
                icon: 'heroicons-outline:mail',
                url: '/apps/mailbox',
                translate: 'MAILBOX',
            },
            {
                id: 'apps.achieve',
                title: 'Achieve',
                type: 'item',
                icon: 'heroicons-outline:mail',
                url: '/apps/achieve',
                translate: 'ACHIEVE',
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
    },
    {
        id: 'lowcode',
        title: 'Lowcode',
        subtitle: 'Lowcode component for fast dev',
        subtitleTranslate: 'APPLICATIONSDESC',
        type: 'group',
        translate: 'LOWCODE',
        children: [
            {
                id: 'lowcode.innermanage',
                title: 'Form',
                translate: 'FORM',
                type: 'item',
                icon: 'heroicons-outline:table',
                url: '/lowcode/form',
            }
        ]
    },
]


export default navigationConfig;
