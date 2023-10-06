import classNames from "classnames";
import {forwardRef, Fragment, useMemo} from "react";
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/system';
import Icon from '@mui/material/Icon';

const Root = styled(Box)(({ theme, ...props }) => ({
    width: props.size,
    height: props.size,
    minWidth: props.size,
    minHeight: props.size,
    fontSize: props.size,
    lineHeight: props.size,
    color: {
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        info: theme.palette.info.main,
        success: theme.palette.success.main,
        warning: theme.palette.warning.main,
        action: theme.palette.action.active,
        error: theme.palette.error.main,
        disabled: theme.palette.action.disabled,
        inherit: undefined,
    }[props.color],
}));

const EnvelopeSvgIcon = forwardRef((props, ref) => {
    const {children, size, sx, className, color} = props;

    const iconPath = props.children.replace(':', '.svg#');

    return useMemo(() => {
        return (
            <Fragment>
                {!props.children.includes(':') ? (
                    <Icon ref={ref} {...props} />
                ) : (
                    <Root
                        {...props}
                        component="svg"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        className={classNames('shrink-0 fill-current ', className)}
                        ref={ref}
                        size={size}
                        sx={sx}
                        color={color}
                    >
                        <use xlinkHref={`assets/icons/${iconPath}`} />
                    </Root>
                )}
            </Fragment>
        )
    }, [children, ref, className, size, sx, color, iconPath])
})

EnvelopeSvgIcon.propTypes = {
    children: PropTypes.string,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    sx: PropTypes.object,
    color: PropTypes.oneOf([
        'inherit',
        'disabled',
        'primary',
        'secondary',
        'action',
        'error',
        'info',
        'success',
        'warning',
    ]),
}


EnvelopeSvgIcon.defaultProps = {
    children: '',
    size: 24,
    sx: {},
    color: 'inherit',
};

export default EnvelopeSvgIcon;


