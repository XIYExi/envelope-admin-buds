import {IconButton, Tooltip, Typography} from "@mui/material";
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";
import {motion} from "framer-motion";

function UserManageAppHeader(props){

    const {onToggleLeftSidebar} = props;

    return (
        <div className='flex flex-col md:flex-row w-full p-12 justify-between z-10 container'>
            <div className='flex flex-col sm:flex-col items-center'>
                <div className='flex items-center'>
                    <IconButton
                        onClick={(ev) => onToggleLeftSidebar()}
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

            <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
                <IconButton
                    className="mx-8"
                    aria-label="add"
                >
                    <EnvelopeSvgIcon>heroicons-outline:plus-circle</EnvelopeSvgIcon>
                </IconButton>

            </motion.div>
        </div>
    )
}


export default UserManageAppHeader;