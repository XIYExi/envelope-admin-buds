import {IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectEnvelopeCurrentSettings, setDefaultSettings} from "../../store/envelope/settingsSlice";
import _ from '@loadsh';
import {useThemeMediaQuery} from "../../../@envelope/hook";
import {navbarToggle, navbarToggleMobile} from "../../store/envelope/navbarSlice";
import EnvelopeSvgIcon from "../../../@envelope/core/EnvelopeSvgIcon";


function NavbarToggleButton(props) {
    const dispatch = useDispatch();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
    const settings = useSelector(selectEnvelopeCurrentSettings);
    const { config } = settings.layout;

    return (
        <IconButton
            className={props.className}
            color="inherit"
            size="small"
            onClick={(ev) => {
                if (isMobile) {
                    dispatch(navbarToggleMobile());
                } else if (config.navbar.style === 'style-2') {
                    dispatch(
                        setDefaultSettings(
                            _.set({}, 'layout.config.navbar.folded', !settings.layout.config.navbar.folded)
                        )
                    );
                } else {
                    dispatch(navbarToggle());
                }
            }}
        >
            {props.children}
        </IconButton>
    );

}

NavbarToggleButton.defaultProps = {
    children: (
        <EnvelopeSvgIcon size={20} color="action">
            heroicons-outline:view-list
        </EnvelopeSvgIcon>
    ),
};

export default NavbarToggleButton;