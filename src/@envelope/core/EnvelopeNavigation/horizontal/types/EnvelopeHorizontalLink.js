import {styled, ListItem, ListItemText} from "@mui/material";
import classNames from "classnames";
import PropTypes from "prop-types";
import {memo, useMemo} from "react";
import withRouter from "../../../withRouter";
import EnvelopeNavBadge from "../../EnvelopeNavBadge";
import EnvelopeSvgIcon from "../../../EnvelopeSvgIcon";


const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none!important',
    minHeight: 48,
    '&.active': {
        backgroundColor: `${theme.palette.secondary.main}!important`,
        color: `${theme.palette.secondary.contrastText}!important`,
        pointerEvents: 'none',
        '& .fuse-list-item-text-primary': {
            color: 'inherit',
        },
        '& .fuse-list-item-icon': {
            color: 'inherit',
        },
    },
    '& .fuse-list-item-icon': {},
    '& .fuse-list-item-text': {
        padding: '0 0 0 16px',
    },
}));

function EnvelopeNavHorizontalLink(props) {
    const { item } = props;

    return useMemo(
        () => (
            <StyledListItem
                button
                component="a"
                href={item.url}
                target={item.target ? item.target : '_blank'}
                className={classNames('fuse-list-item')}
                role="button"
                sx={item.sx}
                disabled={item.disabled}
            >
                {item.icon && (
                    <EnvelopeSvgIcon
                        className={classNames('fuse-list-item-icon shrink-0', item.iconClass)}
                        color="action"
                    >
                        {item.icon}
                    </EnvelopeSvgIcon>
                )}

                <ListItemText
                    className="fuse-list-item-text"
                    primary={item.title}
                    classes={{ primary: 'text-13 fuse-list-item-text-primary truncate' }}
                />

                {item.badge && <EnvelopeNavBadge className="ltr:ml-8 rtl:mr-8" badge={item.badge} />}
            </StyledListItem>
        ),
        [item.badge, item.icon, item.iconClass, item.target, item.title, item.url]
    );
}

EnvelopeNavHorizontalLink.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        icon: PropTypes.string,
        url: PropTypes.string,
        target: PropTypes.string,
    }),
};

EnvelopeNavHorizontalLink.defaultProps = {};

const NavHorizontalLink = withRouter(memo(EnvelopeNavHorizontalLink));

export default NavHorizontalLink;
