import * as React from 'react';
import {MenuItem, Menu, IconButton, ListItemIcon, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import {useNavigate} from "react-router-dom";
import {selectMail} from "../store/mailSlice";
import {selectSpamFolderId, selectTrashFolderId} from "../store/foldersSlice";
import {setActionToMails} from "../store/mailsSlice";

function MailActionsMenu(props) {

    const {className} = props;
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const mail = useSelector(selectMail);
    const spamFolderId = useSelector(selectSpamFolderId);
    const trashFolderId = useSelector(selectTrashFolderId);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return(
        <div className={className}>
            <IconButton
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <EnvelopeSvgIcon>heroicons-outline:dots-vertical</EnvelopeSvgIcon>
            </IconButton>

            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    onClick={() => {
                        dispatch(setActionToMails({type: 'unread', value: true, ids: [mail.id]}));
                        handleClose();
                    }}
                >
                    <ListItemIcon className="min-w-40">
                        <EnvelopeSvgIcon>heroicons-outline:mail</EnvelopeSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Mark as unread" />
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        dispatch(setActionToMails({ type: 'folder', value: spamFolderId, ids: [mail.id] }));
                        handleClose();
                    }}
                >
                    <ListItemIcon className="min-w-40">
                        <EnvelopeSvgIcon>heroicons-outline:exclamation</EnvelopeSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Spam" />
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        dispatch(
                            setActionToMails({ type: 'folder', value: trashFolderId, ids: [mail.id] })
                        ).then(() => {
                            navigate(-1);
                        });
                        handleClose();
                    }}
                >
                    <ListItemIcon className="min-w-40">
                        <EnvelopeSvgIcon>heroicons-outline:trash</EnvelopeSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </MenuItem>
            </Menu>
        </div>
    )
}

export default MailActionsMenu;