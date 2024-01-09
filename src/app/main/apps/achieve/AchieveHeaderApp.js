import {IconButton} from "@mui/material";
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";


function AchieveHeader(props) {

    const {onToggleLeftSidebar} = props;
    return(
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
                </div>

            </div>
        </div>
    )
}

export default AchieveHeader;
