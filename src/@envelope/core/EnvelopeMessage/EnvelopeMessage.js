import {amber, blue, green} from "@mui/material/colors";
import {styled, IconButton, Snackbar, SnackbarContent, Typography} from "@mui/material";
import {memo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {hideMessage, selectEnvelopeMessageOptions, selectEnvelopeMessageState} from "../../../app/store/envelope/messageSlice";
import EnvelopeSvgIcon from "../EnvelopeSvgIcon";

const StyledSnackbar = styled(Snackbar)(({ theme, variant }) => ({
    '& .EnvelopeMessage-content': {
        ...(variant === 'success' && {
            backgroundColor: green[600],
            color: '#FFFFFF',
        }),

        ...(variant === 'error' && {
            backgroundColor: theme.palette.error.dark,
            color: theme.palette.getContrastText(theme.palette.error.dark),
        }),

        ...(variant === 'info' && {
            backgroundColor: blue[600],
            color: '#FFFFFF',
        }),

        ...(variant === 'warning' && {
            backgroundColor: amber[600],
            color: '#FFFFFF',
        }),
    },
}));


const variantIcon = {
    success: 'check_circle',
    warning: 'warning',
    error: 'error_outline',
    info: 'info',
};


function EnvelopeMessage(props) {
    const dispatch = useDispatch();
    const state = useSelector(selectEnvelopeMessageState);
    const options = useSelector(selectEnvelopeMessageOptions);

    return (
        <StyledSnackbar
            {...options}
            open={state}
            onClose={() => dispatch(hideMessage())}
            ContentProps={{
                variant: 'body2',
                headlineMapping: {
                    body1: 'div',
                    body2: 'div',
                },
            }}
        >
            <SnackbarContent
                className="EnvelopeMessage-content"
                message={
                    <div className="flex items-center">
                        {variantIcon[options.variant] && (
                            <EnvelopeSvgIcon color="inherit">{variantIcon[options.variant]}</EnvelopeSvgIcon>
                        )}
                        <Typography className="mx-8">{options.message}</Typography>
                    </div>
                }
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => dispatch(hideMessage())}
                        size="large"
                    >
                        <EnvelopeSvgIcon>heroicons-outline:x</EnvelopeSvgIcon>
                    </IconButton>,
                ]}
            />
        </StyledSnackbar>
    )
}

export default memo(EnvelopeMessage);