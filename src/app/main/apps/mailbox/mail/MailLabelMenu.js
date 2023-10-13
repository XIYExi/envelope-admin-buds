import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectLabels} from "../store/labelsSlice";
import {Checkbox, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip} from "@mui/material";
import EnvelopeSvgIcon from "../../../../../@envelope/core/EnvelopeSvgIcon";
import _ from '../../../../../@lodash';
import {labelColorDefs} from "./labelColors";



function MailLabelsMenu(props) {
    const { className, onChange, labels } = props;
    const [selectedLabels, setSelectedLabels] = useState(labels);
    const labelsAll = useSelector(selectLabels);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setSelectedLabels(labels);
    }, [labels]);

    function handleMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }

    return (
        <div>
            <Tooltip title="Set labels">
                <IconButton onClick={handleMenuOpen} className={className}>
                    <EnvelopeSvgIcon>heroicons-outline:tag</EnvelopeSvgIcon>
                </IconButton>
            </Tooltip>
            <Menu
                id="labels-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'labels',
                }}
            >
                <div className="">
                    {labelsAll.map((label) => {
                        return (
                            <MenuItem
                                className="px-8"
                                key={label.id}
                                onClick={(ev) => {
                                    onChange(_.xor(selectedLabels, [label.id]));
                                }}
                            >
                                <Checkbox checked={selectedLabels.includes(label.id)} />
                                <ListItemText className="mx-8">{label.title}</ListItemText>
                                <ListItemIcon className="min-w-24">
                                    <EnvelopeSvgIcon className={labelColorDefs[label.color].text}>
                                        heroicons-outline:tag
                                    </EnvelopeSvgIcon>
                                </ListItemIcon>
                            </MenuItem>
                        );
                    })}
                </div>
            </Menu>
        </div>
    );
}

export default MailLabelsMenu;
