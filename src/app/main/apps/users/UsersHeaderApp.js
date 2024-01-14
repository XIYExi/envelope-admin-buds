import {IconButton, Typography} from "@mui/material";
import NavLinkAdapter from "../../../../@envelope/core/NavLinkAdapter";
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";
import React from "react";


function UsersHeaderApp(props) {

    return (
        <div className='flex flex-col md:flex-row w-full p-12 justify-between z-10 container'>
            <div className='flex flex-col sm:flex-col items-center'>
                <div className='flex items-center'>

                    <Typography className="text-2xl font-semibold tracking-tight whitespace-nowrap mx-16">
                        用户管理列表
                    </Typography>
                </div>
            </div>


            <IconButton
                className="mx-8"
                aria-label="add"
                component={NavLinkAdapter}
                to="new/edit"
            >
                <EnvelopeSvgIcon>heroicons-outline:plus-circle</EnvelopeSvgIcon>
            </IconButton>
        </div>
    )
}

export default UsersHeaderApp;
