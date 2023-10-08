import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    styled,
    SwipeableDrawer, Switch,
    Typography
} from "@mui/material";
import reducer from "./store";
import {useDispatch, useSelector} from "react-redux";
import {selectQuickPanelData} from "./store/dataSlice";
import {selectQuickPanelState, toggleQuickPanel} from "./store/stateSlice";
import {memo, useState} from "react";
import EnvelopeScrollbars from "../../../../@envelope/core/EnvelopeScrollbars";
import format from 'date-fns/format';
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";
import withReducer from "../../../store/withReducer";

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: 280,
    },
}));

function QuickPanel(props) {
    const dispatch = useDispatch()

    const data = useSelector(selectQuickPanelData)
    const state = useSelector(selectQuickPanelState)

    const [checked, setChecked] = useState('notifications');

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    }

    return(
        <StyledSwipeableDrawer
            open={state}
            anchor='right'
            onOpen={(ev)=>{}}
            onClose={(ev)=>dispatch(toggleQuickPanel())}
            disableSwipeToOpen
        >
            <EnvelopeScrollbars>
                <ListSubheader component="div">Today</ListSubheader>

                <div className="mb-0 py-16 px-24">
                    <Typography className="mb-12 text-32" color="text.secondary">
                        {format(new Date(), 'eeee')}
                    </Typography>
                    <div className="flex">
                        <Typography className="leading-none text-32" color="text.secondary">
                            {format(new Date(), 'dd')}
                        </Typography>
                        <Typography className="leading-none text-16" color="text.secondary">
                            th
                        </Typography>
                        <Typography className="leading-none text-32" color="text.secondary">
                            {format(new Date(), 'MMMM')}
                        </Typography>
                    </div>
                </div>
                <Divider />

                <List>
                    <ListSubheader component="div">Events</ListSubheader>
                    {data &&
                    data.events.map((event) => (
                        <ListItem key={event.id}>
                            <ListItemText primary={event.title} secondary={event.detail} />
                        </ListItem>
                    ))}
                </List>
                <Divider />

                <List>
                    <ListSubheader component="div">Notes</ListSubheader>
                    {data &&
                    data.notes.map((note) => (
                        <ListItem key={note.id}>
                            <ListItemText primary={note.title} secondary={note.detail} />
                        </ListItem>
                    ))}
                </List>
                <Divider />

                <List>
                    <ListSubheader component="div">Quick Settings</ListSubheader>
                    <ListItem>
                        <ListItemIcon className="min-w-40">
                            <EnvelopeSvgIcon>material-outline:notifications</EnvelopeSvgIcon>
                        </ListItemIcon>
                        <ListItemText primary="Notifications" />
                        <ListItemSecondaryAction>
                            <Switch
                                color="primary"
                                onChange={handleToggle('notifications')}
                                checked={checked.indexOf('notifications') !== -1}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon className="min-w-40">
                            <EnvelopeSvgIcon>material-outline:cloud</EnvelopeSvgIcon>
                        </ListItemIcon>
                        <ListItemText primary="Cloud Sync" />
                        <ListItemSecondaryAction>
                            <Switch
                                color="secondary"
                                onChange={handleToggle('cloudSync')}
                                checked={checked.indexOf('cloudSync') !== -1}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon className="min-w-40">
                            <EnvelopeSvgIcon>material-outline:brightness_high</EnvelopeSvgIcon>
                        </ListItemIcon>
                        <ListItemText primary="Retro Thrusters" />
                        <ListItemSecondaryAction>
                            <Switch
                                color="primary"
                                onChange={handleToggle('retroThrusters')}
                                checked={checked.indexOf('retroThrusters') !== -1}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </EnvelopeScrollbars>

        </StyledSwipeableDrawer>
    )
}

export default withReducer('quickPanel', reducer)(memo(QuickPanel));
