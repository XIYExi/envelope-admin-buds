import EnvelopePageSimple from "../../../../@envelope/core/EnvelopePageSimple";
import UserManageAppHeader from "./UserManageAppHeader";
import {Fragment, useEffect, useRef, useState} from "react";
import {useDeepCompareEffect, useThemeMediaQuery} from "../../../../@envelope/hook";
import UserManageAppContent from "./UserManageAppContent";
import {styled} from '@mui/material';
import withReducer from "../../../store/withReducer";
import reducer from './store/index';
import {useDispatch} from "react-redux";
import {getUsers} from "./store/usersTableSlice";
import UserManageAppSidebarContent from "./UserManageAppSidebarContent";
import {useParams} from "react-router-dom";
import {getTags} from "./store/tagSlice";


const Root = styled(EnvelopePageSimple)(({ theme }) => ({
    '& .EnvelopePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
    },
    '& .EnvelopePageSimple-content': {
        [theme.breakpoints.up('lg')]: {
            width: '100vh',
        }
    }
}));


function UserManageApp(props) {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    let dispatch = useDispatch();
    const pageLayout = useRef(null);
    const routeParams = useParams();


    useDeepCompareEffect(() => {
        dispatch(getUsers());
        dispatch(getTags())
    }, [dispatch]);


    useEffect(() => {
        setRightSidebarOpen(Boolean(routeParams.id));
    }, [routeParams]);

    return(
        <Fragment>
            <Root
                ref={pageLayout}
                header={<UserManageAppHeader />}
                rightSidebarContent={<UserManageAppSidebarContent />}
                rightSidebarOpen={rightSidebarOpen}
                rightSidebarOnClose={() => setRightSidebarOpen(false)}
                rightSidebarWidth={640}
                scroll={isMobile ? 'normal' : 'content'}
                content={<UserManageAppContent/>}
            />
        </Fragment>
    )
}


export default withReducer('userManageApp', reducer)(UserManageApp);