import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import EnvelopeLoading from "../../../../../@envelope/core/EnvelopeLoading";
import {getUserItem, selectUser} from "../store/userItemSlice";
import {selectTags} from "../store/tagSlice";
import {Box} from "@mui/system";
import {Avatar, Button, Chip, Divider, Typography} from "@mui/material";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import NavLinkAdapter from "../../../../../@envelope/core/NavLinkAdapter";
import _ from '../../../../../@lodash';
import format from "date-fns/format";

const ContactView = () => {

    const user = useSelector(selectUser);
    const tags = useSelector(selectTags);
    const routeParams = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserItem(routeParams.id));
    }, [dispatch, routeParams]);


    if (!user) {
        return <EnvelopeLoading />;
    }
    else{
        console.log('let me see see', user)
    }


    /*渲染当前用户信息卡片*/
    return (
        <React.Fragment>
            <Box
                className="relative w-full h-160 sm:h-192 px-32 sm:px-48"
                sx={{
                    backgroundColor: 'background.default',
                }}
            >
                {
                    /*渲染用户背景*/
                    user.background && (
                        <img
                            className="absolute inset-0 object-cover w-full h-full"
                            src={user.background}
                            alt="user background"
                        />
                    )
                }
            </Box>

            <div className='relative flex flex-col flex-auto items-center p-24 pt-0 sm:p-48 sm:pt-0'>
                <div className='w-full max-w-3xl'>
                    <div className='flex flex-auto items-end -mt-64'>
                        <Avatar
                            sx={{
                                borderWidth: 4,
                                borderStyle: 'solid',
                                borderColor: 'background.paper',
                                backgroundColor: 'background.default',
                                color: 'text.secondary',
                            }}
                            className="w-128 h-128 text-64 font-bold"
                            src={user.avatar}
                            alt={user.name}
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                        <div className="flex items-center ml-auto mb-4">
                            <Button variant="contained" color="secondary" component={NavLinkAdapter} to="edit">
                                <EnvelopeSvgIcon size={20}>heroicons-outline:pencil-alt</EnvelopeSvgIcon>
                                <span className="mx-8">Edit</span>
                            </Button>
                        </div>
                    </div>

                    <Typography className="mt-12 text-4xl font-bold truncate">{user.name}</Typography>

                    <div className='flex flex-wrap items-center mt-8'>
                        {
                            user.tags.map((id, index) => (
                                <Chip
                                    key={index}
                                    label={_.find(tags, {id}).title}
                                    className='mr-12 mb-12'
                                    size='small'
                                />
                            ))
                        }
                    </div>

                    <Divider className="mt-16 mb-24" />

                    <div className="flex flex-col space-y-32">
                        {user.title && (
                            <div className="flex items-center">
                                <EnvelopeSvgIcon>heroicons-outline:briefcase</EnvelopeSvgIcon>
                                <div className="ml-24 leading-6">{user.title}</div>
                            </div>
                        )}

                        {user.company && (
                            <div className="flex items-center">
                                <EnvelopeSvgIcon>heroicons-outline:office-building</EnvelopeSvgIcon>
                                <div className="ml-24 leading-6">{user.company}</div>
                            </div>
                        )}

                        {user.emails && (
                            <div className="flex">
                                <EnvelopeSvgIcon>heroicons-outline:mail</EnvelopeSvgIcon>
                                <div className="min-w-0 ml-24 space-y-4">
                                    <div className="flex items-center leading-6">
                                        <a
                                            className="hover:underline text-primary-500"
                                            href={`mailto: ${user.emails}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {user.emails}
                                        </a>
                                    </div>

                                </div>
                            </div>
                        )}

                        {user.phoneNumbers && (
                            <div className="flex">
                                <EnvelopeSvgIcon>heroicons-outline:phone</EnvelopeSvgIcon>
                                <div className="min-w-0 ml-24 space-y-4">
                                    <div className="flex items-center leading-6">
                                        <div className="ml-10 font-mono">{user.phoneNumbers}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {user.address && (
                            <div className="flex items-center">
                                <EnvelopeSvgIcon>heroicons-outline:location-marker</EnvelopeSvgIcon>
                                <div className="ml-24 leading-6">{user.address}</div>
                            </div>
                        )}

                        {user.birthday && (
                            <div className="flex items-center">
                                <EnvelopeSvgIcon>heroicons-outline:cake</EnvelopeSvgIcon>
                                <div className="ml-24 leading-6">
                                    {format(new Date(user.birthday), 'MMMM d, y')}
                                </div>
                            </div>
                        )}

                        {user.notes && (
                            <div className="flex">
                                <EnvelopeSvgIcon>heroicons-outline:menu-alt-2</EnvelopeSvgIcon>
                                <div
                                    className="max-w-none ml-24 prose dark:prose-invert"
                                    dangerouslySetInnerHTML={{ __html: user.notes }}
                                />
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </React.Fragment>
    )

}


export default ContactView;