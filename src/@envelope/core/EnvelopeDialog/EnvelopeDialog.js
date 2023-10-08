import {Dialog} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {
    closeDialog,
    selectEnvelopeDialogState,
    selectEnvelopeDialogOptions
} from "../../../app/store/envelope/dialogSlice";

function EnvelopeDialog(props) {
    const dispatch = useDispatch();
    const state = useSelector(selectEnvelopeDialogState);
    const options = useSelector(selectEnvelopeDialogOptions);

    return (
        <Dialog
            open={state}
            onClose={(ev) => dispatch(closeDialog())}
            aria-labelledby="envelope-dialog-title"
            classes={{
                paper: 'rounded-8',
            }}
            {...options}
        />
    );
}

export default EnvelopeDialog;

