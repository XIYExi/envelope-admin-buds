import {styled} from "@mui/material";
import EnvelopePageSimple from "../../../../@envelope/core/EnvelopePageSimple";
import {useDispatch} from "react-redux";
import {useThemeMediaQuery} from "../../../../@envelope/hook";
import {useEffect, useState} from "react";
import {useLocation, useParams, Outlet} from "react-router-dom";
import Mails from "./mails/Mails";
import MailboxAppSidebarContent from "./MailboxAppSidebarContent";
import withReducer from "../../../store/withReducer";
import reducer from "./store";


const Root = styled(EnvelopePageSimple)(({theme}) => ({
    '& .EnvelopePageSimple-rightSidebar': {
        flex: '1',
        [theme.breakpoints.down('lg')]: {
            minWidth: '100%',
        },
    },
    '& .EnvelopePageSimple-contentWrapper': {
        [theme.breakpoints.up('lg')]: {
            maxWidth: 400,
        },
    },
}));


function MailboxApp(props) {
    const dispatch = useDispatch();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(!isMobile);
    const routeParams = useParams();
    const { mailId } = routeParams;
    const location = useLocation();

    useEffect(() => {

    }, [dispatch])

    useEffect(() => {
        if (isMobile) {
            setRightSidebarOpen(Boolean(mailId));
        } else {
            setRightSidebarOpen(true);
        }
    }, [mailId, isMobile]);

    useEffect(() => {
        setLeftSidebarOpen(!isMobile);
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            setLeftSidebarOpen(false);
        }
    }, [location, isMobile]);

    return(
        <Root
            content={<Mails onToggleLeftSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)} />}
            leftSidebarContent={<MailboxAppSidebarContent />}
            leftSidebarOpen={leftSidebarOpen}
            leftSidebarOnClose={() => setLeftSidebarOpen(false)}
            leftSidebarWidth={288}
            scroll={isMobile ? 'normal' : 'content'}
            rightSidebarContent={<Outlet />}
            rightSidebarOpen={rightSidebarOpen}
            rightSidebarOnClose={() => setRightSidebarOpen(false)}
        />
    )

}

export default withReducer('mailboxApp', reducer)(MailboxApp);
