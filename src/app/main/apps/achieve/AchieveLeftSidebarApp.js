import React from "react";
import {motion} from "framer-motion";
import {Button, Typography} from "@mui/material";
import EnvelopeNavigation from "../../../../@envelope/core/EnvelopeNavigation/EnvelopeNavigation";
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";
import {useDispatch} from "react-redux";
import {openNewAchieveDialog} from "./store/achievesSlice";

const achieveNavigation = [
    {
        "id": "achieve-label-1",
        "title": "成就预览",
        "slug": "list",
        "icon": "heroicons-outline:inbox"
    },
    {
        "id": "achieve-label-2",
        "title": "奖励",
        "slug": "reward",
        "icon": "heroicons-outline:sent"
    },
    {
        "id": "achieve-label-3",
        "title": "排行榜",
        "slug": "rank",
        "icon": "heroicons-outline:sent"
    },
]



function AchieveLeftSidebarApp(props) {

    const dispatch = useDispatch();

    function handleOpenDialog() {
        dispatch(openNewAchieveDialog());
    }

    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
            className="flex-auto border-l-1"
        >
            <div className="mb-24 mt-40 mx-24">
                <Typography
                    component={motion.span}
                    initial={{ x: -20 }}
                    animate={{ x: 0, transition: { delay: 0.2 } }}
                    delay={300}
                    className="text-4xl font-extrabold tracking-tight leading-none"
                >
                    成就系统
                </Typography>
            </div>


            <div className="mb-24">
                <Typography className="px-28 py-10 uppercase text-12 font-600" color="secondary.main">

                </Typography>

                <div className='mx-12 mt-24 mb-32'>
                    <Button
                        variant="contained"
                        color="secondary"
                        className="w-full"
                        onClick={handleOpenDialog}
                        startIcon={<EnvelopeSvgIcon>heroicons-outline:plus</EnvelopeSvgIcon>}
                    >
                        创建成就
                    </Button>
                </div>




                <EnvelopeNavigation
                    navigation={achieveNavigation.map((item) => ({
                        ...item,
                        type: 'item',
                        url: `/apps/achieve/${item.slug}`,
                    }))}
                />
            </div>

        </motion.div>


    )


}

export default AchieveLeftSidebarApp;
