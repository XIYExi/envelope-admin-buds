import {useDispatch, useSelector} from "react-redux";
import {
    deselectAllMails,
    selectAllMails,
    selectMails,
    selectMailsByParameter,
    selectSearchText,
    selectSelectedMailIds,
    setActionToMails,
    setMailsSearchText
} from "../store/mailsSlice";
import {selectLabels} from "../store/labelsSlice";
import {selectFolders, selectTrashFolderId} from "../store/foldersSlice";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {Box} from "@mui/system";
import {
    Checkbox,
    Hidden,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    OutlinedInput,
    Tooltip
} from "@mui/material";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import MailListTitle from "./MailListTitle";

function MailsToolbar(props) {
    const { onToggleLeftSidebar } = props;
    const dispatch = useDispatch();
    const mails = useSelector(selectMails);
    const labels = useSelector(selectLabels);
    const folders = useSelector(selectFolders);
    const searchText = useSelector(selectSearchText);
    const { t } = useTranslation('mailboxApp');
    const selectedMailIds = useSelector(selectSelectedMailIds);
    const trashFolderId = useSelector(selectTrashFolderId);
    const [menu, setMenu] = useState({
        selectMenu: null,
        foldersMenu: null,
        labelsMenu: null,
    });

    function handleMenuOpen(event, _menu) {
        setMenu({
            ..._menu,
            [_menu]: event.currentTarget,
        });
    }

    function handleMenuClose(event, _menu) {
        setMenu({
            ..._menu,
            [_menu]: null,
        });
    }

    function handleCheckChange(event) {
        return event.target.checked ? dispatch(selectAllMails()) : dispatch(deselectAllMails());
    }

    return (
        <div className="sticky top-0 z-10">
            <Box
                sx={{ backgroundColor: 'background.default' }}
                className="flex flex-col sm:flex-row items-center w-full min-h-64 py-12 sm:py-0 space-x-8 px-8 border-b "
            >
                <div className="flex items-center">
                    <Hidden lgUp>
                        <IconButton
                            onClick={(ev) => onToggleLeftSidebar()}
                            aria-label="open left sidebar"
                            size="small"
                        >
                            <EnvelopeSvgIcon>heroicons-outline:menu</EnvelopeSvgIcon>
                        </IconButton>
                    </Hidden>

                    <MailListTitle />
                </div>

                <OutlinedInput
                    className="flex flex-1 items-center px-16 rounded-full"
                    variant="outlined"
                    fullWidth
                    placeholder={t('SEARCH_PLACEHOLDER')}
                    value={searchText}
                    onChange={(ev) => dispatch(setMailsSearchText(ev))}
                    startAdornment={
                        <InputAdornment position="start">
                            <EnvelopeSvgIcon color="disabled">heroicons-solid:search</EnvelopeSvgIcon>
                        </InputAdornment>
                    }
                    inputProps={{
                        'aria-label': 'Search',
                    }}
                    size="small"
                />
            </Box>

            <Box
                className="flex items-center w-full min-h-56 px-8 border-b space-x-8"
                sx={{ backgroundColor: 'background.paper' }}
            >
                <Checkbox
                    onChange={handleCheckChange}
                    checked={
                        selectedMailIds.length === Object.keys(mails).length && selectedMailIds.length > 0
                    }
                    indeterminate={
                        selectedMailIds.length !== Object.keys(mails).length && selectedMailIds.length > 0
                    }
                    size="small"
                />

                <IconButton
                    className=""
                    size="small"
                    aria-label="More"
                    aria-owns={menu.select ? 'select-menu' : null}
                    aria-haspopup="true"
                    onClick={(ev) => handleMenuOpen(ev, 'select')}
                >
                    <EnvelopeSvgIcon size={16}>heroicons-outline:chevron-down</EnvelopeSvgIcon>
                </IconButton>

                <Menu
                    id="select-menu"
                    anchorEl={menu.select}
                    open={Boolean(menu.select)}
                    onClose={(ev) => handleMenuClose(ev, 'select')}
                >
                    <MenuItem
                        onClick={(ev) => {
                            dispatch(selectAllMails());
                            handleMenuClose(ev, 'select');
                        }}
                    >
                        All
                    </MenuItem>
                    <MenuItem
                        onClick={(ev) => {
                            dispatch(deselectAllMails());
                            handleMenuClose(ev, 'select');
                        }}
                    >
                        None
                    </MenuItem>
                    <MenuItem
                        onClick={(ev) => {
                            dispatch(selectMailsByParameter(['unread', false]));
                            handleMenuClose(ev, 'select');
                        }}
                    >
                        Read
                    </MenuItem>
                    <MenuItem
                        onClick={(ev) => {
                            dispatch(selectMailsByParameter(['unread', true]));
                            handleMenuClose(ev, 'select');
                        }}
                    >
                        Unread
                    </MenuItem>
                    <MenuItem
                        onClick={(ev) => {
                            dispatch(selectMailsByParameter(['starred', true]));
                            handleMenuClose(ev, 'select');
                        }}
                    >
                        Starred
                    </MenuItem>
                    <MenuItem
                        onClick={(ev) => {
                            dispatch(selectMailsByParameter(['starred', false]));
                            handleMenuClose(ev, 'select');
                        }}
                    >
                        Unstarred
                    </MenuItem>
                    <MenuItem
                        onClick={(ev) => {
                            dispatch(selectMailsByParameter(['important', true]));
                            handleMenuClose(ev, 'select');
                        }}
                    >
                        Important
                    </MenuItem>
                    <MenuItem
                        onClick={(ev) => {
                            dispatch(selectMailsByParameter(['important', false]));
                            handleMenuClose(ev, 'select');
                        }}
                    >
                        Unimportant
                    </MenuItem>
                </Menu>

                {selectedMailIds.length > 0 && (
                    <>
                        <div className="border-r-1 h-32 w-1 mx-12 my-0" />

                        <Tooltip title="Delete">
                            <IconButton
                                onClick={(ev) => {
                                    dispatch(
                                        setActionToMails({ type: 'folder', value: trashFolderId, ids: selectedMailIds })
                                    );
                                }}
                                aria-label="Delete"
                                size="small"
                            >
                                <EnvelopeSvgIcon>heroicons-outline:trash</EnvelopeSvgIcon>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Move to folder">
                            <IconButton
                                aria-label="More"
                                aria-owns={menu.folders ? 'folders-menu' : null}
                                aria-haspopup="true"
                                onClick={(ev) => handleMenuOpen(ev, 'folders')}
                                size="small"
                            >
                                <EnvelopeSvgIcon>heroicons-outline:folder</EnvelopeSvgIcon>
                            </IconButton>
                        </Tooltip>

                        <Menu
                            id="folders-menu"
                            anchorEl={menu.folders}
                            open={Boolean(menu.folders)}
                            onClose={(ev) => handleMenuClose(ev, 'folders')}
                        >
                            {folders.length > 0 &&
                            folders.map((folder) => (
                                <MenuItem
                                    onClick={(ev) => {
                                        dispatch(
                                            setActionToMails({ type: 'folder', value: folder.id, ids: selectedMailIds })
                                        );
                                        handleMenuClose(ev, 'folders');
                                    }}
                                    key={folder.id}
                                >
                                    {folder.title}
                                </MenuItem>
                            ))}
                        </Menu>

                        <Tooltip title="Add label">
                            <IconButton
                                aria-label="label"
                                aria-owns={menu.labels ? 'labels-menu' : null}
                                aria-haspopup="true"
                                onClick={(ev) => handleMenuOpen(ev, 'labels')}
                                size="small"
                            >
                                <EnvelopeSvgIcon>heroicons-outline:tag</EnvelopeSvgIcon>
                            </IconButton>
                        </Tooltip>

                        <Menu
                            id="labels-menu"
                            anchorEl={menu.labels}
                            open={Boolean(menu.labels)}
                            onClose={(ev) => handleMenuClose(ev, 'labels')}
                        >
                            {labels.length > 0 &&
                            labels.map((label) => (
                                <MenuItem
                                    onClick={(ev) => {
                                        dispatch(
                                            setActionToMails({ type: 'label', value: label.id, ids: selectedMailIds })
                                        );

                                        handleMenuClose(ev, 'labels');
                                    }}
                                    key={label.id}
                                >
                                    {label.title}
                                </MenuItem>
                            ))}
                        </Menu>

                        <Tooltip title="Mark as unread">
                            <IconButton
                                onClick={(ev) => {
                                    dispatch(setActionToMails({ type: 'unread', value: true, ids: selectedMailIds }));
                                }}
                                aria-label="Mark as unread"
                                size="small"
                            >
                                <EnvelopeSvgIcon className="">heroicons-outline:mail</EnvelopeSvgIcon>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Set important">
                            <IconButton
                                onClick={(ev) => {
                                    dispatch(
                                        setActionToMails({ type: 'important', value: true, ids: selectedMailIds })
                                    );
                                }}
                                aria-label="important"
                                size="small"
                            >
                                <EnvelopeSvgIcon className="text-red-600 dark:text-red-500">
                                    heroicons-outline:exclamation-circle
                                </EnvelopeSvgIcon>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Set starred">
                            <IconButton
                                onClick={(ev) => {
                                    dispatch(
                                        setActionToMails({ type: 'starred', value: true, ids: selectedMailIds })
                                    );
                                }}
                                aria-label="important"
                                size="small"
                            >
                                <EnvelopeSvgIcon className="text-orange-500 dark:text-red-400">
                                    heroicons-outline:star
                                </EnvelopeSvgIcon>
                            </IconButton>
                        </Tooltip>
                    </>
                )}
            </Box>
        </div>
    );
}

export default MailsToolbar;