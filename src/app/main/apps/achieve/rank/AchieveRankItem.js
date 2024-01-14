import {ListItem, styled, Typography} from "@mui/material";
import {Image} from "@mui/icons-material";
import {Fragment} from "react";

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

function AchieveRankItem(props) {
    const {rank} = props;


    return (
        <Fragment>
            {
                rank.trueName === 'Error' ? (
                    <></>
                ) : (
                    <StyledListItem
                        dense
                        className="items-start py-20 px-0 md:px-8 relative w-full"
                    >
                        <div className='flex flex-auto min-w-0'>
                            <div className='flex flex-col flex-auto min-w-0 mr-10'>
                                <div className='flex w-full space-x-6'>
                                    {/*TODO 用户头像*/}

                                    <div className='flex items-start mx-10'>
                                        <Image />
                                    </div>

                                    <div className='flex flex-col w-full min-w-0'>
                                        <div className='flex items-center w-full'>
                                            <Typography className="mr-8 font-semibold truncate">
                                                {rank.trueName}
                                            </Typography>
                                        </div>

                                        <div className='flex'>
                                            <Typography color="text.secondary" className="mt-4 leading-normal line-clamp-2">
                                                成就点: {rank.score}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </StyledListItem>
                )
            }
        </Fragment>
    )
}

export default AchieveRankItem;
