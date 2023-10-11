import { lazy } from 'react';
import i18next from "i18next";
import en from './i18n/en';
import zh from './i18n/zh';


i18next.addResourceBundle('zh', 'analyticsDashboardApp', zh);
i18next.addResourceBundle('en', 'analyticsDashboardApp', en);

const AnalyticsDashboardApp = lazy(() => import('./AnalyticsDashboardApp'));


const AnalyticsDashboardAppConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'dashboards/analytics',
            element: <AnalyticsDashboardApp />,
        },
    ],
};

export default AnalyticsDashboardAppConfig;