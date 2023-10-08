import {
    Avatar,
    Button,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Popover,
    Typography
} from "@mui/material";
import {Fragment, useState} from "react";
import {useSelector} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import EnvelopeSvgIcon from "../../../@envelope/core/EnvelopeSvgIcon";
import {selectUser} from "../../store/userSlice";

function UserMenu(props) {
    const user = useSelector(selectUser);

    const [userMenu, setUserMenu] = useState(null);

    const userMenuClick = (event) => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };

    return (
        <Fragment>
            <Button
                className='min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6'
                onClick={userMenuClick}
                color='inherit'
            >
                <div className='hidden md:flex flex-col mx-4 items-end'>
                    <Typography component={'span'} className='font-semibold flex'>
                        {user.data.displayName}
                    </Typography>
                    <Typography className='text-11 font-medium capitalize' color='text.secondary'>
                        {user.role.toString()}
                        {(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'}
                    </Typography>
                </div>

                {
                    user.data.photoURL ? (
                        <Avatar className='md:mx-4' alt='user photo' src={user.data.photoURL}/>
                    ) : (
                        <Avatar className='md:mx-4'>{user.data.displayName[0]}</Avatar>
                    )
                }
            </Button>


            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                classes={{
                    paper: 'py-8'
                }}
            >
                {
                    !user.role || user.role.length === 0 ? (
                        <Fragment>
                            <MenuItem component={Link} to='/sign-in' role='button'>
                                <ListItemIcon className='min-w-40'>
                                    <EnvelopeSvgIcon>heroicons-outline:lock-closed</EnvelopeSvgIcon>
                                </ListItemIcon>
                                <ListItemText primary='Sign In'/>
                            </MenuItem>
                            <MenuItem component={Link} to='/sign-up' role='button'>
                                <ListItemIcon className='min-w-40'>
                                    <EnvelopeSvgIcon>heroicons-outline:user-add</EnvelopeSvgIcon>
                                </ListItemIcon>
                                <ListItemText primary='Sign up'/>
                            </MenuItem>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <MenuItem component={Link} to='/apps/profile' onClick={userMenuClose} role='button'>
                                <ListItemIcon className='min-w-40'>
                                    <EnvelopeSvgIcon>heroicons-outline:user-circle</EnvelopeSvgIcon>
                                </ListItemIcon>
                                <ListItemText primary='My Profile'/>
                            </MenuItem>
                            <MenuItem component={Link} to='/apps/mailbox' onClick={userMenuClose} role='button'>
                                <ListItemIcon className='min-w-40'>
                                    <EnvelopeSvgIcon>heroicons-outline:mail-open</EnvelopeSvgIcon>
                                </ListItemIcon>
                                <ListItemText primary='Inbox'/>
                            </MenuItem>
                            <MenuItem component={NavLink} to='/sign-out' onClick={() => userMenuClick()}>
                                <ListItemIcon className='min-w-40'>
                                    <EnvelopeSvgIcon>heroicons-outline:logout</EnvelopeSvgIcon>
                                </ListItemIcon>
                                <ListItemText primary='Sign out'/>
                            </MenuItem>
                        </Fragment>
                    )
                }
            </Popover>
        </Fragment>
    )
}

export default UserMenu;