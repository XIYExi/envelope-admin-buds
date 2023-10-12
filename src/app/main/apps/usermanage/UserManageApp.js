import EnvelopePageSimple from "../../../../@envelope/core/EnvelopePageSimple";
import UserManageAppHeader from "./UserManageAppHeader";
import {Fragment, useEffect, useState} from "react";
import {useThemeMediaQuery} from "../../../../@envelope/hook";
import UserManageAppContent from "./UserManageAppContent";
import {styled} from '@mui/material';
import withReducer from "../../../store/withReducer";
import reducer from './store/index';
import {useDispatch} from "react-redux";
import {getUsers} from "./store/usersTableSlice";


const Root = styled(EnvelopePageSimple)(({ theme }) => ({
    '& .EnvelopePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
    },
}));


function UserManageApp(props) {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
    let dispatch = useDispatch();

    function handleToggleLeftSidebar(){
        setLeftSidebarOpen(!leftSidebarOpen)
    }

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    return(
        <Fragment>
            <Root
                header={
                    <UserManageAppHeader
                        onToggleLeftSidebar={handleToggleLeftSidebar}
                    />
                }
                leftSidebarOpen={leftSidebarOpen}
                leftSidebarOnClose={() => setLeftSidebarOpen(false)}
                leftSidebarWidth={240}
                scroll="content"
                content={<UserManageAppContent/>}
            />
        </Fragment>
    )
}


export default withReducer('userManageApp', reducer)(UserManageApp);