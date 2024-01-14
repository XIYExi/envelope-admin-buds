import {Divider, InputBase, Paper, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import {styled} from "@mui/material/styles";
import {DateTimePicker} from "@mui/x-date-pickers";

const PaperBase = styled(Paper)(({ theme }) => ({
    '&': {
        borderRadius: '0px',
        boxShadow: 'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
    }
}));



function CustomizedSearchInput(props) {

    return (
        <div className='flex'>
            <PaperBase
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="搜索姓名"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                    <DirectionsIcon />
                </IconButton>

            </PaperBase>


            <div className='flex justify-center items-center' style={{marginLeft: '30px'}}>
                <Typography className='font-medium'>创建时间</Typography>
                <PaperBase
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: '16px' }}
                >
                    <DateTimePicker label="开始时间" />
                    <Typography>&nbsp;-&nbsp;</Typography>
                    <DateTimePicker label="开始时间" />
                </PaperBase>
            </div>

        </div>
    )
}

export default CustomizedSearchInput;
