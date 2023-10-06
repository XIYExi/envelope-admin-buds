import NavLinkAdapter from "../../../NavLinkAdapter";
import {styled, useTheme} from "@mui/material";
import {useDebounce} from "../../../../hook";
import {Grow, IconButton, ListItem, Paper, ListItemText} from "@mui/material";
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {memo, useMemo, useState} from "react";
import * as ReactDOM from "react-dom";
import {Manager, Popper, Reference} from "react-popper";
import withRouter from "../../../withRouter";
import EnvelopeNavBadge from "../../EnvelopeNavBadge";
import EnvelopeNavItem from "../../EnvelopeItem";
import EnvelopeSvgIcon from "../../../EnvelopeSvgIcon";


const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: theme.palette.text.primary,
    minHeight: 48,
    '&.active, &.active:hover, &.active:focus': {
        backgroundColor: `${theme.palette.secondary.main}!important`,
        color: `${theme.palette.secondary.contrastText}!important`,

        '&.open': {
            backgroundColor: 'rgba(0,0,0,.08)',
        },

        '& > .fuse-list-item-text': {
            padding: '0 0 0 16px',
        },

        '& .fuse-list-item-icon': {
            color: 'inherit',
        },
    },
}));


function isUrlInChildren(parent, url) {
    if (!parent.children)
        return false;

    for (let i = 0; i< parent.children.length; ++i){
        // 如果当前节点有子节点就递归进入
        if(parent.children[i].children){
            if(isUrlInChildren(parent.children[i], url))
                return true;
        }

        // 当递归到最里面元素的时候进行判断
        // 判断当前子节点内部是否有匹配的url，有则返回true
        if(parent.children[i].url === url || url.includes(parent.children[i].url))
            return true;
    }

    // 没找到，返回false
    return false;
}


function EnvelopeNavHorizontalCollapse(props) {
    const [opened, setOpened] = useState(false);
    const { item, nestedLevel, dense } = props;
    const theme = useTheme();

    const handleToggle = useDebounce((open) => {
        setOpened(open);
    }, 150);

    return useMemo(() => {
        return (
            <ul className='relative px-0'>
                <Manager>
                    <Reference>
                        {({ ref }) => (
                            <div ref={ref}>
                                <StyledListItem
                                    button
                                    className={classNames(
                                        'fuse-list-item',
                                        opened && 'open',
                                        isUrlInChildren(item, props.location.pathname) && 'active'
                                    )}
                                    onMouseEnter={() => handleToggle(true)}
                                    onMouseLeave={() => handleToggle(false)}
                                    aria-owns={opened ? 'menu-fuse-list-grow' : null}
                                    aria-haspopup="true"
                                    component={item.url ? NavLinkAdapter : 'li'}
                                    to={item.url}
                                    end={item.end}
                                    role="button"
                                    sx={item.sx}
                                    disabled={item.disabled}
                                >
                                    {item.icon && (
                                        <EnvelopeSvgIcon
                                            color="action"
                                            className={classNames('fuse-list-item-icon shrink-0', item.iconClass)}
                                        >
                                            {item.icon}
                                        </EnvelopeSvgIcon>
                                    )}

                                    <ListItemText
                                        className="fuse-list-item-text"
                                        primary={item.title}
                                        classes={{ primary: 'text-13 truncate' }}
                                    />

                                    {item.badge && <EnvelopeNavBadge className="mx-4" badge={item.badge} />}
                                    <IconButton
                                        disableRipple
                                        className="w-16 h-16 ltr:ml-4 rtl:mr-4 p-0"
                                        color="inherit"
                                        size="large"
                                    >
                                        <EnvelopeSvgIcon size={16} className="arrow-icon">
                                            {theme.direction === 'ltr'
                                                ? 'heroicons-outline:arrow-sm-right'
                                                : 'heroicons-outline:arrow-sm-left'}
                                        </EnvelopeSvgIcon>
                                    </IconButton>
                                </StyledListItem>
                            </div>
                        )}
                    </Reference>
                    {ReactDOM.createPortal(
                        <Popper
                            placement={theme.direction === 'ltr' ? 'right' : 'left'}
                            eventsEnabled={opened}
                            positionFixed
                        >
                            {({ ref, style, placement, arrowProps }) =>
                                opened && (
                                    <div
                                        ref={ref}
                                        style={{
                                            ...style,
                                            zIndex: 999 + nestedLevel + 1,
                                        }}
                                        data-placement={placement}
                                        className={classNames('z-999', !opened && 'pointer-events-none')}
                                    >
                                        <Grow in={opened} id="menu-fuse-list-grow" style={{ transformOrigin: '0 0 0' }}>
                                            <Paper
                                                className="rounded-8"
                                                onMouseEnter={() => handleToggle(true)}
                                                onMouseLeave={() => handleToggle(false)}
                                            >
                                                {item.children && (
                                                    <ul className={classNames('popper-navigation-list', dense && 'dense', 'px-0')}>
                                                        {item.children.map((_item) => (
                                                            <EnvelopeNavItem
                                                                key={_item.id}
                                                                type={`horizontal-${_item.type}`}
                                                                item={_item}
                                                                nestedLevel={nestedLevel + 1}
                                                                dense={dense}
                                                            />
                                                        ))}
                                                    </ul>
                                                )}
                                            </Paper>
                                        </Grow>
                                    </div>
                                )
                            }
                        </Popper>,
                        document.querySelector('#root')
                    )}
                </Manager>
            </ul>
        )
    }, [dense, handleToggle, item, nestedLevel, opened, props.location.pathname, theme.direction])
}

EnvelopeNavHorizontalCollapse.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string,
        icon: PropTypes.string,
        children: PropTypes.array,
    }),
};

EnvelopeNavHorizontalCollapse.defaultProps = {};

const NavHorizontalCollapse = withRouter(memo(EnvelopeNavHorizontalCollapse));

export default NavHorizontalCollapse;