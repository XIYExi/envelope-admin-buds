import {ListItem, styled, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {openEditRewardDialog, removeRewards} from "../store/rewardSlice";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import {Image} from "@mui/icons-material";

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


function AchieveRewardItem(props) {

    const {reward} = props;
    const dispatch = useDispatch();

    const handleOpenEditDialog = () => {
        dispatch(openEditRewardDialog(reward));
    }

    const handleRemove = (id) => {
        dispatch(removeRewards(id));
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
                            {/*TODO 奖励的预览图*/}
                            <Image />
                        </div>

                        <div className='flex flex-col w-full min-w-0'>
                            <div className='flex items-center w-full'>
                                {/*奖励名称*/}
                                <Typography className="mr-8 font-semibold truncate">
                                    奖励：{reward.rewardName}
                                </Typography>
                            </div>

                            <div className='flex'>
                                <Typography color="text.secondary" className="mt-4 leading-normal line-clamp-2">
                                    成就点: {reward.score}
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
                         onClick={() => handleRemove(reward.id)}
                    >delete</div>
                </div>
            </div>
        </StyledListItem>
    )
}


export default AchieveRewardItem;
