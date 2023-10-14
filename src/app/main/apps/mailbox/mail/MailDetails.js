import {useDispatch, useSelector} from "react-redux";
import {getMail, selectMail} from "../store/mailSlice";
import {selectLabelsEntities} from "../store/labelsSlice";
import {useParams} from "react-router-dom";
import React, {useState} from "react";
import {useDeepCompareEffect} from "../../../../../@envelope/hook";
import {Box} from "@mui/system";
import {Avatar, Button, Paper, Typography} from "@mui/material";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import MailAttachment from "./MailAttachment";
import withRouter from "../../../../../@envelope/core/withRouter";
import MailToolbar from "./MailToolbar";
import MailLabel from "./MailLabel";
import MailInfo from "./MailInfo";


function MailDetails(props) {

    const dispatch = useDispatch();
    const mail = useSelector(selectMail);
    const labels = useSelector(selectLabelsEntities);

    const routeParams = useParams();
    const [showDetails, setShowDetails] = useState(false);

    useDeepCompareEffect(() => {
        dispatch(getMail(routeParams));
    }, [dispatch, routeParams]);


    if (!mail) {
        return null;
    }


    return(
        <React.Fragment>
            <div className='z-10 relative flex flex-col flex-0 w-full border-b'>
                <MailToolbar />

                {/*Email Box Labels*/}
                <div className='flex flex-wrap items-center py-20 px-24'>
                    <div className='flex flex-auto my-4 mr-16 text-2xl'>{mail.subject}</div>
                    {
                        mail.labels && mail.labels.length > 0 && (
                            <div className='flex flex-wrap items-center justify-center -mx-4'>
                                {
                                    mail.labels.map((labelId) => (
                                        <MailLabel className='m-4' key={labelId} labelId={labelId} />
                                    ))
                                }
                            </div>
                        )
                    }
                </div>{/*EDN Email Box Labels*/}

                <Box
                    sx={{
                        backgroundColor: 'background.default'
                    }}
                    className='flex flex-col flex-auto shrink-0 lg:shrink p-12 lg:overflow-y-auto'
                >
                    <Paper className='flex flex-col flex-0 w-full shadow rounded-2xl overflow-hidden'>
                        <div className="flex flex-col py-32 px-24">
                            <div className="flex items-center w-full">
                                <Avatar src={mail.from.avatar} />

                                <div className="ml-16 min-w-0">
                                    <Typography className="font-semibold truncate">
                                        {mail.from.contact.split('<')[0].trim()}
                                    </Typography>

                                    <div className="flex items-center mt-8 leading-5">
                                        <div>to</div>
                                        <div className='mx-4 font-semibold'>me</div>
                                        {
                                            mail.cc?.length + mail.bcc?.length > 0 && (
                                                <div>
                                                    <span className="mx-4">and</span>
                                                    <span className="mx-4 font-semibold">{mail.cc.length + mail.bcc.length}</span>
                                                    <span className="mx-4 font-semibold">
                                                        {mail.cc.length + mail.bcc.length === 1 ? 'other' : 'others'}
                                                    </span>
                                                </div>
                                            )
                                        }

                                        <MailInfo />
                                    </div>
                                </div>
                            </div>

                            {/*内容*/}
                            <Typography
                                className='flex mt-32 whitespace-pre-line leading-relaxed'
                                variant='body2'
                                dangerouslySetInnerHTML={{
                                    __html: mail.content
                                }}
                            />{/*END 内容*/}

                            {
                                mail.attachments && mail.attachments.length > 0 && (
                                    <div className='flex flex-col w-full'>
                                        <div className="flex items-center mt-48">
                                            <EnvelopeSvgIcon size={20}>heroicons-solid:paper-clip</EnvelopeSvgIcon>
                                            <div className="mx-8 font-semibold">{mail.attachments.length} Attachments</div>
                                        </div>

                                        <div className="flex flex-wrap -m-12 mt-12">
                                            {
                                                mail.attachments.map((attachment, index) => (
                                                    <MailAttachment key={index} attachment={attachment} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                        <Box
                            sx={{
                                backgroundColor: 'background.default'
                            }}
                            className='flex flex-col flex-auto shrink-0 lg:shrink p-12 lg:overflow-y-auto'
                        >
                            <div className="flex flex-wrap w-full -m-8">
                                <Button
                                    className="m-8"
                                    color="secondary"
                                    startIcon={<EnvelopeSvgIcon size={20}>heroicons-solid:reply</EnvelopeSvgIcon>}
                                    variant="outlined"
                                >
                                    Reply
                                </Button>
                                <Button
                                    className="m-8"
                                    color="secondary"
                                    startIcon={<EnvelopeSvgIcon size={20}>heroicons-solid:reply</EnvelopeSvgIcon>}
                                    variant="outlined"
                                >
                                    Reply All
                                </Button>

                                <Button
                                    className="m-8"
                                    color="secondary"
                                    startIcon={
                                        <EnvelopeSvgIcon size={20}>heroicons-solid:chevron-double-right</EnvelopeSvgIcon>
                                    }
                                    variant="outlined"
                                >
                                    Forward
                                </Button>
                            </div>
                        </Box>

                    </Paper>
                </Box>
            </div>
        </React.Fragment>
    )
}


export default withRouter(MailDetails);