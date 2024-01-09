import EnvelopePageSimple from "../../../../@envelope/core/EnvelopePageSimple/EnvelopePageSimple";
import {useThemeMediaQuery} from "../../../../@envelope/hook";
import {useEffect, useState} from "react";
import AchieveHeader from "./AchieveHeaderApp";
import {Outlet} from "react-router-dom";
import AchieveLeftSidebarApp from "./AchieveLeftSidebarApp";
import {getAchievesById, selectAchieves} from "./store/achievesSlice";
import {useDispatch, useSelector} from "react-redux";
import withReducer from "../../../store/withReducer";
import reducer from "./store";

function AchieveApp(props) {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);



    function handleToggleLeftSidebar() {
        setLeftSidebarOpen(!leftSidebarOpen);
    }

    const dispatch = useDispatch();



    return(
        <>
            <EnvelopePageSimple
                header={
                    <AchieveHeader
                        onToggleLeftSidebar={handleToggleLeftSidebar}
                    />
                }
                content={
                    <Outlet />
                }
                leftSidebarContent={<AchieveLeftSidebarApp />}
                leftSidebarOpen={leftSidebarOpen}
                leftSidebarOnClose={() => setLeftSidebarOpen(false)}
                leftSidebarWidth={240}
                scroll="content"
            />
        </>
    )
}

export default withReducer('achieveApp', reducer)(AchieveApp);
