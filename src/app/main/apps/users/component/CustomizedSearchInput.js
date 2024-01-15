import {
    Box,
    Button,
    Divider,
    InputBase,
    Paper,
    Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import {styled} from "@mui/material/styles";
import {DateTimePicker} from "@mui/x-date-pickers";
import {useEffect, useRef, useState} from "react";
import formatISO from "date-fns/formatISO";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {
    changeSearchText,
    changeSearchTime,
    clearQuery,
    selectSearchText,
    selectTime,
} from "../store/usersTableSlice";

const PaperBase = styled(Paper)(({ theme }) => ({
    '&': {
        borderRadius: '0px',
        boxShadow: 'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
    }
}));



function CustomizedSearchInput(props) {

    const dispatch = useDispatch();

    const [begin, setBegin] = useState(null);
    const [end, setEnd] = useState(null);

    const searchText = useSelector(selectSearchText);

    const handleBeginTime = (event) => {
        const ISO_8601 = formatISO(new Date(event));
        const time = moment(ISO_8601, moment.ISO_8601).format("yyyy-MM-DD HH:mm:ss");
        console.log('begin', time)
        setBegin(time)
    }

    const handleEndTime = (event) => {
        const ISO_8601 = formatISO(new Date(event));
        const time = moment(ISO_8601, moment.ISO_8601).format("yyyy-MM-DD HH:mm:ss");
        setEnd(time);
    }


    const handleQueryTime = () => {
        if (begin === undefined || end === undefined)
            return;

        dispatch(changeSearchTime({
            begin: begin,
            end: end
        }));
    }


    return (
        <div className='flex'>
            <PaperBase
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="搜索姓名"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={e => {
                        //console.log(e.target.value)
                        dispatch(changeSearchText(e.target.value));
                    }}
                    value={searchText}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </PaperBase>

            <div className='flex justify-center items-center' style={{marginLeft: '45px'}}>
                <Typography className='font-medium'>创建时间</Typography>
                <Box
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 500, marginLeft: '16px' }}
                >
                    <DateTimePicker
                        label="开始时间"
                        format="yyyy-MM-dd HH:mm:ss"
                        onChange={(event) => handleBeginTime(event)}
                        value={begin === null ? null : new Date(begin)}
                    />
                    <Typography>&nbsp;-&nbsp;</Typography>
                    <DateTimePicker
                        label="结束时间"
                        format="yyyy-MM-dd HH:mm:ss"
                        onChange={(event) => handleEndTime(event)}
                        value={end === null ? null : new Date(end)}
                    />


                    <Button
                        style={{marginLeft: '20px', marginRight: '10px'}}
                        onClick={handleQueryTime}
                    >
                        查询
                    </Button>

                    <Divider orientation="vertical"
                             sx={{
                                 width: '1px'
                             }}
                             variant="middle"
                             component="div"
                             flexItem
                    />

                    <Button
                        style={{marginLeft: '10px'}}
                        onClick={() => {
                            dispatch(clearQuery());
                            setBegin(null);
                            setEnd(null);
                        }}
                    >
                        清空
                    </Button>
                </Box>
            </div>

        </div>
    )
}

export default CustomizedSearchInput;
