import {Button, IconButton, Input, Tooltip, Typography} from "@mui/material";
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";
import {motion} from "framer-motion";
import NavLinkAdapter from "../../../../@envelope/core/NavLinkAdapter";
import React from 'react';

function UserManageAppHeader(props){

    const {onToggleLeftSidebar} = props;

    return (
        <React.Fragment>

          <div className='flex flex-col md:flex-row w-full p-12 justify-between z-10 container'>
        <div className='flex flex-col sm:flex-col items-center'>
            <div className='flex items-center'>
                <IconButton
                    aria-label="open left sidebar"
                    size='small'
                >
                    <EnvelopeSvgIcon>heroicons-outline:menu</EnvelopeSvgIcon>
                </IconButton>

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

            <div>
                <Input />
            </div>

        </React.Fragment>
    )
}


export default UserManageAppHeader;