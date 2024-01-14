import {styled} from "@mui/material";
import EnvelopePageSimple from "../../../../@envelope/core/EnvelopePageSimple/EnvelopePageSimple";
import {useDeepCompareEffect, useThemeMediaQuery} from "../../../../@envelope/hook";
import {Fragment, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import UserManageAppHeader from "../usermanage/UserManageAppHeader";
import UserManageAppSidebarContent from "../usermanage/UserManageAppSidebarContent";
import UserManageAppContent from "../usermanage/UserManageAppContent";
import withReducer from "../../../store/withReducer";
import reducer from "./store";
import UsersHeaderApp from "./UsersHeaderApp";
import UsersAppContent from "./UsersAppContent";
import {getTableUsers} from "./store/usersTableSlice";


const Root = styled(EnvelopePageSimple)(({ theme }) => ({
    '& .EnvelopePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
    }
}));


function UsersApp(props) {

    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    let dispatch = useDispatch();
    const pageLayout = useRef(null);
    const routeParams = useParams();


    useDeepCompareEffect(() => {
        //dispatch(getUsers());
        //dispatch(getTags())
    }, [dispatch]);


    useEffect(() => {
        setRightSidebarOpen(Boolean(routeParams.id));
    }, [routeParams]);

    useEffect(() => {
        dispatch(getTableUsers('1'))
    }, [])

    return(
        <Fragment>
            <Root
                ref={pageLayout}
                header={<UsersHeaderApp />}
              /*  rightSidebarContent={<UserManageAppSidebarContent />}
                rightSidebarOpen={rightSidebarOpen}
                rightSidebarOnClose={() => setRightSidebarOpen(false)}
                rightSidebarWidth={640}*/
                scroll={isMobile ? 'normal' : 'content'}
                content={<UsersAppContent />}
            />
        </Fragment>
    )
}

export default withReducer('usersApp', reducer)(UsersApp);
