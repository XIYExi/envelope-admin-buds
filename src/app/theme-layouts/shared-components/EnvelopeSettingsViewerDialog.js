import {useState} from 'react';
import classNames from 'classnames';
import {Button, Dialog, DialogTitle, DialogActions, DialogContent, Typography} from "@mui/material";
import qs from 'qs';
import EnvelopeHighlight from "../../../@envelope/core/EnvelopeHighlight";
import EnvelopeSvgIcon from "../../../@envelope/core/EnvelopeSvgIcon";
import {useSelector} from "react-redux";
import {selectEnvelopeCurrentSettings} from "../../store/envelope/settingsSlice";


function EnvelopeSettingsViewerDialog(props) {
    const {className} = props;
    const [openDialog, setOpenDialog] = useState(false);
    const settings = useSelector(selectEnvelopeCurrentSettings);


    function handleOpenDialog(){
        setOpenDialog(true);
    }
    function handleCloseDialog(){
        setOpenDialog(false);
    }

    return (
        <div className={classNames('', className)}>
            <Button
                variant={"contained"}
                color={"secondary"}
                className={'w-full'}
                onClick={handleOpenDialog}
                startIcon={<EnvelopeSvgIcon>heroicons-solid:code</EnvelopeSvgIcon>}
            >
                View settings as json/query params
            </Button>

            <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby='form-dialog-title'>
                <DialogTitle className=''>Envelope Settings Viewer</DialogTitle>
                <DialogContent className="">
                    <Typography className='text-16 font-bold mt-24 mb-16'>JSON</Typography>

                    <EnvelopeHighlight component='pre' className='language-json'>
                        {JSON.stringify(settings, null, 2)}
                    </EnvelopeHighlight>

                    <Typography className="text-16 font-bold mt-24 mb-16">Query Params</Typography>
                    {qs.stringify({
                        defaultSettings: JSON.stringify(settings, { strictNullHandling: true }),
                    })}
                </DialogContent>

                <DialogActions>
                    <Button color={"secondary"} variant={'contained'} onClick={handleCloseDialog}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default EnvelopeSettingsViewerDialog;