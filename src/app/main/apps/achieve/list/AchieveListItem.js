import {ListItem, styled, Typography} from "@mui/material";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import format from "date-fns/format";
import _ from "../../../../../@lodash";
import moment from "moment";
import {useDispatch} from "react-redux";
import {openEditAchieveDialog} from "../store/achievesSlice";


const StyledListItem = styled(ListItem)(({ theme, unread, selected }) => ({
    background: theme.palette.background.default,
    borderBottom: `1px solid ${theme.palette.divider}`,

    '&::hover': {
        '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'block',
            height: '100%',
            width: 3,
            backgroundColor: theme.palette.primary.main,
        },
    },
}));

function AchieveListItem(props) {

    const {achieve} = props;

    const dispatch = useDispatch();

    const handleOpenEditDialog = () => {
        dispatch(openEditAchieveDialog(achieve));
    }

    return (
        <StyledListItem
            dense
            className="items-start py-20 px-0 md:px-8 relative w-full"
        >
            <div className='flex flex-auto min-w-0'>
                <div className='flex flex-col flex-auto min-w-0 mr-10'>
                    <div className='flex w-full space-x-6'>
                        <div className='flex items-start mx-10'>
                            <EnvelopeSvgIcon>
                                heroicons-solid:paper-clip
                            </EnvelopeSvgIcon>
                        </div>

                        <div className='flex flex-col w-full min-w-0'>
                            <div className='flex items-center w-full'>
                                {/*成就名称*/}
                                <Typography className="mr-8 font-semibold truncate">
                                    {achieve.achieveName}
                                </Typography>
                            </div>
                            <div className='flex items-center w-full mt-4'>
                                <span className="leading-4 truncate">{achieve.description}</span>
                            </div>

                            <Typography color="text.secondary" className="mt-8 leading-normal line-clamp-2">
                                {_.truncate(achieve.conditions.replace(/<(?:.|\n)*?>/gm, ''), { length: 180 })}
                            </Typography>

                            <div className='flex'>
                                <Typography color="text.secondary" className="mt-4 leading-normal line-clamp-2">
                                    成就点: {achieve.score}
                                </Typography>
                                <Typography color="text.secondary" className="mt-4 leading-normal line-clamp-2 ml-6">
                                    截止时间:  {moment(achieve.deathTime).format('YYYY-MM-DD HH:mm:ss')}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>

                {/*操作栏*/}
                <div className='flex justify-center items-center'>
                    <div className='mx-8 px-8 hover:text-blue duration-300 transition-all'
                         onClick={handleOpenEditDialog}
                    >edit</div>
                    <div className='mr-8 hover:text-red duration-300 transition-all'

                    >delete</div>
                </div>
            </div>



        </StyledListItem>
    )
}


export default AchieveListItem;
