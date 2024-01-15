import NavLinkAdapter from "../../../../@envelope/core/NavLinkAdapter";
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";
import {IconButton} from "@mui/material";
import {Outlet} from "react-router-dom";

function UsersRightSidebarApp(props) {
    return (
        <div className='flex flex-col flex-auto'>
            <IconButton
                className="absolute top-0 right-0 my-16 mx-32 z-10"
                sx={{ color: 'white' }}
                component={NavLinkAdapter}
                to="/apps/users"
                size="large"
            >
                <EnvelopeSvgIcon>heroicons-outline:x</EnvelopeSvgIcon>
            </IconButton>

            <Outlet />

        </div>
    )
}

export default UsersRightSidebarApp;
