import {useDispatch, useSelector} from "react-redux";
import {getWidgets, selectWidgets} from "./store/widgetsSlice";
import {Fragment, useEffect, useMemo} from "react";
import EnvelopePageSimple from "../../../../@envelope/core/EnvelopePageSimple";
import AnalyticsDashboardAppHeader from "./AnalyticsDashboardAppHeader";
import {motion} from 'framer-motion';
import _ from '../../../../@lodash';
import VisitorsOverviewWidget from "./widgets/VisitorsOverviewWidget";
import CardWidget from "./widgets/CardWidget";
import VisitorsVsPageWidget from "./widgets/VisitorsVsPageWidget";
import {Typography} from "@mui/material";
import CircleWidget from "./widgets/CircleWidget";
import {useTranslation} from "react-i18next";
import withReducer from "../../../store/withReducer";
import reducer from "./store";


function AnalyticsDashboardApp(){
    const dispatch = useDispatch();
    const widgets = useSelector(selectWidgets);

    const { t } = useTranslation('analyticsDashboardApp');

    useEffect(() => {
        dispatch(getWidgets());
    }, [dispatch]);


    return(
        <EnvelopePageSimple
            header={<AnalyticsDashboardAppHeader />}
            content={
                <Fragment>
                    {useMemo(() => {
                        const container = {
                            show: {
                                transition: {
                                    staggerChildren: 0.06,
                                },
                            },
                        };

                        const item = {
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 },
                        };

                        return (
                            !_.isEmpty(widgets) && (
                                <motion.div
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 w-full p-24 md:p-32"
                                    variants={container}
                                    initial="hidden"
                                    animate="show"
                                >
                                    <motion.div variants={item} className="sm:col-span-2 lg:col-span-3">
                                        <VisitorsOverviewWidget />
                                    </motion.div>

                                    <motion.div variants={item} className="sm:col-span-2 lg:col-span-1 ">
                                        <CardWidget />
                                    </motion.div>

                                    <motion.div variants={item} className="sm:col-span-2 lg:col-span-1 ">
                                        <CardWidget />
                                    </motion.div>

                                    <motion.div variants={item} className="sm:col-span-2 lg:col-span-1 ">
                                        <CardWidget />
                                    </motion.div>

                                    <motion.div variants={item} className="sm:col-span-2 lg:col-span-3">
                                        <VisitorsVsPageWidget />
                                    </motion.div>

                                    <div className="w-full mt-16 sm:col-span-3">
                                        <Typography className="text-2xl font-semibold tracking-tight leading-6">
                                            {t('SECONDTITLE')}
                                        </Typography>
                                        <Typography className="font-medium tracking-tight" color="text.secondary">
                                            {t('SECONDDESC')}
                                        </Typography>
                                    </div>

                                    <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-32 w-full">
                                        <motion.div variants={item} className="">
                                            <CircleWidget />
                                        </motion.div>
                                        <motion.div variants={item} className="">
                                            <CircleWidget />
                                        </motion.div>
                                        <motion.div variants={item} className="">
                                            <CircleWidget />
                                        </motion.div>
                                        <motion.div variants={item} className="">
                                            <CircleWidget />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        );
                    }, [widgets])}
                </Fragment>
            }
        />
    )
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
