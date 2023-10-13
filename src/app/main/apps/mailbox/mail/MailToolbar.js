import {useDispatch, useSelector} from "react-redux";
import {selectMail} from "../store/mailSlice";
import {IconButton, Tooltip, useTheme} from '@mui/material';
import {Box} from "@mui/system";
import {NavLink} from "react-router-dom";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import MailLabelsMenu from "./MailLabelMenu";
import {setActionToMails} from "../store/mailsSlice";
import classNames from "classnames";
import MailActionsMenu from "./MailActionsMenu";
import withRouter from "../../../../../@envelope/core/withRouter";

function MailToolbar(props) {
    const dispatch = useDispatch();
    const mail = useSelector(selectMail);
    const theme = useTheme();

    if (!mail) {
        return null;
    }

    return (
        <Box
            sx={{ backgroundColor: 'background.default' }}
            className="flex items-center justify-between w-full min-h-64 px-8 border-b"
        >
            <IconButton component={NavLink} className="lg:hidden md:-mx-8" to={-1}>
                <EnvelopeSvgIcon>
                    {theme.direction === 'ltr'
                        ? 'heroicons-outline:arrow-narrow-left'
                        : 'heroicons-outline:arrow-narrow-right'}
                </EnvelopeSvgIcon>
            </IconButton>

            <div className="flex flex-1 justify-end items-center">
                <MailLabelsMenu
                    labels={mail.labels}
                    onChange={(value) => {
                        dispatch(setActionToMails({ type: 'labels', value, ids: [mail.id] }));
                    }}
                    className="mx-4"
                />

                <Tooltip title="Set important">
                    <IconButton
                        className="mx-4"
                        onClick={() =>
                            dispatch(
                                setActionToMails({ type: 'important', value: !mail.important, ids: [mail.id] })
                            )
                        }
                    >
                        <EnvelopeSvgIcon className={classNames(mail.important && 'text-red-600 dark:text-red-500')}>
                            heroicons-outline:exclamation-circle
                        </EnvelopeSvgIcon>
                    </IconButton>
                </Tooltip>

                <Tooltip title="Set starred">
                    <IconButton
                        className="mx-4"
                        onClick={() =>
                            dispatch(setActionToMails({ type: 'starred', value: !mail.starred, ids: [mail.id] }))
                        }
                    >
                        <EnvelopeSvgIcon className={classNames(mail.starred && 'text-orange-500 dark:text-red-400')}>
                            heroicons-outline:star
                        </EnvelopeSvgIcon>
                    </IconButton>
                </Tooltip>

                <MailActionsMenu className="mx-4" />
            </div>
        </Box>
    );
}

export default withRouter(MailToolbar);
