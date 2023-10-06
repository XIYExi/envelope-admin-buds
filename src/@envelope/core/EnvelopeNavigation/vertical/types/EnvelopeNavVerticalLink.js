import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import classNames from "classnames";
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import EnvelopeNavBadge from "../../EnvelopeNavBadge";
import EnvelopeSvgIcon from "../../../EnvelopeSvgIcon";

const Root = styled(ListItem)(({ theme, ...props }) => ({
  minHeight: 44,
  width: '100%',
  borderRadius: '6px',
  margin: '0 0 4px 0',
  paddingRight: 16,
  paddingLeft: props.itempadding > 80 ? 80 : props.itempadding,
  paddingTop: 10,
  paddingBottom: 10,
  '&.active': {
    backgroundColor: `${theme.palette.secondary.main}!important`,
    color: `${theme.palette.secondary.contrastText}!important`,
    pointerEvents: 'none',
    transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
    '& > .fuse-list-item-text-primary': {
      color: 'inherit',
    },
    '& > .fuse-list-item-icon': {
      color: 'inherit',
    },
  },
  '& > .fuse-list-item-icon': {
    marginRight: 16,
  },
  '& > .fuse-list-item-text': {},
  color: theme.palette.text.primary,
  textDecoration: 'none!important',
}));

function EnvelopeNavVerticalLink(props) {
  const dispatch = useDispatch();
  const { item, nestedLevel, onItemClick } = props;

  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

  return useMemo(
    () => (
      <Root
        button
        component="a"
        href={item.url}
        target={item.target ? item.target : '_blank'}
        className="fuse-list-item"
        onClick={() => onItemClick && onItemClick(item)}
        role="button"
        itempadding={itempadding}
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
          secondary={item.subtitle}
          classes={{
            primary: 'text-13 font-medium fuse-list-item-text-primary truncate',
            secondary: 'text-11 font-medium fuse-list-item-text-secondary leading-normal truncate',
          }}
        />

        {item.badge && <EnvelopeNavBadge badge={item.badge} />}
      </Root>
    ),
    [item, itempadding, onItemClick]
  );
}

EnvelopeNavVerticalLink.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
    target: PropTypes.string,
  }),
};
EnvelopeNavVerticalLink.defaultProps = {};

const NavVerticalLink = EnvelopeNavVerticalLink;

export default NavVerticalLink;
