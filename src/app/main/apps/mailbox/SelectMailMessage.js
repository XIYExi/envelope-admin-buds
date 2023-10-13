import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import EnvelopeSvgIcon from "../../../../@envelope/core/EnvelopeSvgIcon";


const SelectMailMessage = () => {
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col flex-1 items-center justify-center p-24">
            <EnvelopeSvgIcon className="icon-size-128 mb-16" color="disabled" size={24}>
                heroicons-outline:mail-open
            </EnvelopeSvgIcon>
            <Typography className="mt-16 text-2xl font-semibold tracking-tight" color="text.secondary">
                Select a mail to read
            </Typography>
        </div>
    );
};

export default SelectMailMessage;
