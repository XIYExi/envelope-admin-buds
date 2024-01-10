import { lazy } from 'react';
import AchieveListApp from "./list/AchieveListApp";
import AchieveRankApp from "./rank/AchieveRankApp";
import AchieveRewardApp from "./reward/AchieveRewardApp";
import {Navigate} from "react-router-dom";

const AchieveApp = lazy(() => import('./AchieveApp'));

const CalendarAppConfig = {
    settings: {
        layout: {
            config: {}
        },
        footer: {
            display: false
        },
    },
    routes: [
        {
            path: '/apps/achieve',
            element: <AchieveApp />,
            children: [
                {
                  path:'',
                  element: <Navigate to="/apps/achieve/list" />,
                },
                {
                    path: 'list',
                    element: <AchieveListApp />
                },
                {
                    path: 'rank',
                    element: <AchieveRankApp />
                },
                {
                    path: 'reward',
                    element: <AchieveRewardApp />
                }
            ]
        },
    ],
};

export default CalendarAppConfig;
